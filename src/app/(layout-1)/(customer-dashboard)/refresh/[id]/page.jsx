"use client"
import { TestPageView } from "pages-sections/customer-dashboard/edge-code/page-view"; // API FUNCTIONS
import { getUser } from "utils/__api__/auth";
// export const metadata = {
//   title: "Edge Code - NCTEdge",
//   description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
//   authors: [
//     {
//       name: "UI-LIB",
//       url: "https://ui-lib.com",
//     },
//   ],
//   keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
// };
export default async function Refresh({
  params
}) {
      const userToken = String(params.id.substring(params.id.indexOf(">") + 1));
      const href = String(params.id.substring(0, params.id.indexOf(">")));
      console.log({href})
      console.log({userToken})
      return <TestPageView href={href} authToken={userToken}/>;
  }
