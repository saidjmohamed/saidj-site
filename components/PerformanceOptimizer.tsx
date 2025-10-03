import React, { Suspense, lazy, useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Lazy loading للمكونات الكبيرة
const LazyAdminPanel = lazy(() => import('./AdminPanel'));
const LazyChatbot = lazy(() => import('./ChatbotImproved'));
const LazyLegalArticles = lazy(() => import('./LegalArticles'));

// مكون لتحسين تحميل الصور
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageError(true);
  }, []);

  // إنشاء WebP و responsive sources
  const createResponsiveSources = (originalSrc: string) => {
    const baseUrl = originalSrc.split('?')[0];
    const params = originalSrc.split('?')[1] || '';
    
    return {
      webpMobile: `${baseUrl}?${params}&fm=webp&w=768&h=512&fit=crop&q=80`,
      webpDesktop: `${baseUrl}?${params}&fm=webp&w=1200&h=800&fit=crop&q=85`,
      jpegMobile: `${baseUrl}?${params}&w=768&h=512&fit=crop&q=80`,
      jpegDesktop: `${baseUrl}?${params}&w=1200&h=800&fit=crop&q=85`,
      original: originalSrc
    };
  };

  const sources = createResponsiveSources(src);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton loader */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        </div>
      )}

      {/* صورة محسنة */}
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet={`${sources.webpMobile} 1x`}
          type="image/webp"
        />
        <source
          media="(min-width: 769px)"
          srcSet={`${sources.webpDesktop} 1x`}
          type="image/webp"
        />
        <source
          media="(max-width: 768px)"
          srcSet={`${sources.jpegMobile} 1x`}
          type="image/jpeg"
        />
        <source
          media="(min-width: 769px)"
          srcSet={`${sources.jpegDesktop} 1x`}
          type="image/jpeg"
        />
        <img
          src={sources.original}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes={sizes}
        />
      </picture>

      {/* رسالة خطأ */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">فشل تحميل الصورة</p>
          </div>
        </div>
      )}
    </div>
  );
};

// مكون Skeleton Loader قابل للتخصيص
interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = 'w-full',
  height = 'h-4',
  className = '',
  variant = 'rectangular'
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200';
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded'
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${width} ${height} ${className}`}
      role="status"
      aria-label="جار التحميل..."
    >
      <span className="sr-only">جار التحميل...</span>
    </div>
  );
};

// مكون تحسين SEO المتقدم
interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schemaData?: object;
}

export const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  schemaData
}) => {
  const { language } = useLanguage();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const defaultTitle = 'الأستاذ سايج محمد - محامي معتمد في الجزائر';
  const defaultDescription = 'مكتب محاماة متخصص في القانون المدني والجنائي والتجاري والعائلي. استشارات قانونية محترفة في الجزائر.';
  const defaultKeywords = 'محامي, الجزائر, استشارة قانونية, القانون الجزائري, محكمة, قضايا قانونية, سايج محمد';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalOgImage = ogImage || `${siteUrl}/og-image.jpg`;

  useEffect(() => {
    // تحديث العنوان
    document.title = finalTitle;

    // تحديث meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic SEO tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'الأستاذ سايج محمد');
    updateMetaTag('language', language);
    
    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalOgImage, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:locale', language === 'ar' ? 'ar_DZ' : language === 'fr' ? 'fr_DZ' : 'en_US', true);
    updateMetaTag('og:site_name', 'مكتب الأستاذ سايج محمد للمحاماة', true);

    // Twitter Cards
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalOgImage);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical || currentUrl;

    // Schema.org JSON-LD
    if (schemaData) {
      let schemaScript = document.querySelector('#schema-json-ld') as HTMLScriptElement;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'schema-json-ld';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.innerHTML = JSON.stringify(schemaData);
    }
  }, [finalTitle, finalDescription, finalKeywords, finalOgImage, currentUrl, canonical, schemaData, language]);

  return null;
};

// مكون Intersection Observer للرسوم المتحركة عند الظهور
interface InViewAnimationProps {
  children: React.ReactNode;
  animation?: string;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export const InViewAnimation: React.FC<InViewAnimationProps> = ({
  children,
  animation = 'fade-in-up',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasAnimated]);

  const animationClasses = {
    'fade-in': 'opacity-0 transition-opacity duration-1000',
    'fade-in-up': 'opacity-0 translate-y-8 transition-all duration-1000',
    'fade-in-down': 'opacity-0 -translate-y-8 transition-all duration-1000',
    'fade-in-left': 'opacity-0 translate-x-8 transition-all duration-1000',
    'fade-in-right': 'opacity-0 -translate-x-8 transition-all duration-1000',
    'scale-in': 'opacity-0 scale-95 transition-all duration-1000',
    'slide-in-bottom': 'opacity-0 translate-y-full transition-all duration-1000'
  };

  const visibleClasses = {
    'fade-in': 'opacity-100',
    'fade-in-up': 'opacity-100 translate-y-0',
    'fade-in-down': 'opacity-100 translate-y-0',
    'fade-in-left': 'opacity-100 translate-x-0',
    'fade-in-right': 'opacity-100 translate-x-0',
    'scale-in': 'opacity-100 scale-100',
    'slide-in-bottom': 'opacity-100 translate-y-0'
  };

  return (
    <div
      ref={elementRef}
      className={`${
        animationClasses[animation as keyof typeof animationClasses] || animationClasses['fade-in-up']
      } ${
        isVisible ? visibleClasses[animation as keyof typeof visibleClasses] || visibleClasses['fade-in-up'] : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

// مكون تحسين الأداء العام
interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

export const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Preload critical resources
    const preloadResources = () => {
      // Preload critical fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap';
      fontLink.as = 'style';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);

      // Preload critical images
      const heroImage = new Image();
      heroImage.src = 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1';
    };

    const optimizePerformance = () => {
      // Defer non-critical JavaScript
      const scripts = document.querySelectorAll('script[defer]');
      scripts.forEach(script => {
        if (script.getAttribute('data-loaded') !== 'true') {
          script.setAttribute('data-loaded', 'true');
        }
      });

      // Optimize images loading
      const images = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    };

    // تشغيل التحسينات بعد تحميل الصفحة
    if (document.readyState === 'complete') {
      preloadResources();
      optimizePerformance();
    } else {
      window.addEventListener('load', () => {
        preloadResources();
        optimizePerformance();
      });
    }

    // Service Worker registration للتخزين المؤقت
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-slate-600">جار تحميل الموقع...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Hook للحصول على معلومات الأداء
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<{
    loadTime: number;
    domContentLoaded: number;
    firstContentfulPaint: number;
  } | null>(null);

  useEffect(() => {
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        const fcp = paint.find(entry => entry.name === 'first-contentful-paint');

        setMetrics({
          loadTime: navigation.loadEventEnd - navigation.fetchStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          firstContentfulPaint: fcp ? fcp.startTime : 0
        });
      }
    };

    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  return metrics;
};

export default PerformanceOptimizer;