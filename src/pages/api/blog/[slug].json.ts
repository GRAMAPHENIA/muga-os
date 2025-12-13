// src/pages/api/blog/[slug].json.ts

import { getBlogPost, getPageContent } from "../../../lib/blog";

export const prerender = false;

export async function GET({ params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug is required' }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const post = await getBlogPost(slug);
    
    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Obtener el contenido completo
    const content = await getPageContent(post.id);
    
    const fullPost = {
      ...post,
      contenido: content
    };

    return new Response(JSON.stringify(fullPost, null, 2), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error('Error in API:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch post' }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}