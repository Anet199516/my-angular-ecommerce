import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [MatButton, MatIcon, RouterLink],
  templateUrl: './order-success.component.html',
  styles: ``,
})
export default class OrderSuccessComponent {}
