/**
 * Ini import
 */
import { join } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig, loadEnv } from "vite";
import moment from "moment";
import pkg from "./package.json";
// info: https://vitejs.dev/config/
/**
 * Export
 */
export default ({ mode }) => {
  /**
   * Get env var
   */
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const usePort = Number(String(process.env.VITE_PORT)) || 3000;
  /**
   * Get data from package for set info
   */
  const { dependencies, devDependencies, name, version } = pkg;
  const useAppInfo = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: moment().format("YYYY-MM-DD HH:mm:ss")
  };
  /**
   * Return
   */
  return defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        "~": join(__dirname, "./"),
        "@": join(__dirname, "src")
      },
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"]
    },
    server: {
      port: usePort
    },
    define: {
      __APP_INFO__: JSON.stringify(useAppInfo)
    }
  });
};
