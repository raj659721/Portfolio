import { Suspense, useState, useEffect, Component, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import DeveloperModel from './DeveloperModel';

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

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || 
               canvas.getContext('webgl') || 
               canvas.getContext('experimental-webgl');
    if (!gl) return false;
    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      if (renderer && (renderer.includes('SwiftShader') || renderer.includes('llvmpipe'))) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
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

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        setPosition({ x, y });
      }
    };

    const handleTouchEnd = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
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

function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, 5]} intensity={0.6} />
      <pointLight position={[0, 2, 4]} intensity={0.5} color="#3b82f6" />
      <DeveloperModel mouseX={mouseX} mouseY={mouseY} />
    </>
  );
}

function DeveloperScene() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const mousePosition = useMousePosition();

  useEffect(() => {
    setIsSupported(checkWebGLSupport());
  }, []);

  if (isSupported === null) {
    return <DeveloperSceneFallback />;
  }

  if (!isSupported) {
    return <DeveloperSceneFallback />;
  }

  return (
    <ErrorBoundary fallback={<DeveloperSceneFallback />}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        onCreated={() => {}}
      >
        <Suspense fallback={null}>
          <Scene mouseX={mousePosition.x} mouseY={mousePosition.y} />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}

export default DeveloperScene;
