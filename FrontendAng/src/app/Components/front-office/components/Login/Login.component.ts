import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent {

  loading: boolean = false;
  message: string = '';
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  handleLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.message = '';
    this.loading = true;

    const user = this.loginForm.value;

    this.authService.login(user.username,user.password).subscribe(
      () => {
        this.loading = false; // Set loading to false after successful login
        this.router.navigateByUrl('/frontOffice');
      },
      (error) => {
        this.loading = false;
        this.message = (error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString();
      }
    );
  }

  handleMouseOver(event: MouseEvent) {
    // Add visual reactivity on button hover
    const target = event.target as HTMLButtonElement;
    target.style.backgroundColor = '#2c3e50'; // Darker color on hover
  }

  handleMouseLeave(event: MouseEvent) {
    // Reset button background color on mouse leave
    const target = event.target as HTMLButtonElement;
    target.style.backgroundColor = '#34495e'; // Original color
  }
}
