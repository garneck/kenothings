import styled from "styled-components";
import type { ReactElement } from "react";

import Layout from "@/layouts/default";
import KenoLayout from "@/layouts/keno";
import KenoList from "@/components/keno/list";
import Results from "@/components/keno/results";
import { generate } from "@/pages/keno/drawSlice";
import type { NextPageWithLayout } from "@/pages/_app";
import RiskControls from "@/components/keno/riskControls";
import TableControls from "@/components/keno/tableControls";
import { useAppDispatch } from "@/lib/hooks";

const Keno: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const handleDraw = () => dispatch(generate());
  return (
    <>
      <MainContainer>
        <TableControlsContainer>
          <RiskControls />
          <TableControls />
        </TableControlsContainer>
        <Divider />
        <KenoContainer>
          <KenoList />
          <Results />
        </KenoContainer>
      </MainContainer>
      <DrawButton onClick={handleDraw}>draw</DrawButton>
    </>
  );
};

Keno.getLayout = (page: ReactElement) => (
  <Layout>
    <KenoLayout>{page}</KenoLayout>
  </Layout>
);

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #2f4566;
  border-radius: 12px;
  padding: 16px;
  gap: 16px;

  background: linear-gradient(
    180deg,
    rgba(9, 14, 21, 0.7) 0%,
    rgba(9, 14, 21, 0.35) 100%
  );
  backdrop-filter: blur(4px);

  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-flow: column-reverse nowrap;
    padding: 8px;
    gap: 0;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  opacity: 0.3;
  background: linear-gradient(180deg, #2f4566 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 2px;
`;

const KenoContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const TableControlsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 24px;
  height: 100%;
  width: 100%;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    gap: 0;
  }
`;

const DrawButton = styled.button`
  padding: 16px 64px 16px 64px;
  text-transform: uppercase;
  cursor: pointer;

  outline: none;
  border: none;
  border-radius: 32px;
  background: linear-gradient(55.49deg, #4cc274 6.79%, #18d458 94.06%);

  &:active {
    opacity: 75%;
  }
`;

export default Keno;
