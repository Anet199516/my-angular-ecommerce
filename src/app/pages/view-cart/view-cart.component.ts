import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TeaseWishlistComponent } from './widgets/tease-wishlist/tease-wishlist.component';
import { ListCartItemsComponent } from './widgets/list-cart-items/list-cart-items.component';
import { SummarizeOrderComponent } from '../../components/summarize-order/summarize-order.component';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInDialogComponent } from '../../components/sign-in-dialog/sign-in-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { BackButtonComponent } from '../../components/back-button/back-button.component';

@Component({
  selector: 'app-view-cart',
  standalone: true,
  imports: [TeaseWishlistComponent, ListCartItemsComponent, SummarizeOrderComponent, BackButtonComponent, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view-cart.component.html',
  styles: ``,
})
export default class ViewCartComponent {
  store = inject(EcommerceStore);
  router = inject(Router);
  dialog = inject(MatDialog);

  proceedToCheckout() {
    if (this.store.user()) {
      this.router.navigate(['/checkout']);
    } else {
      this.dialog.open(SignInDialogComponent, {
        disableClose: true,
        data: {
          checkout: true,
        },
      });
    }
  }
}
