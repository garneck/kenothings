import styled from "styled-components";
import { useSelector } from "react-redux";

import KenoListItem from "./listItem";
import type { RootState } from "@/lib/store";

const KenoList: React.FC = () => {
  const allValues = useSelector((state: RootState) => state.draw.allValues);
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
