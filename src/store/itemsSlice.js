import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from './supabaseClient';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const { data, error } = await supabase.from('items').select('*');
  if (error) throw error;
  return data;
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {
    addItem: (state, action) => {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addItem } = itemsSlice.actions;
export default itemsSlice.reducer;
