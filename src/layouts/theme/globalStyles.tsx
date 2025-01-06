import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    color: ${(props) => props.theme.colors.main}
  }
`;

export default GlobalStyle;
