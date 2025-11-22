import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { StarRatingComponent } from '../../../components/star-rating/star-rating.component';
import { ProductModel } from '../../../models/product.model';

@Component({
  selector: 'app-rating-summary',
  standalone: true,
  imports: [StarRatingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rating-summary.component.html'
})
export class RatingSummaryComponent {
  public product = input.required<ProductModel>();
  protected totalReviews = computed(() => this.product().reviews.length);

  protected ratingBreakdown = computed(() => {
    const reviews = this.product().reviews;
    const total = reviews.length;

    if (total === 0) {
      return [5, 4, 3, 2, 1].map((stars) => ({
        stars,
        count: 0,
        percentage: 0,
      }));
    }

    const counts = [5, 4, 3, 2, 1].map((stars) => {
      const count = reviews.filter((review) => Math.floor(review.rating) === stars).length;
      return {
        stars,
        count,
        percentage: (count / total) * 100,
      };
    });

    return counts;
  });
}
