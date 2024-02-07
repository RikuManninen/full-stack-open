import { useLocation, useNavigate } from "react-router-dom";
import useHandleLike from "../hooks/useHandleLike";
import useRemoveBlog from "../hooks/useRemoveBlog";
import { useAuth } from "../AuthContext";
import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";

const BlogView = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  let { state: blog } = useLocation();

  const {
    data: blogData,
    error,
    isPending,
  } = useQuery({
    queryKey: ["blogData", blog],
    queryFn: () => blogService.get(blog.id),
  });

  const handleLike = useHandleLike(blogData);
  const removeBlog = useRemoveBlog(blogData);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + blogs.error.message;

  const handleRemove = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`) &&
      removeBlog();
    navigate("/");
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blogData.likes} likes</p>
      <button onClick={handleLike}>like</button>
      <p>added by {blog.user.name}</p>
      {user && blog.user.username === user.username && (
        <button onClick={handleRemove}>remove</button>
      )}
    </div>
  );
};
export default BlogView;
