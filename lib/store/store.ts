import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import customersReducer from './slices/customersSlice';
import categoriesReducer from './slices/categoriesSlice';
import reviewsReducer from './slices/reviewsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['items'],
};

const persistedProductsReducer = persistReducer(persistConfig, productsReducer);
const persistedOrdersReducer = persistReducer(persistConfig, ordersReducer);
const persistedCustomersReducer = persistReducer(persistConfig, customersReducer);
const persistedCategoriesReducer = persistReducer(persistConfig, categoriesReducer);
const persistedReviewsReducer = persistReducer(persistConfig, reviewsReducer);

export const store = configureStore({
  reducer: {
    products: persistedProductsReducer,
    orders: persistedOrdersReducer,
    customers: persistedCustomersReducer,
    categories: persistedCategoriesReducer,
    reviews: persistedReviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;