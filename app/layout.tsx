import { RootProviderWrapper } from "@/components/RootProviderWrapper";
import { Metadata } from "next";
import "./global.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | eSchool Website",
    default: "eSchool Website",
  },
  description: "Dokumentasi eSchool Website",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProviderWrapper>
          {children}
        </RootProviderWrapper>
      </body>
    </html>
  );
}
