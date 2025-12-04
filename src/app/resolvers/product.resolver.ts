import { inject, makeStateKey, TransferState } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, tap, of } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { ProductsService } from '../services/products.service';

const PRODUCT_KEY = (productId: string) => makeStateKey<ProductModel>(`product-${productId}`);

export const productResolver: ResolveFn<ProductModel> = (route, state): Observable<ProductModel> => {
  const productService = inject(ProductsService);
  const transferState = inject(TransferState);
  const platformId = inject(PLATFORM_ID);
  const productId = route.paramMap.get('productId')!;
  const stateKey = PRODUCT_KEY(productId);

  const storedData = transferState.get(stateKey, null);

  if (storedData) {
    console.log(`[TransferState] Data found for ${productId}. Using cached data.`);
    transferState.remove(stateKey);
    return of(storedData);
  }


  console.log(`[TransferState] Data not found. Fetching from API for ${productId}.`);
  return productService.getProductById(productId).pipe(
    tap(product => {
      if (isPlatformServer(platformId)) {
        transferState.set(stateKey, product);
      }
    })
  );
};
