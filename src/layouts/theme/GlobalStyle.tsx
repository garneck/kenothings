import { createGlobalStyle } from "styled-components";
import { Maven_Pro } from "next/font/google";

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: ${mavenPro.style.fontFamily};
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
    color: ${(props) => props.theme.colors.main};
  }
`;

export default GlobalStyle;
