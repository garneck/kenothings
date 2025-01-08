import styled from "styled-components";
import { useEffect, useState } from "react";

import { listenerMiddleware } from "@/lib/store";
import { generate, toggleValue } from "@/pages/keno/drawSlice";
import { useAppDispatch } from "@/lib/store";

interface ListItemProps {
  value: number;
}

type KenoButtonVariant = "default" | "loss" | "win" | "win_medium" | "win_hard";

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
            ? "win_hard"
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
  border-radius: 8px;

  background: ${({ variant }) => {
    switch (variant) {
      case "win_hard":
        return "green";
      default:
        return "grey";
    }
  }};

  &:hover {
    background: blue;
  }

  &:active {
    background: green;
  }

  &:focus {
    background: red;
  }
`;

export default ListItem;
