import { useLocation, useNavigate } from "react-router-dom";
import useHandleLike from "../hooks/useHandleLike";
import useRemoveBlog from "../hooks/useRemoveBlog";
import { useAuth } from "../AuthContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import blogService from "../services/blogs";
import CommentForm from "../components/CommentForm";

const BlogView = () => {
  const queryClient = useQueryClient();
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
  
  const mutation = useMutation({
    mutationFn: (updatedBlog) => blogService.put(updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogData"]);
    },
  });

  const createComment = (comment) => {
    const comments = Array.isArray(blogData.comments) ? blogData.comments.concat(comment) : [comment];
    const updatedBlog = { ...blogData, comments };
    mutation.mutate(updatedBlog);
  };

  const handleRemove = () => {
    window.confirm(`Remove blog ${blogData.title} by ${blogData.author}`) &&
      removeBlog();
    navigate("/");
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2>{blogData.title}</h2>
      <a href={blogData.url}>{blogData.url}</a>
      <p>{blogData.likes} likes</p>
      <button onClick={handleLike}>like</button>
      <p>added by {blogData.user.name}</p>
      {user && blogData.user.username === user.username && (
        <button onClick={handleRemove}>remove</button>
      )}
      <h3>comments</h3>
      <CommentForm createComment={createComment} />
      {blogData.comments.length > 0 ? (
        <ul>
          {blogData.comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};
export default BlogView;
