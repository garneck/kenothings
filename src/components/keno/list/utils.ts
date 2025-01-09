import theme from "@/layouts/theme/default";

export type KenoVariant =
  | "default"
  | "highlighted"
  | "loss"
  | "win"
  | "win_medium"
  | "win_hard";

const getBackground = (variant: KenoVariant): string => {
  switch (variant) {
    case "highlighted":
      return theme.buttonBackgrounds.default.selected;
    case "loss":
      return theme.buttonBackgrounds.loss;
    case "win":
      return theme.buttonBackgrounds.win.base;
    case "win_medium":
      return theme.buttonBackgrounds.win.medium;
    case "win_hard":
      return theme.buttonBackgrounds.win.hard;
    default:
      return theme.buttonBackgrounds.default.base;
  }
};

const getVariant = (
  currentValue: number,
  selectedValues: number[],
  winningValues: number[]
): KenoVariant => {
  if (winningValues.length > 0 && selectedValues.includes(currentValue)) {
    return winningValues.includes(currentValue) ? "win" : "highlighted";
  }
  if (winningValues.includes(currentValue)) return "loss";
  return "default";
};

export { getBackground, getVariant };
