import styled from "styled-components";
import { useDispatch } from "react-redux";
import type { ReactElement } from "react";

import Layout from "@/layouts/default";
import KenoLayout from "@/layouts/keno";
import KenoList from "@/components/keno/list";
import { generate } from "@/pages/keno/drawSlice";
import type { NextPageWithLayout } from "@/pages/_app";

const Keno: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const handleDraw = () => dispatch(generate());
  return (
    <>
      <KenoContainer>
        <KenoList />
      </KenoContainer>
      <DrawButton onClick={handleDraw}>draw</DrawButton>
    </>
  );
};

Keno.getLayout = (page: ReactElement) => (
  <Layout>
    <KenoLayout>{page}</KenoLayout>
  </Layout>
);

const KenoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid #2f4566;
  border-radius: 12px;
  padding: 16px;

  background: linear-gradient(
    180deg,
    rgba(9, 14, 21, 0.7) 0%,
    rgba(9, 14, 21, 0.35) 100%
  );
  backdrop-filter: blur(4px);
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
