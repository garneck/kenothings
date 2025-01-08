import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

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

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
