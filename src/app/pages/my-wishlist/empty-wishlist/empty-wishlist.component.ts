import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-wishlist',
  standalone: true,
  imports: [MatButton, MatIcon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './empty-wishlist.component.html',
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
})
export class EmptyWishlistComponent {}
