// ini import
import axiosInstance from "@/utils/clientApi";
import TokenDataService from "./tokenDataService";
import { useStoreAuth } from "@/store/StoreAuth";
// define const
const setup = () => {
  // use auth store
  const storeAuth = useStoreAuth();
  // axios request
  axiosInstance.interceptors.request.use(
    (config: any) => {
      storeAuth.setuser();
      const token = TokenDataService.getLocalAccessToken();
      if (token) {
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // axios response
  axiosInstance.interceptors.response.use(
    (res) => {
      storeAuth.setuser();
      return res;
    },
    async (err) => {
      storeAuth.setuser();
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/signin" && err.response) {
        // access token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("/api/auth/refreshtoken", {
              refreshToken: TokenDataService.getLocalRefreshToken()
            });

            const { accessToken } = rs.data;

            storeAuth.refreshToken(accessToken);
            TokenDataService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};
// export
export default setup;
