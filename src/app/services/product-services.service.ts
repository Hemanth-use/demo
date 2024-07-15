import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Category, AnalyticsField, Subcategory,Order } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ProductServicesService {
 
  getProductsBySubcategoryId: any;
  constructor(private http: HttpClient) {}

  private BASE_URL = 'http://localhost:8080/';

  // Products
  getAllProducts(): Observable<Product[]> {
    const url = `${this.BASE_URL}api/admin/products`;
    return this.http.get<Product[]>(url);
  }
  createAllProducts(categoryId: number, subcategoryId: number, createProduct: Product): Observable<any> {
    createProduct.subcategoryId = subcategoryId;
    return this.http.post<any>(
      `${this.BASE_URL}api/admin/products/category/${categoryId}/subcategory/${subcategoryId}`,
      createProduct
    );
  }
  getProductsBySubcategory(subcategoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}api/admin/products/products/${subcategoryId}`);
  }
  getProductsBySubcategoriesId(subcategoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/subcategories/${subcategoryId}/products`);
  }
  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/api/admin/products/category/${categoryId}`);
  }
  

  editProduct(productId: number, updatedProductData: any): Observable<Product> {
    const url = `${this.BASE_URL}api/admin/products/${productId}`;
    return this.http.put<Product>(url, updatedProductData);
  }

  deleteProduct(productId: number): Observable<void> {
    const deleteUrl = `${this.BASE_URL}api/admin/products/${productId}`;
    return this.http.delete<void>(deleteUrl);
  }

  // Categories
  allCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.BASE_URL}api/admin/categories`);
  }

  createCategories(createCategories: any): Observable<any> {
    return this.http.post<any>(
      `${this.BASE_URL}api/admin/categories`,
      createCategories
    );
  }

  editCategory(categoryId: number, updatedCategoryData: any): Observable<any> {
    const url = `${this.BASE_URL}api/admin/categories/${categoryId}`;
    return this.http.put(url, updatedCategoryData);
  }

  deleteCategory(categoryId: number): Observable<void> {
    const url = `${this.BASE_URL}api/admin/categories/${categoryId}`;
    return this.http.delete<void>(url);
  }
  // Subcategory
  createSubcategory(
    categoryId: number,
    newSubcategory: any
  ): Observable<Subcategory> {
    const url = `${this.BASE_URL}api/admin/subcategories/category/${categoryId}`;
    return this.http.post<Subcategory>(url, newSubcategory);
  }
  updateSubcategory(
    subcategoryId: number,
    updatedSubcategory: Subcategory
  ): Observable<void> {
    const url = `${this.BASE_URL}api/admin/subcategories/${subcategoryId}`;
    return this.http.put<void>(url, updatedSubcategory);
  }

  deleteSubcategory(subcategoryId: number): Observable<void> {
    const url = `${this.BASE_URL}api/admin/subcategories/${subcategoryId}`;
    return this.http.delete<void>(url);
  }
  getSubcategories(categoryId?: number): Observable<Subcategory[]> {
    const url = categoryId
      ? `${this.BASE_URL}api/admin/subcategories/category/${categoryId}`
      : `${this.BASE_URL}api/admin/subcategories`;
  
    return this.http.get<Subcategory[]>(url);
  }
  

  // AnalyticsFields
  createAnalyticsField(analyticsFieldData: any): Observable<any> {
    return this.http.post<any>(
      `${this.BASE_URL}api/analytics-fields`,
      analyticsFieldData
    );
  }
  getAnalyticsFields(): Observable<AnalyticsField[]> {
    return this.http.get<AnalyticsField[]>(
      `${this.BASE_URL}api/analytics-fields`
    );
  }
  updateAnalyticsField(
    analyticsFieldId: number,
    updatedAnalyticsFieldData: any
  ): Observable<any> {
    return this.http.put<any>(
      `${this.BASE_URL}api/analytics-fields/${analyticsFieldId}`,
      updatedAnalyticsFieldData
    );
  }
  deleteAnalyticsField(analyticsFieldId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.BASE_URL}api/analytics-fields/${analyticsFieldId}`
    );
  }

  //adminorders
  getAdminOrders(): Observable<Order[]> {
    const url = `${this.BASE_URL}api/admin/orders`;
    return this.http.get<Order[]>(url);
  }
}

export { Product, Category, AnalyticsField, Subcategory,Order };
