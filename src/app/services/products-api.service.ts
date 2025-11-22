import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  // // Mock data for testing
  // private mockProducts: Product[] = [
  //   // Electronics
  //   {
  //     id: '1',
  //     name: 'Wireless Noise-Cancelling Headphones',
  //     description:
  //       'Premium wireless headphones with active noise cancellation and 30-hour battery life',
  //     price: 299.99,
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&w=400&q=80',
  //     isFavorite: false,
  //     rating: 4.8,
  //     reviewCount: 328,
  //     inStock: true,
  //     category: 'electronics',
  //   },
  //   {
  //     id: '2',
  //     name: 'Smart 4K TV',
  //     description: '65-inch OLED Smart TV with HDR and built-in streaming apps',
  //     price: 1299.99,
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=400&q=80',
  //     isFavorite: false,
  //     rating: 4.6,
  //     reviewCount: 156,
  //     inStock: true,
  //     category: 'electronics',
  //   },
  //   {
  //     id: '3',
  //     name: 'Professional Camera',
  //     description: 'Mirrorless digital camera with 4K video capabilities',
  //     price: 899.99,
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&w=400&q=80',
  //     isFavorite: false,
  //     rating: 4.7,
  //     reviewCount: 89,
  //     inStock: true,
  //     category: 'electronics',
  //   },
  //   // Clothing
  //   {
  //     id: '4',
  //     name: 'Classic Denim Jacket',
  //     description: 'Vintage-style denim jacket with modern fit',
  //     price: 79.99,
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&w=400&q=80',
  //     isFavorite: false,
  //     rating: 4.5,
  //     reviewCount: 215,
  //     inStock: true,
  //     category: 'clothing',
  //   },
  //   {
  //     id: '5',
  //     name: 'Cotton T-Shirt Pack',
  //     description: 'Set of 3 premium cotton t-shirts in essential colors',
  //     price: 34.99,
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=400&q=80',
  //     isFavorite: false,
  //     rating: 4.3,
  //     reviewCount: 428,
  //     inStock: true,
  //     category: 'clothing',
  //   },
  //   {
  //     id: '6',
  //     name: 'Wool Winter Coat',
  //     description: 'Elegant wool-blend coat perfect for cold weather',
  //     price: 199.99,
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&w=400&q=80',
  //     isFavorite: false,
  //     rating: 4.6,
  //     reviewCount: 167,
  //     inStock: true,
  //     category: 'clothing',
  //   },
  //   // Accessories
  //   {
  //     id: '7',
  //     name: 'Leather Watch',
  //     description: 'Classic analog watch with genuine leather strap',
  //     price: 149.99,
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&w=400&q=80',
  //     isFavorite: false,
  //     rating: 4.7,
  //     reviewCount: 198,
  //     inStock: true,
  //     category: 'accessories',
  //   },
  //   {
  //     id: '8',
  //     name: 'Designer Sunglasses',
  //     description: 'UV-protected polarized sunglasses with premium frame',
  //     price: 129.99,
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&w=400&q=80',
  //     isFavorite: false,
  //     rating: 4.4,
  //     reviewCount: 143,
  //     inStock: true,
  //     category: 'accessories',
  //   },
  //   {
  //     id: '9',
  //     name: 'Leather Wallet',
  //     description: 'Handcrafted leather wallet with RFID protection',
  //     price: 49.99,
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&w=400&q=80',
  //     isFavorite: false,
  //     rating: 4.5,
  //     reviewCount: 276,
  //     inStock: true,
  //     category: 'accessories',
  //   },
  //   // Home
  //   {
  //     id: '10',
  //     name: 'Smart Coffee Maker',
  //     description: 'WiFi-enabled coffee maker with programmable brewing',
  //     price: 199.99,
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&w=400&q=80',
  //     isFavorite: false,
  //     rating: 4.7,
  //     reviewCount: 189,
  //     inStock: true,
  //     category: 'home',
  //   },
  //   {
  //     id: '11',
  //     name: 'Air Purifier',
  //     description: 'HEPA air purifier with air quality monitoring',
  //     price: 249.99,
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&w=400&q=80',
  //     isFavorite: false,
  //     rating: 4.8,
  //     reviewCount: 234,
  //     inStock: true,
  //     category: 'home',
  //   },
  //   {
  //     id: '12',
  //     name: 'Robot Vacuum',
  //     description: 'Smart robot vacuum with mapping and scheduling',
  //     price: 399.99,
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&w=400&q=80',
  //     isFavorite: false,
  //     rating: 4.6,
  //     reviewCount: 312,
  //     inStock: false,
  //     category: 'home',
  //   },
  // ];
  // private cart: CartItem[] = [];
  // getProducts(category?: string, searchTerm?: string): Observable<Product[]> {
  //   return of(this.mockProducts).pipe(
  //     map((products) => {
  //       let filteredProducts = [...products];
  //       // Filter by category if provided
  //       if (category && category !== 'all') {
  //         filteredProducts = filteredProducts.filter(
  //           (product) => product.category.toLowerCase() === category.toLowerCase(),
  //         );
  //       }
  //       // Filter by search term if provided
  //       if (searchTerm) {
  //         const term = searchTerm.toLowerCase();
  //         filteredProducts = filteredProducts.filter(
  //           (product) =>
  //             product.name.toLowerCase().includes(term) ||
  //             product.description.toLowerCase().includes(term),
  //         );
  //       }
  //       return filteredProducts;
  //     }),
  //   );
  // }
  // toggleFavorite(productId: string): Observable<void> {
  //   const product = this.mockProducts.find((p) => p.id === productId);
  //   if (product) {
  //     product.isFavorite = !product.isFavorite;
  //   }
  //   return of(void 0);
  // }
  // getWishListProducts(): Observable<Product[]> {
  //   return of(this.mockProducts.filter((p) => p.isFavorite));
  // }
  // getWishListCount(): Observable<number> {
  //   return of(this.mockProducts.filter((p) => p.isFavorite).length);
  // }
  // clearWishList(): Observable<void> {
  //   this.mockProducts.forEach((p) => (p.isFavorite = false));
  //   return of(void 0);
  // }
  // addToCart(productId: string): Observable<void> {
  //   const product = this.mockProducts.find((p) => p.id === productId);
  //   const existingItem = this.cart.find((item) => item.product.id === productId);
  //   if (!product) {
  //     return of(void 0);
  //   }
  //   if (existingItem) {
  //     existingItem.quantity++;
  //   } else {
  //     this.cart.push({ product, quantity: 1 });
  //   }
  //   return of(void 0);
  // }
  // getCartCount(): Observable<number> {
  //   return of(this.cart.reduce((acc, item) => acc + item.quantity, 0));
  // }
  // getCartItems(): Observable<CartItem[]> {
  //   return of([...this.cart]);
  // }
  // moveToCart(productId: string): Observable<void> {
  //   const product = this.mockProducts.find((p) => p.id === productId);
  //   const existingItem = this.cart.find((item) => item.product.id === productId);
  //   if (!product) {
  //     return of(void 0);
  //   }
  //   product.isFavorite = false;
  //   if (!existingItem) {
  //     this.cart.push({ product, quantity: 1 });
  //   }
  //   return of(void 0);
  // }
  // moveMultipleToCart(productIds: string[]): Observable<void> {
  //   return forkJoin(productIds.map((productId) => this.moveToCart(productId))).pipe(
  //     map(() => void 0),
  //   );
  // }
  // removeFromCart(productId: string): Observable<void> {
  //   const existingItem = this.cart.find((item) => item.product.id === productId);
  //   if (existingItem) {
  //     this.cart = this.cart.filter((item) => item.product.id !== productId);
  //   }
  //   return of(void 0);
  // }
  // updateCartItemQuantity(productId: string, quantity: number): Observable<void> {
  //   const existingItem = this.cart.find((item) => item.product.id === productId);
  //   if (existingItem) {
  //     existingItem.quantity = quantity;
  //   }
  //   return of(void 0);
  // }
  // moveToWishlist(productId: string): Observable<void> {
  //   const product = this.mockProducts.find((p) => p.id === productId);
  //   if (product) {
  //     product.isFavorite = true;
  //     this.cart = this.cart.filter((item) => item.product.id !== productId);
  //   }
  //   return of(void 0);
  // }
}
