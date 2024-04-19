import { cache } from "react";
import axios from "axios";
import { serverIpAddressv4 } from "./urls"
const baseUrl =  serverIpAddressv4
export const getOrders = cache(async ({ authToken }) => {
  const response = await axios.get(`${baseUrl}/api/rAuth/user`, {
    headers: {
      "auth-token": JSON.parse(authToken),
      "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD
    }
  });
  return response.data;
})

export const placeOrder = cache(async ({ authToken, orderId }) => {
  try {
  const response = await axios.get(`${baseUrl}/api/oAuth/confirm`, {
    headers: {
      "auth-token": JSON.parse(authToken),
      "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
      "orderId": orderId
    }
  });
  console.log({response})
  if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
    if (
      response.data.message === "Order confirmed successfully..." &&
      response.status == 200
    ) {
      return response.data;
    } else {
      return {
        error: response.data.message,
      };
    }
  } else {
    return {
      error: response.data.message,
    };
  }
} catch (error) {
  console.log({error})
  if(error.response) {
    return {
      error: error.response.data.message,
    };
  } else {
    return {
      error: error.message,
    }
  }
}
})

export const getIds = cache(async () => {
  const response = await axios.get("/api/users/order-ids");
  return response.data;
});

export const getOrderDetails = cache(async (orderId) => {
  try {
  const response = await axios.get(`${baseUrl}/api/oAuth/getSingleOrder`, {
    headers: {
      "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
      "orderNo": orderId
    }
  });
  if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
    if (
      response.data.message === "Order data fetched successfully..." &&
      response.status == 200
    ) {
      return response.data;
    } else {
      return {
        error: response.data.message,
      };
    }
  } else {
    return {
      error: response.data.message,
    };
  }
} catch (error) {
  console.log({error})
  if(error.response) {
    return {
      error: error.response.data.message,
    };
  } else {
    return {
      error: error.message,
    }
  }
}
})