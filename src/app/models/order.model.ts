import { CartItem } from './cart.model';

export type Order = {
  id: string;
  userId: string;
  total: number;
  items: CartItem[];
  paymentStatus: 'success' | 'failure';
};
