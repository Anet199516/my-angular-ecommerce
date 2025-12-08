import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { EcommerceStore } from '../../ecommerce-store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { TransferState } from '@angular/core';
import { http, HttpResponse } from 'msw';
import MockProductTestComponent from './mock-product-detail.component';

const meta: Meta<MockProductTestComponent> = {
  component: MockProductTestComponent,
  title: 'Product Detail Page (with MSW)',
  decorators: [
    applicationConfig({
      providers: [
        HttpClientModule,
        ProductsService,
        EcommerceStore,
        TransferState,
        provideRouter([
          {
            path: 'product/:productId',
            component: MockProductTestComponent,
            resolve: {
              product: () => of(null)
            }
          },
        ]),
      ],
    }),
    moduleMetadata({
      imports: [MatProgressSpinnerModule],
    }),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get('https://fakestoreapi.com/products/:id', ({ params }) => {
          console.log("MSW HIT for id:", params['id']);

          return HttpResponse.json({
            id: params['id'],
            title: 'MSW Product',
            price: 123,
          });
        })
      ]
    }
  }
} as Meta<MockProductTestComponent>;

export default meta;
type Story = StoryObj<MockProductTestComponent>;

export const SUCCESS_DETAILS_VIEW: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => '1' }),
            data: of({ product: null }),
            snapshot: {
              paramMap: { get: (key: string) => ('1') },
              data: { product: null }
            }
          }
        },
      ],
    }),
  ],
  args: {
    productId: '1'
  },
  play: async ({ canvasElement, args }) => { }
} as Story;

export const ERROR_DETAILS_VIEW: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://fakestoreapi.com/products/:id', () => {
          console.error('MSW ERROR HIT!');

          return HttpResponse.error();
        })
      ]
    }
  }
} as Story;

