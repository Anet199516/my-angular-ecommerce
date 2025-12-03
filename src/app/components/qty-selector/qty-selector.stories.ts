import { Meta, StoryObj, StoryContext } from '@storybook/angular';
import { QtySelectorComponent } from './qty-selector.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';

@Component({
  selector: 'wrapper-cmp',
  standalone: true,
  imports: [CommonModule, QtySelectorComponent],
  template: `
    <app-qty-selector
      [quantity]="qty"
      (qtyUpdated)="qty = $event"
    />
  `,
})
class WrapperComponent {
  qty = 1;
}

export default {
  title: 'Components/QtySelector',
  component: WrapperComponent,
} as Meta<WrapperComponent>;

export const Default = {
  play: async ({ canvasElement }: StoryContext<WrapperComponent>) => {
    const canvas = within(canvasElement);

    const dec = canvas.getByTestId('qty-dec');
    const inc = canvas.getByTestId('qty-inc');

    await expect(dec).toBeDisabled();

    await userEvent.click(inc);

    await expect(canvas.getByText('2')).toBeVisible();
  },
};
