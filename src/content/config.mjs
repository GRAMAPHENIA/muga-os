import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    area: z.enum(['Studio', 'Dev']).optional(),
    category: z.array(z.string()).default([]),
    status: z.enum(['Borrador', 'Publicado', 'Archivado']).default('Borrador'),
    date: z.string().transform((str) => new Date(str)),
    tags: z.array(z.string()).default([]),
    relatedProject: z.string().optional(),
    resources: z.array(z.string()).default([]),
    idea: z.string().optional(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    area: z.enum(['Studio', 'Dev', 'Mixto']),
    status: z.enum(['Pendiente', 'Planificación', 'En curso', 'Publicado', 'Archivado']).default('Pendiente'),
    deadline: z.string().transform((str) => new Date(str)).optional(),
    technologies: z.array(z.string()).default([]),
    objective: z.string().optional(),
    scope: z.string().optional(),
    relatedBlog: z.string().optional(),
    resources: z.array(z.string()).default([]),
  }),
});

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    status: z.enum(['Borrador', 'Publicado', 'Archivado']).default('Borrador'),
    date: z.string().transform((str) => new Date(str)).optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    type: z.enum(['código', 'material', 'referencia', 'template']).optional(),
    description: z.string().optional(),
    file: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
  articles: articlesCollection,
  resources: resourcesCollection,
};"" 
