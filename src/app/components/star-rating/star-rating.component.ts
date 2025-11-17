import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './star-rating.component.html',
})
export class StarRatingComponent {
  public rating = input.required<number>();

  protected starArray = computed(() => {
    const fullStars = Math.floor(this.rating());
    return Array(5)
      .fill(false)
      .map((_, index) => index < fullStars);
  });
}
