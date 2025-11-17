import { Component, ChangeDetectionStrategy, input, inject, computed } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../models/product';
import { EcommerceStore } from '../../ecommerce-store';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RouterLink } from '@angular/router';
import { ResponsiveManager } from '../../services/responsive-manager';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButton, MatIcon, StarRatingComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-card.component.html',
  styles: ``,
})
export class ProductCardComponent {
  public product = input.required<Product>();
  protected store = inject(EcommerceStore);

  protected responsiveManager = inject(ResponsiveManager);

  protected isInWishlist = computed(() => this.store.wishlistItems().find((p) => p.id === this.product().id));

  public toggleWishlist(product: Product) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
