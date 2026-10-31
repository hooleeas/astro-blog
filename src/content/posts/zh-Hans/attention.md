---
title: 'Markdown 内容示例：从标题到多媒体'
subtitle: '这是一篇可直接预览的文章模板示例，展示常见标题层级、文字格式、列表、表格、代码和多媒体内容。'
pubDate: 2026-10-31
tags: ['Markdown', '写作指南', '示例']
category: '使用指南'
cover: ''
translationKey: 'markdown-content-showcase'
draft: false
popular: false
---

这是一篇**可直接使用的 Markdown 示例文档**。你可以从中了解文章在网站上的呈现方式，再复制、删改并替换成自己的内容。文中的标题、说明和媒体地址都是演示素材。

> 写作时先把内容讲清楚，再考虑格式。合适的排版能帮助读者理解，而不是取代内容本身。

## 文章结构

文章可以用不同层级的标题划分主题。每个标题下面都可以先写一段介绍，再继续细分内容。

### 二级主题下的子标题

这是一个普通段落。这里可以介绍背景、解释概念，或用几句话说明接下来要讨论什么。段落之间留一个空行即可。

#### 更深一层的小节

标题层级可以继续细分。建议按顺序使用标题，不要为了字号跳过层级。

##### 行内文字格式

正文支持**粗体**、*斜体*、~~删除线~~、`行内代码`和[普通链接](https://example.com)。这些格式适合标出关键词、程序名称或相关资料。

## 列表与引用

### 无序列表

- 第一项：列出要点或材料。
- 第二项：每一项可以写成完整句子。
- 第三项：需要嵌套时缩进两个空格：
  - 子项目 A
  - 子项目 B

### 有序列表

1. 先确定要解决的问题。
2. 再按步骤说明过程。
3. 最后总结结果或下一步行动。

### 任务清单

- [x] 写好标题和简介
- [x] 添加正文结构
- [ ] 替换成自己的真实内容

## 表格

表格适合展示简短、可比较的信息：

| 内容类型 | 适用场景 | 示例 |
| --- | --- | --- |
| 段落 | 介绍和解释 | 背景说明 |
| 列表 | 并列要点 | 准备材料 |
| 代码 | 技术示例 | 配置片段 |

## 代码

在行内代码中可以写 `npm run build`。多行代码块可以指定语言，以启用语法高亮：

```ts
type Article = {
  title: string;
  published: boolean;
};

const example: Article = {
  title: "Markdown 内容示例",
  published: true,
};

console.log(example.title);
```

也可以使用其他语言标记，例如 Shell：

```bash
npm install
npm run dev
```

## 图片与媒体

### 图片

图片可使用 Markdown 语法插入。下例使用项目自带的头像图片，写文章时可换成 `public/` 目录里的其他图片路径。

![项目图片示例](/images/avatar.webp)

需要调整尺寸或添加 CSS 类时，也可以使用 HTML：

<img class="square-image" src="/images/avatar.webp" alt="方形图片示例" />

### 音频

使用 HTML 的 `<audio>` 元素添加音频。请将示例地址替换为自己有权使用的音频文件：

<audio controls preload="none">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
  您的浏览器不支持音频播放。
</audio>

### 视频文件

使用 `<video>` 播放视频文件。把 `src` 换成本地媒体路径或可访问的视频地址：

<video controls preload="metadata" poster="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=80">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
  您的浏览器不支持视频播放。
</video>

### 视频嵌入

部分视频平台提供 iframe 嵌入代码。下面以 YouTube 隐私增强模式为例；发布前请替换视频 ID，并确认平台允许嵌入：

<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ"
    title="视频嵌入示例"
    width="1280"
    height="720"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

## 补充说明

可折叠内容适合放置补充解释，不需要时也可以直接删除：

<details>
  <summary>点击展开补充说明</summary>
  <p>这里可以放置术语解释、额外提示或不影响主线阅读的内容。</p>
</details>

## 写作小结

一篇完整的文章可以由介绍、多个层级的章节、媒体和结尾组成。写作时不需要把所有组件都用上，选择最适合内容的格式即可。完成后，记得替换这篇示例中的文本、图片和媒体地址。
