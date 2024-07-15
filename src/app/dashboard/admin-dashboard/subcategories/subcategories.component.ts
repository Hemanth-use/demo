import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductServicesService, Subcategory } from '../../../services/product-services.service'; 
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    CommonModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss'],
})
export class SubcategoriesComponent implements OnInit {
  subcategories: Subcategory[] = [];
  products: Product[] = [];
  selectedSubcategory: Subcategory | null = null;
  selectedSubcategoryProducts: Product[] = [];
  showAddProductForm: boolean = false;
  newProductForm: FormGroup;
  editSubcategoryForm: FormGroup;
  showEditForm: boolean = false;
  showAddSubcategoryForm: boolean = false;
  newSubcategoryForm: FormGroup;
  editProductForm: FormGroup; 
  editingProduct: Product | null = null;

  constructor(
    private productService: ProductServicesService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.newProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      imageUrl: ['', Validators.required],
      stock: [0, Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      size: ['', Validators.required],
      rating: [0],
      subcategoryId: [null, Validators.required]
    });

    this.editProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      imageUrl: ['', Validators.required],
      stock: [0, Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      size: ['', Validators.required],
      rating: [0],
      subcategoryId: [null, Validators.required]
    });

    this.editSubcategoryForm = this.formBuilder.group({ 
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.newSubcategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const categoryId = +this.route.snapshot.params['categoryId'];
    this.loadSubcategories(categoryId);
  }

  loadSubcategories(categoryId: number): void {
    this.productService.getSubcategories(categoryId).subscribe(
      (subcategories: Subcategory[]) => {
        this.subcategories = subcategories;
      },
      (error: any) => {
        console.error('Error loading subcategories:', error);
      }
    );
  }

  viewSubcategory(subcategory: Subcategory): void {
    // Navigate to the ProductListComponent and pass the subcategory ID
    this.router.navigate(['/categories', this.route.snapshot.params['categoryId'], 'subcategories', subcategory.id, 'products']);
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

  submitNewSubcategory(): void {
    if (this.newSubcategoryForm.invalid) {
      console.error('Form is invalid');
      return;
    }
  
    const categoryId = +this.route.snapshot.params['categoryId'];
    const newSubcategory: any = this.newSubcategoryForm.value;
  
    this.productService.createSubcategory(categoryId, newSubcategory).subscribe(
      (subcategory: Subcategory) => {
        console.log('New subcategory added successfully:', subcategory);
        this.newSubcategoryForm.reset();
        this.showAddSubcategoryForm = false;
        this.loadSubcategories(categoryId);
      },
      (error: any) => {
        console.error('Error adding new subcategory:', error);
      }
    );
  }

  setSubcategoryId(subcategoryId: number): void {
    this.newProductForm.patchValue({
      subcategoryId: subcategoryId,
    });
  }

  editSubcategory(subcategory: Subcategory): void {
    this.selectedSubcategory = { ...subcategory };
    this.editSubcategoryForm.patchValue({
      name: subcategory.name,
      description: subcategory.description,
    });
    this.showEditForm = true;
  }

  toggleAddProductForm(): void {
    this.showAddProductForm = !this.showAddProductForm;
  }

  submitEditedSubcategory(): void {
    if (!this.selectedSubcategory) {
      console.error('No subcategory selected');
      return;
    }

    const editedSubcategory: Subcategory = {
      ...this.selectedSubcategory,
      name: this.editSubcategoryForm.value.name,
      description: this.editSubcategoryForm.value.description,
    };

    this.productService.updateSubcategory(this.selectedSubcategory.id, editedSubcategory).subscribe(
      () => {
        console.log('Subcategory edited successfully');
        const categoryId = +this.route.snapshot.params['categoryId'];
        this.loadSubcategories(categoryId);
        this.selectedSubcategory = null;
        this.showEditForm = false;
      },
      (error: any) => {
        console.error('Error editing subcategory:', error);
      }
    );
  }

  cancelEditing(): void {
    this.selectedSubcategory = null;
    this.showEditForm = false;
  }

  deleteSubcategory(subcategoryId: number): void {
    this.productService.deleteSubcategory(subcategoryId).subscribe(
      () => {
        console.log('Subcategory deleted successfully');
        const categoryId = +this.route.snapshot.params['categoryId'];
        this.loadSubcategories(categoryId);
      },
      (error: any) => {
        console.error('Error deleting subcategory:', error);
      }
    );
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
    this.editProductForm.patchValue({ ...product });
  }

  updateProduct(): void {
    if (this.editingProduct) {
      this.productService.editProduct(this.editingProduct.id, this.editingProduct).subscribe(
        (updatedProduct: Product) => {
          const index = this.products.findIndex(p => p.id === updatedProduct.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
            console.log('Product updated successfully:', updatedProduct);
          } else {
            console.error('Error: Edited product not found in local array');
          }
          this.editingProduct = null;
        },
        error => {
          console.error('Error updating product:', error);
          this.editingProduct = null;
        }
      );
    }
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.selectedSubcategoryProducts = this.selectedSubcategoryProducts.filter(p => p.id !== productId);
          console.log('Product deleted successfully:', productId);
        },
        (error: any) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
