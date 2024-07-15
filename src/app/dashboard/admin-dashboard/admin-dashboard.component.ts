import { Component,OnInit } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { ProductServicesService } from '../../services/product-services.service';
import { Product, ProductImage, Category } from '../../model'




@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButton,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    CommonModule,
    FormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    

  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})


export class AdminDashboardComponent implements OnInit {
navigateToDashboard() {
throw new Error('Method not implemented.');
}
// navigateToOrdersManagement() {
// throw new Error('Method not implemented.');
// }

  isSidePanelVisible: boolean = false;
  products: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductServicesService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
  }

  logout() {
    window.history.pushState(null, '', '/');
    this.router.navigate(['/login']);
  }

  navigateToAllCategories() {
    this.router.navigate(['/all-categories-list']);
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
  navigateToOrdersManagement() {
    this.router.navigate(['/admin-orders']);
  }

  navigateToProfile() {
    this.router.navigate(['/admin-analytics']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  private loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }
}

