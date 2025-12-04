import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model';
import { mapFakeStoreProduct } from './helper.service';
import { delay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private API = 'https://fakestoreapi.com/products';

  getAllProducts() {
    return this.http.get<ProductModel[]>(this.API)
      .pipe(
        delay(1000),
        map(data => {
          /**
           * For error simulation
           * */
          // if (data.length > 0) {
          //   console.log("Intentionally throwing error to test 500 page...");
          //   throw new Error('Simulated API processing error for 500 testing.');
          // }
          // return [];

          return data.slice(0, 12).map(mapFakeStoreProduct);
        })
      )
  }

  getProduct(id: string | number) {
    return this.http.get<ProductModel>(`${this.API}/${id}`);
  }

  getProductById(id: string): Observable<ProductModel> {
    const url = `${this.API}/${id}`;
    return this.http.get<any>(url).pipe(
      map(mapFakeStoreProduct)
    );
  }
}
