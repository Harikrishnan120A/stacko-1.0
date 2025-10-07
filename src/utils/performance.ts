// Performance optimization configurations for STACKO
export const PERFORMANCE_CONFIG = {
  // Animation settings
  ANIMATION: {
    REDUCED_MOTION_THRESHOLD: 0.5,
    DEFAULT_DURATION: 0.3,
    FAST_DURATION: 0.15,
    SLOW_DURATION: 0.6,
  },
  
  // Mouse trail settings
  MOUSE_TRAIL: {
    MAX_POINTS: 30,
    THROTTLE_MS: 16, // ~60fps
    TRAIL_LIFETIME: 1000, // 1 second
  },
  
  // Scroll and resize optimizations
  SCROLL: {
    THROTTLE_MS: 16,
    DEBOUNCE_MS: 150,
  },
  
  // Bundle splitting
  CHUNKS: {
    VENDOR_MIN_SIZE: 50000,
    MAX_PARALLEL_REQUESTS: 6,
  },
  
  // Image optimization
  IMAGES: {
    LAZY_LOAD_THRESHOLD: '50px',
    QUALITY: 85,
    FORMATS: ['webp', 'jpeg'],
  },
  
  // Caching
  CACHE: {
    STATIC_ASSETS_TTL: 31536000, // 1 year
    HTML_TTL: 3600, // 1 hour
    API_TTL: 300, // 5 minutes
  }
} as const;

// Performance utilities
export const performanceUtils = {
  // Throttle function for high-frequency events
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let lastTime = 0;
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastTime >= limit) {
        lastTime = now;
        func(...args);
      }
    };
  },

  // Debounce function for resize events
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: number;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => func(...args), delay);
    };
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Check if device is touch-based
  isTouchDevice: (): boolean => {
    return window.matchMedia('(pointer: coarse)').matches;
  },

  // Get optimal animation duration based on user preferences
  getAnimationDuration: (baseMs: number): number => {
    return performanceUtils.prefersReducedMotion() ? baseMs * 0.3 : baseMs;
  },

  // Memory cleanup for intervals and timeouts
  cleanup: {
    intervals: new Set<number>(),
    timeouts: new Set<number>(),
    
    addInterval: (id: number) => {
      performanceUtils.cleanup.intervals.add(id);
    },
    
    addTimeout: (id: number) => {
      performanceUtils.cleanup.timeouts.add(id);
    },
    
    clearAll: () => {
      performanceUtils.cleanup.intervals.forEach(id => window.clearInterval(id));
      performanceUtils.cleanup.timeouts.forEach(id => window.clearTimeout(id));
      performanceUtils.cleanup.intervals.clear();
      performanceUtils.cleanup.timeouts.clear();
    }
  }
};

// Component performance monitoring
export const componentMetrics = {
  renderTimes: new Map<string, number[]>(),
  
  startRender: (): number => {
    return performance.now();
  },
  
  endRender: (componentName: string, startTime: number): void => {
    const renderTime = performance.now() - startTime;
    
    if (!componentMetrics.renderTimes.has(componentName)) {
      componentMetrics.renderTimes.set(componentName, []);
    }
    
    const times = componentMetrics.renderTimes.get(componentName)!;
    times.push(renderTime);
    
    // Keep only last 10 measurements
    if (times.length > 10) {
      times.shift();
    }
    
    // Log slow renders (> 16ms for 60fps)
    if (renderTime > 16) {
      console.warn(`Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`);
    }
  },
  
  getAverageRenderTime: (componentName: string): number => {
    const times = componentMetrics.renderTimes.get(componentName);
    if (!times || times.length === 0) return 0;
    
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }
};