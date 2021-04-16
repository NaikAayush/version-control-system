import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRepoComponent } from './usecase/create-repo/create-repo.component';
import { CodePullComponent } from './usecase/manage-code/code-pull/code-pull.component';
import { CodePushComponent } from './usecase/manage-code/code-push/code-push.component';
import { RepoComponent } from './views/repo/repo.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'login', component: UserProfileComponent },
  { path: '', component: UserProfileComponent },
  { path: ':uname/create', component: CreateRepoComponent },
  { path: ':uname/dashboard', component: UserDashboardComponent },
  { path: ':uname/repository/upload/:rname', component: CodePushComponent },
  { path: ':uname/repository/pull/:rname', component: CodePullComponent },
  { path: ':uname/repository/view/:rname', component: RepoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
