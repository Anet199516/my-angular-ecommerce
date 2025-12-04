import { Component, ChangeDetectionStrategy, inject, computed, input } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';

import { TitleCasePipe } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { EcommerceStore } from '../../ecommerce-store';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { ResponsiveManagerService } from '../../services/responsive-manager.service';
import { ToggleWishlistButtonComponent } from '../../components/toggle-wishlist-button/toggle-wishlist-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './products-grid.component.html',
  styles: ``,
})
export default class ProductsGridComponent {
  public categoryName = input<string | undefined>('all');
  public search = input<string | undefined>('');
  protected store = inject(EcommerceStore);
  protected responsiveManager = inject(ResponsiveManagerService);

  private readonly productsQueryParams = computed(() => ({
    category: this.categoryName() ?? 'all',
    searchTerm: this.search() ?? '',
  }));

  constructor() {
    this.store.setParams(this.productsQueryParams);
  }
}
