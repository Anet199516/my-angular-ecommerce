import type { Meta, StoryObj, StoryContext } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';

import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';

import { ToggleWishlistButtonComponent } from './toggle-wishlist-button.component';
import { ProductModel } from '../../models/product.model';
import { EcommerceStore } from '../../ecommerce-store';

class MockStore {
  private wishlist: ProductModel[] = [];

  wishlistItems() {
    return this.wishlist;
  }

  addToWishlist(product: ProductModel) {
    this.wishlist.push(product);
  }

  removeFromWishlist(product: ProductModel) {
    this.wishlist = this.wishlist.filter((p) => p.id !== product.id);
  }
}

const meta: Meta<ToggleWishlistButtonComponent> = {
  title: 'Components/ToggleWishlistButton',
  component: ToggleWishlistButtonComponent,
  tags: ['autodocs'],

  decorators: [
    applicationConfig({
      providers: [
        { provide: EcommerceStore, useClass: MockStore },
      ],
    }),
  ],

  argTypes: {
    product: {
      control: 'object',
      description: 'Product object',
    },
  },
} as Meta<ToggleWishlistButtonComponent>;

export default meta;
type Story = StoryObj<ToggleWishlistButtonComponent>;

const demoProduct = {
  id: 1,
  name: 'Demo',
  description: '',
  price: 10,
  rating: 4,
  reviewCount: 50,
  imageUrl: '',
  inStock: true,
};

export const Default = {
  play: async ({ canvasElement }: StoryContext<ToggleWishlistButtonComponent>) => {
    const canvas = within(canvasElement);

    const icon = canvas.getByTestId('wishlist-icon');

    await expect(icon.textContent?.trim()).toBe('favorite_border');

    const button = icon.closest('button')!;
    await userEvent.click(button);

    await expect(icon.textContent?.trim()).toBe('favorite_border');
  },
};

export const InWishlist = {
  args: { product: demoProduct },

  decorators: [
    applicationConfig({
      providers: [
        {
          provide: EcommerceStore,
          useFactory: () => {
            const mock = new MockStore();
            mock.addToWishlist(demoProduct as any);
            return mock;
          },
        },
      ],
    }),
  ],

  play: async ({ canvasElement }: StoryContext<ToggleWishlistButtonComponent>) => {
    const canvas = within(canvasElement);

    const icon = canvas.getByText('favorite');
    await expect(icon).toBeVisible();

    const button = icon.closest('button')!;
    await userEvent.click(button);

    await expect(canvas.getByText('favorite')).toBeVisible();
  },
};
