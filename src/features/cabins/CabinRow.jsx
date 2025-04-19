import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function CabinRow({ cabin }) {
  // const clientQuery = useQueryClient();
  // //

  // const { isLoading, mutate } = useMutation({
  //   mutationFn: (id) => deleteCabin(id),
  //   onSuccess: () => {
  //     clientQuery.invalidateQueries({
  //       queryKey: ["cabin"],
  //     });
  //     toast.success("cabin successfully deleted");
  //   },

  //   onError: (err) => toast.err(err.message),
  // });

  const { isLoading, mutate } = useDeleteCabin();
  const { isLoading: isCreating, createCabin } = useCreateCabin();

  //
  const { image, regularPrice, maxCapacity, name, discount, id, description } =
    cabin;

  //
  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      image,
      regularPrice,
      maxCapacity,
      discount,
      description,
    });
  }

  // ------------------------------------------ jsx --------------------------------
  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin> {name}</Cabin>
        <div>fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <BtnContainer>
          {/* Edit  */}

          <Modal>
            <Modal.Open opens="edit">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            {/* Delete  */}
            <Modal.Open>
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window>
              <ConfirmDelete
                resourceName="cabin"
                disabled={isLoading}
                onConfirm={() => mutate(id)}
              />
            </Modal.Window>
          </Modal>

          {/* Duplicate  */}
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
        </BtnContainer>
      </TableRow>
    </>
  );
}
