import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JwtModuleOptions, JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterceptor } from './service/token-inceptor.service';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { SongsComponent } from './songs/songs.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../app/material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { PlaylistFormComponent } from './playlist-form/playlist-form.component';



export function tokenGetter() {
  return localStorage.getItem('currentUser');
}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PlayerComponent,
    SongsComponent,
    DashboardComponent,
    PlaylistFormComponent,

    

  ],
  imports: [
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost'],
      
      }
    }),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule

    
    
    

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
