"use client";

import { useLocale } from "./i18n";
import translations from "./translations";

export function useTranslation() {
  const { locale, setLocale } = useLocale();
  return { t: translations[locale], locale, setLocale };
}
