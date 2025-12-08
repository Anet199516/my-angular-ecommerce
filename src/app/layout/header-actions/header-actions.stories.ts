import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { HeaderActionsComponent } from './header-actions.component';
import { MatDialogModule } from '@angular/material/dialog';

import { provideRouter } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';

class MockStoreSignedOut {
  wishlistCount = () => 0;
  itemCount = () => 0;
  user = () => null;
  signOut = () => console.log('signOut clicked');
}

class MockStoreSignedIn {
  wishlistCount = () => 3;
  itemCount = () => 2;

  user = () => ({
    name: 'John Doe',
    email: 'john@example.com',
    imageUrl: 'https://i.pravatar.cc/100?img=3',
  });

  signOut = () => console.log('signOut clicked');
}

const meta: Meta<HeaderActionsComponent> = {
  title: 'Components/HeaderActions',
  component: HeaderActionsComponent,

  decorators: [
    applicationConfig({
      providers: [provideRouter([]), MatDialogModule],
    }),
  ],
} as Meta<HeaderActionsComponent>;
export default meta;

type Story = StoryObj<HeaderActionsComponent>;

export const SignedOut: Story = {
  decorators: [
    applicationConfig({
      providers: [
        { provide: EcommerceStore, useClass: MockStoreSignedOut },
      ],
    }),
  ],
} as Story;

export const SignedIn: Story = {
  decorators: [
    applicationConfig({
      providers: [
        { provide: EcommerceStore, useClass: MockStoreSignedIn },
      ],
    }),
  ],
} as Story;


