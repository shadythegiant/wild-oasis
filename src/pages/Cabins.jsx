import CabinTable from "../features/cabins/CabinTable";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  // const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        {/* <Button onClick={() => setShowForm(!showForm)}>Add new Cabin</Button>
        {showForm && <CreateCabinForm />} */}
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
