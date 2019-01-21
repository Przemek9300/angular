import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import {AuthService} from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private apiService: AuthService, private router:Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()

    })
  }

  onSubmit() {
    const value = this.loginForm.value;
    console.log({value})
    if (value.email && value.password) {
      this.apiService.login(value.email, value.password).subscribe(()=>this.router.navigateByUrl('/home'))
    }
  }
}
