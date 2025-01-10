import { createStyledBreakpointsTheme } from "styled-breakpoints";

import colors from "./colors";
import buttonBackgrounds from "./buttonBackgrounds";

const defaultTheme = {
  colors,
  buttonBackgrounds,
};

const theme = { ...defaultTheme, ...createStyledBreakpointsTheme() };

export default theme;
