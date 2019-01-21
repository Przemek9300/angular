import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { 
  AuthGaurdService as  AuthGaurdService 
} from '../app/service/auth-gaurd.service'
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SongsComponent } from './songs/songs.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' , canActivate:[AuthGaurdService]},

  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'home', component:HomeComponent, canActivate:[AuthGaurdService]},
  {path: 'songs', component:SongsComponent, canActivate:[AuthGaurdService]},
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGaurdService]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
