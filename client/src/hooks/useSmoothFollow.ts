import { useRef, useCallback } from 'react';
import * as THREE from 'three';

interface SmoothFollowConfig {
  springForce?: number;
  dampingFactor?: number;
  maxVelocity?: number;
}

interface SmoothFollowState {
  current: { x: number; y: number };
  velocity: { x: number; y: number };
}

export function useSmoothFollow(config: SmoothFollowConfig = {}) {
  const {
    springForce = 0.08,
    dampingFactor = 0.92,
    maxVelocity = 0.1,
  } = config;

  const state = useRef<SmoothFollowState>({
    current: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  });

  const update = useCallback((targetX: number, targetY: number): { x: number; y: number } => {
    const dx = targetX - state.current.current.x;
    const dy = targetY - state.current.current.y;

    state.current.velocity.x += dx * springForce;
    state.current.velocity.y += dy * springForce;

    state.current.velocity.x = THREE.MathUtils.clamp(
      state.current.velocity.x * dampingFactor,
      -maxVelocity,
      maxVelocity
    );
    state.current.velocity.y = THREE.MathUtils.clamp(
      state.current.velocity.y * dampingFactor,
      -maxVelocity,
      maxVelocity
    );

    state.current.current.x += state.current.velocity.x;
    state.current.current.y += state.current.velocity.y;

    return { ...state.current.current };
  }, [springForce, dampingFactor, maxVelocity]);

  const reset = useCallback(() => {
    state.current = {
      current: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
    };
  }, []);

  return { update, reset, getState: () => state.current };
}

export default useSmoothFollow;
