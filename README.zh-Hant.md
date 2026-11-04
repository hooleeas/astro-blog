# Astro Blog

[English](./README.md) | [简体中文](./README.zh-Hans.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

這是一個以 Astro 建置的多語言靜態部落格。文章以 Markdown 撰寫，網站文案與頁面內容透過 JSONC 檔案管理。你可以 Fork 本專案，替換範例內容後，部署至靜態網站代管平台。

本部落格的內容由 **[astro-blog-admin](https://github.com/hooleeas/astro-blog-admin)** 管理——一個配套的網頁管理後台，可編輯本倉庫中的文章、隨記、頁面與網站設定，並內建圖床。

## 功能

- 支援簡體中文、繁體中文、英文、日文與韓文
- Markdown 文章，支援分類、標籤、搜尋與歸檔
- 短篇隨記
- 可設定的導覽列、首頁卡片與內容頁面
- 自動產生文章與頁面的分享預覽圖
- 自動部署至 GitHub Pages

## 本機開發

需要 Node.js 22 與 npm。複製專案並安裝相依套件：

```bash
git clone https://github.com/hooleeas/astro-blog.git
cd astro-blog
npm install
npm run dev
```

使用終端機輸出的本機網址開啟預覽。常用指令：

```bash
npm run check
npm run build
npm run preview
```
`check` 檢查 Astro 頁面與型別，`build` 建置網站，`preview` 預覽已建置的網站。

```bash
npm run note "隨手記"
```
新增一則隨記。

```bash
npm run post "我的第一篇文章"
```
在所有已啟用語言目錄中建立相關聯的草稿。

```bash
npm run page tags
```
從範本新增 `/tags/` 頁面。

這些 npm 命令使用專案安裝的工具，適用於 macOS、Windows 和 Linux。`npm run preview` 預覽 `dist/`，不會自動檢查或建置；要預覽最新變更，請先執行 `npm run build`。預覽伺服器啟動後會持續執行，按 `Ctrl+C` 停止。複製專案後先執行 `npm install` 安裝相依套件。使用 `npm run note`、`npm run post` 或 `npm run page` 建立內容；在指令後加入名稱或路徑即可直接從範本建立，省略參數則會互動輸入資訊。新增文章時會在所有已啟用語言目錄中各建立一份草稿，並以相同的 `translationKey` 關聯。不帶參數建立文章時只需輸入一次文章名稱，該名稱會同時用於標題與檔名，簡介則留白。

## 新增文章

文章依語言存放於 `src/content/posts/<語言代碼>/`，例如：

```text
src/content/posts/zh-Hans/
src/content/posts/en/
```

執行 `npm run post "我的第一篇文章"` 會在每個已啟用語言目錄中建立一份已關聯的草稿。不帶參數時只會詢問一次文章名稱，並將其用於標題與檔名；簡介保持空白。也可以將 `templates/posts/` 中對應語言的 Markdown 範本複製到相應目錄，再編輯 frontmatter 與內文。常用欄位：

| 欄位 | 用途 |
| --- | --- |
| `title`、`subtitle` | 文章標題與簡介 |
| `pubDate` | 發布日期 |
| `tags`、`category` | 標籤與分類 |
| `cover` | 選填的封面圖片 URL；不使用時留空 |
| `translationKey` | 用來關聯同一篇文章的不同語言版本 |
| `draft` | 設為 `true` 時不會發布 |
| `popular` | 設為 `true` 時加入熱門文章篩選 |

文章目錄決定語言。同一篇文章的不同語言版本使用相同的 `translationKey`。Markdown 支援標題、清單、表格、程式碼與 HTML 媒體元素。排版範例請參閱 `src/content/posts/zh-Hant/attention.md`。

## 新增隨記

隨記適合幾句話的短內容。執行 `npm run note "隨手記"`，指令會從範本建立隨記，並將當天日期加入檔名。也可以手動將 `templates/notes/note.md` 複製到 `src/content/notes/`。範本預設為 `draft: true`；準備發布時請改為 `false`。

## 設定網站

`src/data/` 中的設定檔採用 JSONC 格式，因此可以加入 `//` 註解。

| 檔案 | 內容 |
| --- | --- |
| `config.jsonc` | 網站資訊、語言、導覽列、頁面標題與首頁卡片 |
| `posts.jsonc` | 文章目錄、分享與打賞顯示選項 |
| `about.jsonc` | 關於頁面 |
| `apple.jsonc` | Apple 訂閱頁面 |
| `services.jsonc` | 公益服務頁面 |

### 語言

在 `config.jsonc` 的 `languages` 陣列中維護語言代碼、名稱與 `enabled` 狀態。停用某種語言後，它會從語言選單與產生的對應語言頁面中隱藏，但不會刪除該語言的文章檔案。

### 首頁卡片

在 `config.jsonc` 的 `home` 欄位設定：

- `creativity`：技術 Logo 輪播卡片
- `feature`：特色連結卡片
- `profile`：個人資料卡片

每張卡片的 `visible` 控制是否顯示；`showOnMobile` 控制是否在窄螢幕顯示（僅在 `visible` 為 `true` 時生效）。這三張卡片預設為關閉。圖片可使用外部 URL，也可放入 `public/` 並填寫網站路徑。

### 文章頁面

使用 `posts.jsonc` 中的 `articlePage` 設定目錄、分享卡片與打賞卡片。將 QR Code 圖片放入 `public/`，再於 `donationQrCodes` 填寫網站路徑。目錄與分享卡片預設開啟，打賞卡片預設關閉。

## 新增頁面

執行 `npm run page tags`，指令會建立 `src/pages/tags.astro`。也可以將 `templates/pages/page.astro.txt` 複製到 `src/pages/`，移除 `.txt` 副檔名並依用途重新命名。例如，`projects.astro` 對應 `/projects/`。

## 部署

網站建置產物位於 `dist/`。本專案使用根網域 `https://hooleeas.github.io`，因此 `base` 設為 `/`。

### 首次推送前的準備

推送指令透過 SSH 連線 GitHub。使用 macOS、Linux 或 Git Bash：

1. 產生 SSH 金鑰並查看公開金鑰：

   ```bash
   ssh-keygen -t ed25519 -C "你的 GitHub 電子郵件"
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   cat ~/.ssh/id_ed25519.pub
   ```

2. 複製顯示的公開金鑰，在 GitHub 開啟 **Settings → SSH and GPG keys → New SSH key** 新增。只新增 `.pub` 公開金鑰，不要分享或上傳沒有 `.pub` 副檔名的私密金鑰。
3. 驗證連線：

   ```bash
   ssh -T git@github.com
   ```

   看到 GitHub 的問候訊息即表示 SSH 驗證成功。詳細說明請見 [GitHub SSH 文件](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)。

4. 推送專案檔案的指令會使用專案的 `origin` 位址。若複製時使用 HTTPS，請改成你 Fork 後的 SSH 位址：

   ```bash
   git remote set-url origin git@github.com:你的使用者名稱/astro-blog.git
   git remote -v
   ```

5. 推送網站檔案的指令會使用 [scripts/push.js](./scripts/push.js) 中的目標儲存庫設定。將 `pagesRepository` 改成你有寫入權限的 Pages 儲存庫 SSH 位址；若預設分支不是 `main`，也請修改 `pagesBranch`：

   ```js
   const pagesRepository = "git@github.com:你的使用者名稱/你的使用者名稱.github.io.git";
   const pagesBranch = "main";
   ```

### 檢查、建置並推送到 GitHub

在專案目錄執行對應指令。腳本會先執行 `npm run check` 和 `npm run build`，再使用預設提交說明提交並推送：

```bash
npm run push-repo
```

`push-repo`：推送專案檔案到目前的 `origin` 儲存庫；若 Cloudflare 連接此儲存庫，會自動部署。

```bash
npm run push-pages
```

`push-pages`：以 `dist/` 取代 Pages 儲存庫內容並推送到 `main`。

兩個指令會推送到不同儲存庫，不能互相取代。推送建置產物需要有 `hooleeas/hooleeas.github.io` 的寫入權限，並已設定 GitHub SSH 驗證；第二個指令會取代目標儲存庫中的網站檔案，請確認該儲存庫專用於此網站。


### Cloudflare Pages

#### 連接 Git 儲存庫部署

在 Cloudflare 中依照以下路徑操作：

```text
計算
  → Workers 和 Pages
  → 建立應用程式
  → 繼續前往 Pages
  → 匯入現有 Git 儲存庫
  → 選擇 Fork 的專案
  → 開始設定
```

選擇要部署的儲存庫和分支（本專案為 `hooleeas/astro-blog` 的 `main`），再依儲存庫內容設定建置選項：

| 儲存庫內容 | 建置指令 | 建置輸出目錄 | 根目錄 |
| --- | --- | --- | --- |
| Astro 原始碼（例如本專案） | `npm run build` | `dist` | 留白 |
| 已建置的靜態檔案（儲存庫根目錄已有 `index.html` 等檔案） | 留白 | 留白 | 留白 |

點擊 **儲存並部署**。連接原始碼儲存庫時，之後每次推送都會自動重新建置和部署；如果儲存庫中已是建置完成的靜態檔案，則不必填寫建置指令和輸出目錄。
