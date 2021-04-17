import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css'],
})
export class RepoComponent implements OnInit {
  public rname: string;
  public uname: string;
  public data;
  public flag = false;
  math = Math;
  public date = new Date().getTime() / 1000;
  constructor(public router: Router, private activatedRoute: ActivatedRoute, public api: ApiService) {}

  async ngOnInit() {
    this.rname = this.activatedRoute.snapshot.paramMap.get('rname');
    this.uname = this.activatedRoute.snapshot.paramMap.get('uname');
    const data = await this.api.getHistory(this.uname,this.rname);
    if (data) {
      this.flag = true;
      this.data = data;
    }
    console.log(this.data.data.data[0])
  }
}
