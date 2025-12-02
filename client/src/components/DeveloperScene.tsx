import { Suspense, useState, useEffect, Component, ReactNode, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

function DeveloperSceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-transparent" />
      </div>
    </div>
  );
}

// NOTE: This component previously rendered the imported GLB character.
// The user requested to remove the character, so it is no longer used.
// Keeping it for now in case you want to restore it later.
function CharacterModel({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/assets/anime_character.glb');
  const { invalidate } = useThree();
  
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const breathingPhase = useRef(0);
  const baseScale = useRef(1);
  const initialized = useRef(false);

  useEffect(() => {
    if (scene && groupRef.current && !initialized.current) {
      // Enable proper shadows/material updates but keep the original model proportions.
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.needsUpdate = true);
            } else {
              child.material.needsUpdate = true;
            }
          }
        }
      });

      // Use a fixed, uniform scale and position so the character is not squeezed/distorted
      // compared to how it looks in the original GLB viewer.
      const scale = 1.4;
      baseScale.current = scale;

      groupRef.current.scale.setScalar(scale);
      groupRef.current.position.set(0, -0.9, 0);

      // If the character faces the wrong way, you can tweak this rotation.
      // For now we keep x and z as-is and do a gentle Y rotation.
      groupRef.current.rotation.set(0, Math.PI, 0);

      initialized.current = true;
      invalidate();
    }
  }, [scene, invalidate]);

  useFrame((_, delta) => {
    if (!groupRef.current || !initialized.current) return;

    const maxRotationY = 0.4;
    const maxRotationX = 0.2;
    
    const clampedMouseY = THREE.MathUtils.clamp(mouseY, -0.8, 0.8);
    
    targetRotation.current.x = THREE.MathUtils.clamp(
      clampedMouseY * 0.2,
      -maxRotationX,
      maxRotationX
    );
    targetRotation.current.y = THREE.MathUtils.clamp(
      mouseX * 0.45,
      -maxRotationY,
      maxRotationY
    );

    const dampingFactor = 0.92;
    const springForce = 0.06;

    velocity.current.x += (targetRotation.current.x - currentRotation.current.x) * springForce;
    velocity.current.y += (targetRotation.current.y - currentRotation.current.y) * springForce;
    
    velocity.current.x *= dampingFactor;
    velocity.current.y *= dampingFactor;

    currentRotation.current.x += velocity.current.x;
    currentRotation.current.y += velocity.current.y;

    breathingPhase.current += delta * 1.2;
    const breathingScale = baseScale.current * (1 + Math.sin(breathingPhase.current) * 0.003);

    groupRef.current.rotation.x = currentRotation.current.x;
    groupRef.current.rotation.y = currentRotation.current.y;
    groupRef.current.scale.setScalar(breathingScale);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingSpinner() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[0.5, 0.1, 16, 32]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  );
}

function DeveloperSphere({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (sphereRef.current) {
      const tiltX = THREE.MathUtils.clamp(mouseY * 0.25, -0.25, 0.25);
      const tiltY = THREE.MathUtils.clamp(mouseX * 0.35, -0.35, 0.35);

      sphereRef.current.rotation.y = t * 0.2 + tiltY;
      sphereRef.current.rotation.x = Math.sin(t * 0.3) * 0.1 + tiltX;
      sphereRef.current.position.y = Math.sin(t * 0.6) * 0.06 - 0.08;
      sphereRef.current.position.x = THREE.MathUtils.lerp(
        sphereRef.current.position.x,
        mouseX * 0.25,
        0.08
      );
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshStandardMaterial
        color="#60a5fa"
        roughness={0.2}
        metalness={0.4}
        wireframe
      />
    </mesh>
  );
}

function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 6]} intensity={1.4} />
      <directionalLight position={[-3, 4, -2]} intensity={0.6} />
      <pointLight position={[0, 1.5, 3]} intensity={0.7} color="#60a5fa" distance={10} />
      <Suspense fallback={<LoadingSpinner />}>
        <DeveloperSphere mouseX={mouseX} mouseY={mouseY} />
      </Suspense>
    </>
  );
}

function DeveloperScene() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const mousePosition = useMousePosition();

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      setIsSupported(!!gl);
    } catch {
      setIsSupported(false);
    }
  }, []);

  if (isSupported === null || !isSupported) {
    return <DeveloperSceneFallback />;
  }

  return (
    <ErrorBoundary fallback={<DeveloperSceneFallback />}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Scene mouseX={mousePosition.x} mouseY={mousePosition.y} />
      </Canvas>
    </ErrorBoundary>
  );
}

useGLTF.preload('/assets/anime_character.glb');

export default DeveloperScene;
