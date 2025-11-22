import { Component, input } from '@angular/core';
import { UserReviewModel } from '../../../models/user-review.model';
import { StarRatingComponent } from '../../../components/star-rating/star-rating.component';
import { DatePipe } from '@angular/common';
import { ViewPanelDirective } from '../../../directives/view-panel.directive';

@Component({
  selector: 'app-view-review-item',
  standalone: true,
  imports: [StarRatingComponent, DatePipe, ViewPanelDirective],
  templateUrl: './view-review-item.component.html',
  styles: ``,
})
export class ViewReviewItemComponent {
  public review = input.required<UserReviewModel>();
}
