import { Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-qty-selector',
  standalone: true,
  imports: [MatIcon, MatIconButton],
  templateUrl: './qty-selector.component.html',
  styles: ``,
})
export class QtySelectorComponent {
  public quantity = input<number>(0);
  public qtyUpdated = output<number>();
}
