import { Component, inject, model, signal } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { OptionItemModel } from '../../../models/option-item.model';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddReviewParams } from '../../../models/user-review.model';
import { EcommerceStore } from '../../../ecommerce-store';
import { ViewPanelDirective } from '../../../directives/view-panel.directive';

@Component({
  selector: 'app-write-review',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    ReactiveFormsModule,
    ViewPanelDirective,
  ],
  templateUrl: './write-review.component.html',
  styles: ``,
  host: {
    class: 'block',
  },
})
export class WriteReviewComponent {
  public showWriteReview = model<boolean>(false);
  protected store = inject(EcommerceStore);
  private fb = inject(NonNullableFormBuilder);

  protected ratingOptions = signal<OptionItemModel[]>([
    { label: '5 Stars - Excellent', value: 5 },
    { label: '4 Stars - Good', value: 4 },
    { label: '3 Stars - Average', value: 3 },
    { label: '2 Stars - Poor', value: 2 },
    { label: '1 Star - Terrible', value: 1 },
  ]);
  protected reviewForm = this.fb.group({
    title: ['', Validators.required],
    comment: ['', Validators.required],
    rating: [5, Validators.required],
  });

  protected onSaveReviewClick(): void {
    if (!this.reviewForm.valid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const { title, comment, rating } = this.reviewForm.value;
    this.store.addReview({ title, comment, rating } as AddReviewParams);
    this.showWriteReview.set(false);
  }
}
