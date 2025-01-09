import styled from "styled-components";
import Image from "next/image";

const TableControls: React.FC = () => {
  return (
    <TableControlsContainer>
      <TableControlsButton>
        <TableControlsButtonElement>
          <Image src="/images/dice.svg" alt="dice" width={24} height={24} />
        </TableControlsButtonElement>
        <TableControlsButtonElement>auto pick</TableControlsButtonElement>
      </TableControlsButton>
      <TableControlsButton>
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
`;

const TableControlsButton = styled.button`
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  background: transparent;
  background-image: ${(props) => props.theme.buttonBackgrounds.risk};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  border-radius: 4px;
  outline: none;
`;

const TableControlsButtonElement = styled.span`
  text-transform: capitalize;
  padding: 0;
`;

export default TableControls;
