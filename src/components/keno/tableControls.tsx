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
      <AutoPickButton onClick={handleAutoPick}>
        <TableControlsButtonElement>
          <Dice src="/images/dice.svg" alt="dice" width={24} height={24} />
        </TableControlsButtonElement>
        <TableControlsButtonElement>auto pick</TableControlsButtonElement>
      </AutoPickButton>
      <ClearButton onClick={handleClearTable}>
        <TableControlsButtonElement>
          <Image src="/images/clear.svg" alt="clear" width={16} height={16} />
        </TableControlsButtonElement>
        <TableControlsButtonElement>clear table</TableControlsButtonElement>
      </ClearButton>
    </TableControlsContainer>
  );
};

const TableControlsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-flow: row nowrap;
  }
`;

const Dice = styled(Image)`
  margin-bottom: -8px;
`;

const TableControlsButton = styled.button`
  cursor: pointer;
  padding: 16px 24px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 8px;
  width: 100%;

  background: transparent;
  background-image: ${(props) => props.theme.buttonBackgrounds.table};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  border-radius: 4px;
  outline: none;

  &:hover {
    transition: filter 0.3s ease;
    filter: brightness(1.5);
  }
  ${({ theme }) => theme.breakpoints.down("lg")} {
    width: auto;
  }
`;

const AutoPickButton = styled(TableControlsButton)`
  background-image: ${(props) => props.theme.buttonBackgrounds.table.active};
`;

const ClearButton = styled(TableControlsButton)`
  background-image: ${(props) => props.theme.buttonBackgrounds.table.base};
`;

const TableControlsButtonElement = styled.div`
  text-transform: capitalize;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    font-size: 12px;
  }
`;

export default TableControls;
