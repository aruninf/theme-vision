import { themes } from "@/data/themes";
import { ThemeDetailClient } from "@/components/theme-view/ThemeDetailClient";

export function generateStaticParams() {
  return themes.map((theme) => ({
    slug: theme.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ThemeDetailClient slug={slug} />;
}
