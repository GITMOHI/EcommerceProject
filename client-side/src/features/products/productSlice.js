import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchBrands, fetchCategories, fetchNewArrivals, fetchProductById } from './productsAPI';


const initialState = {
  products:[],
  single_product:[],
  brands:[],
  categories:[],
  new_arrivals:[],
  status: 'idle',
};


export const fetchProductByIdAsync = createAsyncThunk(
  'counter/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const fetchAllProductsAsync = createAsyncThunk(
  'counter/fetchAllProducts',
  async (filter) => {
    const response = await fetchAllProducts(filter);
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'counter/fetchBrands',
  async (filter) => {
    const response = await fetchBrands(filter);
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk('product/fetchCategories',
  async()=>{
     const response = await fetchCategories();
     return response.data;
  }
)

export const fetchNewArrivalsAsync = createAsyncThunk('product/fetchNewArrivals',
  async()=>{
     const response = await fetchNewArrivals();
     return response.data;
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'idle'
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = 'idle'
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = 'idle'
      })
      .addCase(fetchNewArrivalsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewArrivalsAsync.fulfilled, (state, action) => {
        state.new_arrivals = action.payload;
        state.status = 'idle'
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.single_product = action.payload;
        state.status = 'idle'
      });
  },
});

export const selectSingleProduct = (state) => state.products.single_product;
export const selectAllProducts = (state) => state.products.products;
export const selectBrands = (state) => state.products.brands;
export const selectCategories = (state) => state.products.categories;
export const selectNewArrivals = (state) => state.products.new_arrivals;

export default productSlice.reducer;
