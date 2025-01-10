import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import { isAnyOf } from "@reduxjs/toolkit";

import { startAppListening } from "@/lib/store";
import { generate, clear } from "@/pages/keno/drawSlice";
import { useAppSelector } from "@/lib/hooks";

type Stake = {
  label: string;
  hitAmount: number;
  multiplier: number;
  selected: boolean;
};

const defaultStakes: Array<Omit<Stake, "selected">> = [
  { label: "0x", hitAmount: 0, multiplier: 1 },
  { label: "0x", hitAmount: 1, multiplier: 1 },
  { label: "0x", hitAmount: 2, multiplier: 1 },
  { label: "1.6x", hitAmount: 3, multiplier: 1.6 },
  { label: "2x", hitAmount: 4, multiplier: 2 },
  { label: "4x", hitAmount: 5, multiplier: 4 },
  { label: "7x", hitAmount: 6, multiplier: 7 },
  { label: "26x", hitAmount: 7, multiplier: 26 },
  { label: "100x", hitAmount: 8, multiplier: 100 },
  { label: "500x", hitAmount: 9, multiplier: 500 },
  { label: "1000x", hitAmount: 10, multiplier: 1000 },
];

const Result: React.FC<Stake> = ({
  label,
  hitAmount,
  multiplier,
  selected = false,
}) => (
  <ResultContainer selected={selected}>
    <ResultMultiplier>{label}</ResultMultiplier>
    <ResultHitAmount>
      {hitAmount}
      <DiamondImage
        src="/images/diamond.svg"
        alt="diamond"
        width={10}
        height={10}
      />
    </ResultHitAmount>
  </ResultContainer>
);

const Results: React.FC = () => {
  const hits = useAppSelector((state) => state.draw.hits);

  return (
    <ResultsContainer>
      {defaultStakes.map(({ label, hitAmount, multiplier }) => (
        <Result
          key={`stake-${label}-${hitAmount}-${multiplier}`}
          label={label}
          hitAmount={hitAmount}
          multiplier={multiplier}
          selected={hits === hitAmount}
        />
      ))}
    </ResultsContainer>
  );
};

const ResultsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  border: 3px solid #326dcb;
  gap: 4px;
`;

const ResultMultiplier = styled.div`
  background: #222f42;
  text-align: center;
  padding: 4px;
`;

const ResultHitAmount = styled.div`
  background: #1c2533;
  padding: 4px;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
`;

const DiamondImage = styled(Image)``;

interface ResultContainerProps {
  selected: boolean;
}

const ResultContainer = styled.div<ResultContainerProps>`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  padding: 0;
  align-items: stretch;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 4px;
  background: transparent;
  overflow: hidden;
  user-select: none;
  ${({ selected }) =>
    selected &&
    css`
      & {
        & ${ResultMultiplier} {
          background: #0d6eff;
        }
        & ${ResultHitAmount} {
          background: #1c5abd;
        }
        & ${DiamondImage} {
          filter: brightness(0) invert(1);
        }
      }
    `}
`;

export default Results;
