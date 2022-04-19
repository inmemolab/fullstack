// ini import
import axiosInstance from "@/utils/clientApi";
import TokenDataService from "./tokenDataService";
import { useStoreAuth } from "@/store/StoreAuth";
// define const
const setup = () => {
  axiosInstance.interceptors.request.use(
    (config: any) => {
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

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
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
            const storeAuth = useStoreAuth();
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
