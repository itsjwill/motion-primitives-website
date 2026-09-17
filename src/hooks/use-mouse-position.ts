"use client";

import { useState, useEffect, useRef, RefObject } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface NormalizedMousePosition extends MousePosition {
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

// Global mouse position hook
export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}

// Mouse position relative to an element
export function useRelativeMousePosition<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T>
): NormalizedMousePosition {
  const [position, setPosition] = useState<NormalizedMousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalized from -1 to 1
      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = (y / rect.height) * 2 - 1;

      setPosition({ x, y, normalizedX, normalizedY });
    };

    element.addEventListener("mousemove", handleMouseMove);
    return () => element.removeEventListener("mousemove", handleMouseMove);
  }, [ref]);

  return position;
}

// Smooth mouse follower
export function useSmoothMouse(smoothness: number = 0.1): MousePosition {
  const mousePosition = useMousePosition();
  const [smoothPosition, setSmoothPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const animationFrameRef = useRef<number>(undefined);

  useEffect(() => {
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * smoothness,
        y: prev.y + (mousePosition.y - prev.y) * smoothness,
      }));
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition.x, mousePosition.y, smoothness]);

  return smoothPosition;
}

// Mouse velocity hook
export function useMouseVelocity(): { velocity: MousePosition; speed: number } {
  const mousePosition = useMousePosition();
  const prevPosition = useRef<MousePosition>({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState<MousePosition>({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const vx = mousePosition.x - prevPosition.current.x;
    const vy = mousePosition.y - prevPosition.current.y;
    const newSpeed = Math.sqrt(vx * vx + vy * vy);

    setVelocity({ x: vx, y: vy });
    setSpeed(newSpeed);
    prevPosition.current = mousePosition;
  }, [mousePosition.x, mousePosition.y]);

  return { velocity, speed };
}
