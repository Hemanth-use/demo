import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AllCategoriesListComponent } from './dashboard/admin-dashboard/all-categories-list/all-categories-list.component';
import { ProductListComponent } from './dashboard/admin-dashboard/prouctlist/prouctlist.component';
import { CategoryComponent } from './dashboard/admin-dashboard/category/category.component';
import { AdminOrdersComponent } from './dashboard/admin-dashboard/admin-orders/admin-orders.component';
import { AdminAnalyticsComponent } from './dashboard/admin-dashboard/admin-analytics/admin-analytics.component';
import { AuthGuard } from './auth-guard/auth-guard.guard';
import { SubcategoriesComponent } from './dashboard/admin-dashboard/subcategories/subcategories.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userdashboard', component: UserDashboardComponent },
  { path: 'admindashboard', component: AdminDashboardComponent },
  { path: 'all-categories-list', component: AllCategoriesListComponent },
  { path: 'categories/:categoryId', component: ProductListComponent },
  { path: 'add-category', component: CategoryComponent },
  { path: '', component: AllCategoriesListComponent },
  { path: 'admin-orders', component: AdminOrdersComponent },
  { path: 'admin-analytics', component: AdminAnalyticsComponent },
  { path: 'categories/:categoryId/subcategories', component: SubcategoriesComponent },
  { path: 'categories/:categoryId/subcategories/:subcategoryId/products', component: ProductListComponent },
  { path: 'subcategories/:subcategoryId', component: ProductListComponent },
  { path: 'products/:productType', component: ProductListComponent },
  { path: 'products/:subcategoryId', component: ProductListComponent },
  {
    path: 'categories/:categoryId/subcategories/:subcategoryId/products/:productId',
    component: ProductListComponent, 
  },
  {
    path: 'categories/:categoryId/subcategories/:subcategoryId/add-product',
    component: ProductListComponent,
  },
  { path: 'categories/:categoryId/subcategories/:subcategoryId/products', component: ProductListComponent },
  { path: 'categories/:categoryId/subcategories/:subcategoryId/products/:productId', component: ProductListComponent },
  
];
