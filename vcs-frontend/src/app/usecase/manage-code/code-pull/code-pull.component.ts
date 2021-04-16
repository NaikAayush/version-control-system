import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-code-pull',
  templateUrl: './code-pull.component.html',
  styleUrls: ['./code-pull.component.css'],
})
export class CodePullComponent implements OnInit {
  // public rname: string;
  // public uname: string;
  // public fileData;

  constructor() // public api: ApiService,
  // public router: Router,
  // private activatedRoute: ActivatedRoute
  {}

  async ngOnInit() {
    // this.rname = this.activatedRoute.snapshot.paramMap.get('rname');
    // this.uname = this.activatedRoute.snapshot.paramMap.get('uname');
    // this.fileData = await this.api.getFileList(this.uname, this.rname);
    // console.log(this.fileData);
  }
}
