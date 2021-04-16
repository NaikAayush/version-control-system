import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css'],
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;
  @Input() uname: String;
  @Input() rname: String;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    public api: ApiService
  ) {}

  ngOnInit() {
    this.startUpload(this.uname, this.rname);
  }

  async startUpload(uname: any, rname: any) {
    // The storage path
    const path = `${uname}/${rname}/${this.file.name}`;
    // const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    const data: any = await this.api.updateCommit(uname, rname);
    const commitNo = data.data.repoDetails.commitNo;

    await this.api.updateFiles(uname, rname, [this.file.name]);

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.db
          .collection('repository')
          .doc(uname)
          .collection('repo')
          .doc(rname)
          .collection('commit' + commitNo)
          .doc(this.file.name)
          .set({ downloadURL: this.downloadURL, path, time: new Date() });
        // .add({ downloadURL: this.downloadURL, path });
      })
    );
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
