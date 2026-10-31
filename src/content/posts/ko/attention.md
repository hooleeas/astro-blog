---
title: 'Markdown 콘텐츠 예제: 제목부터 미디어까지'
subtitle: '제목 단계, 텍스트 서식, 목록, 표, 코드와 미디어 등 글 템플릿에서 사용할 수 있는 형식을 소개합니다.'
pubDate: 2026-10-31
tags: ['Markdown', '글쓰기 가이드', '예제']
category: '가이드'
cover: ''
translationKey: 'markdown-content-showcase'
draft: false
popular: false
---

이 글은 **바로 미리 볼 수 있는 Markdown 예제 문서**입니다. 사이트에서 콘텐츠가 어떻게 보이는지 확인한 다음 복사하고 수정해 자신의 글로 바꿔 보세요. 제목과 설명, 미디어 주소는 모두 예시입니다.

> 먼저 내용을 명확하게 쓴 뒤 형식을 고르세요. 알맞은 서식은 이해를 돕지만 내용 자체를 대신하지는 않습니다.

## 글의 구성

제목 단계를 사용해 주제를 나눌 수 있습니다. 각 섹션에서 먼저 간단히 소개하고 필요한 경우 하위 제목으로 더 자세히 설명하세요.

### 주제 아래의 하위 제목

일반 문단입니다. 배경을 소개하거나 개념을 설명하고, 이어질 내용을 간단히 안내할 수 있습니다. 문단 사이에는 빈 줄을 둡니다.

#### 더 세부적인 소제목

제목은 여러 단계로 나눌 수 있습니다. 글자 크기를 바꾸기 위해 단계를 건너뛰지 말고 순서대로 사용하세요.

##### 인라인 텍스트 서식

본문에서는 **굵게**, *기울임*, ~~취소선~~, `인라인 코드`, [일반 링크](https://example.com)를 사용할 수 있습니다. 키워드나 명령어, 참고 자료를 표시할 때 유용합니다.

## 목록과 인용

### 글머리 기호 목록

- 첫 번째 항목: 요점이나 자료를 나열합니다.
- 두 번째 항목: 각 항목을 완전한 문장으로 써도 됩니다.
- 세 번째 항목: 두 칸 들여쓰기로 중첩 목록을 만들 수 있습니다.
  - 하위 항목 A
  - 하위 항목 B

### 번호 목록

1. 해결할 문제를 정합니다.
2. 과정을 순서대로 설명합니다.
3. 결과나 다음 행동을 정리합니다.

### 작업 목록

- [x] 제목과 요약 작성
- [x] 글 구조 추가
- [ ] 실제 내용으로 바꾸기

## 표

짧고 비교 가능한 정보를 보여줄 때 표를 사용하면 좋습니다.

| 콘텐츠 유형 | 용도 | 예시 |
| --- | --- | --- |
| 문단 | 소개와 설명 | 배경 설명 |
| 목록 | 관련 항목 | 준비 사항 |
| 코드 | 기술 예제 | 설정 코드 |

## 코드

`npm run build` 같은 명령어는 인라인 코드로 표시할 수 있습니다. 코드 블록에 언어를 지정하면 구문 강조가 적용됩니다.

```ts
type Article = {
  title: string;
  published: boolean;
};

const example: Article = {
  title: "Markdown 콘텐츠 예제",
  published: true,
};

console.log(example.title);
```

Shell 등 다른 언어도 지정할 수 있습니다.

```bash
npm install
npm run dev
```

## 이미지와 미디어

### 이미지

Markdown 문법으로 이미지를 넣을 수 있습니다. 아래 예시는 사이트 아바타를 사용하므로, 직접 작성할 때는 `public/` 폴더의 이미지로 바꾸세요.

![사이트 이미지 예제](/images/avatar.webp)

크기나 CSS 클래스를 지정해야 한다면 HTML도 사용할 수 있습니다.

<img class="square-image" src="/images/avatar.webp" alt="정사각형 이미지 예제" />

### 오디오

오디오에는 HTML `<audio>` 요소를 사용합니다. 게시할 때는 사용 권한이 있는 오디오 파일로 주소를 바꾸세요.

<audio controls preload="none">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
  브라우저에서 오디오를 재생할 수 없습니다.
</audio>

### 동영상 파일

`<video>` 요소로 동영상을 재생할 수 있습니다. `src`를 로컬 미디어 경로나 접근 가능한 동영상 주소로 바꾸세요.

<video controls preload="metadata" poster="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=80">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
  브라우저에서 동영상을 재생할 수 없습니다.
</video>

### 동영상 임베드

일부 동영상 서비스는 iframe 임베드 코드를 제공합니다. 아래는 YouTube 개인정보 보호 강화 모드 예제입니다. 게시 전에 동영상 ID를 바꾸고 임베드가 허용되는지 확인하세요.

<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ"
    title="동영상 임베드 예제"
    width="1280"
    height="720"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

## 추가 설명

접을 수 있는 영역은 보충 설명에 적합합니다. 필요하지 않으면 삭제해도 됩니다.

<details>
  <summary>눌러서 보충 설명 보기</summary>
  <p>용어 설명, 추가 팁 또는 본문 흐름에 꼭 필요하지 않은 내용을 넣을 수 있습니다.</p>
</details>

## 마무리

글에는 도입부, 여러 단계의 제목, 미디어와 마무리를 조합할 수 있습니다. 모든 요소를 사용할 필요는 없습니다. 내용에 알맞은 형식을 고르고, 이 예제의 문장과 이미지, 미디어 주소를 실제 내용으로 바꾸세요.
