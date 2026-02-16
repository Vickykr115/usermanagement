import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
// Using the specific Grid v1 path to bypass the "No overload matches" error
// import Grid from '@mui/material/Grid'; 
import { Grid } from '@mui/material';
import { formFields } from '../config/formFields';
import type { User } from '../types';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  defaultValues?: User;
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const validationSchema = yup.object().shape(
    formFields.reduce((schema, field) => {
      let validator = yup.string();
      if (field.required) {
        validator = validator.required(`${field.label} is required`);
      }
      if (field.pattern) {
        validator = validator.matches(field.pattern, field.patternMessage || 'Invalid format');
      }
      return { ...schema, [field.name]: validator };
    }, {})
  );

  // Use <any> to allow dynamic string indexing for errors[field.name]
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  // FIX: Clear form when opening for "Add", or populate for "Edit"
  React.useEffect(() => {
    if (open) {
      if (defaultValues) {
        reset(defaultValues);
      } else {
        // Reset all fields to empty strings based on your config
        const emptyState = formFields.reduce((acc, field) => ({ 
          ...acc, 
          [field.name]: '' 
        }), {});
        reset(emptyState);
      }
    }
  }, [open, defaultValues, reset]);

  const onFormSubmit = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{defaultValues ? 'Edit User' : 'Add User'}</DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            {formFields.map((field) => (
              <Grid item xs={12} key={field.name}>
                <TextField
                  {...register(field.name)}
                  label={field.label}
                  type={field.type}
                  fullWidth
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message as string}
                  InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserForm;