import type { Meta, StoryObj, StoryContext } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { StarRatingComponent } from './star-rating.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/test';

const meta: Meta<StarRatingComponent> = {
  title: 'Components/StarRating',
  component: StarRatingComponent,
  tags: ['autodocs'],

  decorators: [
    moduleMetadata({
      imports: [NoopAnimationsModule],
    }),
  ],

  argTypes: {
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Number of filled stars (0–5)',
    },
    content: {
      control: 'text',
      description: 'Text inside <ng-content>',
      defaultValue: '(87)',
    },
  },

  render: (args) => {
    const content = (args as any).content ?? '(87)';

    return {
      props: args,
      template: `
        <app-star-rating [rating]="rating">
          ${content}
        </app-star-rating>
      `,
    };
  },
} as Meta<StarRatingComponent>;

export default meta;
type Story = StoryObj<StarRatingComponent>;


export const Default = {
  args: {
    rating: 4,
    content: '(87)',
  },

  play: async ({ canvasElement }: StoryContext<StarRatingComponent>) => {
    const canvas = within(canvasElement);

    const stars = canvas.getAllByText('star');

    await expect(stars.length).toBe(5);

    const filled = stars.filter((el) =>
      el.classList.contains('!text-yellow-400')
    );
    const empty = stars.filter((el) =>
      el.classList.contains('!text-gray-300')
    );

    await expect(filled.length).toBe(4);
    await expect(empty.length).toBe(1);

    // ng-content
    await expect(canvas.getByText('(87)')).toBeVisible();
  },
};

export const ZeroStars = {
  args: {
    rating: 0,
    content: '(0)',
  },

  play: async ({ canvasElement }: StoryContext<StarRatingComponent>) => {
    const canvas = within(canvasElement);

    const stars = canvas.getAllByText('star');

    const filled = stars.filter((el) =>
      el.classList.contains('!text-yellow-400')
    );

    await expect(filled.length).toBe(0);
    await expect(canvas.getByText('(0)')).toBeVisible();
  },
};

export const FullStars = {
  args: {
    rating: 5,
    content: '(999)',
  },

  play: async ({ canvasElement }: StoryContext<StarRatingComponent>) => {
    const canvas = within(canvasElement);

    const stars = canvas.getAllByText('star');
    const filled = stars.filter((el) =>
      el.classList.contains('!text-yellow-400')
    );

    await expect(filled.length).toBe(5);
  },
};
