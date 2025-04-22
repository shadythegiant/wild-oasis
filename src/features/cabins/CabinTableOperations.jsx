import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

//
export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "All", label: "All" },
          { value: "No-discount", label: "No Discount" },
          { value: "With-discount", label: "With Discount" },
        ]}
      />
    </TableOperations>
  );
}
