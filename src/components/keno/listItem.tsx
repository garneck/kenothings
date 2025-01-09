import styled from "styled-components";
import { useEffect, useState } from "react";

import { listenerMiddleware } from "@/lib/store";
import { generate, toggleValue } from "@/pages/keno/drawSlice";
import { useAppDispatch } from "@/lib/store";

interface ListItemProps {
  value: number;
}

type KenoButtonVariant =
  | "default"
  | "highlighted"
  | "loss"
  | "win"
  | "win_medium"
  | "win_hard";

interface KenoButtonProps {
  variant?: KenoButtonVariant;
}

const ListItem: React.FC<ListItemProps> = ({ value }) => {
  const [currentVariant, setCurrentVariant] =
    useState<KenoButtonProps["variant"]>("default");

  useEffect(() => {
    const unsubscribe = listenerMiddleware.startListening({
      actionCreator: generate,
      effect: (action, listenerApi) =>
        setCurrentVariant(
          listenerApi.getState().draw.value.includes(value)
            ? "highlighted"
            : "default"
        ),
    });

    return () => unsubscribe();
  }, [value]);

  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    dispatch(toggleValue(value));
  };

  return (
    <KenoButton variant={currentVariant} onClick={handleClick}>
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
