import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListFilesComponent } from './view-list-files.component';

describe('ViewListFilesComponent', () => {
  let component: ViewListFilesComponent;
  let fixture: ComponentFixture<ViewListFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewListFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
