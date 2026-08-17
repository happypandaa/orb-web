import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content");
const publicRoot = path.join(projectRoot, "public");
const locales = ["en", "zh", "ja", "ko"];
const contentLocales = ["en", "zh"];

function markdownFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(entryPath);
    return entry.name.endsWith(".md") ? [entryPath] : [];
  });
}

function slugs(section, locale) {
  const directory = path.join(contentRoot, section, locale);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

const validRoutes = new Set(["/", "/articles/", "/wiki/"]);
for (const locale of locales) {
  validRoutes.add(`/${locale}/`);
  for (const page of ["privacy", "terms", "support"]) {
    validRoutes.add(`/${locale}/${page}/`);
  }
}
for (const locale of contentLocales) {
  validRoutes.add(`/${locale}/articles/`);
  validRoutes.add(`/${locale}/wiki/`);
  for (const slug of slugs("articles", locale)) {
    validRoutes.add(`/${locale}/articles/${slug}/`);
    if (locale === "en") validRoutes.add(`/articles/${slug}/`);
  }
  for (const slug of slugs("wiki", locale)) {
    validRoutes.add(`/${locale}/wiki/${slug}/`);
  }
}

const failures = [];
for (const file of markdownFiles(contentRoot)) {
  const source = fs.readFileSync(file, "utf8");
  const links = [...source.matchAll(/\]\((\/[^)#?\s]+)\/?(?:[?#][^)]*)?\)/g)].map((match) => match[1]);
  const images = [...source.matchAll(/<img\s+[^>]*src=["'](\/[^"']+)["']/g)].map((match) => match[1]);

  for (const link of links) {
    const normalized = `${link.replace(/\/$/, "")}/`;
    if (!validRoutes.has(normalized)) {
      failures.push(`${path.relative(projectRoot, file)} -> ${link}`);
    }
  }

  for (const image of images) {
    if (!fs.existsSync(path.join(publicRoot, image.replace(/^\//, "")))) {
      failures.push(`${path.relative(projectRoot, file)} -> missing image ${image}`);
    }
  }
}

if (failures.length > 0) {
  process.stderr.write(`Broken content links:\n${failures.join("\n")}\n`);
  process.exit(1);
}

process.stdout.write("Content links are valid.\n");
