---
title: Markdownコンテンツ例：見出しからメディアまで
subtitle: 見出し、文字装飾、リスト、表、コード、メディアなど、記事テンプレートで使える書式を紹介します。
pubDate: '2026-10-31'
tags:
  - Markdown
  - 文章作成
  - サンプル
category: ガイド
cover: 'https://astro-blog-admin.pages.dev/demo/demo_attention.webp'
translationKey: markdown-content-showcase
draft: false
popular: false
---

これは**そのままプレビューできるMarkdown記事のサンプル**です。サイト上での表示を確認し、コピーして自分の記事に合わせて編集できます。見出しや説明、メディアのURLはすべて例です。

> まず内容をわかりやすく書き、そのあとで書式を選びましょう。適切なレイアウトは理解を助けますが、内容そのものの代わりにはなりません。

## 記事の構成

見出しのレベルを使ってテーマを整理できます。各セクションに導入を書き、必要に応じて小見出しで詳しく説明しましょう。

### テーマの下にある小見出し

これは通常の段落です。背景を紹介したり、考えを説明したり、次に扱う内容を示したりできます。段落の間には空行を入れます。

#### さらに詳しい小節

見出しはさらに細分化できます。文字サイズを変えるためにレベルを飛ばさず、順番に使いましょう。

##### インラインの文字装飾

本文では**太字**、*斜体*、~~取り消し線~~、`インラインコード`、[通常のリンク](https://example.com)を使えます。キーワードやコマンド、参考資料を示すのに便利です。

## リストと引用

### 箇条書き

- 1つ目：要点や材料を列挙します。
- 2つ目：各項目を文章にしても構いません。
- 3つ目：2つのスペースでインデントすると、入れ子にできます。
  - サブ項目 A
  - サブ項目 B

### 番号付きリスト

1. 解決したい問題を決めます。
2. 手順を順番に説明します。
3. 結果や次の行動をまとめます。

### タスクリスト

- [x] タイトルと概要を用意
- [x] 記事の構成を作成
- [ ] 自分の内容に置き換える

## 表

短く比較できる情報には表が便利です。

| コンテンツ | 用途 | 例 |
| --- | --- | --- |
| 段落 | 紹介と説明 | 背景 |
| リスト | 関連する項目 | 準備 |
| コード | 技術的な例 | 設定 |

## コード

`npm run build` のようなコマンドはインラインコードで示せます。コードブロックには言語名を付けると、シンタックスハイライトが使われます。

```ts
type Article = {
  title: string;
  published: boolean;
};

const example: Article = {
  title: "Markdownコンテンツ例",
  published: true,
};

console.log(example.title);
```

Shellなど、ほかの言語も指定できます。

```bash
npm install
npm run dev
```

## 画像とメディア

### 画像

Markdown記法で画像を挿入できます。次の例ではサイト内のアバターを使っています。自分の記事では `public/` 内の画像に置き換えてください。

![サイト画像の例](/images/avatar.webp)

サイズやCSSクラスを指定する場合はHTMLも使えます。

<img class="square-image" src="/images/avatar.webp" alt="正方形画像の例" />

### 音声

音声にはHTMLの `<audio>` 要素を使います。公開する際は、利用許可のある音声ファイルに置き換えてください。

<audio controls preload="none">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
  お使いのブラウザーは音声再生に対応していません。
</audio>

### 動画ファイル

`<video>` で動画を再生できます。`src` はローカルのメディアパス、またはアクセス可能な動画URLに置き換えてください。

<video controls preload="metadata" poster="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=80">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
  お使いのブラウザーは動画再生に対応していません。
</video>

### 埋め込み動画

動画サービスによってはiframeの埋め込みコードが提供されています。次の例はYouTubeのプライバシー強化モードです。公開前に動画IDを置き換え、埋め込みが許可されているか確認してください。

<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ"
    title="埋め込み動画の例"
    width="1280"
    height="720"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

## 補足

折りたたみ表示は補足説明に便利です。必要なければ削除できます。

<details>
  <summary>クリックして補足を表示</summary>
  <p>用語の説明や追加のヒントなど、本文の流れに影響しない内容を記載できます。</p>
</details>

## まとめ

記事には導入、複数レベルの見出し、メディア、まとめを組み合わせられます。すべての要素を使う必要はありません。内容に合った書式を選び、このサンプルの文章、画像、メディアURLを忘れずに置き換えてください。
