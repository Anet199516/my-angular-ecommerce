import { Component, inject, signal } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIconButton } from '@angular/material/button';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { EcommerceStore } from '../../ecommerce-store';
import { Router } from '@angular/router';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInParams } from '../../models/user';

@Component({
  selector: 'app-sign-in-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    MatPrefix,
    MatIconButton,
    MatSuffix,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in-dialog.component.html',
  styles: ``,
})
export class SignInDialogComponent {
  protected passwordVisible = signal(false);
  private store = inject(EcommerceStore);
  private dialogRef = inject(MatDialogRef);
  private dialog = inject(MatDialog);
  private data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  router = inject(Router);
  protected fb = inject(NonNullableFormBuilder);

  protected signInForm = this.fb.group({
    email: ['johnd@test.com', Validators.required],
    password: ['test123', Validators.required],
  });

  protected onSignIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;

    this.store.signIn({
      email,
      password,
      dialogId: this.dialogRef.id,
      checkout: this.data?.checkout,
    } as SignInParams);
  }

  protected onOpenSignUpDialog() {
    this.dialogRef.close();
    this.dialog.open(SignUpDialogComponent, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}
