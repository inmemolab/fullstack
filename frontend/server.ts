/**
 * Ini import
 */
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { createServer as _createServer, ViteDevServer } from "vite";
/**
 * Ini .env
 */
dotenv.config();
const env = process.env;
/**
 * Function ini server for ssr
 */
async function iniServer(root = process.cwd(), isProd = process.env.NODE_ENV === "production") {
  // resolve dir files
  const resolve = (p: string) => path.resolve(__dirname, p);
  // read manifest
  const manifest = isProd ? fs.readFileSync(resolve("dist/client/ssr-manifest.json")) : {};
  // read index file
  const indexProd = isProd ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8") : "";
  // ini express app
  const app = express();
  // ini vite server
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite: ViteDevServer;
  // select if server is in prod or dev
  if (!isProd) {
    vite = await _createServer({
      root,
      logLevel: "info",
      server: {
        middlewareMode: "ssr",
        watch: {
          usePolling: true,
          interval: 100
        }
      }
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use(require("compression")());
    app.use(
      require("serve-static")(resolve("dist/client"), {
        index: false
      })
    );
  }
  // base for ssr
  app.use("*", async (req: Request, res: Response) => {
    try {
      const url = req.originalUrl;
      let template, render;
      if (!isProd) {
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.ts")).render;
      } else {
        template = indexProd;
        render = require("./dist/server/entry-server.js").render;
      }
      const [appHtml, preloadLinks, head, pinia] = await render(url, manifest);
      const html = template
        .replace("<!--head-tags-->", head.headTags)
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace("<html>", `<html${head.htmlAttrs}>`)
        .replace("<body>", `<body${head.bodyAttrs}>`)
        .replace("/*sync-state*/", `window.__SSR_STATE__='${JSON.stringify(pinia.state.value)}'`);

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (e: any) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });
  // return all ssr template
  return { app };
}
/**
 * Ini server for ssr
 */
iniServer().then(({ app }) =>
  app.listen(env.VITE_PORT, () => {
    console.log(`⚡️[server]: 🚀  Server listening on http://localhost:${env.VITE_PORT}`);
  })
);
