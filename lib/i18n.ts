import { defineI18n } from "fumadocs-core/i18n";
import { defineI18nUI } from "fumadocs-ui/i18n";

export const i18n = defineI18n({
  defaultLanguage: "id",
  languages: ["en", "id"],
});

export const translations = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: "English",
      toc: "On this page",
    },
    id: {
      displayName: "Bahasa Indonesia",
      toc: "Pada Halaman Ini",
      search: "Cari",
      searchNoResult: "Tidak ada hasil ditemukan",
    },
  },
});
