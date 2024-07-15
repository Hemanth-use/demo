import { Component, OnInit } from '@angular/core';
import { Category, ProductServicesService } from '../../../services/product-services.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-all-categories-list',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    CommonModule,
    FormsModule,
    MatListModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink
  ],
  templateUrl: './all-categories-list.component.html',
  styleUrls: ['./all-categories-list.component.scss']
})
export class AllCategoriesListComponent implements OnInit {
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  editingCategoryId: number | null = null;
  editingCategory: Category | null = null;

  constructor(
    private subcategoryService: ProductServicesService,
    private route: ActivatedRoute,private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.subcategoryService.allCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadSubcategories(categoryId: number): void {
    this.subcategoryService.getSubcategories(categoryId).subscribe(subcategories => {
      this.subcategories = subcategories;
    });
  }

  navigateToProducts(categoryId: number): void {
    this.router.navigate(['/subcategories', categoryId]);
  }

  navigateToAddCategory(): void {
    this.router.navigate(['/add-category']);
  }

  navigateToSubcategories(categoryId: number): void {
    this.router.navigate(['/categories', categoryId, 'subcategories']);
  }

  navigateToAddSubcategory(): void {
    this.router.navigate(['/categories', this.categories, 'add-subcategory']);
  }

  navigateToCategoryProducts(categoryId: number): void {
    this.router.navigate(['/categories', categoryId]);
  }

  cancelEditing(): void {
    this.editingCategoryId = null;
  }

  saveChanges(): void {
    if (this.editingCategory) {
      this.subcategoryService.editCategory(this.editingCategory.id, this.editingCategory).subscribe(() => {
        console.log('Category edited successfully');
        this.loadCategories();
        this.editingCategoryId = null;
        this.editingCategory = null; 
      }, error => {
        console.error('Error editing category:', error);
      });
    }
  }

  editCategory(category: Category): void {
    this.editingCategoryId = category.id;
    this.editingCategory = { ...category };
  }

  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.subcategoryService.deleteCategory(categoryId).subscribe(() => {
        console.log('Category deleted successfully');
        // Reload categories after deletion
        this.loadCategories();
      }, error => {
        console.error('Error deleting category:', error);
      });
    }
  }
}
export interface Subcategory {
  id: number;
  name: string;
  description: string;
}
