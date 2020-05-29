import { configureStore } from '@reduxjs/toolkit';

import authSlice from '../modules/auth/dux/authReducer';
import registerSlice from '../modules/registerForm/dux/registerReducer';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    register: registerSlice.reducer,
  },
});
