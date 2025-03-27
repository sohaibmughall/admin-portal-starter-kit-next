import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/lib/types/order';

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items.push(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addOrder,
  updateOrder,
  deleteOrder,
  setOrders,
  setLoading,
  setError,
} = ordersSlice.actions;

export default ordersSlice.reducer;