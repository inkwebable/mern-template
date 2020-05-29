import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { APISignUp } from '../../../shared/const';

// The thunk
export const registerUser = createAsyncThunk('register/registerUser', async (data, { rejectWithValue }) => {
  try {
    // @ts-ignore
    const { username, password } = data;
    const response = await axios.post(APISignUp.Index, { username, password }, { withCredentials: false });
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerUser.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = 'idle';
    });
  },
});

export const registerLoadingState = (state: any): string => state.register.loading;

export default registerSlice;
