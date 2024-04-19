"use client";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import './phone.css'
import * as yup from "yup"; // LOCAL CUSTOM COMPONENTS
// import OtpInput from "otp-input-react"
import "react-phone-input-2/lib/style.css";
import { toast, Toaster } from "react-hot-toast";
import { sendOtp, verifyotp, getUser } from "utils/__api__/auth";

import usePasswordVisible from "../use-password-visible"; // GLOBAL CUSTOM COMPONENTS

import BazaarTextField from "components/BazaarTextField"; // ==============================================================

// ==============================================================
const PhonePageView = ({ closeDialog }) => {
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible(); // LOGIN FORM FIELDS INITIAL VALUES
  const router = useRouter();
  const [showOtp, setShowOtp] = useState(false)

  const onSignup = async (name, number) => {
    if (number === "") {
      toast.error("Please enter phone number...")
    } else {
      const response = await sendOtp({ name, number })
      if (response.error) {
        toast.error(response.error)
      } else {
        toast.success(response.message)
        setShowOtp(true)
      }
    }
  }

  const verifyOtp = async (otpCode) => {
    if (otpCode === "") {
      toast.error("Please enter otp...")
    } else {
      const authToken = localStorage.getItem(
        process.env.NEXT_PUBLIC_NCTEDGE_USER_AUTHTOKEN_KEY
      );
      const response = await verifyotp({ authToken, otp: otpCode })
      if (response.error) {
        toast.error(response.error)
      } else {
        const newRes = await getUser({ authToken });
        if(newRes.error) {
          toast.error(newRes.error.message)
        } else {
          closeDialog?.()
          router.push(`/profile/${JSON.parse(authToken)}`)
        }
      }
    }
  }

  const initialValues = {
    name: "",
    number: "",
    edge: ""
  }; // LOGIN FORM FIELD VALIDATION SCHEMA

  const validationSchema = yup.object().shape({
    number: yup.string().required("Number is required"),
    name: yup.string().required("Name is required"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        if (values.edge !== "") {
          verifyOtp(values.edge)
        } else {
          onSignup(values.name, values.number)
        }
      },
    });
  return (<>
    <Toaster toastOptions={{ duration: 4000 }} />
    <div id="recaptcha-container"></div>
    <form onSubmit={handleSubmit}>
      {
        showOtp ? null : <>
      <BazaarTextField
        mb={1.5}
        fullWidth
        name="name"
        size="small"
        type="text"
        variant="outlined"
        onBlur={handleBlur}
        value={values.name}
        onChange={handleChange}
        label="Name"
        placeholder="Ralph Lauren"
        error={!!touched.name && !!errors.name}
        helperText={touched.name && errors.name}
      />
      <BazaarTextField
        mb={1.5}
        fullWidth
        name="number"
        size="small"
        type="text"
        variant="outlined"
        onBlur={handleBlur}
        value={values.number}
        onChange={handleChange}
        label="Number"
        placeholder="99850000XX"
        error={!!touched.number && !!errors.number}
        helperText={touched.number && errors.number}
      />
        </>
      }


      {
        showOtp ? <BazaarTextField
        mb={1.5}
        fullWidth
        name="edge"
        size="small"
        type="text"
        variant="outlined"
        onBlur={handleBlur}
        value={values.edge}
        onChange={handleChange}
        label="Verification Code"
        placeholder="******"
      /> : ""
      }

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

export default PhonePageView;
