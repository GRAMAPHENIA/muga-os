// src/lib/blog.ts
import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getBlogPosts(): Promise<BlogPost[]> {
    const posts = await getCollection('blog', ({ data }) => data.status !== 'Archivado');
    return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const post = await getEntry('blog', slug);
        return post || null;
    } catch {
        return null;
    }
}

export async function getPageContent(slug: string): Promise<string> {
    try {
        const post = await getEntry('blog', slug);
        return post?.body || '';
    } catch {
        return '';
    }
}