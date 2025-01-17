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

const riskToWinVariantMap: Record<"low" | "medium" | "high", KenoVariant> = {
  low: "win",
  medium: "win_medium",
  high: "win_hard",
};

const getVariant = (
  currentValue: number,
  selectedValues: number[],
  winningValues: number[],
  risk: "low" | "medium" | "high"
): KenoVariant => {
  if (winningValues.length > 0 && winningValues.includes(currentValue)) {
    if (selectedValues.includes(currentValue)) return riskToWinVariantMap[risk];
    return "loss";
  }
  if (selectedValues.includes(currentValue)) return "highlighted";
  return "default";
};

export { getBackground, getVariant };
