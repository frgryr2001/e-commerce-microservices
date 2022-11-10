import axios from "axios";
import jwt_decode from "jwt-decode";

// refreshTokens
const refreshToken = async () => {};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.defaults.withCredentials = true;
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.token);

      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();

        const refreshUser = {
          ...user,
          token: data.token,
        };

        dispatch(stateSuccess(refreshUser));
        config.headers["authorization"] = "Bearer " + data.token;
      }

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
