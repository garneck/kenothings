import type { ReactElement } from "react";
import styled from "styled-components";

import type { NextPageWithLayout } from "./_app";
import Layout from "@/layouts/default";
import KenoLayout from "@/layouts/keno";

const Home: NextPageWithLayout = () => <HomeContainer>witam</HomeContainer>;

Home.getLayout = (page: ReactElement) => (
  <Layout>
    <KenoLayout>{page}</KenoLayout>
  </Layout>
);

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Home;
