import styled from "styled-components";
import Image from "next/image";

type Stake = {
  label: string;
  toHit: number;
  multiplier: number;
};

const defaultStakes: Array<Stake> = [
  { label: "0x", toHit: 0, multiplier: 1 },
  { label: "0x", toHit: 1, multiplier: 1 },
  { label: "0x", toHit: 2, multiplier: 1 },
  { label: "1.6x", toHit: 3, multiplier: 1.6 },
  { label: "2x", toHit: 4, multiplier: 2 },
  { label: "4x", toHit: 5, multiplier: 4 },
  { label: "7x", toHit: 6, multiplier: 7 },
  { label: "26x", toHit: 7, multiplier: 26 },
  { label: "100x", toHit: 8, multiplier: 100 },
  { label: "500x", toHit: 9, multiplier: 500 },
  { label: "1000x", toHit: 10, multiplier: 1000 },
];

const Stake: React.FC<Stake> = ({ label, toHit, multiplier }) => (
  <StakeButton>
    <StakeMultiplier>{label}</StakeMultiplier>
    <StakeAmountToHit>
      {toHit}
      <DiamondImage
        src="/images/diamond.svg"
        alt="diamond"
        width={10}
        height={10}
      />
    </StakeAmountToHit>
  </StakeButton>
);

const Stakes: React.FC = () => {
  return (
    <StakesContainer>
      {defaultStakes.map(({ label, toHit, multiplier }) => (
        <Stake
          key={`stake-${label}-${toHit}-${multiplier}`}
          label={label}
          toHit={toHit}
          multiplier={multiplier}
        />
      ))}
    </StakesContainer>
  );
};

const StakesContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  border: 3px solid #326dcb;
  gap: 4px;
`;

const StakeMultiplier = styled.div`
  background: #222f42;
  padding: 4px;
`;

const StakeAmountToHit = styled.div`
  background: #1c2533;
  padding: 4px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const DiamondImage = styled(Image)``;

const StakeButton = styled.button`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  padding: 0;
  align-items: stretch;
  border: none;
  outline: none;
  border-radius: 4px;
  background: transparent;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    & ${StakeMultiplier} {
      background: #0d6eff;
    }
    & ${StakeAmountToHit} {
      background: #1c5abd;
    }
    & ${DiamondImage} {
      filter: brightness(0) invert(1);
    }
  }
`;

export default Stakes;
