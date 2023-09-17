import msgsEN from "../../public/locales/en/messages.json";
import formEN from "../../public/locales/en/form.json";
import themeEN from "../../public/locales/en/theme.json";
import translationRUzod from "zod-i18n-map/locales/ru/zod.json";

const resources = {
  messages: typeof msgsEN,
  form: typeof formEN,
  theme: typeof themeEN,
  zod: typeof translationRUzod,
} as const;

export default resources;
