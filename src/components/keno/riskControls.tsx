import styled from "styled-components";
import Image from "next/image";
import React from "react";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setRisk } from "@/pages/keno/drawSlice";
import type { Risk } from "@/pages/keno/drawSlice";

const FireImage: React.FC = () => (
  <Image src="/images/fire.svg" alt="fire" width={10} height={10} />
);

const RiskControls: React.FC = () => {
  const currentRisk = useAppSelector((state) => state.draw.risk);
  const dispatch = useAppDispatch();

  const handleRiskClick = (risk: Risk): void => {
    dispatch(setRisk(risk));
  };

  return (
    <RiskContainer>
      <RiskSelectorTitle>risk</RiskSelectorTitle>
      <RiskSelector
        risk="low"
        active={currentRisk === "low"}
        onClick={() => handleRiskClick("low")}
      >
        <FireWrapper>
          <FireImage />
        </FireWrapper>
        <div>low</div>
      </RiskSelector>
      <RiskSelector
        risk="medium"
        active={currentRisk === "medium"}
        onClick={() => handleRiskClick("medium")}
      >
        <FireWrapper>
          <FireImage />
          <FireImage />
        </FireWrapper>
        <div>medium</div>
      </RiskSelector>
      <RiskSelector
        risk="high"
        active={currentRisk === "high"}
        onClick={() => handleRiskClick("high")}
      >
        <FireWrapper>
          <FireImage />
          <FireImage />
          <FireImage />
        </FireWrapper>
        <div>high</div>
      </RiskSelector>
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

interface RiskSelectorProps {
  risk: Risk;
  active: boolean;
}

const RiskSelector = styled.button<RiskSelectorProps>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  cursor: pointer;
  user-select: none;

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
