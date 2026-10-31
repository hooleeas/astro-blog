import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(), subtitle: z.string(), pubDate: z.coerce.date(),
    cover: z.preprocess((value) => value === '' ? undefined : value, z.string().url().optional()),
    translationKey: z.preprocess((value) => value === '' ? undefined : value, z.string().min(1).optional()),
    tags: z.array(z.string()).default([]), category: z.string().default('Notes'),
    draft: z.boolean().default(false), popular: z.boolean().default(false)
  })
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, notes };
