import { useState, useEffect } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import * as userApi from './api/userApis';
import type { User } from './types';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userApi.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (data: Omit<User, 'id'>) => {
    try {
      const newUser = await userApi.createUser(data);
      setUsers([...users, newUser]);
      showSnackbar('User created successfully', 'success');
    } catch {
      showSnackbar('Failed to create user', 'error');
    }
  };

  const handleUpdate = async (data: Omit<User, 'id'>) => {
    if (!editingUser) return;
    try {
      const updatedUser = await userApi.updateUser(editingUser.id, { ...editingUser, ...data });
      setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
      showSnackbar('User updated successfully', 'success');
    } catch {
      showSnackbar('Failed to update user', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await userApi.deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
      showSnackbar('User deleted successfully', 'success');
    } catch {
      showSnackbar('Failed to delete user', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const openCreateForm = () => {
    setEditingUser(undefined);
    setFormOpen(true);
  };

  const openEditForm = (user: User) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Management
          </Typography>
          <Button color="inherit" startIcon={<AddIcon />} onClick={openCreateForm}>
            Add User
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <UserList
          users={users}
          loading={loading}
          error={error}
          onEdit={openEditForm}
          onDelete={handleDelete}
        />
      </Container>
      <UserForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={editingUser ? handleUpdate : handleCreate}
        defaultValues={editingUser}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;