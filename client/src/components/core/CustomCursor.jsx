'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });

    // Check if hovering over interactive elements
    const element = document.elementFromPoint(e.clientX, e.clientY);
    const isInteractive = element?.matches(
      'a, button, input, textarea, select, [role="button"], [role="link"]'
    );
    setIsHovering(isInteractive);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <>
      {/* Global Cursor Style - Extremely Small */}
      <style jsx global>{`
        * {
          cursor: url('/cursor.png') 0 0, auto;
        }

        a, button, input, textarea, select, [role="button"], [role="link"] {
          cursor: url('/pointer.png') 0 0, pointer;
        }
      `}</style>

      {/* Custom Cursor Tracker */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="fixed inset-0 pointer-events-none z-50"
      >
        <motion.div
          style={{
            x: position.x,
            y: position.y,
          }}
          animate={{
            width: isHovering ? 16 : 4,
            height: isHovering ? 10 : 4,
          }}
          className="fixed -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/50 pointer-events-none"
        >
          <AnimatePresence>
            {isHovering ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="inline-flex w-full items-center justify-center"
              >
                <div className="inline-flex items-center text-xs text-white font-semibold">
                  <Plus className="h-1 w-1" />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
