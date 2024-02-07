const baseUrl = "/api/users";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const UsersView = () => {
  const {
    data: users,
    error,
    isPending,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: () => axios.get(baseUrl).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + users.error.message;

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;
