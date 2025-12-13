// Toast notification manager following SOLID principles
// Single Responsibility: Manages toast notifications
// Open/Closed: Easy to extend with new toast types
// Interface Segregation: Clean toast interface

export interface ToastOptions {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export class ToastManager {
  private static instance: ToastManager;
  private container: HTMLElement | null = null;

  private constructor() {}

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  private ensureContainer(): HTMLElement {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'fixed top-0 right-0 z-50 p-4 space-y-2';
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  show(options: ToastOptions): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const container = this.ensureContainer();

    // Create toast element
    const toast = document.createElement('div');
    toast.id = id;
    toast.className = `toast p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 max-w-md ${
      options.type === 'success' ? 'bg-green-900 border border-green-700 text-green-200' :
      options.type === 'error' ? 'bg-red-900 border border-red-700 text-red-200' :
      'bg-blue-900 border border-blue-700 text-blue-200'
    }`;

    toast.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="mr-3">
            ${this.getIcon(options.type)}
          </div>
          <p class="text-sm">${options.message}</p>
        </div>
        <button onclick="ToastManager.getInstance().hide('${id}')" class="ml-4 text-gray-400 hover:text-white transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);

    // Auto-hide
    setTimeout(() => {
      this.hide(id);
    }, options.duration || 5000);

    return id;
  }

  hide(id: string): void {
    const toast = document.getElementById(id);
    if (toast) {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }
  }

  private getIcon(type: string): string {
    switch (type) {
      case 'success':
        return `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>`;
      case 'error':
        return `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>`;
      default:
        return `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
        </svg>`;
    }
  }
}

// Global instance for easy access
declare global {
  interface Window {
    ToastManager: typeof ToastManager;
  }
}

if (typeof window !== 'undefined') {
  window.ToastManager = ToastManager;
}