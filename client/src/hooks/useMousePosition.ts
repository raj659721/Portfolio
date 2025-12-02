import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX,
        normalizedY,
      });
    };

    const updateTouchPosition = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const normalizedX = (touch.clientX / window.innerWidth) * 2 - 1;
        const normalizedY = -(touch.clientY / window.innerHeight) * 2 + 1;
        
        setMousePosition({
          x: touch.clientX,
          y: touch.clientY,
          normalizedX,
          normalizedY,
        });
      }
    };

    const resetToCenter = () => {
      setMousePosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        normalizedX: 0,
        normalizedY: 0,
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('touchmove', updateTouchPosition);
    window.addEventListener('touchend', resetToCenter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('touchmove', updateTouchPosition);
      window.removeEventListener('touchend', resetToCenter);
    };
  }, []);

  return mousePosition;
}

export default useMousePosition;
