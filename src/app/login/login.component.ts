import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {
    this.loadForm();
  }
  loadForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  loginData() {
    let item = {
      userName: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value
    }
    console.log(item);
    if(item.userName === "baljit92singh" && item.password === "admin123"){
      localStorage.setItem('currentUser', JSON.stringify(item));
      this.router.navigate(['/home']);
      this.snackBar.open("Login successfully", 'Dismiss', { duration: 3000 });
    } else {
      this.snackBar.open("Incorrect userName or password", 'Dismiss', { duration: 3000 });
      return false;
    }
  }
  ngOnInit() {
  }

}
