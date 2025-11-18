import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ViewPanelDirective } from '../../../directives/view-panel.directive';

@Component({
  selector: 'app-shipping-form',
  standalone: true,
  imports: [MatIcon, MatFormField, MatInput, ViewPanelDirective],
  templateUrl: './shipping-form.component.html',
  styles: ``,
})
export class ShippingFormComponent {}
