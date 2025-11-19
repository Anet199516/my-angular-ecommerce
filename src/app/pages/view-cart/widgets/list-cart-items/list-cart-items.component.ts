import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ShowCartItemComponent } from '../show-cart-item/show-cart-item.component';
import { CommonModule } from '@angular/common';
import { EcommerceStore } from '../../../../ecommerce-store';
import { ViewPanelDirective } from '../../../../directives/view-panel.directive';

@Component({
  selector: 'app-list-cart-items',
  standalone: true,
  imports: [CommonModule, ShowCartItemComponent, ViewPanelDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-cart-items.component.html',
  styles: ``,
})
export class ListCartItemsComponent {
  protected store = inject(EcommerceStore);
}
