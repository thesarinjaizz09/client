"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
// ============================================================
const OrderCom = async ({ user }) => {
  return (

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
            bgcolor="rgba(43, 52, 69, 0.95)"
            color= "white"
            border="1px solid #ddd"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            borderRadius="8px"
            padding="0px 20px"
          >
            <h5 style={{ marginTop: "20px" }}>
              Shop & Save! Buy now and receive 10% cashback in Edge Coins,
              withdrawable at any time.
            </h5>
            <Button
              href={`/shop`}
              color="primary"
              LinkComponent={Link}
              sx={{
                bgcolor: "primary.light",
                px: 4,
                border: "1px solid #d23f6f",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              Order Now
            </Button>
          </Box>
        </Grid>
      </Grid>
  );
};

export default OrderCom;
