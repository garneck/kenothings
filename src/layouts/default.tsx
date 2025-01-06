import Image from "next/image";
import styled, { ThemeProvider } from "styled-components";
import defaultTheme from "@/layouts/theme/default";

import GlobalStyles from "@/layouts/theme/globalStyles";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Background src="/images/background.svg" alt="background" layout="fill" />
      <div>{children}</div>
    </ThemeProvider>
  </>
);

const Background = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export default RootLayout;
