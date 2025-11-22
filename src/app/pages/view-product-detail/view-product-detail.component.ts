import { Component, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { Router } from '@angular/router';
import { ViewReviewsComponent } from './view-reviews/view-reviews.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { BackButtonComponent } from '../../components/back-button/back-button.component';

@Component({
  selector: 'app-view-product-detail',
  standalone: true,
  imports: [ViewReviewsComponent, ProductInfoComponent, BackButtonComponent],
  templateUrl: './view-product-detail.component.html',
  styles: ``,
})
export default class ViewProductDetailComponent {
  public productId = input.required<string>();
  protected store = inject(EcommerceStore);
  private router = inject(Router);

  constructor() {
    this.store.setProductId(this.productId);
  }

  protected goBack() {
    this.router.navigate([`/products`, this.store.category()], {
      queryParams: this.store.searchTerm() ? { search: this.store.searchTerm() } : {},
    });
  }
}
