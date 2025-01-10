import styled from "styled-components";

import { useAppSelector } from "@/lib/hooks";
import KenoListItem from "./item";
import { getVariant } from "./utils";
import { useAnimations } from "./useAnimations";

const KenoList: React.FC = () => {
  const allValues = useAppSelector((state) => state.draw.allValues);
  const selectedValues = useAppSelector((state) => state.draw.selectedValues);
  const winningValues = useAppSelector((state) => state.draw.value);
  const risk = useAppSelector((state) => state.draw.risk);

  const { refs } = useAnimations(winningValues, selectedValues, risk);

  return (
    <KenoListContainer>
      {allValues.map((number: number, idx: number) => (
        <KenoListItem
          key={`number-${idx}`}
          value={number}
          springRef={refs[idx]}
          variant={getVariant(number, selectedValues, winningValues, risk)}
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
