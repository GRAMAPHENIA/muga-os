// Configuración de accesibilidad y mejores prácticas
// Single Responsibility: Centralizar configuraciones de accesibilidad

export const ACCESSIBILITY_CONFIG = {
  // Configuración de ARIA labels
  ariaLabels: {
    navigation: {
      main: 'Navegación principal',
      breadcrumb: 'Navegación breadcrumb',
      pagination: 'Navegación de paginación',
      toc: 'Tabla de contenidos'
    },
    buttons: {
      menu: 'Abrir menú de navegación',
      close: 'Cerrar menú',
      skipToContent: 'Saltar al contenido principal'
    },
    content: {
      featuredPost: 'Publicación destacada',
      recentPosts: 'Publicaciones recientes',
      postsList: 'Lista de publicaciones',
      articleMetadata: 'Metadatos del artículo'
    }
  },

  // Configuración de roles semánticos
  roles: {
    banner: 'banner',
    main: 'main',
    navigation: 'navigation',
    contentinfo: 'contentinfo',
    article: 'article',
    complementary: 'complementary'
  },

  // Configuración de focus management
  focusManagement: {
    trapFocus: true,
    restoreFocus: true,
    skipLinks: true
  },

  // Configuración de colores y contraste
  colors: {
    minimumContrast: 4.5, // WCAG AA
    preferredContrast: 7, // WCAG AAA
    highContrastMode: true
  },

  // Configuración de motion
  motion: {
    respectReducedMotion: true,
    defaultTransitionDuration: '0.2s',
    reducedMotionDuration: '0.01ms'
  }
} as const;

// Utilidades para accesibilidad
export const a11yUtils = {
  // Generar ID único para elementos
  generateId: (prefix: string): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Verificar si el usuario prefiere movimiento reducido
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Verificar si el usuario prefiere alto contraste
  prefersHighContrast: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Manejar focus trap en modales
  trapFocus: (element: HTMLElement): (() => void) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);

    // Retornar función de cleanup
    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  }
};