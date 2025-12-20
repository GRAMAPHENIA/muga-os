// BlogService siguiendo principios SOLID
// Single Responsibility: Solo maneja operaciones relacionadas con posts del blog
// Dependency Inversion: Depende de abstracciones, no de implementaciones concretas

import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export interface BlogPost {
  slug: string;
  data: {
    title: string;
    area?: string;
    category?: string[];
    status?: string;
    date?: Date;
    tags?: string[];
    image?: string;
    relatedProject?: string;
    resources?: string[];
    idea?: string;
  };
  body: string;
}

export interface BlogServiceInterface {
  getAllPosts(): Promise<BlogPost[]>;
  getPublishedPosts(): Promise<BlogPost[]>;
  getPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getPostsByCategory(category: string): Promise<BlogPost[]>;
  getPostsByTag(tag: string): Promise<BlogPost[]>;
}

export class BlogService implements BlogServiceInterface {
  private posts: BlogPost[] | null = null;

  private async loadPosts(): Promise<BlogPost[]> {
    if (this.posts === null) {
      const collection = await getCollection('blog');
      this.posts = collection.map(post => ({
        slug: post.slug,
        data: {
          ...post.data,
          date: post.data.date instanceof Date ? post.data.date : new Date(post.data.date)
        },
        body: post.body || ''
      }));
    }
    return this.posts;
  }

  async getAllPosts(): Promise<BlogPost[]> {
    const posts = await this.loadPosts();
    return posts.sort((a, b) => {
      const dateA = a.data.date?.getTime() || 0;
      const dateB = b.data.date?.getTime() || 0;
      return dateB - dateA; // Más recientes primero
    });
  }

  async getPublishedPosts(): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => post.data.status === 'Publicado');
  }

  async getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const posts = await this.loadPosts();
    return posts.find(post => post.slug === slug);
  }

  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => 
      post.data.category?.some(cat => 
        cat.toLowerCase() === category.toLowerCase()
      )
    );
  }

  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => 
      post.data.tags?.some(postTag => 
        postTag.toLowerCase() === tag.toLowerCase()
      )
    );
  }
}

// Factory para crear instancias del servicio
export const createBlogService = (): BlogServiceInterface => {
  return new BlogService();
};