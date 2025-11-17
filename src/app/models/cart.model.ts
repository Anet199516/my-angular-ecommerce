import { ProductModel } from './product.model';

export type CartItem = {
  product: ProductModel;
  quantity: number;
};

export type ItemQuantityParams = {
  productId: string;
  quantity: number;
};
