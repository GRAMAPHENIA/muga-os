import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const redirectWithMessage = (searchParams: Record<string, string>) =>
      new Response(null, {
        status: 303,
        headers: {
          Location: `/ideas?${new URLSearchParams(searchParams).toString()}`
        }
      });

    if (process.env.VERCEL === '1' && process.env.VERCEL_ENV === 'production') {
      console.warn('Crear idea bloqueado en producción: el filesystem es de solo lectura');
      return redirectWithMessage({ error: 'write-protected' });
    }

    const contentType = request.headers.get('content-type') || '';
    let formData: FormData;

    if (contentType.includes('multipart/form-data')) {
      formData = await request.formData();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      formData = new FormData();
      for (const [key, value] of params.entries()) {
        formData.append(key, value);
      }
    } else {
      throw new Error('Unsupported content type');
    }

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

    // Generate slug from title
    const slug = title
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
date: "${new Date().toISOString().split('T')[0]}"
---

${description || ''}
`;

    // Ensure directory exists
    const ideasDir = join(process.cwd(), 'src', 'content', 'ideas');
    mkdirSync(ideasDir, { recursive: true });

    // Write file
    const filePath = join(ideasDir, `${slug}.md`);
    writeFileSync(filePath, frontmatter, 'utf8');

    return redirectWithMessage({ success: 'created' });

  } catch (error) {
    console.error('Error creating idea:', error);
    return new Response(null, {
      status: 303,
      headers: {
        Location: '/ideas?error=unexpected'
      }
    });
  }
}
