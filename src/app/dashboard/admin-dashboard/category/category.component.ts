import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, ProductServicesService } from '../../../services/product-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categories: Category[] = [];
  updatedCategoryData: any;
 
  

  constructor(
    private fb: FormBuilder,
    private productService: ProductServicesService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.allCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  navigateToAddCategory(): void {
    console.log('Navigating to add category');
    this.router.navigate(['/add-category']);
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      this.productService.createCategories(categoryData).subscribe(
        () => {
          console.log('Category created successfully');
          this.router.navigate(['/all-categories-list']);
          this.loadCategories();
        },
        error => {
          console.error('Error creating category:', error);
        }
      );
    } else {
      console.error('Form is invalid.');
    }
    
  }
  editCategory(categoryId: number): void {
    this.productService.editCategory(categoryId, this.updatedCategoryData).subscribe(() => {
      console.log('Category edited successfully');
    }, error => {
      console.error('Error editing category:', error);
    });
  }

  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.productService.deleteCategory(categoryId).subscribe(() => {
        console.log('Category deleted successfully');
        this.loadCategories(); // Reload categories after deletion
      }, error => {
        console.error('Error deleting category:', error);
      });
    }

  
  }
}