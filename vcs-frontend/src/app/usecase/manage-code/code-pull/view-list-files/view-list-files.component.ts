import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-view-list-files',
  templateUrl: './view-list-files.component.html',
  styleUrls: ['./view-list-files.component.css'],
})
export class ViewListFilesComponent implements OnInit {
  public rname: string;
  public uname: string;
  public fileData;
  public flag = false;
  public date = new Date().getTime() / 1000;

  math = Math;
  dateF = Date;

  constructor(
    public api: ApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    // this.date = this.toDateTime(this.secs);
    this.rname = this.activatedRoute.snapshot.paramMap.get('rname');
    this.uname = this.activatedRoute.snapshot.paramMap.get('uname');
    const fileData = await this.api.getFileList(this.uname, this.rname);
    if (fileData) {
      this.flag = true;
      this.fileData = fileData;
    }
    console.log(this.fileData);
  }

  toDateTime(secs: any) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }
}
