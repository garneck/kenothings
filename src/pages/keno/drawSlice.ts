import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import generateResults from "@/lib/generateResults";

const getNewResults = (): Array<number> =>
  generateResults(
    process.env.SERVER_SEED ?? "",
    process.env.CLIENT_SEED ?? "",
    Date.now(),
    10
  );

export interface DrawSlice {
  value: Array<number>;
  selectedValues: Array<number>;
  allValues: Array<number>;
}

const initialState: DrawSlice = {
  allValues: [
    ...Array(40)
      .keys()
      .map((v) => v + 1),
  ],
  selectedValues: [],
  value: [],
};

export const drawSlice = createSlice({
  name: "draw",
  initialState,
  reducers: {
    generate: (state) => {
      state.value = getNewResults();
    },
    toggleValue: (state, action: PayloadAction<number>) => {
      const idx = state.selectedValues.indexOf(action.payload);
      if (idx !== -1) {
        state.selectedValues.splice(idx, 1);
      } else {
        state.selectedValues.push(action.payload);
      }
    },
  },
});

export const { generate, toggleValue } = drawSlice.actions;

export default drawSlice;
