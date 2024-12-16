import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBestSellings } from './bestSellingAPI';


const initialState = {
  best_sellings:[],
  status: 'idle',
};


export const fetchBestSellingsAsync = createAsyncThunk(
  'counter/fetchBestSellings',
  async () => {
    const response = await fetchBestSellings();
    return response.data;
  }
);

export const bestSellingSlice = createSlice({
  name: 'bestSelling',
  initialState,
  reducers: {
  
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBestSellingsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBestSellingsAsync.fulfilled, (state, action) => {
        state.best_sellings = action.payload;
        state.status = 'idle'
      });
  },
});

export const selectBestSellings = (state) => state.bestSelling.best_sellings;

export default bestSellingSlice.reducer;
