// get the query client using useQueryClient

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  // using use Mutation to invalidate query to get updates in UI

  const { isLoading, mutate: createCabin } = useMutation({
    mutationFn: (data) => addCabin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("cabin successfully added");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, createCabin };
}
