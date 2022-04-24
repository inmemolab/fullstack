// ini import
import { createI18n as _createI18n } from "vue-i18n";
// import locales
import en from "@/locales/en.json";
import es from "@/locales/es.json";
export const SUPPORT_LOCALES = ["en", "es"];
// export
export function createI18n() {
  return _createI18n({
    legacy: false,
    globalInjection: true,
    locale: "es",
    fallbackLocale: "en",
    messages: {
      en,
      es
    }
  });
}
