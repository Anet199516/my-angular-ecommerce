import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },

  // Static routes
  { path: 'wishlist', renderMode: RenderMode.Prerender },
  { path: 'cart', renderMode: RenderMode.Prerender },
  { path: 'checkout', renderMode: RenderMode.Prerender },
  { path: 'order-success', renderMode: RenderMode.Prerender },

  // Dynamic Routes
  { path: 'products/:categoryName', renderMode: RenderMode.Server },
  { path: 'product/:productId', renderMode: RenderMode.Server },

  // fallback
  { path: '**', renderMode: RenderMode.Server },
];
