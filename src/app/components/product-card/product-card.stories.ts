import type { Meta, StoryObj, StoryContext } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';

import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ProductCardComponent } from './product-card.component';
import { ProductModel } from '../../models/product.model';
import { StarRatingComponent } from '../star-rating/star-rating.component';

import { EcommerceStore } from '../../ecommerce-store';
import { ResponsiveManagerService } from '../../services/responsive-manager.service';

import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';

class MockStore {
  public cart: ProductModel[] = [];
  public wishlistItems = () => [];

  addToCart(product: ProductModel) {
    this.cart.push(product);
  }
}

class MockResponsive {
  largeWidth() {
    return false;
  }
}

const meta: Meta<ProductCardComponent> = {
  title: 'Components/ProductCard',
  component: ProductCardComponent,
  tags: ['autodocs'],

  decorators: [
    applicationConfig({
      providers: [
        provideRouter([]),
        { provide: EcommerceStore, useClass: MockStore },
        { provide: ResponsiveManagerService, useClass: MockResponsive },
      ],
    }),

    moduleMetadata({
      imports: [NoopAnimationsModule, StarRatingComponent],
    }),
  ],

  argTypes: {
    product: {
      control: 'object',
      description: 'Product data model',
    },
  },
} as Meta<ProductCardComponent>;

export default meta;

type Story = StoryObj<ProductCardComponent>;

const demoProduct = {
  id: 1,
  name: 'Demo Product',
  description: 'Short product description goes here.',
  price: 129.99,
  rating: 4.5,
  reviewCount: 87,
  imageUrl: 'https://picsum.photos/600/400',
  inStock: true,
};

export const Default = {
  args: {
    product: demoProduct,
  },

  play: async ({ canvasElement }: StoryContext<ProductCardComponent>) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Demo Product')).toBeVisible();

    await expect(
      canvas.getByText('Short product description goes here.')
    ).toBeVisible();

    const cartButton = canvas.getByRole('button', { name: /add to cart/i });
    await expect(cartButton).toBeEnabled();

    await userEvent.click(cartButton);

    await expect(cartButton).toBeVisible();
  },
};

export const OutOfStock = {
  args: {
    product: { ...demoProduct, inStock: false },
  },

  play: async ({ canvasElement }: StoryContext<ProductCardComponent>) => {
    const canvas = within(canvasElement);

    const cartButton = canvas.getByRole('button', { name: /add to cart/i });
    await expect(cartButton).toBeDisabled();

    await expect(canvas.getByText('Out of Stock')).toBeVisible();
  },
};
