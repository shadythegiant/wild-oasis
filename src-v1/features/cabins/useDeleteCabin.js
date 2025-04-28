import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const clientQuery = useQueryClient();
  //

  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("cabin successfully deleted");
    },

    onError: (error) => toast.error(error.message),
  });

  return { isLoading, mutate };
}
