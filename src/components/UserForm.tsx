import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { userFields } from "../config/userFields";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export default function UserForm({
  open,
  onClose,
  onSubmit,
  defaultValues,
}: Props) {
  const validationSchema = useMemo(() => {
    const shape: any = {};
    userFields.forEach((field) => {
      let validator = yup.string();
      if (field.required) {
        validator = validator.required(`${field.label} is required`);
      }
      if (field.pattern) {
        validator = validator.matches(
          field.pattern,
          field.patternMessage || "Invalid format"
        );
      }
      shape[field.name] = validator;
    });
    return yup.object().shape(shape);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset(defaultValues || {});
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* HEADER */}
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight={700}>
            {defaultValues ? "Edit User" : "Add User"}
          </Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          onClose();
        })}
      >
        <DialogContent>
          <Grid container spacing={2}>
            {userFields.map((field) => (
              <Grid item xs={12} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  type={field.type}
                  {...register(field.name)}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message as string}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
