# Astro Blog

[English](./README.md) | [简体中文](./README.zh-Hans.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

一个基于 Astro 构建的多语言静态博客。文章使用 Markdown 编写，站点文案和页面内容通过 JSONC 文件管理。你可以 Fork 本项目，替换示例内容后部署到静态网站托管平台。

本博客的内容由 **[astro-blog-admin](https://github.com/hooleeas/astro-blog-admin)** 管理——一个配套的网页管理后台，用于编辑本仓库中的文章、随记、页面和站点设置，并内置图床。

## 功能

- 支持简体中文、繁体中文、英语、日语和韩语
- Markdown 文章，支持分类、标签、搜索和归档
- 短篇随记
- 可配置的导航、首页卡片和内容页面
- 自动生成文章和页面的分享预览图
- 自动部署到 GitHub Pages

## 本地开发

需要 Node.js 22 和 npm。克隆项目并安装依赖：

```bash
git clone https://github.com/hooleeas/astro-blog.git
cd astro-blog
npm install
npm run dev
```

使用终端输出的本地地址打开预览。常用命令：

```bash
npm run check
npm run build
npm run preview
```
`check` 检查 Astro 页面和类型，`build` 构建网站，`preview` 预览已构建的网站。

```bash
npm run note "随手记"
```
新建一条随记。

```bash
npm run post "我的第一篇文章"
```
在所有已启用语言目录中创建关联草稿。

```bash
npm run page tags
```
从模板新建 `/tags/` 页面。

这些 npm 命令使用项目安装的工具，适用于 macOS、Windows 和 Linux。`npm run preview` 预览 `dist/`，不会自动检查或构建；需要查看最新改动时，先运行 `npm run build`。预览服务器启动后会持续运行，按 `Ctrl+C` 停止。克隆项目后先运行 `npm install` 安装依赖。新增内容命令分别是 `npm run note`、`npm run post` 和 `npm run page`；在命令后添加名称或路径会直接从模板创建文件，省略参数则会交互填写信息。新建文章会为所有已启用语言各创建一份草稿，并使用相同的 `translationKey` 关联。无参数创建文章时只需输入一次文章名，该名称同时用于标题和文件名，简介留空。脚本不会覆盖已有文件。

## 添加文章

文章按语言存放在 `src/content/posts/<语言代码>/`，例如：

```text
src/content/posts/zh-Hans/
src/content/posts/en/
```

运行 `npm run post "我的第一篇文章"` 会在每个已启用语言目录中创建一份关联草稿。不带参数时只会询问一次文章名，并将其用于标题和文件名；简介保持空白。也可以将 `templates/posts/` 中对应语言的 Markdown 模板复制到相应目录，再编辑 frontmatter 和正文。常用字段：

| 字段 | 用途 |
| --- | --- |
| `title`、`subtitle` | 文章标题和简介 |
| `pubDate` | 发布日期 |
| `tags`、`category` | 标签和分类 |
| `cover` | 可选封面图片 URL；不使用时留空 |
| `translationKey` | 用于关联同一文章的不同语言版本 |
| `draft` | 设为 `true` 时不发布 |
| `popular` | 设为 `true` 时加入热门文章筛选 |

文章目录决定语言。同一篇文章的不同语言版本使用相同的 `translationKey`。Markdown 支持标题、列表、表格、代码和 HTML 媒体元素。排版示例见 `src/content/posts/zh-Hans/attention.md`。

## 添加随记

随记适合几句话的短内容。运行 `npm run note "随手记"`，脚本会从模板创建随记，并将当天日期加入文件名。也可以手动将 `templates/notes/note.md` 复制到 `src/content/notes/`。模板默认 `draft: true`；准备发布时将其设为 `false`。

## 配置站点

`src/data/` 中的配置文件使用 JSONC 格式，因此可以添加 `//` 注释。

| 文件 | 内容 |
| --- | --- |
| `config.jsonc` | 站点信息、语言、导航、页面标题和首页卡片 |
| `posts.jsonc` | 文章目录、分享和打赏显示选项 |
| `about.jsonc` | 关于页面 |
| `apple.jsonc` | Apple 订阅页面 |
| `services.jsonc` | 公益服务页面 |

### 语言

在 `config.jsonc` 的 `languages` 数组中维护语言代码、名称和 `enabled` 状态。关闭某种语言后，它会从语言选择器和生成的对应语言页面中隐藏，但不会删除该语言的文章文件。

### 首页卡片

在 `config.jsonc` 的 `home` 字段中配置：

- `creativity`：技术 Logo 轮播卡片
- `feature`：特色链接卡片
- `profile`：个人资料卡片

每张卡片的 `visible` 控制是否显示；`showOnMobile` 控制是否在窄屏显示（仅当 `visible` 为 `true` 时生效）。这三张卡片默认关闭。图片可以使用外部 URL，也可以放入 `public/` 并填写站点路径。

### 文章页面

使用 `posts.jsonc` 中的 `articlePage` 配置目录、分享卡片和打赏卡片。将二维码图片放入 `public/`，再在 `donationQrCodes` 中填写站点路径。目录和分享卡片默认开启，打赏卡片默认关闭。

## 添加页面

运行 `npm run page tags`，脚本会创建 `src/pages/tags.astro`。也可以将 `templates/pages/page.astro.txt` 复制到 `src/pages/`，去掉 `.txt` 后缀并按用途重命名。例如，`projects.astro` 对应 `/projects/`。

## 部署

网站构建产物位于 `dist/`。本项目使用根域名 `https://hooleeas.github.io`，因此 `base` 为 `/`。

### 首次推送前的准备

推送命令通过 SSH 连接 GitHub。使用 macOS、Linux 或 Git Bash：

1. 生成 SSH 密钥，并查看公钥：

   ```bash
   ssh-keygen -t ed25519 -C "你的 GitHub 邮箱"
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   cat ~/.ssh/id_ed25519.pub
   ```

2. 复制显示的公钥，在 GitHub 打开 **Settings → SSH and GPG keys → New SSH key** 添加。只添加 `.pub` 公钥，不要分享或上传没有 `.pub` 后缀的私钥。
3. 验证连接：

   ```bash
   ssh -T git@github.com
   ```

   看到 GitHub 的问候信息表示 SSH 认证成功。详细说明见 [GitHub SSH 文档](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)。

4. 源码推送命令使用项目的 `origin` 地址。若克隆时使用 HTTPS，将它改为你 Fork 后的 SSH 地址：

   ```bash
   git remote set-url origin git@github.com:你的用户名/astro-blog.git
   git remote -v
   ```

5. 网站推送命令使用 [scripts/push.js](./scripts/push.js) 中的目标仓库设置。将 `pagesRepository` 改为你有写入权限的 Pages 仓库 SSH 地址；如果该仓库默认分支不是 `main`，同时修改 `pagesBranch`：

   ```js
   const pagesRepository = "git@github.com:你的用户名/你的用户名.github.io.git";
   const pagesBranch = "main";
   ```

### 检查、构建并推送到 GitHub

在项目目录运行对应命令。脚本会先运行 `npm run check` 和 `npm run build`，再使用默认提交说明提交并推送：

```bash
npm run push-repo
```

`push-repo`：推送项目文件到当前 `origin` 仓库；若 Cloudflare 连接此仓库，会自动部署。

```bash
npm run push-pages
```

`push-pages`：用 `dist/` 替换 Pages 仓库内容并推送到 `main`。

两条命令分别推送到不同仓库，不会互相代替。推送构建产物需要对 `hooleeas/hooleeas.github.io` 有写入权限并配置 GitHub SSH 认证；第二条命令会替换目标仓库中的网站文件，请确认该仓库专用于此站点。


### Cloudflare Pages

#### 连接 Git 仓库部署

在 Cloudflare 中按以下路径操作：

```text
计算
  → Workers 和 Pages
  → 创建应用程序
  → 继续前往 Pages
  → 导入现有 Git 存储库
  → 选择 Fork 的项目
  → 开始设置
```

选择要部署的仓库和分支（本项目为 `hooleeas/astro-blog` 的 `main`），然后按仓库内容填写构建设置：

| 仓库内容 | 构建命令 | 构建输出目录 | 根目录 |
| --- | --- | --- | --- |
| Astro 源代码（如本项目） | `npm run build` | `dist` | 留空 |
| 已构建的静态文件（仓库根目录已有 `index.html` 等文件） | 留空 | 留空 | 留空 |

点击 **保存并部署**。连接的是源码仓库时，之后每次推送都会自动重新构建和部署；如果仓库里已经是构建好的静态文件，就不需要填写构建命令和输出目录。
