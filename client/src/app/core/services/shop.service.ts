import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../pagination';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'http://localhost:5000/api/';
  private http = inject(HttpClient);
  types: string[] = [];
  brands: string[] = [];

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brands.length) {
      params = params.append('brands', shopParams.brands.join(','));
    }

    if (shopParams.types.length) {
      params = params.append('types', shopParams.types.join(','));
    }

    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('pageSize', shopParams.pageSize);
    params = params.append('pageIndex', shopParams.pageNumber);

    const url = this.baseUrl + 'products';

    return this.http.get<Pagination<Product>>(url, { params });
  }

  getBrands() {
    if (this.brands.length) return;

    const url = this.baseUrl + 'products/brands';

    return this.http.get<string[]>(url).subscribe({
      next: (response) => (this.brands = response),
      error: (error) => console.log(error),
    });
  }

  getTypes() {
    if (this.types.length) return;

    const url = this.baseUrl + 'products/types';

    return this.http.get<string[]>(url).subscribe({
      next: (response) => (this.types = response),
      error: (error) => console.log(error),
    });
  }
}
