import blogService from "../services/blogs";
import loginService from "../services/login";
import { useState } from "react";
import useNotification from "../hooks/useNotification";
import { useAuth } from "../AuthContext";

const LoginView = () => {
  const { login } = useAuth();

  const showNotification = useNotification();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login({ username, password });
      showNotification({ message: "Successfully logged in", type: "success" });
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      showNotification({ message: "Wrong credentials", type: "error" });
    }
    console.log("logging in with", username, password);
  };

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

export default LoginView;
