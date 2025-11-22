import { Component, inject, signal } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../../ecommerce-store';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [MatNavList, MatListItem, RouterLink, TitleCasePipe],
  templateUrl: './category-menu.component.html',
  styles: ``,
})
export class CategoryMenuComponent {
  protected store = inject(EcommerceStore);
  protected categories = signal<string[]>(['all', 'electronics', 'clothing', 'accessories', 'home']);
}
