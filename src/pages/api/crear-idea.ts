import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export const prerender = false;

export async function POST({ request }) {
  try {
    const redirectWithMessage = (searchParams: Record<string, string>) =>
      new Response(null, {
        status: 303,
        headers: {
          Location: `/ideas?${new URLSearchParams(searchParams).toString()}`
        }
      });

    const isVercelProd = process.env.VERCEL === '1' && process.env.VERCEL_ENV === 'production';

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

    if (isVercelProd) {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.warn('Crear idea bloqueado en producción: falta BLOB_READ_WRITE_TOKEN');
        return redirectWithMessage({ error: 'no-storage' });
      }

      const upload = await fetch(`https://blob.vercel-storage.com/ideas/${slug}.md`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        },
        body: frontmatter,
      });

      if (!upload.ok) {
        console.error('Fallo al guardar en Vercel Blob', await upload.text());
        return redirectWithMessage({ error: 'storage-failed' });
      }
    } else {
      // Ensure directory exists
      const ideasDir = join(process.cwd(), 'src', 'content', 'ideas');
      mkdirSync(ideasDir, { recursive: true });

      // Write file
      const filePath = join(ideasDir, `${slug}.md`);
      writeFileSync(filePath, frontmatter, 'utf8');
    }

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
