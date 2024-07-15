
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ServiceService } from '../../services/service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.service.registerUser(this.signupForm.value).subscribe(
      (response) => {
        console.log('User registration successful:', response);
        this.signupForm.reset();
        this.router.navigate(['/login']);
        this.snackBar.open('Registration Successful!', 'Close', {
          duration: 3000
        });
      },
      (error) => {
        console.error('Error during user registration:', error);
        this.snackBar.open('Registration Failed!', 'Close', {
          duration: 3000
        });
      }
    );
  }
}
 


