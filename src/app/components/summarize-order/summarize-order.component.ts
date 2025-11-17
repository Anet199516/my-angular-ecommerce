import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { ViewPanel } from '../../directives/view-panel';

@Component({
  selector: 'app-summarize-order',
  standalone: true,
  imports: [ViewPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './summarize-order.component.html',
  styles: ``,
})
export class SummarizeOrderComponent {
  protected store = inject(EcommerceStore);
}
