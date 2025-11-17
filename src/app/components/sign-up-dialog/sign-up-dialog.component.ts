import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpParams } from '../../models/user.model';
import { Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-dialog',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatPrefix,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up-dialog.component.html',
  styles: ``,
})
export class SignUpDialogComponent {
  protected dialogRef = inject(MatDialogRef);
  protected dialog = inject(MatDialog);
  protected store = inject(EcommerceStore);
  router = inject(Router);

  protected data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  fb = inject(NonNullableFormBuilder);

  protected signUpForm = this.fb.group({
    name: ['John D', Validators.required],
    email: ['johnd@test.com', Validators.required],
    password: ['testing', Validators.required],
    confirmPassword: ['testing', Validators.required],
  });

  protected onSignUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signUpForm.value;

    this.store.signUp({
      name,
      email,
      password,
      dialogId: this.dialogRef.id,
      checkout: this.data?.checkout,
    } as SignUpParams);
  }

  protected onOpenSignInDialog() {
    this.dialogRef.close();
    this.dialog.open(SignInDialogComponent, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}
