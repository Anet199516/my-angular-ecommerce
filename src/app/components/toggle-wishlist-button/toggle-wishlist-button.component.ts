import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { Product } from '../../models/product';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-wishlist-button',
  standalone: true,
  imports: [MatIconButton, MatIcon],
  templateUrl: './toggle-wishlist-button.component.html',
  styles: ``,
})
export class ToggleWishlistButtonComponent {
  public product = input.required<Product>();
  protected store = inject(EcommerceStore);

  protected isInWishlist = computed(() => this.store.wishlistItems().find((p) => p.id === this.product().id));

  protected onToggleWishlist(product: Product) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
