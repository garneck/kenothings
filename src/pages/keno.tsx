import type { ReactElement } from "react";
import styled from "styled-components";

import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/layouts/default";
import KenoLayout from "@/layouts/keno";
import KenoListItem from "@/components/keno/listItem";
import generateResults from "@/lib/generateResults";

const Keno: NextPageWithLayout = () => {
  const allNumbers = [
    ...Array(40)
      .keys()
      .map((v) => v + 1),
  ];

  const resultNumbers = generateResults(
    process.env.SERVER_SEED ?? "",
    process.env.CLIENT_SEED ?? "",
    Date.now(),
    10
  );

  return (
    <KenoContainer>
      <div>All numbers</div>
      <AllNumbersContainer>
        {allNumbers.map((number, idx) => (
          <ListItem key={`number-${idx}`}>{number}</ListItem>
        ))}
      </AllNumbersContainer>
      <div>Random numbers</div>
      <ResultNumbersContainer>
        {resultNumbers.map((resultNumber, idx) => (
          <KenoListItem key={`result-${idx}`}>{resultNumber}</KenoListItem>
        ))}
      </ResultNumbersContainer>
    </KenoContainer>
  );
};

Keno.getLayout = (page: ReactElement) => (
  <Layout>
    <KenoLayout>{page}</KenoLayout>
  </Layout>
);

const AllNumbersContainer = styled.ol`
  list-style-type: none;
  display: flex;
`;

const ResultNumbersContainer = styled.ul`
  list-style-type: none;
  display: flex;
  width: 50%;
`;

const ListItem = styled.li`
  padding: 8px;
`;

const KenoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Keno;
