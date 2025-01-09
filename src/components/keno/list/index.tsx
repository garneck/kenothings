import styled from "styled-components";

import { useAppSelector } from "@/lib/hooks";
import KenoListItem from "./item";
import { getVariant } from "./utils";

const KenoList: React.FC = () => {
  const allValues = useAppSelector((state) => state.draw.allValues);
  const selectedValues = useAppSelector((state) => state.draw.selectedValues);
  const winningValues = useAppSelector((state) => state.draw.value);

  return (
    <KenoListContainer>
      {allValues.map((number: number, idx: number) => (
        <KenoListItem
          key={`number-${idx}`}
          value={number}
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
