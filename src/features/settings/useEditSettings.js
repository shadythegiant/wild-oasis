import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useEditSettings() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editSetting } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("settings successfully edited");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editSetting };
}
