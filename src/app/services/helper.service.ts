import { ProductModel } from '../models/product.model';
import { INITIAL_STATE_FOR_MOCK } from '../models/store.model';

const MOCK_PRODUCT_MAP = Object.fromEntries(
  INITIAL_STATE_FOR_MOCK.products.map((p) => [p.id, p])
);

const ELECTRONICS_IMAGES = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&w=400&q=80',
];

const CLOTHING_IMAGES = [
  'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&w=400&q=80',
];

const ACCESSORIES_IMAGES = [
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&w=400&q=80',
];

const HOME_IMAGES = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&w=400&q=80',
];

export function pickImage(category: string, index: number): string {
  switch (category) {
    case 'electronics':
      return ELECTRONICS_IMAGES[index % 3];
    case 'clothing':
      return CLOTHING_IMAGES[index % 3];
    case 'jewelery':
    case 'accessories':
      return ACCESSORIES_IMAGES[index % 3];
    case 'home':
    case 'furniture':
      return HOME_IMAGES[index % 3];
    default:
      return HOME_IMAGES[0];
  }
}

export function mapFakeStoreProduct(api: any): ProductModel {
  const id = String(api.id);
  const mock = MOCK_PRODUCT_MAP[id];

  if (!mock) {
    console.warn(`⚠ No mock found for product id=${id}. Using fallback.`);
  }

  return {
    id,
    name: mock?.name ?? api.title ?? '',
    description: mock?.description ?? api.description ?? '',
    price: mock?.price ?? api.price ?? 0,
    category: mock?.category ?? 'other',

    imageUrl: mock?.imageUrl ?? pickImage(mock?.category as string, api.id),

    reviews: mock?.reviews ?? [],
    rating: mock?.rating ?? 0,
    reviewCount: mock?.reviewCount ?? 0,

    isFavorite: mock?.isFavorite ?? false,
    inStock: mock?.inStock ?? true,
  };
}

