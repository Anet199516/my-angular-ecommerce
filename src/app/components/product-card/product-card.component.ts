import { Component, ChangeDetectionStrategy, input, inject, computed } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProductModel } from '../../models/product.model';
import { EcommerceStore } from '../../ecommerce-store';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RouterLink } from '@angular/router';
import { ResponsiveManagerService } from '../../services/responsive-manager.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButton, MatIcon, StarRatingComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-card.component.html',
  styles: ``,
})
export class ProductCardComponent {
  public product = input.required<ProductModel>();
  protected store = inject(EcommerceStore);

  protected responsiveManager = inject(ResponsiveManagerService);

  protected isInWishlist = computed(() => this.store.wishlistItems().find((p) => p.id === this.product().id));

  public toggleWishlist(product: ProductModel): void {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
