import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import type { TypedStartListening } from "@reduxjs/toolkit";

import drawSlice from "@/pages/keno/drawSlice";

export const listenerMiddleware = createListenerMiddleware();

export const makeStore = () =>
  configureStore({
    reducer: {
      draw: drawSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
