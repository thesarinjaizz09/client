import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField"; // LOCAL CUSTOM COMPONENT

import ListItem from "../list-item"; // GLOBAL CUSTOM COMPONENTS
import useCart from "hooks/useCart"; // GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION
import api from "utils/__api__/shippings"
import { currency } from "lib";
export default function CheckoutSummary({
  zipcode,
  shippingRate,
  handleShippingRateChanges
}) {
  const fetchShippingRates = async () => {
    if (zipcode === "") {
      alert("Please enter a valid zip code");
    } else {
      const response = await api.getShippingRates(zipcode)
      const rates = response.rate
      handleShippingRateChanges(rates)
    }
  }
  fetchShippingRates()

  const {
    state
  } = useCart();

  const getTotalPrice = () => state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const getTotalTax = () => {
    const totalAmount = getTotalPrice(); // Replace 100 with your actual total amount
    const tax = totalAmount * 0.18;
    return tax
  }

  return <Card sx={{
    p: 3
  }}>
      <ListItem mb={1} title="Subtotal" value={currency(getTotalPrice())} />
      <ListItem mb={1} title="Shipping" value={shippingRate} />
      <ListItem mb={1} title="Tax (Included in price)" value={currency(getTotalTax())} />
      <ListItem mb={1} title="Discount" />

      <Divider sx={{
      my: 2
    }} />

      <Paragraph fontSize={25} fontWeight={600} lineHeight={1}>
        {currency(getTotalPrice() + shippingRate)}
      </Paragraph>

      {/* <Stack spacing={2} mt={3}>
        <TextField placeholder="Voucher" variant="outlined" size="small" fullWidth />
        <Button variant="outlined" color="primary" fullWidth>
          Apply Voucher
        </Button>
      </Stack> */}
    </Card>;
}