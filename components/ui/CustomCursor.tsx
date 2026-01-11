'use client';

import React, { useEffect, useRef, memo, useState } from 'react';

const CustomCursor = memo(function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flash

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileWidth = window.innerWidth <= 768;
      return hasTouchScreen || isMobileWidth;
    };

    setIsMobile(checkMobile());

    // Skip on mobile/touch devices
    if (checkMobile()) return;
    
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

    const handleResize = () => {
      const mobile = checkMobile();
      setIsMobile(mobile);
      if (mobile && cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    rafRef.current = requestAnimationFrame(updateCursor);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="hidden md:block"
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
