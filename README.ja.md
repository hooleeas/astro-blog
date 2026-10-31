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
git clone https://github.com/hooleeas/astro-blog.git
cd astro-blog
npm install
npm run dev
```

ターミナルに表示されたローカル URL を開いてください。主なコマンド：

```bash
npm run check    # Astro ページと型をチェック
npm run build    # 静的サイトを dist/ にビルド
npm run preview  # ビルド済みサイトをプレビュー
npm run note "quick thought"  # メモを作成
npm run post "My first post"  # 有効なすべての言語で記事を作成
npm run page tags             # /tags/ ページを作成
```

これらの npm コマンドはプロジェクトにインストールされたツールを使い、macOS、Windows、Linux で実行できます。`npm run preview` は `dist/` をプレビューし、チェックやビルドは自動実行しません。最新の変更を確認するには先に `npm run build` を実行してください。サーバーを終了するには `Ctrl+C` を押します。clone 後に `npm install` で依存関係をインストールしてください。コンテンツは `npm run note`、`npm run post`、`npm run page` で作成できます。コマンドの後に名前やパスを指定するとテンプレートから直接作成し、省略すると対話形式で入力します。記事は有効なすべての言語のディレクトリに下書きとして作成され、同じ `translationKey` で関連付けられます。引数なしで記事を作成する場合、入力するのは記事名だけです。

## 記事を追加する

記事は言語ごとに `src/content/posts/<言語コード>/` へ配置します。例：

```text
src/content/posts/zh-Hans/
src/content/posts/en/
```

`npm run post "My first post"` を実行すると、有効なすべての言語ディレクトリに同じ `translationKey` を持つ下書きが作成されます。引数なしの場合は記事名だけを尋ね、その名前をタイトルとファイル名に使い、概要は空欄にします。または、`templates/posts/` から対象言語の Markdown テンプレートをコピーし、frontmatter と本文を編集してください。主なフィールド：

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

メモは短い文章向けです。`npm run note "quick thought"` を実行すると、テンプレートからメモが作成され、ファイル名に当日の日付が付与されます。手動で作成する場合は、`templates/notes/note.md` を `src/content/notes/` にコピーし、`date` と本文を編集してください。テンプレートは `draft: true` が初期値です。公開するときは `false` に変更します。

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

`npm run page tags` を実行すると `src/pages/tags.astro` が作成されます。手動で作成する場合は、`templates/pages/page.astro.txt` を `src/pages/` にコピーし、`.txt` を削除してページ名に変更します。たとえば `projects.astro` は `/projects/` になります。

## デプロイ

ビルド成果物は `dist/` に出力されます。このプロジェクトはルートドメイン `https://hooleeas.github.io` を使うため、`base` は `/` に設定されています。

### 初回 push 前の準備

push コマンドは SSH で GitHub に接続します。macOS、Linux、または Git Bash で操作してください。

1. SSH キーを生成し、公開鍵を表示します。

   ```bash
   ssh-keygen -t ed25519 -C "GitHub のメールアドレス"
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   cat ~/.ssh/id_ed25519.pub
   ```

2. 表示された公開鍵をコピーし、GitHub の **Settings → SSH and GPG keys → New SSH key** に登録します。登録するのは `.pub` 公開鍵だけです。`.pub` が付かない秘密鍵は共有・アップロードしないでください。
3. 接続を確認します。

   ```bash
   ssh -T git@github.com
   ```

   GitHub の挨拶メッセージが表示されれば SSH 認証は成功です。詳しくは [GitHub SSH ドキュメント](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) を参照してください。

4. ソースを push するコマンドはプロジェクトの `origin` URL を使います。HTTPS で clone した場合は、自分の Fork の SSH URL に変更します。

   ```bash
   git remote set-url origin git@github.com:YOUR-USERNAME/astro-blog.git
   git remote -v
   ```

5. サイトを push するコマンドの送信先は [scripts/push.js](./scripts/push.js) で設定されています。`pagesRepository` を書き込み権限のある Pages リポジトリの SSH URL に変更します。デフォルトブランチが `main` 以外の場合は `pagesBranch` も変更します。

   ```js
   const pagesRepository = "git@github.com:YOUR-USERNAME/YOUR-USERNAME.github.io.git";
   const pagesBranch = "main";
   ```

### チェック・ビルドして GitHub に push

プロジェクトのディレクトリで該当するコマンドを実行します。各コマンドは `npm run check` と `npm run build` の後、既定のコミットメッセージでコミット・push します。

```bash
npm run push-repo
```

`push-repo`：プロジェクトファイルを現在の `origin` リポジトリに push します。Cloudflare が接続されていれば自動デプロイされます。

```bash
npm run push-pages
```

`push-pages`：Pages リポジトリの内容を `dist/` で置き換えて `main` に push します。

2 つのコマンドは別々のリポジトリに push するため、互いに置き換えるものではありません。ビルド成果物の push には `hooleeas/hooleeas.github.io` への書き込み権限と GitHub SSH 認証が必要です。2 つ目のコマンドはリポジトリ内のサイトファイルを置き換えるため、このサイト専用のリポジトリでのみ使用してください。


### Cloudflare Pages

#### Git リポジトリからデプロイ

Cloudflare で次の順に操作します。

```text
Compute
  → Workers & Pages
  → Create application
  → Continue to Pages
  → Import an existing Git repository
  → Select a forked project
  → Begin setup
```

デプロイするリポジトリとブランチを選択します（本プロジェクトでは `hooleeas/astro-blog` の `main`）。リポジトリの内容に応じてビルド設定を行います。

| リポジトリの内容 | Build command | Build output directory | Root directory |
| --- | --- | --- | --- |
| Astro のソースコード（本プロジェクトなど） | `npm run build` | `dist` | 空欄 |
| ビルド済みの静的ファイル（ルートに `index.html` などがある） | 空欄 | 空欄 | 空欄 |

**Save and Deploy** をクリックします。ソースコードのリポジトリを接続した場合、以後 push ごとに自動でビルド・デプロイされます。ビルド済み静的ファイルのリポジトリでは、Build command と Build output directory を空欄にします。
