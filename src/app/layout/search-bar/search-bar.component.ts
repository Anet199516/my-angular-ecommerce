import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIcon, MatIconButton],
  templateUrl: './search-bar.component.html',
  styles: ``,
})
export class SearchBarComponent {
  protected store = inject(EcommerceStore);
  private router = inject(Router);

  protected onNavigateToSearch(event: KeyboardEvent, searchQuery: string): void {
    if (event.key !== 'Enter') return;
    const trimmedSearch = searchQuery.trim();

    this.router.navigate([`/products/${this.store.category()}`], {
      queryParams: trimmedSearch ? { search: trimmedSearch } : {},
    });
  }

  protected onClearSearch(input: HTMLInputElement): void {
    input.value = '';
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    this.onNavigateToSearch(event, '');
  }
}
