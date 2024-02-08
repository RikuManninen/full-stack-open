import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link
} from "@mui/material";

const baseUrl = "/api/users";

const UsersView = () => {
  const { data: users, error, isPending } = useQuery({
    queryKey: ["userData"],
    queryFn: () => axios.get(baseUrl).then(res => res.data),
  });

  if (isPending) return <Typography>Loading...</Typography>;

  if (error) return <Typography>An error has occurred: {error.message}</Typography>;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 650, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>Users</Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Blogs Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id} hover>
              <TableCell component="th" scope="row">
                <Link component={RouterLink} to={`/users/${user.id}`} state={user} underline="none">
                  {user.name}
                </Link>
              </TableCell>
              <TableCell align="right">{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersView;
