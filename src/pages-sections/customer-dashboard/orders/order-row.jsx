import Link from "next/link";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import East from "@mui/icons-material/East";
import { format } from "date-fns"; // GLOBAL CUSTOM COMPONENT

import { H5, Paragraph } from "components/Typography"; // Local CUSTOM COMPONENT

import TableRow from "../table-row"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // CUSTOM DATA MODEL

// =================================================
export default function OrderRow({ order }) {
  const getColor = (status) => {
    switch (status) {
      case "pending":
        return "secondary";

      case "Processing":
        return "secondary";

      case "confirmed":
        return "success";

      case "cancelled":
        return "primary";

      default:
        return "default";
    }
  };

  return (
    <Link href={`/order/${order._orderNo}`} style={{width:"100%" }}>
      <TableRow
        sx={{
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
        }}
        style={{ backgroundColor: "aliceblue" }}
      >
        <H5 ellipsis>#{order._orderNo}</H5>

        <Box textAlign="center">
          <Chip
            size="small"
            label={order._orderStatus}
            color={getColor(order._orderStatus)}
          />
        </Box>

        <Paragraph
          textAlign={{
            sm: "center",
            xs: "left",
          }}
        >
          {order.createdAt.substring(order.createdAt.indexOf(" ") + 1, 10)}
        </Paragraph>

        <Paragraph textAlign="center">{currency(order._orderTotal)}</Paragraph>

        <Box
          display={{
            sm: "inline-flex",
            xs: "none",
          }}
          justifyContent="end"
        >
          <IconButton>
            <East
              fontSize="small"
              sx={{
                color: "grey.500",
                transform: ({ direction }) =>
                  `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
              }}
            />
          </IconButton>
        </Box>
      </TableRow>
    </Link>
  );
}
