import { unlinkSync } from 'fs';
import { join } from 'path';

export const prerender = false;

export async function GET({ url }: { url: URL }) {
  try {
    const slug = url.searchParams.get('slug');
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const filePath = join(process.cwd(), 'src', 'content', 'ideas', `${slug}.md`);

    try {
      unlinkSync(filePath);
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Idea no encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/ideas?success=deleted'
      }
    });

  } catch (error) {
    console.error('Error deleting idea:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}