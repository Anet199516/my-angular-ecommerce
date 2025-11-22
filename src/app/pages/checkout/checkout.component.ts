import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { SummarizeOrderComponent } from '../../components/summarize-order/summarize-order.component';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButtonComponent } from '../../components/back-button/back-button.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ShippingFormComponent, PaymentFormComponent, SummarizeOrderComponent, BackButtonComponent, MatButton],
  templateUrl: './checkout.component.html',
  styles: ``,
})
export default class CheckoutComponent {
  protected store = inject(EcommerceStore);
}
