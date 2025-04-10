import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useState } from "react";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort </p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm(!showForm)}>Add new Cabin</Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
