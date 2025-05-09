import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

//Call createContext outside of any components to create a context.

//
// export default function AddCabin() {
//   const [IsmodalOpen, setIsmodalOpen] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setIsmodalOpen(!IsmodalOpen)}>
//         Add new Cabin
//       </Button>
//       {IsmodalOpen && (
//         <Modal onClose={() => setIsmodalOpen(false)}>
//           <CreateCabinForm onClose={() => setIsmodalOpen(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}
