import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
const useHandleLike = (blog) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: blogService.put,
    onSuccess: (returnedBlog) => {
      console.log("Blog liked:", returnedBlog);
      queryClient.invalidateQueries({ queryKey: ["blogData"] });
    },
  });

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    mutate(updatedBlog);
  };

  return handleLike;
};

export default useHandleLike;
