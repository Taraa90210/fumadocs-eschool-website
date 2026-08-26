"use client";

import { useParams } from "next/navigation";
import { RootProvider } from "fumadocs-ui/provider/next";
import { translations } from "@/lib/i18n";

export function RootProviderWrapper({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  return (
    <RootProvider
      i18n={translations.provider(locale)}
      search={{
        options: {
          api: "/api/search",
        },
      }}
    >
      {children}
    </RootProvider>
  );
}
