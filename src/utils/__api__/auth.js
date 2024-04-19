import axios from "axios";
import { cache } from "react";
import { serverIpAddressv4 } from "./urls"
const baseURL =  serverIpAddressv4

const isJsonString = cache((str) => {
  try {
    const token = JSON.parse(str);
    return token;
} catch (e) {
    return str;
}
})

export const loginUserWithEmail = cache(async (email, password) => {
  if (!email || !password) {
    return {
      error: "Email & password is required...",
    };
  }
  try {
    const data = {
      email: email,
      password: password,
      serverPass: process.env.NEXT_PUBLIC_SERVER_PASSWORD,
    };
    const response = await axios.post("/api/uAuth/login", data);
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Authentication successfully flaged..." &&
        response.status == 200
      ) {
        window.localStorage.setItem(
          process.env.NEXT_PUBLIC_NCTEDGE_USER_AUTHTOKEN_KEY,
          JSON.stringify(response.data.credentials.authToken)
        );
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
    return {
      error: error.message,
    };
  }
});

export const getUser = cache(async ({ authToken }) => {
  try {
    const response = await axios.get(`${baseURL}/api/rAuth/user`, {
      headers: {
        "auth-token": isJsonString(authToken),
        serverPass: process.env.NEXT_PUBLIC_SERVER_PASSWORD,
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "User data fetched successfully..." &&
        response.status == 200
      ) {
        window.localStorage.setItem(
          process.env.NEXT_PUBLIC_NCTEDGE_USER_LOGGED_IN_DATA_DETAILS,
          JSON.stringify(response.data.data)
        );
        return response.data.data;
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

export const getUserName = cache(async ({ id }) => {
  try {
    const response = await axios.get(`${baseURL}/api/rAuth/username`, {
      headers: {
        "id": id,
        serverPass: process.env.NEXT_PUBLIC_SERVER_PASSWORD,
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "User data fetched successfully..." &&
        response.status == 200
      ) {
        return response.data.data;
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

export const sendOtp = cache(async ({ name, number }) => {
  try {
    const response = await axios.get(`${baseURL}/api/rAuth/phone`, {
      headers: {
        "name": name,
        "number": number,
        serverPass: process.env.NEXT_PUBLIC_SERVER_PASSWORD,
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Otp Send successfully..." &&
        response.status == 201
      ) {
        window.localStorage.setItem(
          process.env.NEXT_PUBLIC_NCTEDGE_USER_AUTHTOKEN_KEY,
          JSON.stringify(response.data.credentials.authToken))
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
    return {
      error: error.response.data.message,
    };
  }
});

export const verifyotp = cache(async ({ authToken, otp }) => {
  try {
    const response = await axios.get(`${baseURL}/api/rAuth/verifyotp`, {
      headers: {
        "auth-token": isJsonString(authToken),
        "otp": otp,
        serverPass: process.env.NEXT_PUBLIC_SERVER_PASSWORD,
      }
    });
    console.log({response})
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Otp verified successfully..." &&
        response.status == 200
      ) {
        return response.data
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
    return {
      error: error.response.data.message,
    };
  }
});

export const registerUser = cache(async (name, email, password) => {
  if (!email || !password || !name) {
    return {
      error: "Name, email & password are required...",
    };
  }

  try {
    const response = await axios.get(
      `${baseURL}/api/rAuth/register`,
      {
        headers: {
          name: name,
          email: email,
          password: password,
          serverPass: process.env.NEXT_PUBLIC_SERVER_PASSWORD,
        },
      }
    );
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "User registered succesfully..." &&
        response.status == 201
        ) {
        console.log({ response });
        window.localStorage.setItem(
          process.env.NEXT_PUBLIC_NCTEDGE_USER_AUTHTOKEN_KEY,
          JSON.stringify(response.data.credentials.authToken)
        );
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
    console.log(error)
    return {
      error: error.response.data.message,
    };
  }
});

export const registerReferUser = cache(async (name, email, password, referCode) => {
  if (!email || !password || !name) {
    return {
      error: "Name, email & password are required...",
    };
  }

  try {
    const response = await axios.get(
      `${baseURL}/api/rAuth/register`,
      {
        headers: {
          name: name,
          email: email,
          password: password,
          serverPass: process.env.NEXT_PUBLIC_SERVER_PASSWORD,
          referCode: referCode
        },
      }
    );
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "User registered succesfully..." &&
        response.status == 201
        ) {
        console.log({ response });
        window.localStorage.setItem(
          process.env.NEXT_PUBLIC_NCTEDGE_USER_AUTHTOKEN_KEY,
          JSON.stringify(response.data.credentials.authToken)
        );
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
    console.log(error)
    return {
      error: error.response.data.message,
    };
  }
});

export const updateUser = cache(async (id, userUpdates) => {
  try {
    const data = {
      serverPass: process.env.NEXT_PUBLIC_SERVER_PASSWORD,
      id,
      userUpdates,
    };
    const response = await axios.post("/api/uAuth/update", data);
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "User updation thread flaged..." &&
        response.status == 200
      ) {
        window.localStorage.setItem(
          process.env.NEXT_PUBLIC_NCTEDGE_USER_LOGGED_IN_DATA_DETAILS,
          JSON.stringify(response.data)
        );
        return response.data;
      } else {
        return {
          error: response.message,
        };
      }
    } else {
      return {
        error: response.message,
      };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
});
export const updateUserFromApi = cache(async (id, userUpdates) => {
  try {
    const data = {
      userUpdates,
    };
    const response = await axios.post(`${baseURL}/api/rAuth/update`, data, {
      headers: {
        'serverPass': process.env.NEXT_PUBLIC_SERVER_PASSWORD,
        'auth-token': isJsonString(id)
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "User updated successfully..." &&
        response.status == 200
      ) {
        window.localStorage.setItem(
          process.env.NEXT_PUBLIC_NCTEDGE_USER_LOGGED_IN_DATA_DETAILS,
          JSON.stringify(response.data)
        );
        return response.data;
      } else {
        return {
          error: response.message,
        };
      }
    } else {
      return {
        error: response.message,
      };
    }
  } catch (error) {
    console.log({error})
    return {
      error: error.message,
    };
  }
});

export const updateUserInfo = cache(async (id, userUpdates) => {
  try {
    const data = {
      userUpdates,
    };
    const response = await axios.post(`${baseURL}/api/rAuth/updateinfo`, data, {
      headers: {
        'serverPass': process.env.NEXT_PUBLIC_SERVER_PASSWORD,
        'auth-token': isJsonString(id)
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "User updated successfully..." &&
        response.status == 200
      ) {
        window.localStorage.setItem(
          process.env.NEXT_PUBLIC_NCTEDGE_USER_LOGGED_IN_DATA_DETAILS,
          JSON.stringify(response.data)
        );
        return response.data;
      } else {
        return {
          error: response.message,
        };
      }
    } else {
      return {
        error: response.message,
      };
    }
  } catch (error) {
    console.log({error})
    return {
      error: error.message,
    };
  }
});

