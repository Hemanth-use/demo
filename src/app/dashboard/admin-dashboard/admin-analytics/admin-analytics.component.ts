import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
import { RouterOutlet } from '@angular/router';
import { ProductServicesService } from '../../../services/product-services.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-admin-analytics',
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
    MatListModule,
    CommonModule,
    FormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './admin-analytics.component.html',
  styleUrl: './admin-analytics.component.scss'
})
export class AdminAnalyticsComponent implements OnInit {
  analyticsFields: any[] = [];
  newAnalyticsField: any = {
    name: '',
    description: ''
  };
  editingAnalyticsFieldId: number | null = null;

  constructor(private http: HttpClient,private productService: ProductServicesService) { }

  ngOnInit(): void {
    this.fetchAnalyticsFields();
  }

  fetchAnalyticsFields(): void {
    this.productService.getAnalyticsFields().subscribe(
      (fields) => {
        this.analyticsFields = fields;
      },
      (error) => {
        console.error('Error fetching analytics fields:', error);
      }
    );
  }

  addAnalyticsField(): void {
    this.productService.createAnalyticsField(this.newAnalyticsField).subscribe(
      (response) => {
        this.analyticsFields.push(response);
        this.newAnalyticsField = {
          name: '',
          description: ''
        };
      },
      (error) => {
        console.error('Error adding analytics field:', error);
      }
    );
  }

  editAnalyticsField(field: any): void {
    this.editingAnalyticsFieldId = field.id;
  }

  saveAnalyticsField(field: any): void {
    this.productService.updateAnalyticsField(field.id, field).subscribe(
      () => {
        this.editingAnalyticsFieldId = null;
      },
      (error) => {
        console.error('Error saving analytics field:', error);
      }
    );
  }

  deleteAnalyticsField(id: number): void {
    this.productService.deleteAnalyticsField(id).subscribe(
      () => {
        this.analyticsFields = this.analyticsFields.filter(field => field.id !== id);
      },
      (error) => {
        console.error('Error deleting analytics field:', error);
      }
    );
  }
}