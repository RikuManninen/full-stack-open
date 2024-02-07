import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const useHandleLike = (blog) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedBlog) => blogService.put(updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogData"]);
    },
  });

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    mutation.mutate(updatedBlog);
  };

  return handleLike;
};

export default useHandleLike;