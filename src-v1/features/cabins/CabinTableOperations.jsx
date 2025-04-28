import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

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

      <SortBy
        options={[
          { value: "name-ascending", label: "sort by Name  (A-Z)" },
          { value: "name-descending", label: "sort by Name  (Z-A)" },
          {
            value: "regularPrice-descending",
            label: "sort by price  (high first )",
          },
          {
            value: "regularPrice-ascending",
            label: "sort by price  (low first)",
          },
          {
            value: "maxCapacity-ascending",
            label: "sort by capacity  (low first)",
          },

          {
            value: "maxCapacity-descending",
            label: "sort by capacity  (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}
