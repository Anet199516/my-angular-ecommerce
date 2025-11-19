import { Component, ChangeDetectionStrategy, signal, inject, computed, input } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';

import { TitleCasePipe } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { EcommerceStore } from '../../ecommerce-store';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { ResponsiveManager } from '../../services/responsive-manager';
import { ToggleWishlistButtonComponent } from '../../components/toggle-wishlist-button/toggle-wishlist-button.component';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    TitleCasePipe,
    ProductCardComponent,
    CategoryMenuComponent,
    ToggleWishlistButtonComponent,
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './products-grid.component.html',
  styles: ``,
})
export default class ProductsGridComponent {
  categoryName = input<string | undefined>('all');
  search = input<string | undefined>('');
  store = inject(EcommerceStore);
  responsiveManager = inject(ResponsiveManager);

  productsQueryParams = computed(() => ({
    category: this.categoryName() ?? 'all',
    searchTerm: this.search() ?? '',
  }));

  constructor() {
    this.store.setParams(this.productsQueryParams);
  }
}
