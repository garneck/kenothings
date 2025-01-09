import styled from "styled-components";
import { useEffect, useState } from "react";

import { useAppSelector } from "@/lib/hooks";
import { listenerMiddleware } from "@/lib/store";
import { generate, toggleValue } from "@/pages/keno/drawSlice";
import KenoListItem from "./item";
import { getVariant, getBackground } from "./utils";
import { SpringRef, useChain } from "@react-spring/web";

const KenoList: React.FC = () => {
  const allValues = useAppSelector((state) => state.draw.allValues);
  const selectedValues = useAppSelector((state) => state.draw.selectedValues);
  const winningValues = useAppSelector((state) => state.draw.value);

  const [refs, setRefs] = useState(
    Array.from({ length: 40 }, () => SpringRef())
  );

  useEffect(() => {
    const unsubscribe = listenerMiddleware.startListening({
      actionCreator: generate,
      effect: (action, listenerApi) => {
        const newValues = listenerApi.getState().draw.value;
        const selectedValues = listenerApi.getState().draw.selectedValues;
        setRefs(
          refs.map((ref, idx) => {
            ref.update({
              to: {
                backgroundImage: getBackground(
                  getVariant(idx + 1, selectedValues, newValues)
                ),
              },
            });
            return ref;
          })
        );
      },
    });
    return () => unsubscribe();
  }, [refs]);

  useEffect(() => {
    const unsubscribe = listenerMiddleware.startListening({
      actionCreator: toggleValue,
      effect: (action, listenerApi) => {
        refs[action.payload - 1].start({
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
      },
    });
    return () => unsubscribe();
  }, [refs]);

  useChain(
    refs,
    refs.map((x, idx) => idx),
    50
  );

  return (
    <KenoListContainer>
      {allValues.map((number: number, idx: number) => (
        <KenoListItem
          key={`number-${idx}`}
          value={number}
          springRef={refs[idx]}
          variant={getVariant(number, selectedValues, winningValues)}
        />
      ))}
    </KenoListContainer>
  );
};

const KenoListContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-gap: 16px;
  padding: 0;
  margin: 0;
  grid-template-columns: repeat(10, 1fr);
`;

export default KenoList;
