import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "pages-sections/customer-dashboard/orders/page-view"; // API FUNCTIONS

import { getOrderDetails } from 'utils/__api__/orders'
export const metadata = {
  title: "Order Details - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function OrderDetails({
  params
}) {
  try {
    const response = await getOrderDetails(String(params.id));
    if (response.error) {
      alert(response.error)
    } else {
      return <OrderDetailsPageView order={response.data[0]} />;
    }
  } catch (error) {
    notFound();
  }
}