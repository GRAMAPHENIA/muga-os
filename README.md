# Mi Sitio Web con Astro y Notion

Un sitio web moderno construido con Astro que se conecta directamente a Notion para mostrar contenido dinámico. Incluye TypeScript y Tailwind CSS para una experiencia de desarrollo óptima.

## ✨ Características

- 🚀 **Astro** - Framework web moderno y rápido
- 📝 **Integración con Notion** - Contenido dinámico desde tu base de datos de Notion
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
│   ├── layouts/
│   │   └── Layout.astro          # Layout base con navegación
│   ├── lib/
│   │   └── blog.ts               # Funciones para conectar con Notion
│   ├── pages/
│   │   ├── api/
│   │   │   ├── blog.json.ts      # API para obtener todos los posts
│   │   │   └── blog/
│   │   │       └── [slug].json.ts # API para obtener un post específico
│   │   ├── blog/
│   │   │   └── [slug].astro      # Páginas dinámicas para posts individuales
│   │   ├── blog.astro            # Página principal del blog
│   │   └── index.astro           # Página de inicio
│   └── types/
│       └── notion.ts             # Tipos TypeScript para Notion
├── .env                          # Variables de entorno (Notion API)
├── astro.config.mjs             # Configuración de Astro
├── tailwind.config.mjs          # Configuración de Tailwind
└── tsconfig.json                # Configuración de TypeScript
```

## 🚀 Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Notion

1. Crea una integración en [Notion Developers](https://www.notion.so/my-integrations)
2. Copia el token de la integración
3. Crea una base de datos en Notion con las siguientes propiedades:
   - **Titulo** (Título)
   - **Fecha** (Fecha)
   - **Tags** (Multi-select)
   - **Slug** (Texto)
   - **Descripcion** (Texto)
4. Comparte la base de datos con tu integración
5. Copia el ID de la base de datos desde la URL

### 3. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
NOTION_API_KEY=tu_token_de_notion_aqui
NOTION_BLOG_DB=id_de_tu_base_de_datos_aqui
```

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

1. Ve a tu base de datos de Notion
2. Agrega una nueva página con:
   - **Titulo**: El título de tu post
   - **Fecha**: Fecha de publicación
   - **Tags**: Etiquetas para categorizar
   - **Slug**: URL amigable (ej: "mi-primer-post")
   - **Descripcion**: Resumen del contenido
3. Escribe el contenido en el cuerpo de la página de Notion
4. El contenido aparecerá automáticamente en tu sitio web

### API Endpoints

- `GET /api/blog.json` - Obtiene todos los posts
- `GET /api/blog/[slug].json` - Obtiene un post específico por slug

### Páginas disponibles

- `/` - Página de inicio con posts recientes
- `/blog` - Lista completa de posts del blog
- `/blog/[slug]` - Página individual de cada post

## 🎨 Personalización

### Estilos

El proyecto usa Tailwind CSS. Puedes personalizar los estilos en:
- `tailwind.config.mjs` - Configuración de Tailwind
- `src/layouts/Layout.astro` - Layout base y navegación
- Componentes individuales usando clases de Tailwind

### Tipos TypeScript

Los tipos están definidos en `src/types/notion.ts`. Puedes extenderlos según las propiedades de tu base de datos de Notion.

## 🔧 Desarrollo

El proyecto está configurado con:
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos utilitarios
- **Hot reload** en desarrollo

## 📚 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Notion API](https://developers.notion.com)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs)