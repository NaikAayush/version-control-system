import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message/message.model';
import { ApiService } from 'src/app/services/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Repository } from 'src/app/models/repository/repository.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Visibilty {
  value: string;
}

@Component({
  selector: 'app-create-repo',
  templateUrl: './create-repo.component.html',
  styleUrls: ['./create-repo.component.css'],
})
export class CreateRepoComponent implements OnInit {
  visibility: Visibilty[] = [{ value: 'Public' }, { value: 'Private' }];

  repoForm = new FormGroup({
    repoName: new FormControl('', [Validators.required]),
    repoDescription: new FormControl(''),
    visibility: new FormControl(this.visibility[0].value),
  });

  response;
  valid = false;
  message;
  ownerName: String;
  ownerId: String;
  constructor(
    public api: ApiService,
    public storage: StorageService,
    public auth: AuthService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.ownerName = await this.auth.getUserName();
    this.ownerId = await this.auth.getUserId();
    // this.storage.uploadFile();
  }

  async checkRepoName(event) {
    const repoName = event.target.value;
    this.response = await this.api.checkRepoName(this.ownerName, repoName);
    this.message = this.response.message;
    console.log(this.repoForm.valid);
    if (this.response.responseCode == 400) {
      // console.log();
      this.valid = false;
    } else {
      this.valid = true;
    }
    console.log(this.response);
    // console.log(event.target.value);
  }

  async onSubmit() {
    const repo = new Repository(
      this.repoForm.value.repoName,
      this.repoForm.value.visibility,
      this.ownerId,
      this.ownerName,
      this.repoForm.value.repoDescription
    );
    this.response = await this.api.createRepo(repo);
    console.log(this.response);
    if (this.response.responseCode == 200) {
      this.openSnackBar(this.response.message, 'Close');
      this.router.navigate([this.ownerName, 'dashboard']);
    }
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  getColor(message) {
    if (message == 'Repo Name Available') {
      return 'green';
    } else {
      return 'red';
    }
  }
}
