import { icons, ChevronRight } from "lucide-react";
import { source } from "@/lib/source";
import { DocsPage, DocsBody, DocsTitle } from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = source.getPage(slug, locale);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description ?? "Dokumentasi eSchool Website",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await params;
  const page = source.getPage(slug, locale);

  if (!page) notFound();

  const MDX = page.data.body;

  // 2. AMBIL STRING IKON DAN UBAH JADI KOMPONEN
  const iconName = page.data.icon as keyof typeof icons;
  const LucideIcon = iconName ? icons[iconName] : null;

  // 3. AMBIL FULL BREADCRUMB TRAIL (Manual Resolution)
  const breadcrumbItems = (slug || []).slice(0, -1).map((_, idx) => {
    const subSlug = (slug || []).slice(0, idx + 1);
    const parentPage = source.getPage(subSlug, locale);
    return {
      title: parentPage?.data?.title ?? subSlug[subSlug.length - 1].replace(/-/g, " "),
      url: `/${locale}/docs/${subSlug.join("/")}`,
      icon: parentPage?.data?.icon as keyof typeof icons | undefined,
    };
  });

  return (
    <DocsPage
      toc={page.data.toc.filter((item) => item.depth <= 3)}
      full={false}
      breadcrumb={{ enabled: false }}
      tableOfContent={{
        enabled: true,
      }}
    >
      <DocsBody>
        {/* Breadcrumb style - Full Trail with ChevronRight */}
        {breadcrumbItems.length > 0 && (
          <div className="mb-3 flex flex-row items-center gap-1.5 text-[12px] font-bold tracking-[0.1em] text-neutral-600 dark:text-white uppercase">
            {breadcrumbItems.map((item, idx) => {
               const BreadcrumbIcon = item.icon ? icons[item.icon] : null;

               return (
                <React.Fragment key={item.url}>
                  <Link 
                    href={item.url}
                    className="flex items-center gap-1.5 text-neutral-600 dark:text-white no-underline opacity-80 hover:opacity-100 transition-opacity hover:underline decoration-neutral-400/30 dark:decoration-white/30 decoration-1 underline-offset-4"
                  >
                    {BreadcrumbIcon && <BreadcrumbIcon size={18} strokeWidth={2.5} />}
                    <span>{item.title}</span>
                  </Link>
                  {idx < breadcrumbItems.length - 1 && (
                    <ChevronRight size={18} strokeWidth={3} className="opacity-70 dark:opacity-60 mx-0.5" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div className="mb-8 flex flex-row items-center gap-3">
          {/* Ikon - White in dark mode, matching standard documentation */}
          {LucideIcon && (
            <div className="flex shrink-0 items-center justify-center text-foreground dark:text-white">
              <LucideIcon size={32} strokeWidth={2.5} />
            </div>
          )}
          {/* Judul - default color */}
          <DocsTitle className="!m-0 !p-0 text-3xl font-bold leading-tight">
            {page.data.title}
          </DocsTitle>
        </div>

        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}
