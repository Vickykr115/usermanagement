import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { userFields } from "../config/userFields";

interface Props {
  users: any[];
  onEdit: (user: any) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({
  users,
  onEdit,
  onDelete,
}: Props) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
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
            <TableRow key={user.id} hover>
              {userFields.map((field) => (
                <TableCell key={field.name}>
                  {user[field.name]}
                </TableCell>
              ))}
              <TableCell align="center">
                <IconButton onClick={() => onEdit(user)}>
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete(user.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
