import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import generateResults from "@/lib/generateResults";

const generateUniqueNumbers = (
  count: number,
  min: number,
  max: number
): number[] => {
  const numbers = new Set<number>();

  while (numbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNumber);
  }

  return Array.from(numbers);
};

const getNewResults = (): Array<number> =>
  generateResults(
    process.env.SERVER_SEED ?? "",
    process.env.CLIENT_SEED ?? "",
    Date.now(),
    10
  );

export type Risk = "low" | "medium" | "high";

export interface DrawSlice {
  value: Array<number>;
  selectedValues: Array<number>;
  allValues: Array<number>;
  risk: Risk;
  hits: number;
}

const initialState: DrawSlice = {
  allValues: [
    ...Array(40)
      .keys()
      .map((v) => v + 1),
  ],
  selectedValues: [],
  value: [],
  hits: 0,
  risk: "low",
};

export const drawSlice = createSlice({
  name: "draw",
  initialState,
  reducers: {
    generate: (state) => {
      state.hits = 0;
      state.value = getNewResults();
    },
    toggleValue: (state, action: PayloadAction<number>) => {
      const idx = state.selectedValues.indexOf(action.payload);
      if (idx !== -1) {
        state.selectedValues.splice(idx, 1);
      } else {
        if (state.selectedValues.length < 10)
          state.selectedValues.push(action.payload);
      }
    },
    autoPick: (state) => {
      state.selectedValues = generateUniqueNumbers(10, 1, 40);
    },
    clear: (state) => {
      state.selectedValues = [];
      state.hits = 0;
    },
    setRisk: (state, action: PayloadAction<Risk>) => {
      state.risk = action.payload;
    },
    incrementHits: (state) => {
      state.hits += 1;
    },
  },
});

export const {
  generate,
  toggleValue,
  clear,
  autoPick,
  setRisk,
  incrementHits,
} = drawSlice.actions;

export default drawSlice;
