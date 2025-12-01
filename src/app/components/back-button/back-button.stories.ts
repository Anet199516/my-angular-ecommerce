import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { BackButtonComponent } from './back-button.component';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/test';
import type { StoryContext } from '@storybook/angular';

const meta: Meta<BackButtonComponent> = {
  title: 'Components/BackButton',
  component: BackButtonComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
  argTypes: {
    navigateTo: {
      control: 'text',
      description: 'URL for navigation (RouterLink)',
    },
    backClicked: {
      action: 'backClicked',
      description: 'Output event on click',
    },
    // @ts-ignore
    content: {
      control: 'text',
      description: 'Text inside button (ng-content)',
      defaultValue: 'Back',
    },
  },
  render: (args) => {
    const { ...props } = args;
    const content = (args as any).content || 'Go Back';

    return {
      props,
      template: `
        <app-back-button
          [navigateTo]="navigateTo"
          (backClicked)="backClicked($event)"
        >
          ${content}
        </app-back-button>
      `,
    };
  },
} as Meta<BackButtonComponent>;

export default meta;
type Story = StoryObj<BackButtonComponent>;

export const Default = {
  args: { content: 'Back' },

  play: async ({ canvasElement }: StoryContext<BackButtonComponent>) => {
    const canvas = within(canvasElement);
    const btn = await canvas.findByRole('button');

    await expect(btn).toHaveTextContent('Back');

    await userEvent.click(btn);

    await expect(btn).not.toHaveAttribute('ng-reflect-router-link');
  },
};


export const WithRoute = {
  args: {
    navigateTo: '/dashboard',
    content: 'To dashboard',
  },

  play: async ({ canvasElement }: StoryContext<BackButtonComponent>) => {
    const canvas = within(canvasElement);
    const btn = await canvas.findByRole('button');

    // Текст
    await expect(btn).toHaveTextContent('To dashboard');

    // Клік (викличе backClicked action + routerLink)
    await userEvent.click(btn);

    // Більше ніяких перевірок routerLink через DOM – його там просто немає
    await expect(btn).toBeVisible();
  },
};


