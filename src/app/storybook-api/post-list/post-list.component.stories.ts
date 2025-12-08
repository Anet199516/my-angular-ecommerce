import type { Meta, StoryObj } from '@storybook/angular';
import { PostListComponent } from './post-list.component';
import { applicationConfig } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { http, HttpResponse } from 'msw';

const meta: Meta<PostListComponent> = {
  component: PostListComponent,
  title: 'Post List Component',
  decorators: [
    applicationConfig({
      providers: [HttpClientModule],
    }),
  ],
} as Meta<PostListComponent>;

export default meta;
type Story = StoryObj<PostListComponent>;

export const DefaultMockedState: Story = { };

export const CustomEmptyState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('jsonplaceholder.typicode.com', () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
} as Story;
