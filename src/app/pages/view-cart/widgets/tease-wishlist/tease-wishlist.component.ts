import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../../../ecommerce-store';
import { ViewPanelDirective } from '../../../../directives/view-panel.directive';
@Component({
  selector: 'app-tease-wishlist',
  standalone: true,
  imports: [MatButton, MatIcon, RouterLink, ViewPanelDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tease-wishlist.component.html',
  styles: ``,
  host: {
    class: 'block',
  },
})
export class TeaseWishlistComponent {
  protected store = inject(EcommerceStore);
}
