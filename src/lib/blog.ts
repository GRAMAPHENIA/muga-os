// Funciones de utilidad para el blog refactorizadas
// Dependency Inversion: Usa el servicio abstracto
import { createBlogService } from '../services/BlogService';
import type { BlogPost } from '../services/BlogService';

const blogService = createBlogService();

export async function getBlogPosts(): Promise<BlogPost[]> {
  return await blogService.getAllPosts();
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  return await blogService.getPublishedPosts();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return await blogService.getPostBySlug(slug);
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  return await blogService.getPostsByCategory(category);
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  return await blogService.getPostsByTag(tag);
}

// Mantener compatibilidad con código existente
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const post = await getBlogPostBySlug(slug);
  return post || null;
}

export async function getPageContent(slug: string): Promise<string> {
  const post = await getBlogPostBySlug(slug);
  return post?.body || '';
}