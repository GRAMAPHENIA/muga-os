// src/pages/api/blog.json.ts

import { getBlogPosts } from "../../lib/blog";

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return new Response(JSON.stringify(posts, null, 2), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error('Error in API:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
