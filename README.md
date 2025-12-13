# Mi Sitio Web con Astro y Contenido Local

Un sitio web moderno construido con Astro que utiliza colecciones de contenido local para mostrar posts, proyectos y artículos. Incluye TypeScript y Tailwind CSS para una experiencia de desarrollo óptima.

## ✨ Características

- 🚀 **Astro** - Framework web moderno y rápido
- 📝 **Contenido Local** - Sistema de colecciones de contenido con validación automática
- 🎨 **Tailwind CSS** - Estilos utilitarios para diseño rápido
- 📘 **TypeScript** - Tipado estático para mejor desarrollo
- 📱 **Responsive** - Diseño adaptable a todos los dispositivos
- ⚡ **API REST** - Endpoints para acceder a los datos programáticamente

## 🏗️ Estructura del Proyecto

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── config.mjs            # Configuración de colecciones de contenido
│   │   ├── blog/                 # Posts del blog
│   │   ├── projects/             # Proyectos
│   │   ├── articles/             # Artículos
│   │   └── resources/            # Recursos
│   ├── layouts/
│   │   └── Layout.astro          # Layout base con navegación
│   ├── lib/
│   │   └── blog.ts               # Funciones para obtener contenido
│   ├── pages/
│   │   ├── api/
│   │   │   ├── create-post.ts    # API para crear posts
│   │   │   ├── blog.json.ts      # API para obtener todos los posts
│   │   │   └── blog/
│   │   │       └── [slug].json.ts # API para obtener un post específico
│   │   ├── blog/
│   │   │   ├── new.astro         # Formulario para crear posts
│   │   │   └── [slug].astro      # Páginas dinámicas para posts individuales
│   │   ├── blog.astro            # Página principal del blog
│   │   ├── projects.astro        # Página de proyectos
│   │   ├── articles.astro        # Página de artículos
│   │   ├── debug.astro           # Página de debug
│   │   └── index.astro           # Página de inicio
├── astro.config.mjs             # Configuración de Astro
├── tailwind.config.mjs          # Configuración de Tailwind
└── tsconfig.json                # Configuración de TypeScript
```

## 🚀 Configuración Inicial

### 0. Versión de Node

Usa **Node 20** (la versión soportada por Vercel Functions). Puedes fijarla con `nvm use` gracias al archivo `.nvmrc` incluido.

### 1. Instalar dependencias

```bash
npm install
```

### 2. Contenido

El contenido se almacena en `src/content/` usando colecciones de Astro:

- **blog/** - Posts del blog (archivos .md)
- **projects/** - Proyectos (archivos .md)
- **articles/** - Artículos (archivos .md)
- **resources/** - Recursos (archivos .md)

Cada archivo debe tener frontmatter con las propiedades definidas en `src/content/config.mjs`.

### 3. Crear contenido

Puedes crear posts de dos formas:

1. **Manual**: Crea archivos .md en las carpetas correspondientes con frontmatter válido
2. **Formulario**: Usa `/blog/new` para crear posts desde el navegador

### 4. Variables de entorno

- `BLOB_READ_WRITE_TOKEN` (opcional en local, obligatorio en Vercel si quieres crear ideas desde producción): token generado en **Storage > Blob** para subir/leer los markdown de ideas en tiempo de ejecución. Si falta, las nuevas ideas en producción mostrarán un error y no se guardarán.

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye el sitio para producción en `./dist/` |
| `npm run preview`         | Previsualiza la construcción localmente         |
| `npm run astro ...`       | Ejecuta comandos CLI como `astro add`, `astro check` |

## 📝 Uso

### Agregar contenido

#### Opción 1: Formulario web
1. Ve a `/blog/new`
2. Completa el formulario con los datos del post
3. Haz clic en "Crear Post"
4. El post se crea automáticamente y te redirige a él

#### Opción 2: Archivos manuales
1. Crea un archivo `.md` en `src/content/blog/`
2. Agrega frontmatter válido:
```yaml
---
title: "Mi Post"
date: "2025-12-12"
status: "Publicado"
tags: ["tag1", "tag2"]
description: "Descripción del post"
---
```
3. Escribe el contenido en Markdown debajo del frontmatter

### API Endpoints

- `GET /api/blog.json` - Obtiene todos los posts
- `GET /api/blog/[slug].json` - Obtiene un post específico por slug
- `POST /api/create-post` - Crea un nuevo post (usado por el formulario)

### Páginas disponibles

- `/` - Página de inicio con posts recientes
- `/blog` - Lista completa de posts del blog
- `/blog/new` - Formulario para crear posts
- `/blog/[slug]` - Página individual de cada post
- `/projects` - Página de proyectos
- `/articles` - Página de artículos
- `/debug` - Página de debug para contenido

## 🎨 Personalización

### Estilos

El proyecto usa Tailwind CSS. Puedes personalizar los estilos en:
- `tailwind.config.mjs` - Configuración de Tailwind
- `src/layouts/Layout.astro` - Layout base y navegación
- Componentes individuales usando clases de Tailwind

### Tipos TypeScript

Los tipos se generan automáticamente desde `src/content/config.mjs`. Las colecciones tienen validación con Zod.

## 🔧 Desarrollo

El proyecto está configurado con:
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos utilitarios
- **Colecciones de contenido** con validación automática
- **Hot reload** en desarrollo

## 📚 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Colecciones de contenido en Astro](https://docs.astro.build/en/guides/content-collections/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs)