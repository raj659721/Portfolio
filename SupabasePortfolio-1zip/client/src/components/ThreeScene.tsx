import { useRef, useMemo, Suspense, useState, useEffect, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log('3D Scene error:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.8, 100, 100]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function GeometricShapes() {
  const icosahedronRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const octahedronRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x = t * 0.2;
      icosahedronRef.current.rotation.y = t * 0.3;
      icosahedronRef.current.position.y = Math.sin(t * 0.5) * 0.3 + 2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3;
      torusRef.current.rotation.z = t * 0.2;
      torusRef.current.position.y = Math.cos(t * 0.4) * 0.2 - 1.5;
    }
    if (octahedronRef.current) {
      octahedronRef.current.rotation.y = t * 0.25;
      octahedronRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <>
      <mesh ref={icosahedronRef} position={[3, 2, -2]}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#1e40af"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={torusRef} position={[-3.5, -1.5, -1]}>
        <torusGeometry args={[0.6, 0.2, 16, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={octahedronRef} position={[4, -2, -3]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </>
  );
}

function Particles({ count = 200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 4 + Math.random() * 4;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#60a5fa"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[10, -5, 5]} intensity={0.3} color="#8b5cf6" />
      
      <AnimatedSphere />
      <GeometricShapes />
      <Particles count={150} />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

function FallbackBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" data-testid="fallback-background">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-primary/10 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
    </div>
  );
}

function ThreeCanvas() {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return <FallbackBackground />;
  }

  return (
    <div className="absolute inset-0 -z-10" data-testid="three-scene">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
    </div>
  );
}

function ThreeScene() {
  return (
    <ErrorBoundary fallback={<FallbackBackground />}>
      <ThreeCanvas />
    </ErrorBoundary>
  );
}

export default ThreeScene;
