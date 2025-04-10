import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: aliceblue;
  padding: 3.2rem 4.2rem;
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  grid-row: 1/-1;

  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}
