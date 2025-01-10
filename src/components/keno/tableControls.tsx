import styled from "styled-components";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { clear, autoPick } from "@/pages/keno/drawSlice";

const TableControls: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClearTable = (): void => {
    dispatch(clear());
  };

  const handleAutoPick = (): void => {
    dispatch(autoPick());
  };

  return (
    <TableControlsContainer>
      <TableControlsButton onClick={handleAutoPick}>
        <TableControlsButtonElement>
          <Dice src="/images/dice.svg" alt="dice" width={24} height={24} />
        </TableControlsButtonElement>
        <TableControlsButtonElement>auto pick</TableControlsButtonElement>
      </TableControlsButton>
      <TableControlsButton onClick={handleClearTable}>
        <TableControlsButtonElement>
          <Image src="/images/clear.svg" alt="clear" width={16} height={16} />
        </TableControlsButtonElement>
        <TableControlsButtonElement>clear table</TableControlsButtonElement>
      </TableControlsButton>
    </TableControlsContainer>
  );
};

const TableControlsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 4px;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Dice = styled(Image)`
  margin-bottom: -8px;
`;

const TableControlsButton = styled.button`
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;

  background: transparent;
  background-image: ${(props) => props.theme.buttonBackgrounds.risk};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  border-radius: 4px;
  outline: none;
`;

const TableControlsButtonElement = styled.div`
  text-transform: capitalize;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TableControls;
