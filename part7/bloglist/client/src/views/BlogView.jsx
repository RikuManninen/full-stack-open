import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useHandleLike from '../hooks/useHandleLike';
import useRemoveBlog from '../hooks/useRemoveBlog';
import { useAuth } from '../AuthContext';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import blogService from '../services/blogs';
import CommentForm from '../components/CommentForm';
import { Typography, Button, Card, CardContent, Link as MuiLink, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
const CommentsList = ({ comments }) => {
  return (
    comments.length > 0 ? (
    <Paper elevation={2} sx={{ maxWidth: 600, mt: 2, mb: 2 }}>
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index} divider={index !== comments.length - 1}>
            <ListItemText primary={comment} />
          </ListItem>
        ))}
      </List>
    </Paper>
    ) : (
      <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
        No comments yet
      </Typography>
    )
  );
};

const BlogView = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state: blog } = useLocation();

  const { data: blogData, error, isPending } = useQuery({
    queryKey: ['blogData', blog.id],
    queryFn: () => blogService.get(blog.id),
  });

  const handleLike = useHandleLike(blogData);
  const removeBlog = useRemoveBlog(blogData);

  const mutation = useMutation({
    mutationFn: updatedBlog => blogService.put(updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogData']);
    },
  });

  const createComment = comment => {
    const comments = Array.isArray(blogData.comments) ? blogData.comments.concat(comment) : [comment];
    const updatedBlog = { ...blogData, comments };
    mutation.mutate(updatedBlog);
  };

  const handleRemove = () => {
    window.confirm(`Remove blog ${blogData.title} by ${blogData.author}`) && removeBlog();
    navigate('/');
  };

  if (isPending) return <Typography>Loading...</Typography>;

  if (error) return <Typography>An error has occurred: {error.message}</Typography>;

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {blogData.title}
        </Typography>
        <Button href={blogData.url} variant='contained' sx={{ mt: 2 }} target="_blank" rel="noopener noreferrer">
          Visit Blog
        </Button>
        <Typography sx={{ mt: 2 }} paragraph>{blogData.likes} likes</Typography>
        <Button variant="outlined" onClick={handleLike} startIcon={<ThumbUpIcon />}>
          Like
        </Button>
        <Typography sx={{ mt: 2 }} color="text.secondary" paragraph>Added by {blog.user.name}</Typography>
        {user && blog.user.username === user.username && (
          <Button variant="contained" color="error" onClick={handleRemove}>
            Remove
          </Button>
        )}
        <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
          Comments
        </Typography>
        <CommentForm createComment={createComment} />
        <CommentsList comments={blogData.comments} />
      </CardContent>
    </Paper>
  );
};

export default BlogView;
