// ini import
import { reactive, computed } from "vue";
// import ua-parser
import { UAParser } from "ua-parser-js";
// is Browser
const isBrowser = typeof window !== "undefined";
// interface state
interface appBrowserInterface {
  isLoading: boolean;
  error?: string;
}
// state
const appBrowserState = reactive<appBrowserInterface>({
  isLoading: false,
  error: ""
});
// export
export default function appBrowser() {
  // dev socket on any

  // set socketId
  const getUserBrowser = () => {
    // get from localstarage
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      const parser = new UAParser();
      // {
      //   ua: "",
      //   browser: {
      //       name: "",
      //       version: "",
      //       major: "" //@deprecated
      //   },
      //   engine: {
      //       name: "",
      //       version: ""
      //   },
      //   os: {
      //       name: "",
      //       version: ""
      //   },
      //   device: {
      //       model: "",
      //       type: "",
      //       vendor: ""
      //   },
      //   cpu: {
      //       architecture: ""
      //   }
      // console.log(parser.getResult());
    }
  };

  // return
  return {
    appBrowserState,
    getUserBrowser
  };
}
