import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi, dashboardApi, questionApi, storageApi, submissionApi, userApi } from "./api";
import { default as rootReducer } from "./reducers";

export function makeStore() {
  return configureStore({
    devTools: import.meta.env.VITE_APP_ENV !== "production",
    reducer: combineReducers({
      ...rootReducer,
      [authApi.reducerPath]: authApi.reducer,
      [dashboardApi.reducerPath]: dashboardApi.reducer,
      [questionApi.reducerPath]: questionApi.reducer,
      [storageApi.reducerPath]: storageApi.reducer,
      [submissionApi.reducerPath]: submissionApi.reducer,
      [userApi.reducerPath]: userApi.reducer
    }),
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({ serializableCheck: false })
        .concat(authApi.middleware)
        .concat(dashboardApi.middleware)
        .concat(questionApi.middleware)
        .concat(storageApi.middleware)
        .concat(submissionApi.middleware)
        .concat(userApi.middleware);
      return middleware;
    }
  });
}

export const store = makeStore();

export default { store };
