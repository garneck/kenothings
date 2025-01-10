import { useEffect, useState } from "react";
import { isAnyOf } from "@reduxjs/toolkit";
import { SpringRef, useChain } from "@react-spring/web";

import { startAppListening } from "@/lib/store";
import { generate, toggleValue, autoPick, clear } from "@/pages/keno/drawSlice";
import { getVariant, getBackground } from "./utils";

const useAnimations = (
  winningValues: number[],
  selectedValues: number[]
): { refs: SpringRef[] } => {
  const [refs, setRefs] = useState(
    Array.from({ length: 40 }, () => SpringRef())
  );
  const [refsToAnimate, setRefsToAnimate] = useState<SpringRef[]>([]);

  useEffect(() => {
    const unsubscribe = startAppListening({
      matcher: isAnyOf(generate, autoPick),
      effect: (action, listenerApi) => {
        const newValues = listenerApi.getState().draw.value;
        const newSelectedValues = listenerApi.getState().draw.selectedValues;
        setRefs(
          refs.map((ref, idx) => {
            ref.update({
              to: {
                backgroundImage: getBackground(
                  getVariant(idx + 1, newSelectedValues, newValues)
                ),
              },
            });
            return ref;
          })
        );
        setRefsToAnimate(
          Array.from(
            new Set([...winningValues, ...newValues, ...newSelectedValues])
          )
            .sort((a, b) => a - b)
            .map((id) => refs[id - 1])
        );
      },
    });
    return () => unsubscribe();
  }, [refs, winningValues]);

  useEffect(() => {
    const unsubscribe = startAppListening({
      actionCreator: clear,
      effect: (action, listenerApi) => {
        const newValues = listenerApi.getState().draw.value;
        const newSelectedValues = listenerApi.getState().draw.selectedValues;
        setRefs(
          refs.map((ref, idx) => {
            ref.update({
              to: {
                backgroundImage: getBackground(
                  getVariant(idx + 1, newSelectedValues, newValues)
                ),
              },
            });
            return ref;
          })
        );
        setRefsToAnimate(
          Array.from(
            new Set([...winningValues, ...newValues, ...newSelectedValues])
          )
            .sort((a, b) => a - b)
            .map((id) => refs[id - 1])
        );
      },
    });
    return () => unsubscribe();
  }, [refs, winningValues]);

  useEffect(() => {
    const unsubscribe = startAppListening({
      actionCreator: clear,
      effect: () => {
        setRefs(
          refs.map((ref, idx) => {
            ref.update({
              to: {
                backgroundImage: getBackground(
                  getVariant(idx + 1, [], winningValues)
                ),
              },
            });
            return ref;
          })
        );
        setRefsToAnimate(
          Array.from(new Set([...selectedValues]))
            .sort((a, b) => a - b)
            .map((id) => refs[id - 1])
        );
      },
    });
    return () => unsubscribe();
  }, [refs, selectedValues, winningValues]);

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
                listenerApi.getState().draw.value
              )
            ),
          },
        });
        setRefsToAnimate([refs[action.payload - 1]]);
      },
    });
    return () => unsubscribe();
  }, [refs]);

  useChain(
    refsToAnimate,
    refsToAnimate.map((x, idx) => idx),
    200
  );

  return {
    refs,
  };
};

export { useAnimations };
