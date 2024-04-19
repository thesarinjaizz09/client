"use client";

import Link from "next/link";
import { Fragment } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag"; // Local CUSTOM COMPONENTS
import { OrderCom } from "components/orderCom";
import { ShareCom } from "components/shareCom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { H3 } from "components/Typography";
import OrderRow from "../order-row";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import UserAnalytics from "../user-analytics";

// ====================================================
export default function OrdersPageView({  user }) {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={ShoppingBag} title="My Orders" />

      <UserAnalytics user={user} />

      {
        user._orders.length > 0 ? (
          <Grid
          container
          spacing={1}
          justifyContent="center"
          style={{ marginTop: "20px" }}
        >
          <Grid item xs={12} sm={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              bgcolor="#cfe8fc"
              border="1px solid #ddd"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              borderRadius="8px"
              padding="0px 20px"
            >
              <H3 style={{ marginTop: "10px" }}>My Orders</H3>
              {
                user._orders.map((order) => <OrderRow order={order} key={order.id} />)
              }
            </Box>
          </Grid>
        </Grid>
        ) : <>
        <OrderCom user={user} />
        <ShareCom user={user} />
        </>
      }

      

      {/* ORDER LIST AREA */}
      {/* {user._orders.length > 0 ? (
        user._orders.map((order) => <OrderRow order={order} key={order.id} />)
      ) : (
        <>
       <OrderCom user={user} />
       <ShareCom user={user} />
        </>
      )} */}

      {/* ORDERS PAGINATION */}
    </Fragment>
  );
}
