import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { APILogin } from '../../../shared/const';

// The thunk
export const logUserIn = createAsyncThunk('auth/logUserIn', async (data, { rejectWithValue }) => {
  try {
    // @ts-ignore
    const { username, password } = data;
    const response = await axios.post(APILogin.Index, { username, password }, { withCredentials: true });
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(logUserIn.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(logUserIn.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
    });
    builder.addCase(logUserIn.rejected, (state, action) => {
      state.loading = 'idle';
    });
  },
});

export const authLoadingState = (state: any): string => state.auth.loading;

export default authSlice;
