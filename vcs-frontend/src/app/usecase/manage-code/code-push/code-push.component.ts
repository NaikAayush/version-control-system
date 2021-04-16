import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-code-push',
  templateUrl: './code-push.component.html',
  styleUrls: ['./code-push.component.css'],
})
export class CodePushComponent implements OnInit {
  public rname: string;
  public uname: string;
  constructor(public router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.rname = this.activatedRoute.snapshot.paramMap.get('rname');
    this.uname = this.activatedRoute.snapshot.paramMap.get('uname');
  }

  isHovering: boolean;

  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
}
