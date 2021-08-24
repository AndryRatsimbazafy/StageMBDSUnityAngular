import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TobuildComponent } from './tobuild/tobuild.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'index', component: IndexComponent },
  { path: 'reset-user-password/:token', component: ResetPasswordComponent },
  { path: 'conference-direct', component: TobuildComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
