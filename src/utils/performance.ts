// Utilidades de rendimiento y code splitting
// Single Responsibility: Manejar optimizaciones de rendimiento

export class PerformanceManager {
  private static instance: PerformanceManager;
  private prefetchedUrls = new Set<string>();
  private loadedModules = new Map<string, any>();

  static getInstance(): PerformanceManager {
    if (!PerformanceManager.instance) {
      PerformanceManager.instance = new PerformanceManager();
    }
    return PerformanceManager.instance;
  }

  // Prefetch de URLs en hover
  prefetchUrl(url: string): void {
    if (this.prefetchedUrls.has(url)) return;
    
    this.prefetchedUrls.add(url);
    
    // Crear link de prefetch
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'document';
    document.head.appendChild(link);

    // Marcar visualmente (opcional)
    this.markAsPrefetched(url);
  }

  // Marcar enlaces como prefetched
  private markAsPrefetched(url: string): void {
    const links = document.querySelectorAll(`a[href="${url}"]`);
    links.forEach(link => {
      link.setAttribute('data-prefetched', 'true');
    });
  }

  // Carga dinámica de módulos
  async loadModule<T>(modulePath: string): Promise<T> {
    if (this.loadedModules.has(modulePath)) {
      return this.loadedModules.get(modulePath);
    }

    try {
      const module = await import(modulePath);
      this.loadedModules.set(modulePath, module);
      return module;
    } catch (error) {
      console.error(`Error loading module ${modulePath}:`, error);
      throw error;
    }
  }

  // Preload de recursos críticos
  preloadResource(href: string, as: string, type?: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  }

  // Lazy loading de componentes
  async lazyLoadComponent(componentName: string): Promise<any> {
    const componentMap: Record<string, () => Promise<any>> = {
      'BlogCard': () => import('../components/blog/BlogCard.astro'),
      'BlogPost': () => import('../components/blog/BlogPost.astro'),
      'LazyImage': () => import('../components/ui/LazyImage.astro'),
    };

    const loader = componentMap[componentName];
    if (!loader) {
      throw new Error(`Component ${componentName} not found`);
    }

    return this.loadModule(componentName);
  }

  // Optimización de imágenes
  optimizeImage(src: string, width?: number, quality = 80): string {
    // En un entorno real, esto se conectaría con un servicio de optimización de imágenes
    if (src.includes('images/')) {
      const params = new URLSearchParams();
      if (width) params.set('w', width.toString());
      params.set('q', quality.toString());
      return `${src}?${params.toString()}`;
    }
    return src;
  }

  // Medición de Web Vitals
  measureWebVitals(): void {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('LCP:', entry.startTime);
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    // First Input Delay
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    }

    // Cumulative Layout Shift
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('CLS:', clsValue);
          }
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  // Intersection Observer para elementos
  observeElement(
    element: Element, 
    callback: (entry: IntersectionObserverEntry) => void,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(callback);
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1,
      ...options
    });

    observer.observe(element);
    return observer;
  }

  // Debounce para eventos
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Throttle para eventos
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Función de utilidad para inicializar optimizaciones
export function initializePerformanceOptimizations(): void {
  const perfManager = PerformanceManager.getInstance();

  // Medir Web Vitals
  perfManager.measureWebVitals();

  // Preload de recursos críticos
  perfManager.preloadResource('/favicon.svg', 'image', 'image/svg+xml');

  // Configurar prefetch en hover
  document.addEventListener('DOMContentLoaded', () => {
    const addPrefetchListeners = () => {
      const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
      
      internalLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.startsWith('#')) return;
        
        const debouncedPrefetch = perfManager.debounce(() => {
          perfManager.prefetchUrl(href);
        }, 100);
        
        link.addEventListener('mouseenter', debouncedPrefetch);
        link.addEventListener('focus', debouncedPrefetch);
      });
    };

    addPrefetchListeners();
    
    // Re-ejecutar después de view transitions
    document.addEventListener('astro:after-swap', addPrefetchListeners);
  });
}

// Exportar instancia singleton
export const performanceManager = PerformanceManager.getInstance();