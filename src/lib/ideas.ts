import { getCollection } from 'astro:content';

export async function getIdeas() {
  const ideas = await getCollection('ideas');
  return ideas.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getIdeaBySlug(slug: string) {
  const ideas = await getCollection('ideas');
  return ideas.find(idea => idea.slug === slug);
}