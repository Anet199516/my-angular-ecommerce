import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private _snackBar = inject(MatSnackBar);

  public success(message: string) {
    this._snackBar.open(message, undefined, { panelClass: ['toast-success'] });
  }

  public error(message: string) {
    this._snackBar.open(message, undefined, { panelClass: ['toast-error'] });
  }
}
