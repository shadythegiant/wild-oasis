import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
//   margin-top: 2rem;
// `;

export default function CabinTable() {
  // const {
  //   data: cabins,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["cabin"],
  //   queryFn: getCabins,
  // });

  const { cabins, isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "All";
  console.log(filterValue);

  let filteredCabins;

  if (filterValue === "All") {
    filteredCabins = cabins;
  } else if (filterValue === "No-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === "With-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  console.log(filteredCabins);
  // ------------------------------------------------------------------
  if (isLoading) return <Spinner />;

  //  // ------------------------------------------------------------

  return (
    <Menus>
      <Table columns="2fr 2fr 2.2fr 1fr 5fr 1fr ">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
