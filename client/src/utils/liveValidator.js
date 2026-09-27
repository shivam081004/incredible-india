/**
 * Live Validator - Real-time checking system for Incredible India app
 * Provides live validation, monitoring, and diagnostics
 */

class LiveValidator {
  constructor() {
    this.checks = new Map();
    this.results = new Map();
    this.listeners = [];
    this.isRunning = false;
  }

  // Register a check
  register(name, checkFn, interval = 5000) {
    this.checks.set(name, { checkFn, interval, lastRun: 0 });
    return this;
  }

  // Start continuous validation
  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    const runChecks = async () => {
      const now = Date.now();
      for (const [name, { checkFn, interval, lastRun }] of this.checks) {
        if (now - lastRun >= interval) {
          try {
            const result = await checkFn();
            this.results.set(name, {
              status: 'pass',
              data: result,
              timestamp: now,
              message: '✓ Check passed'
            });
          } catch (err) {
            this.results.set(name, {
              status: 'fail',
              error: err.message,
              timestamp: now,
              message: `✗ ${err.message}`
            });
          }
          this.checks.get(name).lastRun = now;
        }
      }
      this.notifyListeners();
      if (this.isRunning) {
        setTimeout(runChecks, 1000);
      }
    };

    runChecks();
  }

  // Stop validation
  stop() {
    this.isRunning = false;
  }

  // Subscribe to changes
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  // Notify all listeners
  notifyListeners() {
    this.listeners.forEach(cb => cb(this.getStatus()));
  }

  // Get current status
  getStatus() {
    const status = {};
    for (const [name, result] of this.results) {
      status[name] = result;
    }
    return status;
  }

  // Get summary
  getSummary() {
    let passed = 0;
    let failed = 0;
    for (const { status } of this.results.values()) {
      if (status === 'pass') passed++;
      else failed++;
    }
    return { passed, failed, total: passed + failed };
  }
}

export default new LiveValidator();

// Pre-built checks
export const checks = {
  // API connectivity check
  apiHealth: () =>
    fetch('/api/health', { method: 'GET', timeout: 5000 })
      .then(r => r.json())
      .then(data => ({ status: 'ok', ...data })),

  // Auth check
  authStatus: () =>
    fetch('/api/auth/me', { method: 'GET' })
      .then(r => r.json())
      .then(data => ({ authenticated: !!data.user })),

  // Database connection
  dbConnection: () =>
    fetch('/api/db/status', { method: 'GET' })
      .then(r => r.json())
      .then(data => ({ connected: data.connected })),

  // Page performance
  pagePerformance: () => {
    if (!window.performance) return { score: 'N/A' };
    const perf = window.performance.timing;
    const loadTime = perf.loadEventEnd - perf.navigationStart;
    const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
    const lcp = performance.getEntriesByType('largest-contentful-paint').pop()?.renderTime || 0;

    return { loadTime, fcp, lcp, score: loadTime < 3000 ? 'good' : 'slow' };
  },

  // DOM readiness
  domReady: () => {
    const elements = {
      navbar: !!document.querySelector('nav'),
      main: !!document.querySelector('main'),
      footer: !!document.querySelector('footer')
    };
    return { ready: Object.values(elements).every(Boolean), elements };
  },

  // Memory usage
  memoryUsage: () => {
    if (!performance.memory) return { available: 'N/A' };
    const { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize } = performance.memory;
    const percentUsed = ((usedJSHeapSize / jsHeapSizeLimit) * 100).toFixed(2);
    return { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize, percentUsed };
  },

  // Network status
  networkStatus: () => {
    const nav = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!nav) return { type: 'unknown' };
    return {
      type: nav.effectiveType,
      downlink: nav.downlink,
      rtt: nav.rtt,
      saveData: nav.saveData
    };
  }
};
