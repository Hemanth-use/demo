import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { Category, Product, Subcategory } from '../../model';
import { ProductServicesService } from '../../services/product-services.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButton,
    MatNavList,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  categories: Category[] = [];
  showCategories: boolean = false;
  selectedCategory: Category | null = null;
  subcategories: Subcategory[] = [];
  selectedSubcategoryProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductServicesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.route.paramMap.subscribe(params => {
      const subcategoryIdStr = params.get('subcategoryId');
      const subcategoryId = subcategoryIdStr ? +subcategoryIdStr : null;
      if (subcategoryId !== null) {
        this.loadProducts(subcategoryId);
      }
    });
  }

  
  navigateToProducts(subcategoryId: number): void {
    this.router.navigate(['/categories', this.selectedCategory?.id, 'subcategories', subcategoryId, 'products']);
  }

  fetchCategories(): void {
    this.productService.allCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  showSubCategories(category: Category): void {
    this.selectedCategory = category;
    this.productService.getSubcategories(category.id).subscribe(
      (subcategories: Subcategory[]) => {
        this.subcategories = subcategories;
      },
      (error) => {
        console.error('Error loading subcategories:', error);
      }
    );
    this.selectedSubcategoryProducts = []; // Clear products when changing subcategories
  }

  loadProductsForSubcategory(subcategoryId: number): void {
    this.productService.getProductsBySubcategory(subcategoryId).subscribe(
      (products: Product[]) => {
        this.selectedSubcategoryProducts = products;
      },
      (error: any) => {
        console.error('Error fetching products for subcategory:', error);
      }
    );
  }

  loadProducts(subcategoryId: number): void {
    this.productService.getProductsBySubcategory(subcategoryId).subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  toggleDropdown(): void {
    this.showCategories = !this.showCategories;
  }

  hideDropdown(): void {
    this.showCategories = false;
  }
}
