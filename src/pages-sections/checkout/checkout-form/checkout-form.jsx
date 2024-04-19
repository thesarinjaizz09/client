import Link from "next/link";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { Formik } from "formik"; // DUMMY CUSTOM DATA
import useCart from "hooks/useCart"; 
import { getUser, updateUserFromApi } from 'utils/__api__/auth'

import ShippingForm from "./shipping-form";
import generate__hashing__key from "lib/generate-private-key";
export default function CheckoutForm({ zipcode, authToken, shippingRate }) {
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

  const initialValues = {
    shipping_zip: zipcode,
    shipping_name: "",
    shipping_email: "",
    shipping_contact: "",
    shipping_alt_contact: "",
    shipping_address1: "",
    shipping_address2: "",
    shipping_country: STATE_LIST[35],
    billing_zip: "",
    billing_name: "",
    billing_email: "",
    billing_contact: "",
    billing_company: "",
    billing_address1: "",
    billing_address2: "",
    billing_country: STATE_LIST[1]
  }; // uncomment these fields below for from validation

  const {
    state
  } = useCart();

  const getTotalPrice = () => state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const getTotalTax = () => {
    const totalAmount = getTotalPrice(); // Replace 100 with your actual total amount
    const tax = totalAmount * 0.18;
    return tax
  }

  const router = useRouter();

  const handleFormSubmit = async values => {
    if(authToken) {
      const userData = await getUser({authToken})
      if (userData.error) {
        alert(userData.error) 
      } else {
        var cartItems = []
        const cart = state.cart
        cart.forEach(item => {
          cartItems.push({
            _productId: item.id,
            _qty: item.qty,
            _name: item.name,
            _productImg: item.imgUrl,
            _price: item.price,
            _modelNumber: item.modelNumber
          })
        })
        const userUpdates = {
          _pendingOrders: [...userData._pendingOrders,{
            _orderNo: generate__hashing__key(20),
            _orderAddress: values.shipping_address1 + " " + values.shipping_address2 + ", " + values.shipping_country.name + " " + values.shipping_country.code + " - " + values.shipping_zip,
            _orderShippingDays: 5,
            _orderPhoneNumber: values.shipping_contact,
            _orderAltPhoneNumber: values.shipping_alt_contact,
            _orderEmail: values.shipping_email,
            _orderName: values.shipping_name,
            _orderStatus: "pending",
            _orderTotal: getTotalPrice() + shippingRate,
            _orderSubTotal: getTotalPrice(),
            _orderShippingRates: shippingRate,
            _orderTax: getTotalTax(),
            _orderDiscount: 0,
            _orderItems: cartItems
          }]
        } 
        const response = await updateUserFromApi(authToken, userUpdates);
        if(response.error) {
          alert(response.error);
        } else {
          router.push(`/payment/${response.data._pendingOrders[response.data._pendingOrders.length - 1]._orderNo}-${zipcode}`);
        }
      }
    } else {
      router.push(`/login`);
    }
  };

  return <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
      {({
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldValue
    }) => {

      return <form onSubmit={handleSubmit}>
            <ShippingForm zipcode={zipcode} values={values} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} />

            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <Button LinkComponent={Link} variant="outlined" color="primary" type="button" href="/cart" fullWidth>
                  Back to Cart
                </Button>
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Proceed to Payment
                </Button>
              </Grid>
            </Grid>
          </form>;
    }}
    </Formik>;
}


const checkoutSchema = yup.object().shape({
  // shipping_name: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  // shipping_contact: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_alt_contact: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.object().required("required"),
  // billing_address1: yup.string().required("required"),
});