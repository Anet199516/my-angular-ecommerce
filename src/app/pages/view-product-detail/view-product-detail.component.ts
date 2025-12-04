import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewReviewsComponent } from './view-reviews/view-reviews.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { ProductModel } from '../../models/product.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-view-product-detail',
  standalone: true,
  imports: [ViewReviewsComponent, ProductInfoComponent, BackButtonComponent, MatProgressSpinnerModule],
  templateUrl: './view-product-detail.component.html',
  styles: ``,
})
export default class ViewProductDetailComponent implements OnInit {
  public productId = input.required<string>();
  protected store = inject(EcommerceStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  protected product = signal<ProductModel>({} as ProductModel);
  protected loading = signal<boolean>(false);

  ngOnInit(): void {
    this.store.setProductId(this.productId);
    this.loading.set(true);

    this.route.data
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        delay(1000),
      )
      .subscribe(data => {
        this.product.set(data['product']);
        this.loading.set(false);
    })
  }

  protected goBack() {
    this.router.navigate([`/products`, this.store.category()], {
      queryParams: this.store.searchTerm() ? { search: this.store.searchTerm() } : {},
    });
  }
}
