import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRadioGroup } from '@angular/material/radio';
import { MatRadioButton } from '@angular/material/radio';
import { ViewPanelDirective } from '../../../directives/view-panel.directive';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [MatIcon, MatRadioGroup, MatRadioButton, ViewPanelDirective],
  templateUrl: './payment-form.component.html',
  styles: ``,
})
export class PaymentFormComponent {}
