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

      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim;
      baseScale.current = scale;
      
      groupRef.current.scale.setScalar(scale);
      groupRef.current.position.set(
        -center.x * scale, 
        -center.y * scale - 0.3, 
        -center.z * scale
      );
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

function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 8]} intensity={2} />
      <directionalLight position={[-5, 3, 5]} intensity={1} />
      <pointLight position={[0, 2, 4]} intensity={0.8} color="#6366f1" />
      <Suspense fallback={<LoadingSpinner />}>
        <CharacterModel mouseX={mouseX} mouseY={mouseY} />
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
