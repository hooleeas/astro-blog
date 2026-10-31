import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { parse } from "jsonc-parser";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templatesDirectory = path.join(root, "templates");
const input = createInterface({ input: stdin, output: stdout });
const answers = input[Symbol.asyncIterator]();

const prompt = async (label, defaultValue = "") => {
  const suffix = defaultValue ? ` [${defaultValue}]` : "";
  stdout.write(`${label}${suffix}: `);
  const { value, done } = await answers.next();
  if (done) throw new Error("输入已结束，未能完成创建。");
  return value.trim() || defaultValue;
};

const slugify = (value) =>
  value
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-|-$/g, "");

const askSlug = async (label, defaultValue) => {
  while (true) {
    const value = slugify(await prompt(label, defaultValue));
    if (value) return value;
    stdout.write("名称不能为空，且至少需要包含一个字母或数字。\n");
  }
};

const localDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const readTemplate = (relativePath) => {
  const templatePath = path.join(templatesDirectory, relativePath);
  if (!existsSync(templatePath)) {
    throw new Error(`找不到模板：${path.relative(root, templatePath)}`);
  }
  return readFileSync(templatePath, "utf8");
};

const replaceRequired = (content, pattern, replacement, field) => {
  if (!pattern.test(content)) {
    throw new Error(`模板中找不到 ${field} 字段，无法生成文件。`);
  }
  return content.replace(pattern, replacement);
};

const writeNewFile = (relativePath, content) => {
  const filePath = path.join(root, relativePath);
  if (existsSync(filePath)) {
    throw new Error(`文件已存在，不会覆盖：${relativePath}`);
  }
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, { encoding: "utf8", flag: "wx" });
  stdout.write(`已创建：${relativePath}\n`);
};

const createNote = async (nameArgument) => {
  const date = localDate();
  const name = nameArgument ? slugify(nameArgument) : await askSlug("随记文件名", "note");
  if (!name) throw new Error("随记名称不能为空，且至少需要包含一个字母或数字。");
  const relativePath = `src/content/notes/${date}-${name}.md`;
  let content = readTemplate("notes/note.md");
  content = replaceRequired(
    content,
    /^date:.*$/m,
    `date: ${date}`,
    "date",
  );
  writeNewFile(relativePath, content);
};

const getPostLanguages = () => {
  const errors = [];
  const config = parse(
    readFileSync(path.join(root, "src/data/config.jsonc"), "utf8"),
    errors,
  );
  if (errors.length > 0) {
    throw new Error("无法解析 src/data/config.jsonc 中的语言配置。");
  }
  const templateNames = new Set(readdirSync(path.join(templatesDirectory, "posts")));
  const languages = config.languages
    .filter(({ code, enabled }) => enabled && templateNames.has(`post.${code}.md`));
  if (languages.length === 0) {
    throw new Error("没有找到与文章模板对应的语言配置。");
  }
  return languages;
};

const createPost = async (nameArgument) => {
  const languages = getPostLanguages();
  const title = nameArgument || await prompt("文章名");
  if (!title) throw new Error("文章标题不能为空。");
  const slug = slugify(title);
  if (!slug) throw new Error("文章标题不能为空，且至少需要包含一个字母或数字。");
  const subtitle = "";
  const date = dateForPost();
  const translationKey = `${date}-${slug}`;
  const existingTranslation = languages.flatMap(({ code }) => {
    const languageDirectory = path.join(root, "src/content/posts", code);
    if (!existsSync(languageDirectory)) return [];
    return readdirSync(languageDirectory)
      .filter((fileName) => /\.(?:md|mdx)$/.test(fileName))
      .map((fileName) => ({
        path: `src/content/posts/${code}/${fileName}`,
        content: readFileSync(path.join(languageDirectory, fileName), "utf8"),
      }))
      .filter(({ content }) =>
        /^translationKey:\s*['"]?[^'"\r\n]+['"]?\s*$/m.test(content) &&
        content.match(/^translationKey:\s*['"]?([^'"\r\n]+)['"]?\s*$/m)?.[1] === translationKey,
      )
      .map(({ path: filePath }) => filePath);
  });
  if (existingTranslation.length > 0) {
    throw new Error(`translationKey 已被使用：${translationKey}（${existingTranslation.join(", ")}）`);
  }
  const drafts = languages.map(({ code }) => {
    const relativePath = `src/content/posts/${code}/${slug}.md`;
    let content = readTemplate(`posts/post.${code}.md`);
    content = replaceRequired(content, /^title:.*$/m, `title: ${JSON.stringify(title)}`, "title");
    content = replaceRequired(content, /^subtitle:.*$/m, `subtitle: ${JSON.stringify(subtitle)}`, "subtitle");
    content = replaceRequired(content, /^pubDate:.*$/m, `pubDate: ${date}`, "pubDate");
    content = replaceRequired(
      content,
      /^translationKey:.*$/m,
      `translationKey: ${JSON.stringify(translationKey)}`,
      "translationKey",
    );
    content = replaceRequired(content, /^draft:.*$/m, "draft: true", "draft");
    return { relativePath, content, code };
  });
  const existingFiles = drafts.filter(({ relativePath }) =>
    existsSync(path.join(root, relativePath)),
  );
  if (existingFiles.length > 0) {
    throw new Error(
      `以下文章文件已存在，未创建任何文件：${existingFiles.map(({ relativePath }) => relativePath).join(", ")}`,
    );
  }
  for (const draft of drafts) {
    writeNewFile(draft.relativePath, draft.content);
  }
  stdout.write(`已为 ${drafts.length} 种语言创建同一篇文章（translationKey: ${translationKey}）。\n`);
};

const dateForPost = () => localDate();

const createPage = async (nameArgument) => {
  const title = nameArgument || await prompt("页面标题");
  if (!title) throw new Error("页面标题不能为空。");
  const subtitle = nameArgument ? "" : await prompt("页面副标题");
  const slug = nameArgument ? slugify(nameArgument) : await askSlug("页面路径", slugify(title));
  if (!slug) throw new Error("页面名称不能为空，且至少需要包含一个字母或数字。");
  const relativePath = `src/pages/${slug}.astro`;
  let content = readTemplate("pages/page.astro.txt");
  content = replaceRequired(
    content,
    /^const pageTitle = .*;$/m,
    `const pageTitle = ${JSON.stringify(title)};`,
    "pageTitle",
  );
  content = replaceRequired(
    content,
    /^const pageSubtitle = .*;$/m,
    `const pageSubtitle = ${JSON.stringify(subtitle)};`,
    "pageSubtitle",
  );
  writeNewFile(relativePath, content);
};

try {
  const [command, type, ...nameParts] = process.argv.slice(2);
  const nameArgument = nameParts.join(" ").trim();
  if (command !== "new" || !["note", "post", "page"].includes(type)) {
    throw new Error(
      "用法：astro new <note|post|page> [名称]",
    );
  }
  if (type === "note") await createNote(nameArgument);
  else if (type === "post") await createPost(nameArgument);
  else await createPage(nameArgument);
} catch (error) {
  console.error(`创建失败：${error.message}`);
  process.exitCode = 1;
} finally {
  input.close();
}
