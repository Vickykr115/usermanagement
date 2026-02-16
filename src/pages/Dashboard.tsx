import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import ConfirmDialog from "../components/ConfirmDialog";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userApis";

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingUser, setEditingUser] = useState<any>();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState("");
  const [snackbarType, setSnackbarType] = useState<
    "success" | "error" | "info"
  >("success");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setSnackbarType("error");
      setSnackbar("Error loading users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      if (editingUser?.id) {
        await updateUser(editingUser.id, data);
        setSnackbarType("success");
        setSnackbar("User updated successfully");
      } else {
        await createUser(data);
        setSnackbarType("success");
        setSnackbar("User created successfully");
      }
      fetchUsers();
    } catch {
      setSnackbarType("error");
      setSnackbar("Operation failed");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteUser(deleteId);
      setDeleteId(null);
      setSnackbarType("success");
      setSnackbar("User deleted successfully");
      fetchUsers();
    } catch {
      setSnackbarType("error");
      setSnackbar("Delete failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        maxWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#e3f2fd,#fce4ec)",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        {/* MAIN CARD */}
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* HEADER BAR */}
          <Box
            sx={{
              px: 3,
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(90deg,#1976d2,#1565c0)",
              color: "#fff",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              User Management
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#fff",
                color: "#1565c0",
                fontWeight: 600,
                borderRadius: 2,
                px: 2,
                "&:hover": {
                  backgroundColor: "#f2f2f2",
                },
              }}
              onClick={() => {
                setEditingUser(undefined);
                setOpenForm(true);
              }}
            >
              Add User
            </Button>
          </Box>

          {/* CONTENT */}
          <Box sx={{ p: 3 }}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  py: 6,
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <UserTable
                users={users}
                onEdit={(user) => {
                  setEditingUser(user);
                  setOpenForm(true);
                }}
                onDelete={(id) => setDeleteId(id)}
              />
            )}
          </Box>
        </Paper>
      </Container>

      {/* MODAL: USER FORM */}
      <UserForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        defaultValues={editingUser}
      />

      {/* MODAL: CONFIRM DELETE */}
      <ConfirmDialog
        open={!!deleteId}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

      {/* SNACKBAR */}
      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbarType} variant="filled">
          {snackbar}
        </Alert>
      </Snackbar>
    </Box>
  );
}
