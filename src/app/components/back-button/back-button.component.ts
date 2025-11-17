import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [MatButton, MatIcon, RouterLink],
  templateUrl: './back-button.component.html',
  host: {
    class: 'block',
  },
  styles: ``,
})
export class BackButtonComponent {
  public navigateTo = input<string>();
  public backClicked = output<void>();
}
