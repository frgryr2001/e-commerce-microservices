import axios from "axios";
import jwt_decode from "jwt-decode";

// refreshTokens
const refreshToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/v1/api/auth/refresh-token",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log("Refresh token", err);
  }
};

export const createAxios = (user, token, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.defaults.withCredentials = true;
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(token);

      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();

        const refreshUser = {
          user: data.data,
          token: data.token,
        };

        dispatch(stateSuccess(refreshUser));
        config.headers["authorization"] = "Bearer " + data.token;
      }
      // config.headers["authorization"] = "Bearer " + user.token;

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
