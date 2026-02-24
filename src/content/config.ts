/**
 * content/config.ts — Astro Content Collections configuration.
 *
 * Defines schemas for:
 *   - blog  — MDX blog posts (src/content/blog/)
 *   - jds   — Job description analyses (src/content/jds/)
 *
 * @see https://docs.astro.build/en/guides/content-collections/
 */
import { z, defineCollection } from 'astro:content';

/** Blog posts collection — MDX files with frontmatter validated by Zod. */
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

/** Job descriptions collection — Markdown analyses of PM/TPM roles. */
const jdsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string().optional(),
    type: z.string().optional(), // Full-time, Part-time, Contract
    salary: z.string().optional(),
    color: z.enum(['blue', 'green', 'purple', 'yellow', 'pink', 'orange', 'teal', 'gray']).optional().default('gray'),
    status: z.enum(['saved', 'applied', 'interviewing', 'offer', 'rejected', 'closed']).optional().default('saved'),
    dream: z.boolean().optional().default(false),
    date: z.string(),
    url: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  jds: jdsCollection,
};
