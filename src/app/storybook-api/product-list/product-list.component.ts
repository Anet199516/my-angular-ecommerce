import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-product-list',
  template: `
    <h2>Catalog of products</h2>
    @if (store.loading()) {
      <p>Loading...</p>
    }

    @if (store.products().length === 0 && !store.loading()) {
      <p>No products</p>
    }

    @if (store.products().length > 0) {
      <div>
        <ul>
          @for (product of store.products(); track product.id) {
            <li>
              {{ product.title }} - {{ product.price | currency }}
            </li>
          }
        </ul>
      </div>
    }
  `,
  standalone: true,
  imports: [CommonModule],
})
export class ProductListComponent implements OnInit {
  protected store = inject(EcommerceStore);

  ngOnInit() {
    this.store.loadProducts();
  }
}
