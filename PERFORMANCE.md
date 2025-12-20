# Optimizaciones de Rendimiento - MUGA OS Site

Este documento describe todas las optimizaciones de rendimiento implementadas en el sitio.

## 🚀 View Transitions

### Implementación
- **Astro View Transitions**: Transiciones suaves entre páginas sin recarga completa
- **Transiciones personalizadas**: Diferentes animaciones según el tipo de navegación
- **Persistencia de elementos**: El header se mantiene durante las transiciones

### Tipos de Transiciones
1. **Default**: Fade in/out suave para navegación general
2. **Blog-to-Blog**: Slide lateral entre posts del blog
3. **Blog-to-Home**: Slide vertical del blog a la página principal

### Configuración
```astro
import { ViewTransitions } from 'astro:transitions';

// En el <head>
<ViewTransitions />

// Elementos persistentes
<header transition:persist>
```

## 🖼️ Lazy Loading

### Componente LazyImage
- **Intersection Observer**: Carga imágenes cuando entran en el viewport
- **Placeholder**: Animación de carga mientras se descarga la imagen
- **Responsive**: Soporte para srcset automático
- **Fallback**: Funciona sin JavaScript

### Uso
```astro
import LazyImage from '../components/ui/LazyImage.astro';

<LazyImage
  src="/images/example.jpg"
  alt="Descripción de la imagen"
  loading="lazy"
  class="w-full"
/>
```

### Características
- **Rootmargin**: 50px para precargar antes de que sea visible
- **Threshold**: 0.01 para activación temprana
- **Transiciones**: Fade in suave al cargar

## ⚡ Prefetching en Hover

### Funcionalidad
- **Prefetch automático**: Al hacer hover sobre enlaces internos
- **Debounce**: 100ms de delay para evitar prefetch accidental
- **Navegación por teclado**: También funciona con focus
- **Indicador visual**: Sutil animación cuando se prefetch

### Implementación
```typescript
// Automático para todos los enlaces internos
const perfManager = PerformanceManager.getInstance();
perfManager.prefetchUrl('/blog/post-example');
```

### Beneficios
- **Navegación instantánea**: Las páginas se cargan inmediatamente
- **Mejor UX**: Reduce la percepción de tiempo de carga
- **Inteligente**: Solo prefetch enlaces que el usuario probablemente visitará

## 📦 Code Splitting

### Chunks Generados
```
BlogCard.yoD6TSFD.js     - 0.03 kB
BlogPost.BkiAkXrA.js     - 0.03 kB  
LazyImage.yoD6TSFD.js    - 0.03 kB
Layout.DwJ_vt80.js       - 5.41 kB
ClientRouter.QW52Ox2j.js - 15.33 kB
```

### Carga Dinámica
```typescript
// Carga dinámica de módulos
const module = await perfManager.loadModule('./component.js');

// Lazy loading de componentes
const BlogCard = await perfManager.lazyLoadComponent('BlogCard');
```

## 🎯 Menú Mejorado

### Transiciones Suaves
- **Fade + Scale**: Animación de entrada y salida
- **Iconos animados**: Transición entre ⋮ y ×
- **Posición consistente**: La X está en la misma posición que los tres puntos
- **Backdrop blur**: Efecto de desenfoque en el fondo

### Accesibilidad
- **Focus management**: Manejo correcto del foco
- **Escape key**: Cierra el menú con Escape
- **ARIA attributes**: Estados correctos para screen readers
- **Trap focus**: El foco se mantiene dentro del menú

### Animaciones
```css
/* Entrada del menú */
.menu-enter {
  opacity: 0 → 1;
  transform: scale(0.95) → scale(1);
  duration: 300ms;
}

/* Salida del menú */
.menu-exit {
  opacity: 1 → 0;
  transform: scale(1) → scale(0.95);
  duration: 300ms;
}
```

## 📊 Web Vitals

### Métricas Monitoreadas
1. **Largest Contentful Paint (LCP)**: < 2.5s
2. **First Input Delay (FID)**: < 100ms
3. **Cumulative Layout Shift (CLS)**: < 0.1

### Implementación
```typescript
// Medición automática
perfManager.measureWebVitals();

// Resultados en consola para desarrollo
console.log('LCP:', entry.startTime);
console.log('FID:', entry.processingStart - entry.startTime);
console.log('CLS:', clsValue);
```

## 🛠️ Performance Manager

### Singleton Pattern
```typescript
const perfManager = PerformanceManager.getInstance();
```

### Funcionalidades
- **Prefetch URLs**: Precarga de páginas
- **Module loading**: Carga dinámica de módulos
- **Image optimization**: Optimización de imágenes
- **Web Vitals**: Medición de métricas
- **Intersection Observer**: Observación de elementos
- **Debounce/Throttle**: Utilidades de rendimiento

## 🎨 Reduced Motion

### Respeto por Preferencias
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

### Características
- **View transitions**: Se desactivan completamente
- **Lazy loading**: Sin animación de placeholder
- **Menu**: Transiciones instantáneas
- **Hover effects**: Reducidos al mínimo

## 📈 Resultados de Rendimiento

### Lighthouse Scores (Objetivo)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimizaciones Aplicadas
- ✅ View Transitions suaves
- ✅ Lazy loading de imágenes
- ✅ Prefetching inteligente
- ✅ Code splitting automático
- ✅ Menú con transiciones fluidas
- ✅ Respeto por reduced motion
- ✅ Web Vitals monitoring
- ✅ Resource hints (preload, prefetch)

## 🔧 Configuración de Desarrollo

### Scripts Disponibles
```bash
npm run dev     # Desarrollo con hot reload
npm run build   # Build optimizado
npm run preview # Preview del build
```

### Debugging
```typescript
// Habilitar logs de rendimiento
localStorage.setItem('debug-performance', 'true');

// Ver prefetch en Network tab
// Ver chunks en Sources tab
// Monitorear Web Vitals en Console
```

## 📱 Compatibilidad

### Navegadores Soportados
- **Chrome**: 89+
- **Firefox**: 87+
- **Safari**: 14+
- **Edge**: 89+

### Fallbacks
- **View Transitions**: Navegación normal sin transiciones
- **Intersection Observer**: Carga inmediata de imágenes
- **Prefetch**: Navegación normal
- **Backdrop filter**: Fondo sólido

---

**Nota**: Todas las optimizaciones respetan las preferencias de accesibilidad del usuario y proporcionan fallbacks apropiados para navegadores más antiguos.