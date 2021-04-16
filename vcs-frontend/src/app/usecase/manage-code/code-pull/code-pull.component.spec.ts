import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePullComponent } from './code-pull.component';

describe('CodePullComponent', () => {
  let component: CodePullComponent;
  let fixture: ComponentFixture<CodePullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodePullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
