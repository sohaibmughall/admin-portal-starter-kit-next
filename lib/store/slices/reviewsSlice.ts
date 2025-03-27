import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '@/lib/types/review';

interface ReviewsState {
  items: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  items: [],
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.items.push(action.payload);
    },
    updateReview: (state, action: PayloadAction<Review>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteReview: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
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
  addReview,
  updateReview,
  deleteReview,
  setReviews,
  setLoading,
  setError,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
