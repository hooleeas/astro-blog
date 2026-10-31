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
git clone <저장소 URL>
cd <프로젝트 디렉터리>
npm install
npm run dev
```

터미널에 표시되는 로컬 URL을 열어 미리 볼 수 있습니다. 자주 사용하는 명령:

```bash
npm run check    # Astro 페이지와 타입 검사
npm run build    # 정적 사이트를 dist/에 빌드
npm run preview  # 프로덕션 빌드를 로컬에서 미리 보기
astro new note "quick thought"  # 메모 생성
astro new post "My first post"  # 활성화된 모든 언어로 글 생성
astro new page tags             # /tags/ 페이지 생성
```

마지막 인수는 메모 이름, 글 제목 또는 페이지 경로로 사용됩니다. 인수를 주면 템플릿에서 바로 파일을 만들고, 생략하면 대화형으로 입력합니다. 새 글은 활성화된 모든 언어 디렉터리에 초안으로 생성되며 같은 `translationKey`로 연결됩니다. 인수 없이 글을 만들 때는 글 이름만 한 번 입력하면 됩니다. 입력한 이름은 제목과 파일명에 사용하고 요약은 비워 둡니다. 현재 환경에서는 zsh 래퍼 함수가 `astro new`를 프로젝트 생성 스크립트로 전달합니다. 설정 후 새 터미널을 여세요. 다른 셸이나 환경에서는 `npm run astro -- new page tags`를 사용할 수 있습니다. 기존 파일은 덮어쓰지 않습니다.

## 글 추가하기

글은 언어별로 `src/content/posts/<언어 코드>/`에 저장합니다. 예:

```text
src/content/posts/zh-Hans/
src/content/posts/en/
```

`astro new post "My first post"`를 실행하면 활성화된 모든 언어 디렉터리에 같은 `translationKey`를 가진 초안이 생성됩니다. 인수가 없으면 글 이름만 한 번 입력하고, 입력한 이름을 제목과 파일명에 사용하며 요약은 비워 둡니다. 또는 `templates/posts/`에서 해당 언어의 Markdown 템플릿을 복사해 언어 디렉터리에 넣은 다음 frontmatter와 본문을 수정하세요. 주요 필드:

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

메모는 짧은 내용을 기록할 때 사용합니다. `astro new note "quick thought"`를 실행하면 템플릿에서 메모를 만들고 파일 이름에 오늘 날짜를 넣습니다. 직접 만들려면 `templates/notes/note.md`를 `src/content/notes/`에 복사하고 `date`와 본문을 수정하세요. 템플릿의 기본값은 `draft: true`입니다. 게시할 준비가 되면 `false`로 변경하세요.

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

`astro new page tags`를 실행하면 `src/pages/tags.astro`가 생성됩니다. 직접 만들려면 `templates/pages/page.astro.txt`를 `src/pages/`에 복사하고 `.txt` 확장자를 제거한 다음 페이지 이름으로 변경하세요. 예를 들어 `projects.astro`는 `/projects/` 페이지를 만듭니다.

## 배포

빌드 결과물은 `dist/`에 생성됩니다. 이 프로젝트는 루트 도메인 `https://hooleeas.github.io`를 사용하므로 `base`가 `/`로 설정되어 있습니다.

### GitHub Pages: 빌드 결과물만 게시

소스 저장소는 비공개로 유지할 수 있습니다. `.github/workflows/deploy.yml`은 사이트를 빌드하고 `dist/` 내용만 `hooleeas/hooleeas.github.io` 저장소의 `main` 브랜치로 push합니다.

1. Fine-grained personal access token을 만들고 `hooleeas/hooleeas.github.io` 저장소에만 **Contents: Read and write** 권한을 부여합니다.
2. 소스 저장소의 **Settings → Secrets and variables → Actions**에서 `PAGES_DEPLOY_TOKEN` secret을 추가합니다.
3. `hooleeas/hooleeas.github.io` 저장소의 **Settings → Pages → Build and deployment → Source**에서 **Deploy from a branch**를 선택하고 브랜치는 `main`, 폴더는 `/(root)`로 설정합니다.
4. 소스 저장소의 `main` 또는 `master`에 변경 사항을 push하거나 Actions 탭에서 **Build and publish site**를 수동 실행합니다.

워크플로가 별도의 Pages 저장소에 쓰려면 `PAGES_DEPLOY_TOKEN` secret이 필요합니다. Token을 소스 파일에 넣지 마세요. 수동으로 게시하려면 `npm run build`를 실행한 뒤 `dist/` 내용을 Pages 저장소의 `main` 브랜치로 push하면 됩니다.

### Cloudflare Pages: 빌드 결과물 저장소 연결

`hooleeas/hooleeas.github.io`를 연결하면 저장소 루트에 이미 빌드 결과물(`index.html`, `_astro/` 등)이 있습니다. 프레임워크 프리셋은 **None**으로 선택하고 빌드 명령, 빌드 출력 디렉터리, 루트 디렉터리를 모두 비워 둡니다. 이 설정은 이 프로젝트에서 테스트했습니다. 결과물 push 워크플로가 `main`을 업데이트하면 Cloudflare가 변경된 파일을 자동 배포합니다.

### Cloudflare Pages: 소스 저장소에서 빌드

소스 저장소를 직접 연결할 수도 있습니다.

1. Cloudflare 대시보드에서 **Workers & Pages → Create application → Pages → Connect to Git**으로 이동합니다.
2. GitHub를 연결한 다음 소스 저장소와 배포 브랜치를 선택합니다.
3. 프레임워크 프리셋은 **Astro**, 빌드 명령은 `npm run build`, 빌드 출력 디렉터리는 `dist`로 설정합니다. 루트 디렉터리는 비워 둡니다.
4. **Save and Deploy**를 선택합니다. 이후 선택한 브랜치에 push하면 Cloudflare가 자동으로 빌드하고 배포합니다.

### Cloudflare Pages: `dist/`만 업로드 (Direct Upload)

1. 로컬에서 `npm run build`를 실행합니다.
2. Cloudflare 대시보드에서 **Workers & Pages → Create application → Pages → Drag and drop your files**로 이동합니다.
3. 프로젝트 이름을 입력하고 `dist/` 폴더를 업로드한 뒤 **Deploy site**를 선택합니다.
4. 업데이트할 때는 다시 빌드하고 Pages 프로젝트에서 **Create a new deployment**를 선택해 새 `dist/`를 업로드합니다. Wrangler를 사용하려면 `npx wrangler pages deploy dist`를 실행합니다.

Direct Upload는 소스 저장소를 연결하지 않으며 나중에 Git 통합으로 전환할 수 없습니다. 전환하려면 새 프로젝트를 만들어야 합니다. 두 호스팅 방식 모두 브라우저에 전달되는 HTML, CSS, JavaScript를 확인할 수 있습니다. `dist/`만 게시해도 프런트엔드 코드가 숨겨지거나 암호화되는 것은 아닙니다.
