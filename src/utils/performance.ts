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

  // Lazy loading de componentes (temporarily disabled)
  async lazyLoadComponent(componentName: string): Promise<any> {
    throw new Error(`Component loading temporarily disabled for ${componentName}`);
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

  // Debounce para eventos
  debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Medir Web Vitals
  measureWebVitals(): void {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    // First Input Delay
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', (entry as any).processingStart - entry.startTime);
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
          }
        });
        console.log('CLS:', clsValue);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
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
        link.addEventListener('touchstart', debouncedPrefetch);
      });
    };

    addPrefetchListeners();
    
    // Observer para enlaces dinámicos
    const mutationObserver = new MutationObserver(() => {
      addPrefetchListeners();
    });
    
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}