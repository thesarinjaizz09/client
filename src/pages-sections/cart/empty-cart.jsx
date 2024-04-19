import Link from "next/link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENTS

import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove"; // GLOBAL CUSTOM COMPONENTS

import Image from "components/BazaarImage";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box"; // GLOBAL CUSTOM HOOK

import useCart from "hooks/useCart"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // STYLED COMPONENT

import { Wrapper } from "./styles"; // =========================================================

// =========================================================
export default function EmptyCart({
  id,
  name,
  qty,
  price,
  imgUrl,
  slug
}) {
  const {
    dispatch
  } = useCart(); // HANDLE CHANGE CART PRODUCT QUANTITY

  const handleCartAmountChange = amount => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id,
        name,
        price,
        imgUrl,
        qty: amount,
        slug
      }
    });
  };

  return <Wrapper>
      <Image alt={name} width={140} height={140} display="block" src={`data:image/png;base64, ${imgUrl}` || "/assets/images/products/iphone-xi.png"} />

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
          <Span ellipsis fontWeight="600" fontSize={18}>
            {name}
          </Span>
      </FlexBox>
    </Wrapper>;
}