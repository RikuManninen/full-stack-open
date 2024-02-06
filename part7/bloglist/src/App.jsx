import React, { useState, useEffect, useContext } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { NotificationContext } from "./Providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useNotification = () => useContext(NotificationContext);

const baseUrl = "/api/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state: notificationState, dispatch: notificationDispatch } =
    useNotification();

  const queryClient = useQueryClient();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const msg = (obj) => {
    console.log(obj);
    notificationDispatch({ type: "SET_MESSAGE", payload: obj });
    setTimeout(() => notificationDispatch({ type: "CLEAR_MESSAGE" }), 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      msg({ message: "Successfully logged in", type: "success" });
    } catch (exception) {
      console.log("wrong credentials");
      msg({ message: "Wrong credentials", type: "error" });
    }
    console.log("logging in with", username, password);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    console.log("logged out");
  };

  const handleLike = (blog, likes, setLikes) => {
    const blogObject = {
      id: blog.id,
      user: blog.user,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    blogService.put(blogObject).then((returnedBlog) => {
      setLikes(returnedBlog.likes);
    });
  };

  const mutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (returnedBlog) => {
      console.log("Blog added:", returnedBlog);
      queryClient.invalidateQueries({ queryKey: ["blogData"] });
      msg({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: "success",
      });
    },
  });

  const createBlog = async (blogObject) => {
    mutation.mutate(blogObject);
  };

  const LoginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const BlogView = () => {
    const {
      data: blogs,
      error,
      isPending,
    } = useQuery({
      queryKey: ["blogData"],
      queryFn: () => axios.get(baseUrl).then((res) => res.data),
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + blogs.error.message;

    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>

        <BlogForm createBlog={createBlog} />

        {sortedBlogs?.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} />
        ))}
      </div>
    );
  };

  return (
    <>
      <Notification message={notificationState.message} />
      {!user ? <LoginForm /> : <BlogView />}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
