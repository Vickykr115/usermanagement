import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { userFields } from "../config/userFields";

interface Props {
  users: any[];
  onEdit: (user: any) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
  if (!users.length) {
    return (
      <Typography color="text.secondary" textAlign="center" py={5}>
        No users found. Add your first user 🚀
      </Typography>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #eee",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f7f9fc" }}>
            {userFields.map((field) => (
              <TableCell key={field.name}>
                <b>{field.label}</b>
              </TableCell>
            ))}
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
                "&:hover": { backgroundColor: "#f0f7ff" },
              }}
            >
              {userFields.map((field) => (
                <TableCell key={field.name}>
                  {user[field.name]}
                </TableCell>
              ))}

              <TableCell align="center">
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                  <IconButton
                    onClick={() => onEdit(user)}
                    sx={{
                      border: "1px solid #dbeafe",
                      borderRadius: 2,
                    }}
                  >
                    <Edit />
                  </IconButton>

                  <IconButton
                    onClick={() => onDelete(user.id)}
                    color="error"
                    sx={{
                      border: "1px solid #fee2e2",
                      borderRadius: 2,
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
