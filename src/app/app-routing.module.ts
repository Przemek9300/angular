import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { 
  AuthGaurdService as  AuthGaurdService 
} from '../app/service/auth-gaurd.service'

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' , canActivate:[AuthGaurdService]},

  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
