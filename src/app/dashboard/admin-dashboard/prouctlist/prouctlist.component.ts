import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Product, ProductServicesService } from '../../../services/product-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './prouctlist.component.html',
  styleUrls: ['./prouctlist.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  subcategoryId: number | null = null;
  categoryId: number | null = null;
  newProductForm: FormGroup;
  showAddProductForm: boolean = false;

  constructor(
    private productService: ProductServicesService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.newProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      size: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      subcategoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.subcategoryId = +this.route.snapshot.params['subcategoryId'];
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.subcategoryId) {
      this.productService.getProductsBySubcategory(this.subcategoryId).subscribe(
        (products: Product[]) => {
          this.products = products;
        },
        (error: any) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  addProduct(): void {
    this.showAddProductForm = !this.showAddProductForm;
    if (this.subcategoryId) {
      this.newProductForm.patchValue({ subcategoryId: this.subcategoryId });
    }
  }

  submitNewProduct(): void {
    if (this.newProductForm.invalid) {
      console.error('Form is invalid', this.newProductForm.errors);
      return;
    }

    if (this.categoryId && this.subcategoryId) {
      const newProduct: Product = this.newProductForm.value;
      this.productService.createAllProducts(this.categoryId, this.subcategoryId, newProduct).subscribe(
        (product: Product) => {
          console.log('New product added successfully:', product);
          this.newProductForm.reset();
          this.showAddProductForm = false;
          this.loadProducts();
        },
        (error: any) => {
          console.error('Error adding new product:', error);
        }
      );
    } else {
      console.error('Category ID or Subcategory ID is missing');
    }
  }

  viewProduct(productId: number): void {
    this.router.navigate([`/categories/${this.categoryId}/subcategories/${this.subcategoryId}/products/${productId}`]);
  }}

  // export interface Product {
  //   id?: number;
  //   name: string;
  //   description: string;
  //   price: number;
  //   imageUrl: string;
  //   stock: number;
  //   brand: string;
  //   model: string;
  //   size: string;
  //   rating: number;
  //   subcategoryId: number;
  // }
  
