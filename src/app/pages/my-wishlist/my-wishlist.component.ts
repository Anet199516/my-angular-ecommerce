import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EmptyWishlistComponent } from './empty-wishlist/empty-wishlist.component';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { BackButtonComponent } from '../../components/back-button/back-button.component';

@Component({
  selector: 'app-my-wishlist',
  standalone: true,
  imports: [EmptyWishlistComponent, BackButtonComponent, MatButton, ProductCardComponent, MatIcon, MatIconButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-wishlist.component.html'
})
export default class MyWishlistComponent {
  protected store = inject(EcommerceStore);
}
