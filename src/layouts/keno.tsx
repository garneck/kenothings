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
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 32px;
`;

export default KenoLayout;
