import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";

const H1 = styled.h1`
  font-size: 31px;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 5px;
  text-align: center;
  color: var(--color-brand-500);
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <H1>the Wild Oasis</H1>
      </div>
    </>
  );
}

export default App;
