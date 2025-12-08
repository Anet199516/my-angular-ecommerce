import { Component, inject, signal, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductInfoComponent } from '../../pages/view-product-detail/product-info/product-info.component';
import { ViewReviewsComponent } from '../../pages/view-product-detail/view-reviews/view-reviews.component';

@Component({
  selector: 'app-mock-product-test',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ProductInfoComponent, ViewReviewsComponent],
  template: `
    <div class="mx-auto max-w-[1200px] py-6">
      <button class="mb-6" (backClicked)="goBack()">Back to Products</button>

      @if (loading()) {
        <div class="progressive-spinner progressive-details-spinner">
          <mat-spinner></mat-spinner>
        </div>
      } @else if (product()) {
        <div class="flex gap-8 mb-8">
          <img
            [src]="product().imageUrl"
            [alt]="product().name"
            class="w-[500px] h-[550px] object-cover rounded-lg"
            [style.view-transition-name]="'product-image-' + product().id"
          />
          <div class="flex-1">
            <app-product-info [product]="product()" />
          </div>
        </div>
        <app-view-reviews [product]="product()" />
      } @else {
        <div>Something went wrong...=(</div>
      }
    </div>

  `
})
export default class MockProductTestComponent implements OnInit {
  private service = inject(ProductsService);

  product = signal<any>(null);
  loading = signal(true);

  ngOnInit() {
    this.service.getProductById('1')
      .subscribe({
        next: data => {
          this.product.set(data);
          this.loading.set(false);
        },
        error: error => {
          this.product.set(null);
          this.loading.set(false)
        },
      });
  }

  protected goBack() {}
}
