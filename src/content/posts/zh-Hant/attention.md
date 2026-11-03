---
title: Markdown 內容範例：從標題到多媒體
subtitle: 這是一篇可直接預覽的文章範本，展示常見標題層級、文字格式、清單、表格、程式碼與多媒體內容。
pubDate: '2026-10-31'
tags:
  - Markdown
  - 寫作指南
  - 範例
category: 使用指南
cover: 'https://astro-blog-admin.pages.dev/demo/demo_attention.webp'
translationKey: markdown-content-showcase
draft: false
popular: false
---

這是一篇**可直接預覽的 Markdown 文章範例**。你可以先查看內容在網站上的呈現方式，再複製、修改並替換成自己的文章。文中的標題、說明與媒體網址皆為示範素材。

> 先把內容說清楚，再選擇合適的格式。良好的排版可以幫助讀者理解，但不能取代內容本身。

## 文章結構

可以使用不同層級的標題來整理主題。每個章節都可以先簡單介紹，再視需要使用子標題補充細節。

### 主題下的子標題

這是一個一般段落。你可以介紹背景、解釋概念，或簡單說明接下來要討論的內容。段落之間留一個空行即可。

#### 更細一層的小節

標題可以繼續細分。建議依序使用標題層級，不要只為了改變字體大小而跳級。

##### 行內文字格式

內文支援**粗體**、*斜體*、~~刪除線~~、`行內程式碼`和[一般連結](https://example.com)。適合標示關鍵詞、指令名稱或參考資料。

## 清單與引用

### 無序清單

- 第一項：列出重點或材料。
- 第二項：每個項目也可以寫成完整句子。
- 第三項：縮排兩個空格可建立巢狀項目：
  - 子項目 A
  - 子項目 B

### 有序清單

1. 先確定要解決的問題。
2. 再依序說明處理步驟。
3. 最後整理結果或下一步行動。

### 任務清單

- [x] 撰寫標題與摘要
- [x] 建立文章結構
- [ ] 替換成自己的實際內容

## 表格

表格適合呈現簡短且可比較的資訊：

| 內容類型 | 適用情境 | 範例 |
| --- | --- | --- |
| 段落 | 介紹與說明 | 背景資訊 |
| 清單 | 相關要點 | 準備事項 |
| 程式碼 | 技術範例 | 設定片段 |

## 程式碼

像 `npm run build` 這類指令可以使用行內程式碼。程式碼區塊可以指定語言，以顯示語法上色：

```ts
type Article = {
  title: string;
  published: boolean;
};

const example: Article = {
  title: "Markdown 內容範例",
  published: true,
};

console.log(example.title);
```

也可以指定 Shell 等其他語言：

```bash
npm install
npm run dev
```

## 圖片與媒體

### 圖片

可以使用 Markdown 語法插入圖片。以下範例使用網站內的頭像，撰寫自己的文章時可替換成 `public/` 目錄中的其他圖片。

![網站圖片範例](/images/avatar.webp)

若需要指定尺寸或 CSS 類別，也可以使用 HTML：

<img class="square-image" src="/images/avatar.webp" alt="方形圖片範例" />

### 音訊

使用 HTML `<audio>` 元素加入音訊。發布時請替換成自己有權使用的音訊檔案：

<audio controls preload="none">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
  您的瀏覽器不支援音訊播放。
</audio>

### 影片檔案

使用 `<video>` 播放影片。請將 `src` 替換成網站中的媒體路徑或可存取的影片網址：

<video controls preload="metadata" poster="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=80">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
  您的瀏覽器不支援影片播放。
</video>

### 嵌入影片

部分影片平台會提供 iframe 嵌入程式碼。以下使用 YouTube 隱私權強化模式；發布前請替換影片 ID，並確認平台允許嵌入：

<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ"
    title="嵌入影片範例"
    width="1280"
    height="720"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

## 補充說明

可收合區塊適合放置額外說明，不需要時也可以直接刪除：

<details>
  <summary>點擊展開補充說明</summary>
  <p>這裡可以補充術語解釋、額外提示，或不影響主要閱讀脈絡的內容。</p>
</details>

## 寫作小結

一篇文章可以由介紹、多層級章節、多媒體和結尾組成。不必使用所有元件，選擇最適合內容的格式即可。完成後，記得將範例中的文字、圖片與媒體網址換成自己的內容。
