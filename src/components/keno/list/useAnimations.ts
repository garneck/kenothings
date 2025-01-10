import { useEffect, useState } from "react";
import { SpringRef, useChain } from "@react-spring/web";

import { startAppListening } from "@/lib/store";
import { generate, toggleValue, autoPick, clear } from "@/pages/keno/drawSlice";
import { getVariant, getBackground } from "./utils";
import type { KenoVariant } from "./utils";

const updateBackground = (ref: SpringRef, variant: KenoVariant): SpringRef => {
  ref.update({
    to: {
      backgroundImage: getBackground(variant),
    },
  });
  return ref;
};

const getUniqueSubsetOfRefs = (
  allRefs: SpringRef[],
  values: number[]
): SpringRef[] =>
  Array.from(new Set(values))
    .sort((a, b) => a - b)
    .map((id) => allRefs[id - 1]);

const useAnimations = (
  winningValues: number[],
  selectedValues: number[],
  risk: "low" | "medium" | "high"
): { refs: SpringRef[] } => {
  const [refs, setRefs] = useState(
    Array.from({ length: 40 }, () => SpringRef())
  );
  const [refsToAnimate, setRefsToAnimate] = useState<SpringRef[]>([]);

  useEffect(() => {
    const unsubscribe = startAppListening({
      actionCreator: generate,
      effect: (action, listenerApi) => {
        const newValues = listenerApi.getState().draw.value;
        const newSelectedValues = listenerApi.getState().draw.selectedValues;
        setRefs(
          refs.map((ref, idx) =>
            updateBackground(
              ref,
              getVariant(idx + 1, newSelectedValues, newValues, risk)
            )
          )
        );
        setRefsToAnimate(
          getUniqueSubsetOfRefs(refs, [
            ...winningValues,
            ...newValues,
            ...newSelectedValues,
          ])
        );
      },
    });
    return () => unsubscribe();
  }, [refs, winningValues, risk]);

  useEffect(() => {
    const unsubscribe = startAppListening({
      actionCreator: autoPick,
      effect: (action, listenerApi) => {
        const newSelectedValues = listenerApi.getState().draw.selectedValues;
        setRefs(
          refs.map((ref, idx) =>
            updateBackground(
              ref,
              getVariant(idx + 1, newSelectedValues, winningValues, risk)
            )
          )
        );
        setRefsToAnimate(
          getUniqueSubsetOfRefs(refs, [...selectedValues, ...newSelectedValues])
        );
      },
    });
    return () => unsubscribe();
  }, [refs, winningValues, selectedValues, risk]);

  useEffect(() => {
    const unsubscribe = startAppListening({
      actionCreator: clear,
      effect: (action, listenerApi) => {
        const newValues = listenerApi.getState().draw.value;
        const newSelectedValues = listenerApi.getState().draw.selectedValues;
        setRefs(
          refs.map((ref, idx) =>
            updateBackground(
              ref,
              getVariant(idx + 1, newSelectedValues, newValues, risk)
            )
          )
        );
        setRefsToAnimate(
          getUniqueSubsetOfRefs(refs, [
            ...winningValues,
            ...newValues,
            ...newSelectedValues,
          ])
        );
      },
    });
    return () => unsubscribe();
  }, [refs, winningValues, risk]);

  useEffect(() => {
    const unsubscribe = startAppListening({
      actionCreator: clear,
      effect: () => {
        setRefs(
          refs.map((ref, idx) =>
            updateBackground(ref, getVariant(idx + 1, [], winningValues, risk))
          )
        );
        setRefsToAnimate(getUniqueSubsetOfRefs(refs, [...selectedValues]));
      },
    });
    return () => unsubscribe();
  }, [refs, selectedValues, winningValues, risk]);

  useEffect(() => {
    const unsubscribe = startAppListening({
      actionCreator: toggleValue,
      effect: (action, listenerApi) => {
        refs[action.payload - 1].update({
          to: {
            backgroundImage: getBackground(
              getVariant(
                action.payload,
                listenerApi.getState().draw.selectedValues,
                listenerApi.getState().draw.value,
                risk
              )
            ),
          },
        });
        setRefsToAnimate([refs[action.payload - 1]]);
      },
    });
    return () => unsubscribe();
  }, [refs, risk]);

  useChain(
    refsToAnimate,
    refsToAnimate.map((x, idx) => idx),
    100
  );

  return {
    refs,
  };
};

export { useAnimations };
