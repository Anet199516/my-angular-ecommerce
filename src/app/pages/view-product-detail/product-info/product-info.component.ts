import { Component, inject, input, signal } from '@angular/core';
import { StarRatingComponent } from '../../../components/star-rating/star-rating.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { QtySelectorComponent } from '../../../components/qty-selector/qty-selector.component';
import { TitleCasePipe } from '@angular/common';
import { ProductModel } from '../../../models/product.model';
import { EcommerceStore } from '../../../ecommerce-store';
import { StockStatusComponent } from '../stock-status/stock-status.component';
import { ToggleWishlistButtonComponent } from '../../../components/toggle-wishlist-button/toggle-wishlist-button.component';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [
    StarRatingComponent,
    QtySelectorComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    TitleCasePipe,
    StockStatusComponent,
    ToggleWishlistButtonComponent,
  ],
  templateUrl: './product-info.component.html',
  styles: ``,
})
export class ProductInfoComponent {
  public product = input.required<ProductModel>();
  protected store = inject(EcommerceStore);
  protected quantity = signal(1);
}
