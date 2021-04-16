import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from './../environments/environment';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CreateRepoComponent } from './usecase/create-repo/create-repo.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.component';
import { RepoComponent } from './views/repo/repo.component';
import { CodePushComponent } from './usecase/manage-code/code-push/code-push.component';
import { DropzoneDirective } from './directive/dropzone.directive';
import { UploadTaskComponent } from './usecase/manage-code/code-push/upload-task/upload-task.component';
import { CodePullComponent } from './usecase/manage-code/code-pull/code-pull.component';
import { ViewListFilesComponent } from './usecase/manage-code/code-pull/view-list-files/view-list-files.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    CreateRepoComponent,
    UserDashboardComponent,
    RepoComponent,
    CodePushComponent,
    DropzoneDirective,
    UploadTaskComponent,
    CodePullComponent,
    ViewListFilesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
