import type { ReactElement } from "react";
import styled from "styled-components";

import type { NextPageWithLayout } from "./_app";
import Layout from "@/layouts/default";
import KenoLayout from "@/layouts/keno";

const Keno: NextPageWithLayout = () => <KenoContainer>witam</KenoContainer>;

Keno.getLayout = (page: ReactElement) => (
  <Layout>
    <KenoLayout>{page}</KenoLayout>
  </Layout>
);

const KenoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Keno;
