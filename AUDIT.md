# Auditoría técnica de muga-os-site

## Resumen ejecutivo
El sitio en Astro presenta una base coherente, pero hay fallos de marcado y JS en el layout principal que pueden romper el renderizado y degradar el rendimiento. Los listados de contenido también necesitan pequeñas correcciones para evitar problemas de accesibilidad e hidratación.

## Hallazgos clave
1. **Marcado inválido en la home**: `src/pages/index.astro` cierra el componente `Layout` dos veces (líneas 120 y 133), dejando una etiqueta huérfana tras el bloque `<style>`. Esto invalida el HTML generado y puede romper la hidratación o la aplicación de estilos en tiempo de ejecución.【F:src/pages/index.astro†L120-L133】
2. **Acumulación de listeners en el menú**: El layout vuelve a ejecutar `initializeMenu` e `initializePrefetch` tanto en `DOMContentLoaded` como en `astro:after-swap` sin limpiar listeners previos (líneas 183-369). Cada navegación puede registrar nuevos manejadores sobre los mismos nodos (`click`, `keydown`, `mouseenter`, `focus`, etc.), provocando ejecuciones duplicadas, fuga de memoria y degradación de rendimiento en páginas largas.【F:src/layouts/Layout.astro†L183-L369】
3. **Listas sin identificadores estables**: Los listados de posts en `index.astro` y `blog.astro` renderizan elementos dentro de `map` sin `key`, pese a usar estructuras de lista (`role="list"/"listitem"`). En entornos hidratados (p. ej., si `BlogCard` se convierte en isla), esto generará advertencias y re-renderizados innecesarios, además de dificultar la navegación asistida.【F:src/pages/index.astro†L73-L89】【F:src/pages/blog.astro†L49-L64】

## Recomendaciones
- Corregir la estructura del `Layout` en `index.astro`, moviendo el bloque `<style>` dentro del slot o eliminando el cierre duplicado para restablecer un DOM válido.
- Añadir una capa de protección en `initializeMenu`/`initializePrefetch` que elimine listeners existentes o que marque la inicialización para evitar registros múltiples tras `astro:after-swap`.
- Incluir `key` únicos (por ejemplo, `post.slug`) en los elementos iterados de los listados para garantizar estabilidad de nodos y compatibilidad con futuras islas o componentes interactivos.
