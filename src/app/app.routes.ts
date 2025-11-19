import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products/all',
    pathMatch: 'full',
  },
  {
    path: 'products/:categoryName',
    loadComponent: () => import('./pages/products-grid/products-grid.component'),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist.component'),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/view-cart/view-cart.component'),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component'),
  },
  {
    path: 'order-success',
    loadComponent: () => import('./pages/order-success/order-success.component'),
  },
  {
    path: 'product/:productId',
    loadComponent: () => import('./pages/view-product-detail/view-product-detail'),
  },
];
