import { useAuth } from "../AuthContext";

const Header = () => {

  const { user, logout } = useAuth();

  return (
    <>
    <h2>blogs</h2>
    <p>
      <p>{user.name} logged in </p>
      <button onClick={logout}>logout</button>
    </p>
    </>
  )
}

export default Header