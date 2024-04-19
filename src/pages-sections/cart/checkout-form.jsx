import Link from "next/link"; // MUI

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import useCart from "hooks/useCart"; // GLOBAL CUSTOM COMPONENTS

import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box"; // DUMMY CUSTOM DATA
import api from "utils/__api__/shippings"

import { currency } from "lib";
export default function CheckoutForm({
  zipCode,
  handleZipChange,
  shippingRates,
  rateClac,
  handleShippingRateChange,
}) {
  const {
    state
  } = useCart();

  const getTotalPrice = () => state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const fetchShippingRates = async () => {
    const zipCode = document.getElementById("USER_ZIPCODE").value;
    if (zipCode === "") {
      alert("Please enter a valid zip code");
    } else {
      handleZipChange(zipCode);
      const response = await api.getShippingRates(zipCode)
      const rates = response.rate
      handleShippingRateChange(rates)
    }
  }

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
    padding: 3
  }}>
      <FlexBetween mb={2}>
        <Span color="grey.600">Total:</Span>

        <Span fontSize={18} fontWeight={600} lineHeight="1">
          {currency(getTotalPrice())}
        </Span>
      </FlexBetween>

      {
        rateClac ? <FlexBetween mb={2}>
        <Span color="grey.600">Shipping Rates:</Span>

        <Span fontSize={18} fontWeight={600} lineHeight="1">
          {currency(shippingRates)}
        </Span>
      </FlexBetween> : null
      }

      <Divider sx={{
      mb: 2
    }} />

    {
      rateClac ? null : <>      <Span fontWeight={600} mb={2} display="block">
      Shipping Estimates
    </Span>

    <TextField fullWidth size="small" label="Country" value={'India'} variant="outlined" sx={{
    mb: 2
  }} />

    <TextField select fullWidth size="small" label="State" variant="outlined" placeholder="Select State" defaultValue="WB">
      {STATE_LIST.map(({
      code,
      name
    }) => <MenuItem value={code} key={name}>
          {name}
        </MenuItem>)}
    </TextField>

    <TextField id="USER_ZIPCODE" fullWidth size="small" label="Zip Code" placeholder="000 000" variant="outlined" sx={{
    mt: 2
  }} />

    <Button variant="outlined" color="primary" fullWidth sx={{
    my: 2
  }} onClick={fetchShippingRates}>
      Calculate Shipping
    </Button></>
    }



      {rateClac ? <Button fullWidth color="primary" href={`/checkout/${zipCode}`} variant="contained" LinkComponent={Link}>
        Checkout Now
      </Button> : null}
    </Card>;
}