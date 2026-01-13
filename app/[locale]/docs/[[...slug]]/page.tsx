import { icons, ChevronRight } from "lucide-react";
import { source } from "@/lib/source";
import { DocsPage, DocsBody, DocsTitle } from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { notFound } from "next/navigation";
import React from "react";

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

  // 3. AMBIL FULL BREADCRUMB TRAIL (Segments only)
  // Kita ambil semua segmen slug kecuali yang terakhir (karena terakhir adalah judul halaman)
  // Contoh: ["admin", "kurikulum", "jadwal-pelajaran"] -> ["admin", "kurikulum"]
  const breadcrumbSegments = slug && slug.length > 1 ? slug.slice(0, -1) : null;

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
        {/* Breadcrumb style Maroon/Brown - Full Trail with ChevronRight */}
        {breadcrumbSegments && (
          <div className="mb-2 flex flex-row items-center gap-1 text-xs font-bold tracking-widest text-[#8B2323] uppercase">
            {breadcrumbSegments.map((segment, idx) => (
              <React.Fragment key={segment}>
                <span>{segment.replace(/-/g, " ")}</span>
                {idx < breadcrumbSegments.length - 1 && (
                  <ChevronRight size={12} strokeWidth={3} className="opacity-70" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="mb-8 flex flex-row items-center gap-3">
          {/* Ikon - Softer & Balanced Maroon/Brown */}
          {LucideIcon && (
            <div className="flex shrink-0 items-center justify-center text-[#A55757]">
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
