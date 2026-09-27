import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import liveValidator, { checks } from '../utils/liveValidator';

export function LiveValidationDashboard() {
  const [status, setStatus] = useState({});
  const [summary, setSummary] = useState({ passed: 0, failed: 0, total: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    // Register all checks
    Object.entries(checks).forEach(([name, checkFn]) => {
      liveValidator.register(name, checkFn, 5000);
    });

    // Subscribe to updates
    const unsubscribe = liveValidator.subscribe((newStatus) => {
      setStatus(newStatus);
      setSummary(liveValidator.getSummary());
    });

    // Start validator
    if (autoRefresh) {
      liveValidator.start();
    }

    return () => {
      unsubscribe();
      if (autoRefresh) {
        liveValidator.stop();
      }
    };
  }, [autoRefresh]);

  const toggleRefresh = () => {
    setAutoRefresh(!autoRefresh);
    if (!autoRefresh) {
      liveValidator.start();
    } else {
      liveValidator.stop();
    }
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Compact Badge */}
      {!isExpanded && (
        <motion.button
          onClick={() => setIsExpanded(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-1">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                summary.failed > 0 ? 'bg-red-400 animate-pulse' : 'bg-green-400'
              }`}
            ></span>
            <span className="text-sm font-semibold">
              {summary.passed}/{summary.total}
            </span>
          </div>
          <span className="text-xs">Live Check</span>
        </motion.button>
      )}

      {/* Expanded Dashboard */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-0 right-0 bg-slate-900 border border-blue-500/30 rounded-lg shadow-2xl p-4 w-96 max-h-96 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-slate-900 pb-2 border-b border-blue-500/20">
              <h3 className="text-lg font-bold text-white">Live Validation</h3>
              <div className="flex gap-2">
                <button
                  onClick={toggleRefresh}
                  className={`px-2 py-1 rounded text-xs font-semibold transition ${
                    autoRefresh
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-gray-500/20 text-gray-300'
                  }`}
                >
                  {autoRefresh ? '🔄 Auto' : '⏸ Paused'}
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="px-2 py-1 rounded text-xs font-semibold bg-gray-500/20 text-gray-300 hover:bg-gray-500/30"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded p-2 text-center">
                <p className="text-xs text-gray-300">Passed</p>
                <p className="text-lg font-bold text-green-400">{summary.passed}</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded p-2 text-center">
                <p className="text-xs text-gray-300">Failed</p>
                <p className="text-lg font-bold text-red-400">{summary.failed}</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2 text-center">
                <p className="text-xs text-gray-300">Total</p>
                <p className="text-lg font-bold text-blue-400">{summary.total}</p>
              </div>
            </div>

            {/* Checks List */}
            <div className="space-y-2">
              {Object.entries(status).map(([name, result]) => (
                <motion.div
                  key={name}
                  className={`p-3 rounded-lg border transition ${
                    result.status === 'pass'
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white capitalize">
                        {name.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {result.message}
                      </p>
                      {result.data && (
                        <pre className="text-xs bg-black/30 p-2 mt-1 rounded overflow-auto max-h-24 text-gray-300">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      )}
                      {result.error && (
                        <p className="text-xs text-red-300 mt-1">{result.error}</p>
                      )}
                    </div>
                    <span className="text-lg">
                      {result.status === 'pass' ? '✓' : '✗'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </p>
                </motion.div>
              ))}
            </div>

            {summary.total === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">Initializing checks...</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LiveValidationDashboard;
