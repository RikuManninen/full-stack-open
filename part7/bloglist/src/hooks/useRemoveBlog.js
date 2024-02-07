import blogService from "../services/blogs";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const useRemoveBlog = (blog) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => blogService.remove(blog.id),
    onSuccess: () => {
      console.log("Blog deleted");
      queryClient.invalidateQueries({ queryKey: ["blogData"] });
    }
  });
  return mutate;
};

export default useRemoveBlog;