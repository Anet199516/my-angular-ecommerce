import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { INITIAL_STATE } from './models/store.model';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },

  // Static routes
  { path: 'wishlist', renderMode: RenderMode.Client },
  { path: 'cart', renderMode: RenderMode.Server },
  { path: 'checkout', renderMode: RenderMode.Server },
  { path: 'order-success', renderMode: RenderMode.Client },

  // Dynamic Routes
  { path: 'products/:categoryName', renderMode: RenderMode.Client },
  { path: 'product/:productId',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    async getPrerenderParams() {
      const ids = INITIAL_STATE.products.map(p => p.id.toString());

      return ids.map(productId => ({ productId }));
    },
  },
  // fallback
  { path: '**', renderMode: RenderMode.Server },
];
