# Astro Blog

[English](./README.md) | [简体中文](./README.zh-Hans.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

一个基于 Astro 构建的多语言静态博客。文章使用 Markdown 编写，站点文案和页面内容通过 JSONC 文件管理。你可以 Fork 本项目，替换示例内容后部署到静态网站托管平台。

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
npm run check    # 检查 Astro 页面和类型
npm run build    # 构建静态网站到 dist/
npm run preview  # 在本地预览生产构建
astro new note "随手记"  # 新建随记
astro new post "我的第一篇文章"  # 同时新建所有启用语言的文章
astro new page tags  # 新建 /tags/ 页面
```

末尾参数分别作为随记名称、文章标题或页面路径。填写参数后会直接从模板创建文件；省略参数则会交互填写信息。新建文章会为所有已启用语言各创建一份草稿，并使用相同的 `translationKey` 关联。无参数创建文章时只需输入一次文章名，该名称同时用于标题和文件名，简介留空。本机已在 zsh 中配置包装函数，将 `astro new` 转给项目创建脚本；配置后请新开终端。在其他 shell 或设备上可使用 `npm run astro -- new page tags`。脚本不会覆盖已有文件。

## 添加文章

文章按语言存放在 `src/content/posts/<语言代码>/`，例如：

```text
src/content/posts/zh-Hans/
src/content/posts/en/
```

运行 `astro new post "我的第一篇文章"` 会在每个已启用语言目录中创建一份关联草稿。不带参数时只会询问一次文章名，并将其用于标题和文件名；简介保持空白。也可以将 `templates/posts/` 中对应语言的 Markdown 模板复制到相应目录，再编辑 frontmatter 和正文。常用字段：

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

随记适合几句话的短内容。运行 `astro new note "随手记"`，脚本会从模板创建随记，并将当天日期加入文件名。也可以手动将 `templates/notes/note.md` 复制到 `src/content/notes/`。模板默认 `draft: true`；准备发布时将其设为 `false`。

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

运行 `astro new page tags`，脚本会创建 `src/pages/tags.astro`。也可以将 `templates/pages/page.astro.txt` 复制到 `src/pages/`，去掉 `.txt` 后缀并按用途重命名。例如，`projects.astro` 对应 `/projects/`。

## 部署

网站构建产物位于 `dist/`。本项目使用根域名 `https://hooleeas.github.io`，因此 `base` 为 `/`。

### 一键推送到 GitHub

在项目目录运行以下命令；提交说明可自定义，不填写时会使用默认说明：

| 推送内容 | 命令 | 操作 |
| --- | --- | --- |
| 源码到当前 `origin` 仓库 | `npm run push:source -- "更新博客源码"` | 暂存并提交项目变更，然后推送当前分支 |
| 构建产物到 `hooleeas.github.io` | `npm run push:pages -- "更新网站"` | 先构建，再用 `dist/` 替换 Pages 仓库内容并推送到 `main` |

推送构建产物需要对 `hooleeas/hooleeas.github.io` 有写入权限，并已配置 GitHub SSH 认证。第二条命令会替换目标仓库中的网站文件，请确认该仓库专用于此站点。

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
