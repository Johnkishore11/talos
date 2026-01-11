'use client';

import React, { useEffect, useRef, memo } from 'react';

const CustomCursor = memo(function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return;
    
    let needsUpdate = false;
    
    const updateCursor = () => {
      if (cursorRef.current && needsUpdate) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x - 4}px, ${posRef.current.y - 4}px, 0)`;
        needsUpdate = false;
      }
      rafRef.current = requestAnimationFrame(updateCursor);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      needsUpdate = true;
      if (cursorRef.current && cursorRef.current.style.opacity === '0') {
        cursorRef.current.style.opacity = '1';
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };
    
    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    rafRef.current = requestAnimationFrame(updateCursor);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '8px', 
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#ff0000',
        boxShadow: '0 0 10px #ff0000, 0 0 20px #ff0000',
        transform: 'translate3d(-100px, -100px, 0)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen', 
        opacity: 0,
        transition: 'opacity 0.2s ease',
        willChange: 'transform',
        contain: 'layout style paint'
      }}
    />
  );
});

export default CustomCursor;
