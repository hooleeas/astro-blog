# Astro Blog

[English](./README.md) | [简体中文](./README.zh-Hans.md) | [繁體中文](./README.zh-Hant.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md)

Astro로 만든 다국어 정적 블로그입니다. 글은 Markdown으로 작성하고 사이트 문구와 페이지 콘텐츠는 JSONC 파일로 관리합니다. 이 프로젝트를 Fork한 다음 예시 콘텐츠를 자신의 콘텐츠로 바꾸고 정적 호스팅 서비스에 배포할 수 있습니다.

## 주요 기능

- 중국어 간체, 중국어 번체, 영어, 일본어, 한국어 지원
- 카테고리, 태그, 검색, 아카이브를 지원하는 Markdown 글
- 짧은 메모
- 내비게이션, 홈 카드, 콘텐츠 페이지 설정 가능
- 글과 페이지의 공유 미리보기 이미지 자동 생성
- GitHub Pages 자동 배포

## 로컬 개발

Node.js 22와 npm이 필요합니다. 저장소를 복제하고 의존성을 설치하세요.

```bash
git clone https://github.com/hooleeas/astro-blog.git
cd astro-blog
npm install
npm run dev
```

터미널에 표시되는 로컬 URL을 열어 미리 볼 수 있습니다. 자주 사용하는 명령:

```bash
npm run check    # Astro 페이지 및 타입 검사
npm run build    # 정적 사이트를 dist/에 빌드
npm run preview  # 빌드된 사이트 미리 보기
npm run note "quick thought" # 메모 생성
npm run post "My first post" # 활성화된 모든 언어로 글 생성
npm run page tags # /tags/ 페이지 생성
```

이 npm 명령은 프로젝트에 설치된 도구를 사용하므로 macOS, Windows, Linux에서 실행할 수 있습니다. `npm run preview`는 `dist/`를 미리 보며 검사나 빌드를 자동 실행하지 않습니다. 최신 변경 사항을 보려면 먼저 `npm run build`를 실행하세요. 미리 보기 서버를 종료하려면 `Ctrl+C`를 누르세요. 저장소를 복제한 뒤 `npm install`로 의존성을 설치하세요. `npm run note`, `npm run post`, `npm run page` 명령으로 콘텐츠를 만들 수 있습니다. 명령 뒤에 이름이나 경로를 입력하면 템플릿에서 바로 만들고, 생략하면 대화형으로 입력합니다. 새 글은 활성화된 모든 언어 디렉터리에 초안으로 생성되며 같은 `translationKey`로 연결됩니다. 인수 없이 글을 만들 때는 글 이름만 한 번 입력하면 됩니다.

## 글 추가하기

글은 언어별로 `src/content/posts/<언어 코드>/`에 저장합니다. 예:

```text
src/content/posts/zh-Hans/
src/content/posts/en/
```

`npm run post "My first post"`를 실행하면 활성화된 모든 언어 디렉터리에 같은 `translationKey`를 가진 초안이 생성됩니다. 인수가 없으면 글 이름만 한 번 입력하고, 입력한 이름을 제목과 파일명에 사용하며 요약은 비워 둡니다. 또는 `templates/posts/`에서 해당 언어의 Markdown 템플릿을 복사해 언어 디렉터리에 넣은 다음 frontmatter와 본문을 수정하세요. 주요 필드:

| 필드 | 용도 |
| --- | --- |
| `title`, `subtitle` | 글 제목과 요약 |
| `pubDate` | 게시 날짜 |
| `tags`, `category` | 태그와 카테고리 |
| `cover` | 선택 사항인 커버 이미지 URL. 사용하지 않으면 비워 둡니다 |
| `translationKey` | 번역 글을 같은 글로 연결하는 키 |
| `draft` | `true`이면 공개하지 않음 |
| `popular` | `true`이면 인기 글 필터에 포함 |

글의 언어는 파일이 있는 디렉터리로 결정됩니다. 같은 글의 번역본에는 동일한 `translationKey`를 사용하세요. Markdown에서 제목, 목록, 표, 코드, HTML 미디어 요소를 사용할 수 있습니다. 서식 예시는 `src/content/posts/ko/attention.md`에서 확인할 수 있습니다.

## 메모 추가하기

메모는 짧은 내용을 기록할 때 사용합니다. `npm run note "quick thought"`를 실행하면 템플릿에서 메모를 만들고 파일 이름에 오늘 날짜를 넣습니다. 직접 만들려면 `templates/notes/note.md`를 `src/content/notes/`에 복사하고 `date`와 본문을 수정하세요. 템플릿의 기본값은 `draft: true`입니다. 게시할 준비가 되면 `false`로 변경하세요.

## 사이트 설정

`src/data/`의 설정 파일은 JSONC 형식이므로 `//` 주석을 사용할 수 있습니다.

| 파일 | 내용 |
| --- | --- |
| `config.jsonc` | 사이트 정보, 언어, 내비게이션, 페이지 제목, 홈 카드 |
| `posts.jsonc` | 목차, 공유, 후원 카드 등 글 표시 설정 |
| `about.jsonc` | 소개 페이지 |
| `apple.jsonc` | Apple 구독 페이지 |
| `services.jsonc` | 공익 서비스 페이지 |

### 언어

`config.jsonc`의 `languages` 배열에서 언어 코드, 표시 이름, `enabled` 상태를 관리합니다. 언어를 비활성화하면 언어 선택기와 생성되는 해당 언어 페이지에서 숨겨지지만, 해당 언어의 글 파일이 삭제되지는 않습니다.

### 홈 카드

`config.jsonc`의 `home`에서 다음 카드를 설정합니다.

- `creativity`: 기술 로고 캐러셀
- `feature`: 추천 링크 카드
- `profile`: 프로필 카드

각 카드의 `visible`은 표시 여부를, `showOnMobile`은 좁은 화면에서의 표시 여부를 제어합니다 (`visible`이 `true`인 경우에만 적용). 세 카드는 기본적으로 비활성화되어 있습니다. 이미지는 외부 URL을 사용하거나 `public/`에 넣고 사이트 경로를 지정할 수 있습니다.

### 글 페이지

`posts.jsonc`의 `articlePage`에서 목차, 공유 카드, 후원 카드를 설정합니다. QR 코드 이미지를 `public/`에 넣고 `donationQrCodes`에 사이트 경로를 지정하세요. 목차와 공유 카드는 기본적으로 활성화되고 후원 카드는 비활성화됩니다.

## 페이지 추가하기

`npm run page tags`를 실행하면 `src/pages/tags.astro`가 생성됩니다. 직접 만들려면 `templates/pages/page.astro.txt`를 `src/pages/`에 복사하고 `.txt` 확장자를 제거한 다음 페이지 이름으로 변경하세요. 예를 들어 `projects.astro`는 `/projects/` 페이지를 만듭니다.

## 배포

빌드 결과물은 `dist/`에 생성됩니다. 이 프로젝트는 루트 도메인 `https://hooleeas.github.io`를 사용하므로 `base`가 `/`로 설정되어 있습니다.

### 처음 푸시하기 전 설정

푸시 명령은 SSH를 통해 GitHub에 연결합니다. macOS, Linux 또는 Git Bash에서 진행하세요.

1. SSH 키를 만들고 공개 키를 확인합니다.

   ```bash
   ssh-keygen -t ed25519 -C "GitHub 이메일 주소"
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   cat ~/.ssh/id_ed25519.pub
   ```

2. 표시된 공개 키를 복사해 GitHub의 **Settings → SSH and GPG keys → New SSH key**에 추가합니다. `.pub` 공개 키만 등록하세요. `.pub` 확장자가 없는 개인 키는 공유하거나 업로드하지 마세요.
3. 연결을 확인합니다.

   ```bash
   ssh -T git@github.com
   ```

   GitHub 인사말이 표시되면 SSH 인증이 완료된 것입니다. 자세한 내용은 [GitHub SSH 문서](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)를 참고하세요.

4. 프로젝트 파일 푸시 명령은 프로젝트의 `origin` 주소를 사용합니다. HTTPS로 복제했다면 본인 Fork의 SSH 주소로 변경하세요.

   ```bash
   git remote set-url origin git@github.com:YOUR-USERNAME/astro-blog.git
   git remote -v
   ```

5. 사이트 파일 푸시 명령의 대상은 [scripts/push.js](./scripts/push.js)에 설정되어 있습니다. `pagesRepository`를 쓰기 권한이 있는 Pages 저장소의 SSH 주소로 바꾸세요. 기본 브랜치가 `main`이 아니면 `pagesBranch`도 변경하세요.

   ```js
   const pagesRepository = "git@github.com:YOUR-USERNAME/YOUR-USERNAME.github.io.git";
   const pagesBranch = "main";
   ```

### 검사·빌드 후 GitHub에 푸시하기

프로젝트 디렉터리에서 해당 명령을 실행하세요. 각 명령은 `npm run check`와 `npm run build` 후 기본 커밋 메시지로 커밋하고 푸시합니다.

```bash
npm run push-repo
```

`push-repo`: 프로젝트 파일을 현재 `origin` 저장소에 푸시합니다. Cloudflare가 연결되어 있으면 자동 배포됩니다.

```bash
npm run push-pages
```

`push-pages`: Pages 저장소 내용을 `dist/`로 교체하고 `main`에 푸시합니다.

두 명령은 서로 다른 저장소에 푸시하며 서로 대체하지 않습니다. 빌드 결과물을 푸시하려면 `hooleeas/hooleeas.github.io` 쓰기 권한과 GitHub SSH 인증이 필요합니다. 두 번째 명령은 해당 저장소의 사이트 파일을 교체하므로 이 사이트 전용 저장소에서만 사용하세요.


### Cloudflare Pages

#### Git 저장소에서 배포

Cloudflare에서 다음 순서로 진행하세요.

```text
Compute
  → Workers & Pages
  → Create application
  → Continue to Pages
  → Import an existing Git repository
  → Select a forked project
  → Begin setup
```

배포할 저장소와 브랜치를 선택합니다(이 프로젝트는 `hooleeas/astro-blog`의 `main`). 저장소 내용에 따라 빌드 설정을 입력하세요.

| 저장소 내용 | Build command | Build output directory | Root directory |
| --- | --- | --- | --- |
| Astro 소스 코드(이 프로젝트 등) | `npm run build` | `dist` | 비워 둠 |
| 이미 빌드된 정적 파일(저장소 루트에 `index.html` 등이 있음) | 비워 둠 | 비워 둠 | 비워 둠 |

**Save and Deploy**를 클릭하세요. 소스 코드 저장소를 연결하면 이후 push마다 자동으로 빌드 및 배포됩니다. 이미 빌드된 정적 파일이 저장된 저장소라면 Build command와 Build output directory를 비워 두면 됩니다.
