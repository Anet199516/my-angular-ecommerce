import type { Meta, StoryObj } from '@storybook/angular';
import { ProductListComponent } from './product-list.component';
import { applicationConfig } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { EcommerceStore } from '../../ecommerce-store';

const meta: Meta<ProductListComponent> = {
  component: ProductListComponent,
  title: 'Product List Component (with Store/MSW)',
  decorators: [
    applicationConfig({
      providers: [
        HttpClientModule,
        ProductsService,
        EcommerceStore
      ],
    }),
  ],
} as Meta<ProductListComponent>;

export default meta;
type Story = StoryObj<ProductListComponent>;

// Story will start automatically, cal ngOnInit,
// call ProductsService and MSW return fake data.
export const DefaultState: Story = {};
