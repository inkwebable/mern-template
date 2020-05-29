import { configureStore } from '@reduxjs/toolkit';

import authSlice from '../modules/auth/dux/authReducer';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
