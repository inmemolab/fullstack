/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PORT: number;
  readonly VITE_APP_PORT_SERVER: string;
  readonly VITE_APP_TIMEZONE: string;
  readonly VITE_APP_LOCALE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
