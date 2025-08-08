import Footer from "@/components/Footer";
import Header from "@/components/Header";
import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

function formatPtBR(d: Date) {
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function TermsPage() {
  const filePath = path.join(process.cwd(), "src/content/legal/terms.md");
  const [raw, stat] = await Promise.all([fs.readFile(filePath, "utf8"), fs.stat(filePath)]);
  const mdWithDate = raw.replace(/{{UPDATED_AT}}/g, formatPtBR(stat.mtime));
  const html = marked(mdWithDate);

  return (
    <div className="pt-16 min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto min-h-[calc(100vh-214px)] py-12 px-4 prose">
        <article className="prose prose-zinc max-w-none">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
  