const CACHE_NAME = 'saidj-law-office-v2.1.0';
const OFFLINE_URL = '/offline.html';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
];

// Resources to cache on first visit
const RUNTIME_CACHE = [
  // Static assets will be cached automatically by Vite
  // API responses will be cached with network-first strategy
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Cache installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete old caches
              return cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        // Claim all clients immediately
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('Cache cleanup failed:', error);
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests except for fonts and APIs
  if (url.origin !== location.origin && 
      !url.origin.includes('fonts.googleapis.com') && 
      !url.origin.includes('fonts.gstatic.com') &&
      !url.origin.includes('generativelanguage.googleapis.com')) {
    return;
  }
  
  // Special handling for different resource types
  if (url.pathname.endsWith('.html') || url.pathname === '/') {
    // Network-first for HTML
    event.respondWith(networkFirst(request));
  } else if (url.pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|webp|svg|ico)$/)) {
    // Cache-first for static assets
    event.respondWith(cacheFirst(request));
  } else if (url.origin.includes('generativelanguage.googleapis.com')) {
    // Network-only for Gemini API (don't cache sensitive responses)
    event.respondWith(networkOnly(request));
  } else if (url.origin.includes('fonts.g')) {
    // Cache-first for fonts with long expiry
    event.respondWith(cacheFirst(request, { maxAge: 365 * 24 * 60 * 60 * 1000 })); // 1 year
  } else {
    // Default: try network first, fallback to cache
    event.respondWith(networkFirst(request));
  }
});

// Caching strategies
async function networkFirst(request, fallbackUrl = OFFLINE_URL) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Clone the response before consuming it
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match(fallbackUrl);
    }
    
    throw error;
  }
}

async function cacheFirst(request, options = {}) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Check if cache is still fresh (optional)
    if (options.maxAge) {
      const cacheTime = new Date(cachedResponse.headers.get('date') || 0).getTime();
      const now = Date.now();
      
      if (now - cacheTime > options.maxAge) {
        // Cache is stale, try to update in background
        updateCacheInBackground(request);
      }
    }
    
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache-first strategy failed:', error);
    throw error;
  }
}

async function networkOnly(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.error('Network-only request failed:', error);
    throw error;
  }
}

// Background cache update
async function updateCacheInBackground(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse);
      console.log('Cache updated in background for:', request.url);
    }
  } catch (error) {
    console.log('Background cache update failed:', error);
  }
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for offline form submissions (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  }
});

// Sync offline contact form submissions
async function syncContactForms() {
  try {
    // Get stored form data from IndexedDB or localStorage
    const storedForms = JSON.parse(localStorage.getItem('offline-contact-forms') || '[]');
    
    for (const formData of storedForms) {
      try {
        // Try to submit the form
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          // Remove successfully submitted form
          const remainingForms = storedForms.filter(f => f.id !== formData.id);
          localStorage.setItem('offline-contact-forms', JSON.stringify(remainingForms));
          console.log('Offline form synced successfully');
        }
      } catch (error) {
        console.error('Failed to sync form:', error);
      }
    }
  } catch (error) {
    console.error('Contact form sync failed:', error);
  }
}

// Notify clients about updates
self.addEventListener('controllerchange', () => {
  // New service worker has taken control
  console.log('New service worker activated');
});

console.log('Service Worker loaded successfully');