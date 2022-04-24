// ini import
import { reactive, computed } from "vue";
// axios
import axios from "axios";
// composable
import appSoket from "./appSoket";
const { appSoketState } = appSoket();
// is Browser
const isBrowser = typeof window !== "undefined";
// interface state
interface appGeolocationInterface {
  isLoading: boolean;
  error?: string;
}
// state
const appGeolocationState = reactive<appGeolocationInterface>({
  isLoading: false,
  error: ""
});
// export
export default function appGeolocation() {
  // dev socket on any

  // set socketId
  const getUserGeolocation = async () => {
    // get from localstarage
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      // const ip = "191.102.110.99";
      // const accessKey = import.meta.env.VITE_APIIP;
      // const url = "http://apiip.net/api/check?ip=" + ip + "&accessKey=" + accessKey;

      // // Make a request and store the response
      // const response = await axios.get(url);
      // const result = response.data;

      // // Decode JSON response:
      // // const result = await response.json();

      // // Output the "code" value inside "currency" object
      // console.log(result);
      console.log(appSoketState.userIp);
    }
  };

  // return
  return {
    appGeolocationState,
    getUserGeolocation
  };
}
