import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router:Router ){}

  navigateToLogin() {
    this.router.navigate(['/login']); 
  }
  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

}
