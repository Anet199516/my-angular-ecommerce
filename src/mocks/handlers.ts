import { http, HttpResponse } from 'msw';
import { delay } from 'rxjs/operators';

const mockProductDetail = {
  id: '1',
  name: 'Mocked Product Detail Name',
  price: 50.00,
  description: 'A detailed description of the mocked product provided by MSW.',
  category: 'electronics',
  imageUrl: 'via.placeholder.com',
  rating: 4.5, // ProductModel field
  reviewCount: 120 // ProductModel field
};

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com', () => {
    console.log('MSW: Intercepted GET /posts request');

    return HttpResponse.json([
      { userId: 1, id: 1, title: 'Mocked Post 1 (from handlers.ts)', body: 'First post, generated MSW.' },
      { userId: 1, id: 2, title: 'Mocked Post 2 (from handlers.ts)', body: 'Second post, generated MSW.' },
    ]);
  }),

  http.get('https://fakestoreapi.com/products', () => {
    console.log('MSW: Intercepted GET fakestoreapi.com');

    return HttpResponse.json([
      { id: 1, title: 'Mocked Product 1', price: 10.99 },
    ]);
  }),

  http.get('https://fakestoreapi.com/products/:id', async ({ params }) => {
    console.log('MSW intercepted fakestoreapi.com/products/:id');
    debugger

    const id = params['id'];

    return HttpResponse.json({
      id,
      title: 'MSW Product',
      price: 50,
      description: 'Mocked MSW product',
      category: 'electronics',
      image: 'via.placeholder.com',
      rating: { rate: 4.5, count: 100 }
    });
  }),
];
