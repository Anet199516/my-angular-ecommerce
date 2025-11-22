import { Component, inject, input, signal } from '@angular/core';
import { ViewReviewItemComponent } from '../view-review-item/view-review-item.component';
import { RatingSummaryComponent } from '../rating-summary/rating-summary.component';
import { ProductModel } from '../../../models/product.model';
import { WriteReviewComponent } from '../write-review/write-review.component';
import { MatButton } from '@angular/material/button';
import { EcommerceStore } from '../../../ecommerce-store';
import { ViewPanelDirective } from '../../../directives/view-panel.directive';

@Component({
  selector: 'app-view-reviews',
  standalone: true,
  imports: [ViewReviewItemComponent, RatingSummaryComponent, WriteReviewComponent, MatButton, ViewPanelDirective],
  templateUrl: './view-reviews.component.html',
  styles: ``,
})
export class ViewReviewsComponent {
  public product = input.required<ProductModel>();
  protected store = inject(EcommerceStore);
  protected showWriteReview = signal(false);
}
