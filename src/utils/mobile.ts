/**
 * Mobile optimization utilities for STACKO
 * Provides touch-friendly interactions and mobile-specific enhancements
 */

// Touch event detection
export const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Improved scroll performance for mobile
export const enableSmoothScrolling = () => {
  if (isTouchDevice()) {
    (document.documentElement.style as any).webkitOverflowScrolling = 'touch';
    document.documentElement.style.scrollBehavior = 'smooth';
  }
};

// Prevent zoom on double tap for form inputs
export const preventDoubleZoom = () => {
  if (isTouchDevice()) {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('touchstart', (e) => {
        e.stopPropagation();
      });
    });
  }
};

// Enhanced touch interactions for cards and buttons
export const addTouchFeedback = (element: HTMLElement) => {
  if (!isTouchDevice()) return;

  element.addEventListener('touchstart', () => {
    element.style.transform = 'scale(0.98)';
    element.style.transition = 'transform 0.1s ease-out';
  });

  element.addEventListener('touchend', () => {
    element.style.transform = 'scale(1)';
    element.style.transition = 'transform 0.2s ease-out';
  });

  element.addEventListener('touchcancel', () => {
    element.style.transform = 'scale(1)';
    element.style.transition = 'transform 0.2s ease-out';
  });
};

// Mobile viewport height fix for iOS
export const fixMobileViewportHeight = () => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
};

// Optimized image loading for mobile
export const optimizeImageLoading = () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.loading = 'eager';
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
};

// Reduce motion for users who prefer it
export const respectReducedMotion = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }
};

// Initialize all mobile optimizations
export const initMobileOptimizations = () => {
  enableSmoothScrolling();
  preventDoubleZoom();
  fixMobileViewportHeight();
  optimizeImageLoading();
  respectReducedMotion();

  // Add touch feedback to interactive elements
  const interactiveElements = document.querySelectorAll(
    'button, .btn, .card, [role="button"], a[href]'
  );
  
  interactiveElements.forEach(element => {
    addTouchFeedback(element as HTMLElement);
  });
};

// Mobile-specific scroll snap improvements
export const enhanceScrollSnap = () => {
  const scrollContainers = document.querySelectorAll('.snap-x');
  
  scrollContainers.forEach(container => {
    let isScrolling = false;
    
    container.addEventListener('scroll', () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          // Add scroll momentum for better mobile experience
          if (isTouchDevice()) {
            ((container as HTMLElement).style as any).webkitOverflowScrolling = 'touch';
          }
          isScrolling = false;
        });
      }
      isScrolling = true;
    });
  });
};

// Performance monitoring for mobile
export const monitorMobilePerformance = () => {
  if (!('performance' in window)) return;

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        // Log LCP for mobile optimization
        console.log('LCP:', entry.startTime);
      }
      
      if (entry.entryType === 'first-input') {
        // Log FID for touch responsiveness
        console.log('FID:', (entry as any).processingStart - entry.startTime);
      }
    });
  });

  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
};