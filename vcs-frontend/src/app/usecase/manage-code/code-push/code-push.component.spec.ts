import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePushComponent } from './code-push.component';

describe('CodePushComponent', () => {
  let component: CodePushComponent;
  let fixture: ComponentFixture<CodePushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodePushComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
