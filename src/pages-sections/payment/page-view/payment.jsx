"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid"; // Local CUSTOM COMPONENTS

import PaymentForm from "../payment-form";
import PaymentSummary from "../payment-summery";
export default function PaymentPageView({
  zipcode,
  orderId,
  authToken
}) {

  const [shippingRate, setShippingRate] = useState(0)
  const handleShippingRateChanges = (rate) => {
    setShippingRate(rate)
  }

  return <Grid container flexWrap="wrap-reverse" spacing={3}>
      <Grid item lg={8} md={8} xs={12}>
        <PaymentForm orderId={orderId} authToken={authToken} />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <PaymentSummary zipcode={zipcode} shippingRate={shippingRate} handleShippingRateChanges={handleShippingRateChanges} />
      </Grid>
    </Grid>;
}