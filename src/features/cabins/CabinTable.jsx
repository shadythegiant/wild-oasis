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

  // 1 - Filter
  let filteredCabins;

  if (filterValue === "All") {
    filteredCabins = cabins;
  } else if (filterValue === "No-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === "With-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  // 2 - Sorting

  let sortedCabins;

  const sortBy = searchParams.get("sortBy") || "name-ascending";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "ascending" ? 1 : -1;

  console.log(modifier, field, direction);

  if (field === "name") {
    sortedCabins = filteredCabins.sort(
      (a, b) => a[field].localeCompare(b[field]) * modifier
    );
  } else {
    sortedCabins = filteredCabins.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  }

  console.log(sortedCabins);

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
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
