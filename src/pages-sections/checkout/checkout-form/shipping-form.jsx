import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete"; // GLOBAL CUSTOM COMPONENT

import { H6 } from "components/Typography"; // DUMMY CUSTOM DATA

import countryList from "data/countryList"; // ==============================================================

// ==============================================================
export default function ShippingForm({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  zipcode
}) {

  const STATE_LIST = [
    {
    "code": "AN",
    "name": "Andaman and Nicobar Islands"
    },
    {
    "code": "AP",
    "name": "Andhra Pradesh"
    },
    {
    "code": "AR",
    "name": "Arunachal Pradesh"
    },
    {
    "code": "AS",
    "name": "Assam"
    },
    {
    "code": "BR",
    "name": "Bihar"
    },
    {
    "code": "CG",
    "name": "Chandigarh"
    },
    {
    "code": "CH",
    "name": "Chhattisgarh"
    },
    {
    "code": "DH",
    "name": "Dadra and Nagar Haveli"
    },
    {
    "code": "DD",
    "name": "Daman and Diu"
    },
    {
    "code": "DL",
    "name": "Delhi"
    },
    {
    "code": "GA",
    "name": "Goa"
    },
    {
    "code": "GJ",
    "name": "Gujarat"
    },
    {
    "code": "HR",
    "name": "Haryana"
    },
    {
    "code": "HP",
    "name": "Himachal Pradesh"
    },
    {
    "code": "JK",
    "name": "Jammu and Kashmir"
    },
    {
    "code": "JH",
    "name": "Jharkhand"
    },
    {
    "code": "KA",
    "name": "Karnataka"
    },
    {
    "code": "KL",
    "name": "Kerala"
    },
    {
    "code": "LD",
    "name": "Lakshadweep"
    },
    {
    "code": "MP",
    "name": "Madhya Pradesh"
    },
    {
    "code": "MH",
    "name": "Maharashtra"
    },
    {
    "code": "MN",
    "name": "Manipur"
    },
    {
    "code": "ML",
    "name": "Meghalaya"
    },
    {
    "code": "MZ",
    "name": "Mizoram"
    },
    {
    "code": "NL",
    "name": "Nagaland"
    },
    {
    "code": "OR",
    "name": "Odisha"
    },
    {
    "code": "PY",
    "name": "Puducherry"
    },
    {
    "code": "PB",
    "name": "Punjab"
    },
    {
    "code": "RJ",
    "name": "Rajasthan"
    },
    {
    "code": "SK",
    "name": "Sikkim"
    },
    {
    "code": "TN",
    "name": "Tamil Nadu"
    },
    {
    "code": "TS",
    "name": "Telangana"
    },
    {
    "code": "TR",
    "name": "Tripura"
    },
    {
    "code": "UP",
    "name": "Uttar Pradesh"
    },
    {
    "code": "UK",
    "name": "Uttarakhand"
    },
    {
    "code": "WB",
    "name": "West Bengal"
    }
    ]

  return <Card sx={{
    mb: 4,
    p: 3
  }}>
      <H6 mb={2}>Shipping Address</H6>

      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <TextField fullWidth sx={{
          mb: 2
        }} label="Full Name" onBlur={handleBlur} name="shipping_name" onChange={handleChange} value={values.shipping_name} error={!!touched.shipping_name && !!errors.shipping_name} helperText={touched.shipping_name && errors.shipping_name} />

          <TextField fullWidth sx={{
          mb: 2
        }} onBlur={handleBlur} label="Phone Number" onChange={handleChange} name="shipping_contact" value={values.shipping_contact} error={!!touched.shipping_contact && !!errors.shipping_contact} helperText={touched.shipping_contact && errors.shipping_contact} />

          <TextField fullWidth type="number" sx={{
          mb: 2
        }} label="Zip Code" name="shipping_zip" onBlur={handleBlur} onChange={handleChange} value={values.shipping_zip ? values.shipping_zip : zipcode} error={!!touched.shipping_zip && !!errors.shipping_zip} helperText={touched.shipping_zip && errors.shipping_zip} />

          <TextField fullWidth label="Address 1" onBlur={handleBlur} onChange={handleChange} name="shipping_address1" value={values.shipping_address1} error={!!touched.shipping_address1 && !!errors.shipping_address1} helperText={touched.shipping_address1 && errors.shipping_address1} />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField fullWidth type="email" sx={{
          mb: 2
        }} onBlur={handleBlur} name="shipping_email" label="Email Address" onChange={handleChange} value={values.shipping_email} error={!!touched.shipping_email && !!errors.shipping_email} helperText={touched.shipping_email && errors.shipping_email} />

          <TextField fullWidth sx={{
          mb: 2
        }} label="Alt Number" onBlur={handleBlur} onChange={handleChange} name="shipping_alt_contact" value={values.shipping_alt_contact} error={!!touched.shipping_alt_contact && !!errors.shipping_alt_contact} helperText={touched.shipping_alt_contact && errors.shipping_alt_contact} />

<Autocomplete fullWidth sx={{
          mb: 2
        }} options={STATE_LIST} value={values.shipping_country} getOptionLabel={option => option.name} onChange={(_, value) => setFieldValue("shipping_country", value)} renderInput={params => <TextField label="State" variant="outlined" placeholder="Select State" error={!!touched.shipping_country && !!errors.shipping_country} helperText={touched.shipping_country && errors.shipping_country} {...params} />} />


          <TextField fullWidth label="Address 2" onBlur={handleBlur} onChange={handleChange} name="shipping_address2" value={values.shipping_address2} error={!!touched.shipping_address2 && !!errors.shipping_address2} helperText={touched.shipping_address2 && errors.shipping_address2} />
        </Grid>
      </Grid>
    </Card>;
}