import Link from "next/link";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import East from "@mui/icons-material/East";

import { H5, Paragraph } from "components/Typography"; // Local CUSTOM COMPONENT

import TableRow from "../table-row"; // CUSTOM UTILS LIBRARY FUNCTION
import { getUserName } from "utils/__api__/auth";
import { currency } from "lib"; // CUSTOM DATA MODEL

// =================================================
export default async function Transactions({ order }) {
  var name = ""
  const getColor = (status) => {
    switch (status) {
      case "Active":
        return "success";

      case "InActive":
        return "primary";

      default:
        return "default";
    }
  };

  if (order._memberId) {
    const response = await getUserName({id: order._memberId})
    if (!response.error) {
      name = response
    } else {
      name = ""
    }
  }

  return (
    <Link href={""} style={{width:"100%" }}>
      <TableRow
        sx={{
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        }}
        style={{ backgroundColor: "aliceblue" }}
      >

        <H5 ellipsis>
          {
            name === "" ? order._fromOrderNo.substring(0, 18) : name
          }
        </H5>

        <Box textAlign="center">
          <Chip
            size="small"
            label={"Pending"}
            color={getColor("In-Active")}
          />
        </Box>

        <Paragraph
          textAlign={{
            sm: "center",
            xs: "left",
          }}
        >
          {order._date.substring(order._date.indexOf(" ") + 1, 15)}
        </Paragraph>

        <Paragraph textAlign="center">{order._value} Coins</Paragraph>

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
