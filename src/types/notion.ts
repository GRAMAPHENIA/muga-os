// src/types/notion.ts

export interface BlogPost {
  id: string;
  titulo: string;
  fecha: string | null;
  tags: string[];
  slug: string;
  descripcion?: string;
  contenido?: string;
}

export interface NotionPage {
  id: string;
  properties: {
    Titulo?: {
      title?: Array<{ plain_text: string }>;
    };
    Fecha?: {
      date?: { start: string };
    };
    Tags?: {
      multi_select?: Array<{ name: string }>;
    };
    Slug?: {
      rich_text?: Array<{ plain_text: string }>;
    };
    Descripcion?: {
      rich_text?: Array<{ plain_text: string }>;
    };
  };
}