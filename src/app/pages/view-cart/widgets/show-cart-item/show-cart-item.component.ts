import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { EcommerceStore } from '../../../../ecommerce-store';
import { QtySelectorComponent } from '../../../../components/qty-selector/qty-selector.component';
import { CartItem } from '../../../../models/cart.model';

@Component({
  selector: 'app-show-cart-item',
  standalone: true,
  imports: [MatIcon, MatIconButton, QtySelectorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './show-cart-item.component.html',
  styles: ``,
})
export class ShowCartItemComponent {
  protected store = inject(EcommerceStore);
  item = input.required<CartItem>();
}
