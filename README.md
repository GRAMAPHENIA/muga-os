# MUGA OS Site

Un sitio web moderno y accesible construido con Astro, siguiendo principios SOLID y mejores prácticas de diseño.

## 🚀 Características

- **Arquitectura SOLID**: Componentes modulares y reutilizables
- **Accesibilidad**: Cumple con estándares WCAG 2.1 AA
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Rendimiento**: Carga rápida y optimizada
- **SEO**: Meta tags y structured data optimizados
- **TypeScript**: Tipado estático para mejor desarrollo

## 🏗️ Arquitectura

### Principios SOLID Aplicados

1. **Single Responsibility Principle (SRP)**
   - Cada componente tiene una única responsabilidad
   - Servicios especializados para diferentes funcionalidades

2. **Open/Closed Principle (OCP)**
   - Componentes extensibles mediante props
   - Nuevas funcionalidades sin modificar código existente

3. **Liskov Substitution Principle (LSP)**
   - Interfaces consistentes entre componentes
   - Componentes intercambiables

4. **Interface Segregation Principle (ISP)**
   - Props específicas para cada componente
   - Interfaces pequeñas y enfocadas

5. **Dependency Inversion Principle (DIP)**
   - Dependencias de abstracciones, no implementaciones
   - Servicios inyectables y testeable

### Estructura del Proyecto

```
src/
├── components/
│   ├── ui/                 # Componentes base reutilizables
│   │   ├── Button.astro
│   │   ├── Typography.astro
│   │   ├── Card.astro
│   │   └── Badge.astro
│   └── blog/              # Componentes específicos del blog
│       ├── BlogPost.astro
│       ├── BlogCard.astro
│       ├── BlogBreadcrumb.astro
│       ├── BlogMetadata.astro
│       └── BlogTableOfContents.astro
├── services/              # Lógica de negocio
│   └── BlogService.ts
├── config/               # Configuraciones centralizadas
│   ├── accessibility.ts
│   └── design.ts
├── lib/                  # Utilidades y helpers
│   ├── blog.ts
│   ├── ideas.ts
│   └── toast.ts
├── layouts/              # Layouts base
│   └── Layout.astro
└── pages/               # Páginas del sitio
    ├── index.astro
    ├── blog.astro
    └── blog/
        └── [slug].astro
```

## 🎨 Sistema de Diseño

### Tokens de Diseño

- **Colores**: Esquema neutral con acentos específicos
- **Tipografía**: Sistema escalable con variantes semánticas
- **Espaciado**: Escala consistente basada en múltiplos de 4px
- **Sin Border Radius**: Diseño limpio y geométrico

### Componentes UI

- `Button`: Botones con variantes y estados
- `Typography`: Texto semántico y consistente
- `Card`: Contenedores de contenido flexibles
- `Badge`: Etiquetas y categorías

## ♿ Accesibilidad

### Características Implementadas

- **Navegación por teclado**: Focus management completo
- **Screen readers**: ARIA labels y roles semánticos
- **Alto contraste**: Soporte para modo de alto contraste
- **Movimiento reducido**: Respeta preferencias de usuario
- **Skip links**: Navegación rápida al contenido principal
- **Estructura semántica**: HTML semántico correcto

### Estándares Cumplidos

- WCAG 2.1 AA
- Section 508
- EN 301 549

## 🛠️ Desarrollo

### Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Type checking
npm run astro check
```

### Agregar Nuevo Post

1. Crear archivo `.md` en `src/content/blog/`
2. Usar el formato del post existente como plantilla
3. Incluir frontmatter completo
4. El post aparecerá automáticamente en el sitio

### Crear Nuevos Componentes

1. Seguir principios SOLID
2. Incluir props tipadas con TypeScript
3. Implementar accesibilidad desde el inicio
4. Documentar con comentarios JSDoc

## 📝 Contenido

### Estructura de Posts

Los posts siguen una estructura específica basada en el post existente:

- **Breadcrumb navigation**
- **Metadatos del tutorial**
- **Tabla de contenidos**
- **Contenido estructurado**
- **Footer con créditos**

### Frontmatter Requerido

```yaml
---
title: 'Título del post'
area: 'Studio' | 'Dev'
category: ['Categoría']
status: 'Publicado' | 'Borrador' | 'Archivado'
date: 'YYYY-MM-DD'
tags: ['tag1', 'tag2']
image: '/images/imagen.png'
---
```

## 🚀 Despliegue

El sitio está configurado para desplegarse en Vercel automáticamente.

### Variables de Entorno

No se requieren variables de entorno especiales para el funcionamiento básico.

## 🤝 Contribución

1. Seguir principios SOLID
2. Mantener accesibilidad
3. Escribir código TypeScript tipado
4. Incluir documentación
5. Probar en múltiples dispositivos

## 📄 Licencia

Proyecto de MUGA.studio - Todos los derechos reservados.

---

**Versión**: 1.2.6  
**Última actualización**: Diciembre 2025