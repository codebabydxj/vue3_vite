import { createI18n } from "vue-i18n";
import { getBrowserLang } from "@/utils/tools";

import zh from "./modules/zh";
import en from "./modules/en";

const i18n = createI18n({
  allowComposition: true,
  legacy: false,
  locale: getBrowserLang(),
  messages: {
    zh,
    en
  }
});

export default i18n;
