"use client";

import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery"; // CUSTOM ICON COMPONENTS

import Home from "icons/Home";
import User2 from "icons/User2";
import Cart from "icons/Cart";
import ShoppingBagOutlined from "icons/ShoppingBagOutlined"; // GLOBAL CUSTOM HOOK

import useCart from "hooks/useCart"; // STYLED COMPONENTS

import { iconStyle, StyledNavLink, Wrapper } from "./styles";
export default function MobileNavigationBar() {
  if(typeof window !== "undefined") {
    const authToken = window.localStorage.getItem(process.env.NEXT_PUBLIC_NCTEDGE_USER_AUTHTOKEN_KEY)
    const {
      state
    } = useCart();
    const DOWN_900 = useMediaQuery(theme => theme.breakpoints.down(900));
    
    if (DOWN_900) {
      return <Wrapper>
        {list.map(({
          Icon,
          href,
          title
        }) => <StyledNavLink href={href === "/profile" ? `${href}/${JSON.parse(authToken)}` : href} key={title}>
            {title === "Cart" ? <Badge badgeContent={state.cart.length} color="primary">
                <Icon fontSize="small" sx={iconStyle} />
              </Badge> : <Icon sx={iconStyle} fontSize="small" />}

            {title}
          </StyledNavLink>)}
      </Wrapper>;
  }
  
  return null;
}
}
const list = [{
  title: "Home",
  Icon: Home,
  href: "/home"
}, {
  title: "Shop",
  Icon: Cart,
  href: "/shop"
}, {
  title: "Cart",
  Icon: ShoppingBagOutlined,
  href: "/cart"
}, {
  title: "Profile",
  Icon: User2,
  href: `/profile`
}];