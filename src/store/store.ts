import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { commercetoolsApi } from '@/api/services/commercetoolsApi';
import filtersReducer from '@/store/slices/filtersSlice';
import userReducer from '@/store/slices/userSlice';

export const store = configureStore({
  reducer: {
    [commercetoolsApi.reducerPath]: commercetoolsApi.reducer,
    user: userReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commercetoolsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
