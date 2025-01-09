import styled from "styled-components";

import { toggleValue } from "@/pages/keno/drawSlice";
import { useAppDispatch } from "@/lib/hooks";

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
}

const ListItem: React.FC<ListItemProps> = ({ value, variant }) => {
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    dispatch(toggleValue(value));
  };

  return (
    <KenoButton variant={variant} onClick={handleClick}>
      {value}
    </KenoButton>
  );
};

const KenoButton = styled.button<KenoButtonProps>`
  width: 100%;
  padding: 16px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props) => {
    switch (props.variant) {
      case "highlighted":
        return props.theme.buttonBackgrounds.default.selected;
      case "loss":
        return props.theme.buttonBackgrounds.loss;
      case "win":
        return props.theme.buttonBackgrounds.win.base;
      case "win_medium":
        return props.theme.buttonBackgrounds.win.medium;
      case "win_hard":
        return props.theme.buttonBackgrounds.win.hard;
      default:
        return props.theme.buttonBackgrounds.default.base;
    }
  }};
`;

export default ListItem;
