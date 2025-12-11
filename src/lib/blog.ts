// src/lib/blog.ts
import { Client } from "@notionhq/client";
import type { BlogPost, NotionPage } from "../types/notion";

const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });
const databaseId = import.meta.env.NOTION_BLOG_DB;

console.log('Notion API Key present:', !!import.meta.env.NOTION_API_KEY);
console.log('Database ID:', databaseId);

export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        console.log('Attempting to retrieve database info:', databaseId);
        const dbInfo = await notion.databases.retrieve({ database_id: databaseId });
        console.log('Database retrieved successfully, ID:', dbInfo.id);

        console.log('Attempting to query database:', databaseId);
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [{ property: "Fecha", direction: "descending" }]
        });
        console.log('Query successful, results count:', response.results.length);

        return response.results.map((page: any): BlogPost => {
            const props = page.properties;
            return {
                id: page.id,
                titulo: props.Titulo?.title?.[0]?.plain_text || "Sin título",
                fecha: props.Fecha?.date?.start || null,
                tags: props.Tags?.multi_select?.map((t: any) => t.name) || [],
                slug: props.Slug?.rich_text?.[0]?.plain_text || "",
                descripcion: props.Descripcion?.rich_text?.[0]?.plain_text || "",
            };
        });
    } catch (error) {
        console.error('Error querying Notion database:', error);
        
        // Si hay un error de permisos o conexión, devolver array vacío
        // para que la aplicación siga funcionando
        if (error instanceof Error && error.message.includes('validation_error')) {
            console.warn('⚠️  Base de datos no accesible. Verifica los permisos de la integración.');
            return [];
        }
        
        // Para otros errores, también devolver array vacío pero logear el error
        console.warn('⚠️  Error conectando con Notion. Devolviendo datos vacíos.');
        return [];
    }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Slug",
                rich_text: {
                    equals: slug
                }
            }
        });

        if (response.results.length === 0) {
            return null;
        }

        const page = response.results[0] as any;
        const props = page.properties;

        return {
            id: page.id,
            titulo: props.Titulo?.title?.[0]?.plain_text || "Sin título",
            fecha: props.Fecha?.date?.start || null,
            tags: props.Tags?.multi_select?.map((t: any) => t.name) || [],
            slug: props.Slug?.rich_text?.[0]?.plain_text || "",
            descripcion: props.Descripcion?.rich_text?.[0]?.plain_text || "",
        };
    } catch (error) {
        console.error('Error getting blog post:', error);
        console.warn('⚠️  No se pudo obtener el post. Verifica los permisos de Notion.');
        return null;
    }
}

export async function getPageContent(pageId: string): Promise<string> {
    try {
        const response = await notion.blocks.children.list({
            block_id: pageId,
        });

        let content = "";
        for (const block of response.results) {
            content += extractTextFromBlock(block as any);
        }

        return content;
    } catch (error) {
        console.error('Error getting page content:', error);
        return "";
    }
}

function extractTextFromBlock(block: any): string {
    let text = "";
    
    switch (block.type) {
        case 'paragraph':
            text = block.paragraph?.rich_text?.map((t: any) => t.plain_text).join('') || '';
            break;
        case 'heading_1':
            text = `# ${block.heading_1?.rich_text?.map((t: any) => t.plain_text).join('') || ''}`;
            break;
        case 'heading_2':
            text = `## ${block.heading_2?.rich_text?.map((t: any) => t.plain_text).join('') || ''}`;
            break;
        case 'heading_3':
            text = `### ${block.heading_3?.rich_text?.map((t: any) => t.plain_text).join('') || ''}`;
            break;
        case 'bulleted_list_item':
            text = `- ${block.bulleted_list_item?.rich_text?.map((t: any) => t.plain_text).join('') || ''}`;
            break;
        case 'numbered_list_item':
            text = `1. ${block.numbered_list_item?.rich_text?.map((t: any) => t.plain_text).join('') || ''}`;
            break;
        default:
            // Para otros tipos de bloques, intentamos extraer texto si existe
            if (block[block.type]?.rich_text) {
                text = block[block.type].rich_text.map((t: any) => t.plain_text).join('');
            }
    }
    
    return text ? text + '\n\n' : '';
}