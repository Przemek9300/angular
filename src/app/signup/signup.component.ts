import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder, private apiService: AuthService, private router:Router) {}

  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      password2: new FormControl()

    })
  }
  onSubmit(){
    const value = this.signupForm.value;
    console.log(this.signupForm.value)
    if (value.email && value.password && value.password == value.password2) {
      this.apiService.singUp(value.email, value.password,value.firstname, value.lastname).subscribe(()=>this.router.navigateByUrl('/home'))
  }
  }
}
