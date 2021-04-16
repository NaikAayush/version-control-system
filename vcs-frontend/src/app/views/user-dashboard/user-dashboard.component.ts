import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  public rname: string;
  public uname: string;

  repoData;
  data;
  constructor(
    public auth: AuthService,
    public api: ApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.rname = this.activatedRoute.snapshot.paramMap.get('rname');
    this.uname = this.activatedRoute.snapshot.paramMap.get('uname');
    const uid = await this.auth.getUserName();
    this.listRepo(uid);
  }

  async listRepo(uid: String) {
    const data = { uname: uid };
    this.repoData = await this.api.listRepo(data);
    this.data = JSON.parse(this.repoData.data.repoList);
    console.log(this.data);
  }
}
