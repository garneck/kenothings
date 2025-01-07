import styled from "styled-components";

interface ListItemProps {
  variant?: "default" | "loss" | "win" | "win_medium" | "win_hard";
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({
  variant = "default",
  children,
}) => {
  return <KenoButton suppressHydrationWarning>{children}</KenoButton>;
};

const KenoButton = styled.button`
  padding: 16px;
  border-radius: 8px;
  flex: 1;

  background: grey;

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
