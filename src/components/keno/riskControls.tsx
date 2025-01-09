import styled from "styled-components";
import Image from "next/image";
import React from "react";

const FireImage: React.FC = () => (
  <Image src="/images/fire.svg" alt="fire" width={10} height={10} />
);
const RiskControls: React.FC = () => {
  return (
    <RiskContainer>
      <RiskSelectorTitle>risk</RiskSelectorTitle>
      <RiskSelectorItem>
        <FireWrapper>
          <FireImage />
        </FireWrapper>
        <div>low</div>
      </RiskSelectorItem>
      <RiskSelectorItem>
        <FireWrapper>
          <FireImage />
          <FireImage />
        </FireWrapper>
        <div>medium</div>
      </RiskSelectorItem>
      <RiskSelectorItem>
        <FireWrapper>
          <FireImage />
          <FireImage />
          <FireImage />
        </FireWrapper>
        <div>high</div>
      </RiskSelectorItem>
    </RiskContainer>
  );
};

const RiskContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  align-items: stretch;
  padding: 0;
  gap: 8px;
`;

const RiskSelectorTitle = styled.div`
  text-transform: uppercase;
  align-self: center;
  color: #8392aa;
  font-size: 12px;
`;

const RiskSelectorItem = styled.button`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;

  background: transparent;
  background-image: ${(props) => props.theme.buttonBackgrounds.risk};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  outline: none;
`;

const FireWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default RiskControls;
