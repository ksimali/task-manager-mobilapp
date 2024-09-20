import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(){
    if(this.loginForm.valid){
      const {email, password} = this.loginForm.value;
      this.userService.login(email, password).subscribe(
        (res) => {
          console.log(res);
          this.authService.setToken(res.token, res.loggedUser)
          this.router.navigate(["/"])
        },
        (err) => {
          console.log(err)
        }
      );
    }
  }
}
