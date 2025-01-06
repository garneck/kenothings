import Image from "next/image";
import styled, { ThemeProvider } from "styled-components";
import defaultTheme from "@/layouts/theme/default";

import GlobalStyle from "@/layouts/theme/GlobalStyle";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Background
        src="/images/background.svg"
        alt="background"
        width={0}
        height={0}
      />
      <div>{children}</div>
    </ThemeProvider>
  </>
);

const Background = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  layout: fill;
`;

export default RootLayout;
