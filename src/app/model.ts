

export interface Model {
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    brand: string;
    model: string;
    size: string;
    rating: number;
    imageUrl: string;
    images: ProductImage[];
    subcategoryId: number;
    // categoryId: number;
  }
  
  export interface ProductImage {
    id: number;
    imageUrl: string;
    product: Product;
  }
  
  export interface Category {
subcategories: any;
    products: Product[];
    id: number;
    name: string;
    description: string;
  }
  export interface Subcategory {
    id: number;
    name: string;
    description: string;
  }
  

  export interface AnalyticsField{
    id: number;
    name: string;
    description: string;
  }

  export interface Order{
    
  }
  