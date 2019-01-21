import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper:JwtHelperService) {}

  static  token:string
  public getToken(): string{
    return localStorage.getItem('currentUser');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser');
    // Check whether the token is expired and return
    // true or false
    
    const isTokenExpired :boolean = this.jwtHelper.isTokenExpired(token)
    return !isTokenExpired;
  }


  login(username: string, password: string) {
    return this.http
        .post<any>(`http://localhost:8080/signin`, {username, password})
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user
            // logged in between page refreshes
            AuthService.token = user.token
            localStorage.setItem('currentUser',user.token);
          }

          return user;
        }));
  }
  singUp(username: string, password: string, firstname: string, lastname: string){
    return this.http.post(`http://localhost:8080/signup`, {username, password,firstname,lastname})
    .pipe(map(response=>{
      console.log(response)
      return response;

    }))
  }
  loggout(){
    if(this.isAuthenticated)
    localStorage.removeItem('currentUser');

  }
}
