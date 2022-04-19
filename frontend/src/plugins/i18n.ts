// Ini Import
import { createI18n as _createI18n } from "vue-i18n";
// Import locales
import en from "@/locales/en.json";
import es from "@/locales/es.json";
export const SUPPORT_LOCALES = ["en", "es"];
// Export
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
