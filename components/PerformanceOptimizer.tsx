import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Performance monitoring and optimization component
const PerformanceOptimizer: React.FC = () => {
  // Intersection Observer for lazy loading and animations
  const createIntersectionObserver = useCallback(() => {
    if (!('IntersectionObserver' in window)) return null;

    const observerOptions = {
      threshold: [0.1, 0.3, 0.7],
      rootMargin: '0px 0px -50px 0px'
    };

    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        
        // Trigger animations when elements come into view
        if (entry.isIntersecting) {
          target.classList.add('revealed');
          
          // Add specific animation classes based on data attributes
          const animationType = target.dataset.animation;
          if (animationType) {
            target.classList.add(`animate-${animationType}`);
          }
          
          // Lazy load images
          if (target.tagName === 'IMG') {
            const img = target as HTMLImageElement;
            const dataSrc = img.dataset.src;
            if (dataSrc) {
              img.src = dataSrc;
              img.removeAttribute('data-src');
            }
          }
          
          // Unobserve the element after animation
          setTimeout(() => {
            observer?.unobserve(target);
          }, 1000);
        }
      });
    }, observerOptions);
  }, []);

  // Debounced scroll handler
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // Optimize scroll performance
  const optimizeScrolling = useCallback(() => {
    let ticking = false;
    
    const updateScrollPosition = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      
      // Update parallax elements with GPU acceleration
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.transform = `translate3d(0, ${rate}px, 0)`;
      });
      
      // Update scroll progress indicator
      const scrollProgress = (scrolled / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const progressBar = document.querySelector('.scroll-progress') as HTMLElement;
      if (progressBar) {
        progressBar.style.width = `${scrollProgress}%`;
      }
      
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };
    
    return debounce(requestTick, 8);
  }, [debounce]);

  // Preload critical resources
  const preloadResources = useCallback(() => {
    // Critical fonts preloading
    const fonts = [
      { family: 'Inter', weights: [300, 400, 500, 600, 700] },
      { family: 'Poppins', weights: [300, 400, 500, 600, 700] },
      { family: 'Cairo', weights: [300, 400, 500, 600, 700] }
    ];
    
    fonts.forEach(font => {
      font.weights.forEach(weight => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.href = `https://fonts.gstatic.com/s/${font.family.toLowerCase()}/v12/${font.family}-${weight}.woff2`;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    });
    
    // Critical images preloading
    const criticalImages = [
      '/hero-bg.webp',
      '/logo.webp',
      '/about-hero.webp'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.type = 'image/webp';
      document.head.appendChild(link);
    });

    // Preload critical CSS
    const cssFiles = [
      '/styles/modern-enhanced.css',
      '/styles/enhanced.css'
    ];
    
    cssFiles.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);

  // Monitor Core Web Vitals
  const monitorCoreWebVitals = useCallback(() => {
    if (!('PerformanceObserver' in window)) return;
    
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
      
      // Send to analytics if needed
      if (lastEntry.startTime > 2500) {
        console.warn('LCP is slower than recommended (2.5s)');
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
        
        if (entry.processingStart - entry.startTime > 100) {
          console.warn('FID is slower than recommended (100ms)');
        }
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
    
    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      console.log('CLS:', clsValue);
      
      if (clsValue > 0.1) {
        console.warn('CLS is higher than recommended (0.1)');
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    
    // Memory monitoring
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        const usedPercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        
        if (usedPercent > 90) {
          console.warn(`High memory usage: ${usedPercent.toFixed(1)}%`);
          // Force garbage collection if available
          if ('gc' in window) {
            (window as any).gc();
          }
        }
      };
      
      setInterval(checkMemory, 30000); // Check every 30 seconds
    }
  }, []);

  // Optimize images with WebP support and lazy loading
  const optimizeImages = useCallback(() => {
    // Check WebP support
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };
    
    const webpSupported = supportsWebP();
    document.documentElement.classList.toggle('webp-support', webpSupported);
    
    // Advanced lazy loading with intersection observer
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          const srcset = img.dataset.srcset;
          
          if (src) {
            // Create new image to preload
            const newImg = new Image();
            newImg.onload = () => {
              img.src = src;
              if (srcset) img.srcset = srcset;
              img.classList.remove('lazy', 'skeleton');
              img.classList.add('loaded');
            };
            newImg.src = src;
            
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.classList.add('lazy');
      imageObserver.observe(img);
    });
  }, []);

  // Respect reduced motion preferences
  const respectReducedMotion = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (mediaQuery: MediaQueryListEvent | MediaQueryList) => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add('reduced-motion');
        
        // Disable animations
        const style = document.createElement('style');
        style.id = 'reduced-motion-styles';
        style.textContent = `
          .reduced-motion *,
          .reduced-motion *::before,
          .reduced-motion *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
            transform: none !important;
          }
          .reduced-motion .parallax {
            transform: none !important;
          }
        `;
        document.head.appendChild(style);
      } else {
        document.documentElement.classList.remove('reduced-motion');
        const existingStyle = document.getElementById('reduced-motion-styles');
        if (existingStyle) {
          existingStyle.remove();
        }
      }
    };
    
    handleReducedMotion(prefersReducedMotion);
    prefersReducedMotion.addEventListener('change', handleReducedMotion);
  }, []);

  // Advanced resource hints
  const addResourceHints = useCallback(() => {
    const hints = [
      // DNS prefetch for external domains
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: '//api.google.com' },
      
      // Preconnect for critical third parties
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      
      // Module preload for critical JS
      { rel: 'modulepreload', href: '/assets/main.js' }
    ];
    
    hints.forEach(hint => {
      const existingLink = document.querySelector(`link[href="${hint.href}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.crossorigin) {
          link.crossOrigin = hint.crossorigin;
        }
        document.head.appendChild(link);
      }
    });
  }, []);

  // Service Worker with advanced caching strategies
  const registerServiceWorker = useCallback(async () => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        
        console.log('Service Worker registered:', registration);
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Show update notification
                showUpdateNotification();
              }
            });
          }
        });
        
        // Background sync for offline forms
        if ('sync' in window.ServiceWorkerRegistration.prototype) {
          registration.sync.register('background-sync');
        }
        
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }, []);

  // Show update notification
  const showUpdateNotification = () => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <div>
          <p class="font-medium">تحديث متوفر</p>
          <p class="text-sm opacity-90">إصدار جديد من الموقع متاح</p>
        </div>
        <button onclick="window.location.reload()" class="ml-2 px-3 py-1 bg-white text-blue-600 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
          تحديث
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 10 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(full)';
      setTimeout(() => notification.remove(), 300);
    }, 10000);
  };

  // Initialize all optimizations
  useEffect(() => {
    const initOptimizations = async () => {
      // Phase 1: Critical resources
      addResourceHints();
      preloadResources();
      
      // Phase 2: Performance monitoring
      monitorCoreWebVitals();
      
      // Phase 3: User experience
      respectReducedMotion();
      optimizeImages();
      
      // Phase 4: Observers and handlers
      const observer = createIntersectionObserver();
      if (observer) {
        // Wait for DOM to be ready
        const checkElements = () => {
          const elements = document.querySelectorAll('.reveal, [data-animation], .lazy');
          if (elements.length > 0) {
            elements.forEach(el => observer.observe(el));
          } else {
            // Retry after a short delay
            setTimeout(checkElements, 100);
          }
        };
        checkElements();
      }
      
      // Setup scroll optimization
      const optimizedScroll = optimizeScrolling();
      window.addEventListener('scroll', optimizedScroll, { passive: true });
      
      // Phase 5: Service worker (non-blocking)
      setTimeout(() => {
        registerServiceWorker();
      }, 2000);
      
      return () => {
        window.removeEventListener('scroll', optimizedScroll);
        observer?.disconnect();
      };
    };
    
    // Start optimizations after a short delay to avoid blocking initial render
    const timeoutId = setTimeout(initOptimizations, 50);
    
    return () => clearTimeout(timeoutId);
  }, [createIntersectionObserver, optimizeScrolling, preloadResources, addResourceHints, optimizeImages, respectReducedMotion, monitorCoreWebVitals, registerServiceWorker]);

  // Component doesn't render anything visible
  return null;
};

export default React.memo(PerformanceOptimizer);