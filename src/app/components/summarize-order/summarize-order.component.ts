import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { ViewPanelDirective } from '../../directives/view-panel.directive';

@Component({
  selector: 'app-summarize-order',
  standalone: true,
  imports: [ViewPanelDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './summarize-order.component.html',
  styles: ``,
})
export class SummarizeOrderComponent {
  protected store = inject(EcommerceStore);
}
