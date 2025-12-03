import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withComputed,
  signalMethod,
} from '@ngrx/signals';
import { FilterParams, ProductModel } from './models/product.model';
import { CartItem, ItemQuantityParams } from './models/cart.model';
import { produce } from 'immer';
import { pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ToasterService } from './services/toaster.service';
import { SignInParams, SignUpParams, UserModel } from './models/user.model';
import { Order } from './models/order.model';
import { Router } from '@angular/router';
import { AddReviewParams, UserReviewModel } from './models/user-review.model';
import { ResponsiveManagerService } from './services/responsive-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { INITIAL_STATE } from './models/store.model';

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(INITIAL_STATE),
  withMethods(
    (store, toaster = inject(ToasterService), router = inject(Router), matDialog = inject(MatDialog)) => ({
      setParams: rxMethod<FilterParams>(
        pipe(
          tap((params) => {
            const { category, searchTerm } = params;
            patchState(store, { category, searchTerm });
          }),
        ),
      ),
      addToWishlist(product: ProductModel): void {
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { wishlistItems: updatedWishlistItems });
        toaster.success('Product added to wishlist');
      },
      removeFromWishlist(product: ProductModel): void {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
        });
        toaster.success('Product removed from wishlist');
      },
      addToCart(product: ProductModel, quantity = 1): void {
        const existingItemIndex = store
          .cartItems()
          .findIndex((item) => item.product.id === product.id);
        if (existingItemIndex !== -1) {
          const updatedCartItems = produce(store.cartItems(), (draft) => {
            draft[existingItemIndex].quantity += quantity;
          });
          patchState(store, { cartItems: updatedCartItems });
          toaster.success('Product added again!');
          return;
        }

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          draft.push({ product, quantity });
        });

        patchState(store, { cartItems: updatedCartItems });
        toaster.success('Product added to cart');
      },
      setItemQuantity(params: ItemQuantityParams): void {
        const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });

        patchState(store, { cartItems: updated });
      },
      removeFromCart(product: ProductModel): void {
        patchState(store, {
          cartItems: store.cartItems().filter((p) => p.product.id !== product.id),
        });
      },
      moveToWishlist(product: ProductModel): void {
        const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });

        patchState(store, {
          cartItems: updatedCartItems,
          wishlistItems: updatedWishlistItems,
        });
      },
      addAllWishlistToCart(): void {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((p) => {
            if (!draft.find((c) => c.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
          });
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
      },
      moveToCart(product: ProductModel): void {
        const updatedWishlistItems = store.wishlistItems().filter((p) => p.id !== product.id);
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (!draft.find((c) => c.product.id === product.id)) {
            draft.push({ product, quantity: 1 });
          }
        });
        patchState(store, { wishlistItems: updatedWishlistItems, cartItems: updatedCartItems });
      },
      clearWishlist(): void {
        patchState(store, { wishlistItems: [] });
      },
      signIn({ email, password, dialogId, checkout }: SignInParams) {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },
      signUp({ name, email, password, checkout, dialogId }: SignUpParams) {
        patchState(store, {
          user: {
            id: crypto.randomUUID(),
            email,
            name,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },
      async placeOrder() {
        patchState(store, { loading: true });

        const user = store.user();
        if (!user) {
          toaster.error('Please sign in to place an order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: store
            .cartItems()
            .reduce((acc, item) => acc + item.quantity * item.product.price, 0),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));
        patchState(store, { orders: [...store.orders(), order], loading: false, cartItems: [] });
        router.navigate(['/order-success']);
      },
      signOut(): void {
        patchState(store, { user: undefined });
      },
      setProductId: signalMethod<string>((productId) => {
        patchState(store, { selectedProductId: productId });
      }),
      addReview({ title, comment, rating }: AddReviewParams): void {
        const product = store.products().find((p) => p.id === store.selectedProductId());
        if (!product) return;

        const review: UserReviewModel = {
          id: crypto.randomUUID(),
          title,
          comment,
          rating,
          productId: product.id,
          userName: store.user()?.name || '',
          userImageUrl: store.user()?.imageUrl || '',
          reviewDate: new Date(),
        };

        const updatedProducts = produce(store.products(), (draft) => {
          const index = draft.findIndex((p) => p.id === product.id);
          draft[index].reviews.push(review);
          draft[index].rating =
            Math.round(
              (draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) /
                draft[index].reviews.length) *
                10,
            ) / 10;
          draft[index].reviewCount = draft[index].reviews.length;
        });
        patchState(store, { products: updatedProducts });
      },
    }),
  ),
  withComputed((store, responsiveManager = inject(ResponsiveManagerService)) => ({
    filteredProducts: computed(() => {
      const products = store.products();
      const category = store.category();
      const searchTerm = store.searchTerm();

      let filteredProducts = [...products];

      if (category === 'all') {
        filteredProducts = products;
      } else {
        filteredProducts = products.filter(
          (product) => product.category === category.toLowerCase(),
        );
      }

      if (searchTerm) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      return filteredProducts;
    }),

    itemCount: computed(() => store.cartItems().reduce((acc, item) => acc + item.quantity, 0)),
    wishlistCount: computed(() => store.wishlistItems().length),
    total: computed(() =>
      store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0),
    ),
    selectedProduct: computed(() => {
      return store.products().find((p) => p.id === store.selectedProductId());
    }),
  })),
);
