import i18n from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translationRUzod from "zod-i18n-map/locales/ru/zod.json";
// import Backend from "i18next-http-backend";
// import translationRU from "./ru/translation.json";
// import translationEN from "./en/translation.json";

i18n
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../public/locales/${language}/${namespace}.json`)
    )
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      useSuspense: true,
    },
    // resources: {
    //   en: {
    //     translation: translationEN,
    //   },
    //   ru: {
    //     zod: translationRUzod,
    //     translation: translationRU,
    //   },
    // },
  });
i18n.addResourceBundle("ru", "zod", translationRUzod);
z.setErrorMap(zodI18nMap);

export default i18n;
