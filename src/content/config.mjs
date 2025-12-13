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
    image: z.string().optional(),
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

const ideasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.enum(['Idea', 'Planificación', 'En desarrollo', 'Completado', 'Archivado']).default('Idea'),
    progress: z.number().min(0).max(100).default(0),
    priority: z.enum(['Baja', 'Media', 'Alta', 'Urgente']).default('Media'),
    area: z.enum(['Studio', 'Dev', 'Mixto']).optional(),
    tags: z.array(z.string()).default([]),
    notes: z.string().optional(),
    date: z.string().transform((str) => new Date(str)),
  }),
});

const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    type: z.string().optional(),
    description: z.string().optional(),
    url: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
  }),
});


export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
  articles: articlesCollection,
  ideas: ideasCollection,
  resources: resourcesCollection,
};
