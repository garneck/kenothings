import styled from "styled-components";

const KenoLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <KenoLayoutStyled>{children}</KenoLayoutStyled>;

const KenoLayoutStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default KenoLayout;
