import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stock-status',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './stock-status.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class StockStatusComponent {
  public inStock = input.required<boolean>();
}
