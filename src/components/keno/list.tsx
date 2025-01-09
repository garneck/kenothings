import styled from "styled-components";

import KenoListItem from "./listItem";
import { useAppSelector } from "@/lib/hooks";

const KenoList: React.FC = () => {
  const allValues = useAppSelector((state) => state.draw.allValues);
  return (
    <KenoListContainer>
      {allValues.map((number: number, idx: number) => (
        <KenoListItem key={`number-${idx}`} value={number} />
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
