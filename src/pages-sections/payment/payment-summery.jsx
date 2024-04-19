import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider"; // LOCAL CUSTOM COMPONENT

import PaymentItem from "./payment-item"; // GLOBAL CUSTOM COMPONENTS

import { Paragraph } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION
import useCart from "hooks/useCart"; 
import api from "utils/__api__/shippings"
import { currency } from "lib";
export default function PaymentSummary({
  zipcode,
  handleShippingRateChanges,
  shippingRate
}) {
  const {
    state
  } = useCart();

  const fetchShippingRates = async () => {
    console.log({zipcode})
    if (zipcode === "") {
      alert("Please enter a valid zip code");
    } else {
      const response = await api.getShippingRates(zipcode)
      const rates = response.rate
      handleShippingRateChanges(rates)
    }
  }
  fetchShippingRates()

  const getTotalPrice = () => state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const getTotalTax = () => {
    const totalAmount = getTotalPrice(); // Replace 100 with your actual total amount
    const tax = totalAmount * 0.18;
    return tax
  }

  return <Card sx={{
    padding: {
      sm: 3,
      xs: 2
    }
  }}>
      <PaymentItem title="Subtotal:" amount={currency(getTotalPrice())} />
      <PaymentItem title="Shipping:" amount={currency(shippingRate)} />
      <PaymentItem title="Tax (Included in price)" amount={currency(getTotalTax())} />
      <PaymentItem title="Discount:" amount={0} />

      <Divider sx={{
      my: 2
    }} />

      <Paragraph fontSize={25} fontWeight={600} lineHeight={1} textAlign="right">
      {currency(getTotalPrice() + shippingRate)}
      </Paragraph>
    </Card>;
}