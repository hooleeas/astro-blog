# Astro Blog

[English](./README.md) | [简体中文](./README.zh-Hans.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

這是一個以 Astro 建置的多語言靜態部落格。文章以 Markdown 撰寫，網站文案與頁面內容透過 JSONC 檔案管理。你可以 Fork 本專案，替換範例內容後，部署至靜態網站代管平台。

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
npm run check    # 檢查 Astro 頁面與型別
npm run build    # 將靜態網站建置至 dist/
npm run preview  # 在本機預覽正式建置結果
astro new note "隨手記"  # 新增隨記
astro new post "我的第一篇文章"  # 同時新增所有啟用語言的文章
astro new page tags  # 新增 /tags/ 頁面
```

最後的參數分別作為隨記名稱、文章標題或頁面路徑。提供參數時會直接從範本建立檔案；省略參數則會互動輸入資訊。新增文章時會在所有已啟用語言目錄中各建立一份草稿，並以相同的 `translationKey` 關聯。不帶參數建立文章時只需輸入一次文章名稱，該名稱會同時用於標題與檔名，簡介則留白。本機已在 zsh 中設定包裝函式，會將 `astro new` 轉交給專案建立腳本；設定後請重新開啟終端機。在其他 shell 或裝置上可使用 `npm run astro -- new page tags`。指令不會覆寫已存在的檔案。

## 新增文章

文章依語言存放於 `src/content/posts/<語言代碼>/`，例如：

```text
src/content/posts/zh-Hans/
src/content/posts/en/
```

執行 `astro new post "我的第一篇文章"` 會在每個已啟用語言目錄中建立一份已關聯的草稿。不帶參數時只會詢問一次文章名稱，並將其用於標題與檔名；簡介保持空白。也可以將 `templates/posts/` 中對應語言的 Markdown 範本複製到相應目錄，再編輯 frontmatter 與內文。常用欄位：

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

隨記適合幾句話的短內容。執行 `astro new note "隨手記"`，指令會從範本建立隨記，並將當天日期加入檔名。也可以手動將 `templates/notes/note.md` 複製到 `src/content/notes/`。範本預設為 `draft: true`；準備發布時請改為 `false`。

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

執行 `astro new page tags`，指令會建立 `src/pages/tags.astro`。也可以將 `templates/pages/page.astro.txt` 複製到 `src/pages/`，移除 `.txt` 副檔名並依用途重新命名。例如，`projects.astro` 對應 `/projects/`。

## 部署

網站建置產物位於 `dist/`。本專案使用根網域 `https://hooleeas.github.io`，因此 `base` 設為 `/`。

### 一鍵推送到 GitHub

在專案目錄執行以下指令；提交說明可自訂，不填時會使用預設說明：

| 推送內容 | 指令 | 操作 |
| --- | --- | --- |
| 原始碼到目前的 `origin` 儲存庫 | `npm run push:source -- "更新部落格原始碼"` | 暫存並提交專案變更，再推送目前分支 |
| 建置產物到 `hooleeas.github.io` | `npm run push:pages -- "更新網站"` | 先建置，再以 `dist/` 取代 Pages 儲存庫內容並推送到 `main` |

推送建置產物需要有 `hooleeas/hooleeas.github.io` 的寫入權限，並已設定 GitHub SSH 驗證。第二個指令會取代目標儲存庫中的網站檔案，請確認該儲存庫專用於此網站。

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
