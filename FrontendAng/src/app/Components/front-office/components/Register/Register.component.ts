import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  registrationError: string = '';

  successful: boolean = false;
  loading: boolean = false;
  message: string = '';
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router)  {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
    });
  }

  handleRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    this.message = '';
    this.successful = false;
    this.loading = true;

    const user = this.registerForm.value; // Use form group value

    this.authService.register(user.username, user.email, user.password).subscribe(
      (data) => {
        this.message = data.message;
        this.successful = true;
        this.loading = false;
        this.router.navigateByUrl('/frontOffice/login');

      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString();
        this.successful = false;
        this.loading = false;
      }
    );
  }

  handleMouseOver(event: MouseEvent) {
    // Add visual reactivity on button hover
    const target = event.target as HTMLButtonElement;
    target.style.backgroundColor = '#3498db';
  }

  handleMouseLeave(event: MouseEvent) {
    // Reset button background color on mouse leave
    const target = event.target as HTMLButtonElement;
    target.style.backgroundColor = '#428bca';
  }
}

