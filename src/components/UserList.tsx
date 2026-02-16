import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import type { User } from "../types";

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  loading,
  error,
  onEdit,
  onDelete,
}) => {
  // ✅ Loader
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  // ✅ Error
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        {error}
      </Alert>
    );
  }

  // ✅ No Users
  if (!users.length) {
    return (
      <Typography color="text.secondary" mt={3}>
        No users found. Add your first user 🚀
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>
              <b>First Name</b>
            </TableCell>
            <TableCell>
              <b>Last Name</b>
            </TableCell>
            <TableCell>
              <b>Phone</b>
            </TableCell>
            <TableCell>
              <b>Email</b>
            </TableCell>
            <TableCell align="center">
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              hover
              sx={{
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "#f0f7ff",
                },
              }}
            >
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.email}</TableCell>

              <TableCell align="center">
                <IconButton onClick={() => onEdit(user)} color="primary">
                  <Edit />
                </IconButton>

                <IconButton onClick={() => onDelete(user.id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
