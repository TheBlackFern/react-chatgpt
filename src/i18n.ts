import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/ru/zod.json";

i18n
  .use(Backend)
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
    resources: {
      en: {
        translation: {
          theme: {
            description: "Toggle theme",
            dark: "Dark",
            light: "Light",
            system: "System",
          },
          form: {
            next: "Next",
            back: "Back",
            submit: "Submit",
            step1: {
              heading: "Step 1: Provide a Secret",
              title: "Prompt",
              description:
                "To get it, visit the API Keys page of the OpenAI's website",
              placeholder: "Select a model...",
            },
            step2: {
              heading: "Step 2: Select a Model",
              title: "ChatGPT Model",
              description:
                "This is the model that will be used to run the query.",
            },
            step3: {
              heading: "Step 3: Chat Away!",
              title1: "Prompt",
              description1: "The actual prompt for the AI.",
              placeholder: "Write something...",
              title2: "Temperature",
              description2:
                "The degree of randomness in AI's answer, the larger the more random.",
              degree: {
                bland: "Bland",
                certain: "Certain",
                creative: "Creative",
                random: "Random",
              },
            },
          },
        },
      },
      ru: {
        zod: translation,
        translation: {
          theme: {
            description: "Смена темы",
            dark: "Тёмная",
            light: "Светлая",
            system: "Системная",
          },
          form: {
            next: "Далее",
            back: "Назад",
            submit: "Отправить",
            step1: {
              heading: "Шаг 1: Введите Ключ",
              title: "Ключ",
              description:
                "Его можно сгенерировать в разделе API Keys в личном кабинете на сайте OpenAI.",
            },
            step2: {
              heading: "Шаг 2: Выберите Модель",
              title: "Модель ChatGPT",
              description:
                "Модель, которая будет использована при обработке запроса.",
              placeholder: "Выберите модель...",
            },
            step3: {
              heading: "Шаг 3: Общайтесь!",
              title1: "Запрос",
              description1: "Ваш запрос для ИИ.",
              placeholder: "Напишите что-нибудь...",
              title2: "Температура",
              description2:
                "Уровень случайности в ответах ИИ, чем выше — тем случайнее.",
              degree: {
                bland: "Сухой",
                certain: "Уверенный",
                creative: "Креативный",
                random: "Нестабильный",
              },
            },
          },
        },
      },
    },
  });

z.setErrorMap(zodI18nMap);

export default i18n;
