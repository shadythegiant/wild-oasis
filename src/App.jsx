import GlobalStyle from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

function App() {
  return (
    <>
      <GlobalStyle />

      <div>
        <Row type="horizontal">
          <Heading as="h1">the Wild Oasis</Heading>
          <Button sizes="large" variations="danger">
            Hey there{" "}
          </Button>
          <Input type="number" placeholder="number of guests "></Input>
        </Row>
      </div>
    </>
  );
}

export default App;
