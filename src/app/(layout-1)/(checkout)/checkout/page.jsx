"use client"
import { CheckoutPageView } from "pages-sections/checkout/page-view";
// export const metadata = {
//   title: "Checkout - Bazaar Next.js E-commerce Template",
//   description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
//   authors: [{
//     name: "UI-LIB",
//     url: "https://ui-lib.com"
//   }],
//   keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
// };
export default function Checkout({
  params
}) {
  if (typeof window !== 'undefined') { 
    const userAuthToken = localStorage.getItem(process.env.NEXT_PUBLIC_NCTEDGE_USER_AUTHTOKEN_KEY);
    return <CheckoutPageView zipcode={params.slug} authToken={userAuthToken}/>;
  }
}