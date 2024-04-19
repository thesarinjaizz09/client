"use client";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup"; // LOCAL CUSTOM COMPONENTS

import EyeToggleButton from "../components/eye-toggle-button"; // LOCAL CUSTOM HOOK

import usePasswordVisible from "../use-password-visible"; // GLOBAL CUSTOM COMPONENTS

import BazaarTextField from "components/BazaarTextField"; // ==============================================================
import { toast, Toaster } from "react-hot-toast";

// ==============================================================
import { getUser, loginUserWithEmail } from "utils/__api__/auth";
const LoginPageView = ({ closeDialog }) => {
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible(); // LOGIN FORM FIELDS INITIAL VALUES
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  }; // LOGIN FORM FIELD VALIDATION SCHEMA

  const validationSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    email: yup.string().email().required("Email is required"),
  });

  const loginUserFromEmail = async (loginUserEmailId, loginUserPassword) => {
    const res = await loginUserWithEmail(loginUserEmailId, loginUserPassword);
    if(res.error) {
      toast.error(res.error)
    } else {
      toast(res.message)
      const authToken = localStorage.getItem(
        process.env.NEXT_PUBLIC_NCTEDGE_USER_AUTHTOKEN_KEY
      );
      const newRes = await getUser({ authToken });
      if(newRes.error) {
        toast.error(newRes.error.message)
      } else {
        closeDialog?.()
        router.push(`/profile/${JSON.parse(authToken)}`)
      }
    }

  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        loginUserFromEmail(values.email, values.password);
      },
    });

  return (<>
    <Toaster toastOptions={{ duration: 4000 }} />
    <form onSubmit={handleSubmit}>
      <BazaarTextField
        mb={1.5}
        fullWidth
        id="email"
        name="email"
        size="small"
        type="email"
        variant="outlined"
        onBlur={handleBlur}
        value={values.email}
        onChange={handleChange}
        label="Email"
        placeholder="exmple@mail.com"
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email}
      />

      <BazaarTextField
        mb={2}
        fullWidth
        size="small"
        id="password"
        name="password"
        label="Password"
        autoComplete="on"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        placeholder="*********"
        type={visiblePassword ? "text" : "password"}
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password}
        InputProps={{
          endAdornment: (
            <EyeToggleButton
              show={visiblePassword}
              click={togglePasswordVisible}
            />
          ),
        }}
      />

      <Button
        type="submit"
        fullWidth
        color="primary"
        variant="contained"
        size="large"
      >
        Login
      </Button>
    </form>
    </>
  );
};

export default LoginPageView;
