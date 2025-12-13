# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-12

### Added
- Sistema de contenido local con colecciones de Astro
- Validación de contenido con Zod schemas
- Sistema de gestión de posts completo (crear, editar, eliminar)
- Sistema de notificaciones toast personalizado
- API endpoints para gestión de contenido
- Validación de fechas para prevenir errores de runtime
- Tipado TypeScript completo en endpoints API

### Changed
- Migración completa desde integración con Notion a contenido local
- Reemplazo de alert() del navegador por sistema de toast para confirmaciones
- Mejora en la experiencia de usuario con notificaciones visuales consistentes

### Removed
- Integración completa con Notion API
- Dependencias relacionadas con Notion
- Propiedad 'description' del esquema de blog (BREAKING CHANGE)

### Fixed
- Errores de TypeScript por propiedades inexistentes
- Errores de "Invalid time value" en fechas
- Problemas de permisos del sistema de archivos
- Tipos implícitos en endpoints API

### BREAKING CHANGES
- **Eliminación de integración con Notion**: La aplicación ya no depende de la API de Notion. Todo el contenido debe ser gestionado localmente a través del sistema de archivos.
- **Cambio en el esquema de blog**: Se eliminó la propiedad `description` del esquema de contenido. Los posts existentes pueden necesitar ajustes.

## [0.0.1] - 2025-12-XX

### Added
- Versión inicial del sitio web
- Integración básica con Notion
- Diseño responsive con Tailwind CSS
- Estructura base con Astro