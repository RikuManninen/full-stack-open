import { useAuth } from "../AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <nav style={{ background: "lightgrey", display: "flex", gap: ".5em", padding: ".5em"}}>
        <a href="/">
          blogs
        </a>
        <a href="/users">
          users
        </a>
          {user.name} logged in <button onClick={logout}>logout</button>{" "}
      </nav>
      <h2>blog app</h2>
    </>
  );
};

export default Header;
