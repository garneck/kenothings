import styled from "styled-components";
import { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

import { toggleValue } from "@/pages/keno/drawSlice";
import { useAppDispatch } from "@/lib/hooks";
import theme from "@/layouts/theme/default";

export type KenoVariant =
  | "default"
  | "highlighted"
  | "loss"
  | "win"
  | "win_medium"
  | "win_hard";

interface ListItemProps {
  value: number;
  variant: KenoVariant;
}

interface KenoButtonProps {
  variant?: KenoVariant;
  children: React.ReactNode;
  onClick: VoidFunction;
}

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

const ListItem: React.FC<ListItemProps> = ({ value, variant }) => {
  const dispatch = useAppDispatch();

  const [style, api] = useSpring(() => ({
    backgroundImage: getBackground(variant),
  }));

  useEffect(() => {
    api.start({
      backgroundImage: getBackground(variant),
    });
  }, [variant, api]);

  const handleClick = (): void => {
    dispatch(toggleValue(value));
  };

  return (
    <KenoButton style={style} variant={variant} onClick={handleClick}>
      {value}
    </KenoButton>
  );
};

const KenoButton = styled(animated.button)<KenoButtonProps>`
  width: 100%;
  padding: 16px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: background-image 150ms ease-in-out;
`;

export default ListItem;
