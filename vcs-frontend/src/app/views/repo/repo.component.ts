import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css'],
})
export class RepoComponent implements OnInit {
  public rname: string;
  public uname: string;
  constructor(public router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.rname = this.activatedRoute.snapshot.paramMap.get('rname');
    this.uname = this.activatedRoute.snapshot.paramMap.get('uname');
  }
}
