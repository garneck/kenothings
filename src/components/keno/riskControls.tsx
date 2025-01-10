import styled, { css } from "styled-components";
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
        <RiskSelectorLabel>low</RiskSelectorLabel>
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
        <RiskSelectorLabel>medium</RiskSelectorLabel>
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
        <RiskSelectorLabel>high</RiskSelectorLabel>
      </RiskSelector>
    </RiskContainer>
  );
};

const RiskContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: center;
  padding: 0;
`;

const RiskSelectorTitle = styled.div`
  text-transform: uppercase;
  align-self: center;
  color: #8392aa;
  font-size: 12px;
`;

const RiskSelectorLabel = styled.div``;

const FireWrapper = styled.div`
  display: flex;
  flex-direction: row;
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
  padding: 12px 24px;

  background: transparent;
  & ${RiskSelectorLabel} {
    color: ${(props) => (props.active ? "#fff" : "#8392aa")};
  }
  & ${FireWrapper} {
    ${(props) =>
      props.active &&
      css`
        filter: brightness(0) invert(1);
      `}
  }
  background-image: ${(props) =>
    props.active
      ? props.theme.buttonBackgrounds.risk[props.risk]
      : props.theme.buttonBackgrounds.risk.base};
  &:hover {
    ${(props) =>
      !props.active &&
      css`
        transition: filter 0.3s ease;
        filter: brightness(1.5);
      `}
  }
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  outline: none;
`;

export default RiskControls;
