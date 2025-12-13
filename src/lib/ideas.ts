import { getCollection } from 'astro:content';

type IdeaEntry = {
  slug: string;
  data: {
    title: string;
    description?: string;
    status: string;
    progress: number;
    priority: string;
    area?: string;
    tags: string[];
    notes?: string;
    date: Date;
  };
};

const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

function parseFrontmatter(markdown: string) {
  const frontmatterMatch = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/m.exec(markdown);

  if (!frontmatterMatch) {
    return { data: {}, content: markdown } as { data: Record<string, any>; content: string };
  }

  const [, rawFrontmatter, content] = frontmatterMatch;
  const data: Record<string, any> = {};

  for (const line of rawFrontmatter.split('\n')) {
    const [key, ...rest] = line.split(':');
    if (!key || rest.length === 0) continue;

    const rawValue = rest.join(':').trim();
    if (rawValue.startsWith('[') || rawValue.startsWith('{')) {
      try {
        data[key.trim()] = JSON.parse(rawValue.replace(/([a-zA-Z0-9]+):/g, '"$1":'));
      } catch {
        data[key.trim()] = rawValue;
      }
    } else {
      data[key.trim()] = rawValue.replace(/^"|"$/g, '');
    }
  }

  return { data, content } as { data: Record<string, any>; content: string };
}

async function getBlobIdeas(): Promise<IdeaEntry[]> {
  if (!hasBlobToken) return [];

  const response = await fetch('https://blob.vercel-storage.com/?prefix=ideas/', {
    headers: {
      Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
    },
  });

  if (!response.ok) {
    console.error('No se pudieron listar las ideas desde Vercel Blob', await response.text());
    return [];
  }

  const { blobs } = await response.json();

  const ideas = await Promise.all(
    blobs.map(async (blob) => {
      const res = await fetch(blob.url);
      const content = await res.text();
      const parsed = parseFrontmatter(content);

      const slug = blob.pathname.replace(/^ideas\//, '').replace(/\.md$/, '');
      const date = new Date(parsed.data.date ?? parsed.data.Date ?? Date.now());

      const tags = Array.isArray(parsed.data.tags)
        ? parsed.data.tags
        : typeof parsed.data.tags === 'string'
          ? parsed.data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
          : [];

      return {
        slug,
        data: {
          title: parsed.data.title ?? slug,
          description: parsed.data.description,
          status: parsed.data.status ?? 'Idea',
          progress: Number(parsed.data.progress ?? 0),
          priority: parsed.data.priority ?? 'Media',
          area: parsed.data.area,
          tags,
          notes: parsed.data.notes,
          date,
        },
      } satisfies IdeaEntry;
    })
  );

  return ideas.filter((idea) => !Number.isNaN(idea.data.date.getTime()));
}

async function getLocalIdeas(): Promise<IdeaEntry[]> {
  const ideas = await getCollection('ideas');
  return ideas.map((idea) => ({ slug: idea.slug, data: idea.data }));
}

export async function getIdeas() {
  const [remoteIdeas, localIdeas] = await Promise.all([getBlobIdeas(), getLocalIdeas()]);

  const seenSlugs = new Set(remoteIdeas.map((idea) => idea.slug));
  const merged = [...remoteIdeas, ...localIdeas.filter((idea) => !seenSlugs.has(idea.slug))];

  return merged.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getIdeaBySlug(slug: string) {
  const ideas = await getIdeas();
  return ideas.find((idea) => idea.slug === slug);
}