"use client";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // FORMIK
import { toast, Toaster } from "react-hot-toast";

import { Formik } from "formik"; // YUP

import * as yup from "yup"; // CUSTOM DATA MODEL
import { updateUserInfo } from "utils/__api__/auth"

// ==============================================================
export default function ProfileEditForm({
  user,
  authToken
}) {
  const INITIAL_VALUES = {
    email: user._email || "",
    contact: user._number || "",
    name: user._name,
  };
  const VALIDATION_SCHEMA = yup.object().shape({
    name: yup.string().required("First name is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    contact: yup.string().required("Contact is required"),
  });

  const handleFormSubmit = async values => {
    const userUpdates = {
      _name: values.name,
      _email: values.email,
      _number: values.contact
    }
    const response = await updateUserInfo(authToken, userUpdates)
    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success(response.message)
    }
  };

  return <Formik onSubmit={handleFormSubmit} initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA}>
      {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue
    }) => <form onSubmit={handleSubmit}>
    <Toaster toastOptions={{ duration: 4000 }} />
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField fullWidth name="name" label="Name" onBlur={handleBlur} onChange={handleChange} value={values.name} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField fullWidth name="email" type="email" label="Email" onBlur={handleBlur} value={values.email} onChange={handleChange} error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Phone" name="contact" onBlur={handleBlur} value={values.contact} onChange={handleChange} error={!!touched.contact && !!errors.contact} helperText={touched.contact && errors.contact} />
            </Grid>

            {/* <Grid item md={6} xs={12}>
              <DatePicker label="Birth Date" value={values.birth_date} onChange={newValue => setFieldValue("birth_date", newValue)} slots={{
            textField: TextField
          }} slotProps={{
            textField: {
              sx: {
                mb: 1
              },
              size: "small",
              fullWidth: true,
              error: Boolean(!!touched.birth_date && !!errors.birth_date),
              helperText: touched.birth_date && errors.birth_date
            }
          }} />
            </Grid> */}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>}
    </Formik>;
}