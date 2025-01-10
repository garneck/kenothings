import styled from "styled-components";
import { useSpring, animated, SpringRef } from "@react-spring/web";

import { getBackground } from "@/components/keno/list/utils";
import { toggleValue, incrementHits } from "@/pages/keno/drawSlice";
import { useAppDispatch } from "@/lib/hooks";
import type { KenoVariant } from "./utils";

interface ListItemProps {
  value: number;
  variant: KenoVariant;
  springRef: SpringRef;
}

interface KenoButtonProps {
  children: React.ReactNode;
  onClick: VoidFunction;
}

const ListItem: React.FC<ListItemProps> = ({ value, springRef }) => {
  const dispatch = useAppDispatch();

  const [style] = useSpring(() => ({
    ref: springRef,
    from: { backgroundImage: getBackground("default") },
    onStart: (x) => {
      if (
        [
          getBackground("win"),
          getBackground("win_medium"),
          getBackground("win_hard"),
        ].includes(x.value.backgroundImage)
      )
        dispatch(incrementHits());
    },
  }));

  const handleClick = (): void => {
    dispatch(toggleValue(value));
  };

  return (
    <KenoButton style={style} onClick={handleClick}>
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
