import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceService } from '../../services/service.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormField,
    MatError,
    MatLabel,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ServiceService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const userLoginData = {
        usernameOrEmail: this.loginForm.value.usernameOrEmail,
        password: this.loginForm.value.password
      };
      const userType = this.isUsernameAdmin(userLoginData.usernameOrEmail) ? 'admin' : 'user';

      this.service.login(userLoginData, userType).subscribe(
        (response) => {
          console.log('Response from backend:', response);
          if (response.role === 'ADMIN') {
            console.log('Navigating to admin dashboard');
            this.router.navigate(['/admindashboard']); // Redirect to admin dashboard
          } else {
            console.log('Navigating to user dashboard');
            this.router.navigate(['/userdashboard']); // Redirect to user dashboard
          }
          this.snackBar.open('Login Successful!', 'Close', { duration: 3000 });
        },
        (error) => {
          console.error('Error during login:', error);
          this.snackBar.open('Login failed. Please try again.', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Please enter valid credentials', 'Close', { duration: 3000 });
    }
  }

  private isUsernameAdmin(username: string): boolean {
    return username.toLowerCase().includes('admin');
  }
}