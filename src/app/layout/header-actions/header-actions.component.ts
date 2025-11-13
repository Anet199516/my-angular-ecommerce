import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-actions',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatBadge,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDivider,
    RouterLink,
  ],
  templateUrl: './header-actions.component.html',
  styles: ``,
})
export class HeaderActionsComponent {
  private dialog = inject(MatDialog);
  protected store = inject(EcommerceStore);

  protected onOpenSignInDialog() {
    this.dialog.open(SignInDialog, {
      disableClose: true,
    });
  }

  protected onOpenSignUpDialog() {
    this.dialog.open(SignUpDialog, {
      disableClose: true,
    });
  }
}
