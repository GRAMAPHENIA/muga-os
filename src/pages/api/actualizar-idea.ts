import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { getIdeaBySlug } from '../../lib/ideas';

export const prerender = false;

export async function POST({ request, url }: { request: Request; url: URL }) {
  try {
    const slug = url.searchParams.get('slug');
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const existingIdea = await getIdeaBySlug(slug);
    if (!existingIdea) {
      return new Response(JSON.stringify({ error: 'Idea no encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const formData = await request.formData();

    const title = formData.get('title')?.toString()?.toUpperCase();
    const description = formData.get('description')?.toString();
    const status = formData.get('status')?.toString() || 'Idea';
    const priority = formData.get('priority')?.toString() || 'Media';
    const area = formData.get('area')?.toString();
    const progress = parseInt(formData.get('progress')?.toString() || '0');
    const tags = formData.get('tags')?.toString().split(',').map((tag: string) => tag.trim()).filter(Boolean) || [];
    const notes = formData.get('notes')?.toString();

    if (!title) {
      return new Response(JSON.stringify({ error: 'El título es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate new slug if title changed
    const newSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Create frontmatter
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description ? description.replace(/"/g, '\\"') : ''}"
status: "${status}"
progress: ${progress}
priority: "${priority}"
${area ? `area: "${area}"` : ''}
tags: [${tags.map((tag: string) => `"${tag}"`).join(', ')}]
${notes ? `notes: "${notes.replace(/"/g, '\\"')}"` : ''}
date: "${existingIdea.data.date.toISOString().split('T')[0]}"
---

${description || ''}
`;

    const ideasDir = join(process.cwd(), 'src', 'content', 'ideas');

    // Remove old file if slug changed
    if (newSlug !== slug) {
      const oldFilePath = join(ideasDir, `${slug}.md`);
      try {
        unlinkSync(oldFilePath);
      } catch (error) {
        // File might not exist, continue
      }
    }

    // Write new file
    const filePath = join(ideasDir, `${newSlug}.md`);
    writeFileSync(filePath, frontmatter, 'utf8');

    return new Response(null, {
      status: 302,
      headers: {
        'Location': `/ideas?success=updated`
      }
    });

  } catch (error) {
    console.error('Error updating idea:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}