# Astro Blog

[English](./README.md) | [简体中文](./README.zh-Hans.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

Astro で構築した多言語対応の静的ブログです。記事は Markdown で記述し、サイトの文言やページ内容は JSONC ファイルで管理します。このプロジェクトを Fork し、サンプル内容を自分のものに置き換えて、静的ホスティングサービスにデプロイできます。

## 主な機能

- 簡体字中国語、繁体字中国語、英語、日本語、韓国語に対応
- カテゴリー、タグ、検索、アーカイブに対応した Markdown 記事
- 短いメモの投稿
- ナビゲーション、ホームカード、コンテンツページを設定可能
- 記事とページのシェア用プレビュー画像を自動生成
- GitHub Pages への自動デプロイ

## ローカル開発

Node.js 22 と npm が必要です。リポジトリをクローンして依存関係をインストールします。

```bash
git clone <リポジトリの URL>
cd <プロジェクトディレクトリ>
npm install
npm run dev
```

ターミナルに表示されたローカル URL を開いてください。主なコマンド：

```bash
npm run check    # Astro ページと型をチェック
npm run build    # dist/ に静的サイトをビルド
npm run preview  # 本番ビルドをローカルでプレビュー
astro new note "quick thought"  # メモを作成
astro new post "My first post"  # 有効なすべての言語で記事を作成
astro new page tags             # /tags/ ページを作成
```

最後の引数はメモの名前、記事タイトル、またはページのパスになります。引数を指定するとテンプレートから直接ファイルを作成し、省略すると対話形式で入力します。記事は有効なすべての言語のディレクトリに下書きとして作成され、同じ `translationKey` で関連付けられます。引数なしで記事を作成する場合、入力するのは記事名だけです。その名前をタイトルとファイル名に使い、概要は空欄にします。この環境では zsh のラッパー関数が `astro new` をプロジェクトの作成スクリプトに渡します。設定後、新しいターミナルを開いてください。他のシェルや環境では `npm run astro -- new page tags` を使用できます。既存ファイルは上書きしません。

## 記事を追加する

記事は言語ごとに `src/content/posts/<言語コード>/` へ配置します。例：

```text
src/content/posts/zh-Hans/
src/content/posts/en/
```

`astro new post "My first post"` を実行すると、有効なすべての言語ディレクトリに同じ `translationKey` を持つ下書きが作成されます。引数なしの場合は記事名だけを尋ね、その名前をタイトルとファイル名に使い、概要は空欄にします。または、`templates/posts/` から対象言語の Markdown テンプレートをコピーし、frontmatter と本文を編集してください。主なフィールド：

| フィールド | 用途 |
| --- | --- |
| `title`、`subtitle` | 記事のタイトルと概要 |
| `pubDate` | 公開日 |
| `tags`、`category` | タグとカテゴリー |
| `cover` | 任意のカバー画像 URL。不要な場合は空欄 |
| `translationKey` | 翻訳版を同じ記事として関連付けるキー |
| `draft` | `true` にすると非公開 |
| `popular` | `true` にすると人気記事フィルターに含める |

記事の言語は配置先のディレクトリで決まります。同じ記事の翻訳版には同じ `translationKey` を設定してください。Markdown では見出し、リスト、表、コード、HTML のメディア要素を使用できます。書式の例は `src/content/posts/ja/attention.md` を参照してください。

## メモを追加する

メモは短い文章向けです。`astro new note "quick thought"` を実行すると、テンプレートからメモが作成され、ファイル名に当日の日付が付与されます。手動で作成する場合は、`templates/notes/note.md` を `src/content/notes/` にコピーし、`date` と本文を編集してください。テンプレートは `draft: true` が初期値です。公開するときは `false` に変更します。

## サイトを設定する

`src/data/` の設定ファイルは JSONC 形式で、`//` コメントを記述できます。

| ファイル | 内容 |
| --- | --- |
| `config.jsonc` | サイト情報、言語、ナビゲーション、ページ見出し、ホームカード |
| `posts.jsonc` | 目次、シェア、寄付カードなどの記事表示設定 |
| `about.jsonc` | About ページ |
| `apple.jsonc` | Apple サブスクリプションページ |
| `services.jsonc` | 公益サービスページ |

### 言語

`config.jsonc` の `languages` 配列で言語コード、表示名、`enabled` の状態を管理します。言語を無効にすると、言語セレクターと生成される該当言語のページから非表示になりますが、その言語の記事ファイルは削除されません。

### ホームカード

`config.jsonc` の `home` で次のカードを設定します。

- `creativity`：技術ロゴのカルーセル
- `feature`：おすすめリンクカード
- `profile`：プロフィールカード

各カードの `visible` で表示の有無を、`showOnMobile` で狭い画面での表示を設定します（`visible` が `true` の場合のみ有効）。3つのカードは初期状態では無効です。画像には外部 URL、または `public/` に置いたファイルのサイトパスを指定できます。

### 記事ページ

`posts.jsonc` の `articlePage` で目次、シェアカード、寄付カードを設定します。QR コード画像を `public/` に置き、`donationQrCodes` にサイトパスを指定してください。目次とシェアカードは初期状態で有効、寄付カードは無効です。

## ページを追加する

`astro new page tags` を実行すると `src/pages/tags.astro` が作成されます。手動で作成する場合は、`templates/pages/page.astro.txt` を `src/pages/` にコピーし、`.txt` を削除してページ名に変更します。たとえば `projects.astro` は `/projects/` になります。

## デプロイ

ビルド成果物は `dist/` に出力されます。このプロジェクトはルートドメイン `https://hooleeas.github.io` を使うため、`base` は `/` に設定されています。

### GitHub Pages：ビルド成果物のみを公開

ソースリポジトリは非公開のままにできます。`.github/workflows/deploy.yml` はサイトをビルドし、`dist/` の内容のみを `hooleeas/hooleeas.github.io` リポジトリの `main` ブランチに push します。

1. Fine-grained personal access token を作成し、`hooleeas/hooleeas.github.io` リポジトリだけに **Contents: Read and write** 権限を付与します。
2. ソースリポジトリの **Settings → Secrets and variables → Actions** で secret `PAGES_DEPLOY_TOKEN` を追加します。
3. `hooleeas/hooleeas.github.io` の **Settings → Pages → Build and deployment → Source** で **Deploy from a branch** を選び、ブランチを `main`、フォルダーを `/(root)` に設定します。
4. ソースリポジトリの `main` または `master` に push するか、Actions タブから **Build and publish site** を手動実行します。

ワークフローが Pages リポジトリへ書き込むには `PAGES_DEPLOY_TOKEN` secret が必要です。Token をソースコードに含めないでください。手動で公開する場合は `npm run build` を実行し、`dist/` の中身を Pages リポジトリの `main` ブランチに push します。

### Cloudflare Pages：ビルド成果物リポジトリを接続

`hooleeas/hooleeas.github.io` を接続する場合、リポジトリのルートにすでにビルド成果物（`index.html`、`_astro/` など）があります。フレームワークプリセットは **None** を選択し、ビルドコマンド、ビルド出力ディレクトリ、ルートディレクトリはすべて空欄のままにします。この設定は本プロジェクトで動作確認済みです。成果物を push するワークフローが `main` を更新すると、Cloudflare が自動でデプロイします。

### Cloudflare Pages：ソースリポジトリからビルド

ソースリポジトリを直接接続することもできます。

1. Cloudflare ダッシュボードで **Workers & Pages → Create application → Pages → Connect to Git** を開きます。
2. GitHub を接続し、ソースリポジトリとデプロイするブランチを選択します。
3. フレームワークプリセットを **Astro**、ビルドコマンドを `npm run build`、ビルド出力ディレクトリを `dist` に設定します。ルートディレクトリは空欄にします。
4. **Save and Deploy** を選択します。以後、選択したブランチへの push 時に Cloudflare が自動でビルド・デプロイします。

### Cloudflare Pages：`dist/` のみをアップロード（Direct Upload）

1. ローカルで `npm run build` を実行します。
2. Cloudflare ダッシュボードで **Workers & Pages → Create application → Pages → Drag and drop your files** を開きます。
3. プロジェクト名を入力し、`dist/` フォルダーをアップロードして **Deploy site** を選択します。
4. 更新時は再ビルドし、Pages プロジェクトの **Create a new deployment** から新しい `dist/` をアップロードします。Wrangler を使う場合は `npx wrangler pages deploy dist` を実行します。

Direct Upload はソースリポジトリを接続せず、後から Git 連携に切り替えることもできません。切り替える場合は新しいプロジェクトを作成してください。どちらのホスティングでも、ブラウザーに配信される HTML、CSS、JavaScript は閲覧できます。`dist/` だけを公開しても、フロントエンドコードが隠されたり暗号化されたりするわけではありません。
