import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { EcommerceStore } from '../../ecommerce-store';
import { ResponsiveManager } from '../../services/responsive-manager';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { HeaderActionsComponent } from '../header-actions/header-actions.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: 'header.component.html',
  imports: [MatToolbar, MatIcon, MatIconButton, SearchBarComponent, HeaderActionsComponent],
  host: {
    class: 'relative z-10 view-transition-name:header',
  },
})
export class HeaderComponent {
  protected store = inject(EcommerceStore);
  protected responsiveManager = inject(ResponsiveManager);
}
