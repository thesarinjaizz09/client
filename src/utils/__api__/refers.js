import { cache } from "react";
import axios from "axios";
import { serverIpAddressv4 } from "./urls"
const baseURL =  serverIpAddressv4

const isJsonString = (str) => {
  try {
    const token = JSON.parse(str);
    return token;
} catch (e) {
    return str;
}
}

export const generateRefers = cache(async (authToken, referCode) => {
  if (authToken === "" || referCode === "") {
    return {
      error: "Refercode & authtoken is required...",
    };
  }
  try {
    const response = await axios.get(`${baseURL}/api/r2Auth/refercode`, {
        headers: {
            "auth-token": isJsonString(authToken),
            "referCode": referCode,
            "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
        }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Refercode generated succesfully..." &&
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
    return {
      error: error.message,
    };
  }
});

