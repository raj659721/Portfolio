import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface DeveloperModelProps {
  mouseX: number;
  mouseY: number;
}

function DeveloperModel({ mouseX, mouseY }: DeveloperModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftPupilGroupRef = useRef<THREE.Group>(null);
  const rightPupilGroupRef = useRef<THREE.Group>(null);
  
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  const materials = useMemo(() => ({
    skin: new THREE.MeshStandardMaterial({
      color: '#e8beac',
      roughness: 0.7,
      metalness: 0.1,
    }),
    hair: new THREE.MeshStandardMaterial({
      color: '#1a1a2e',
      roughness: 0.8,
      metalness: 0.2,
    }),
    eyeWhite: new THREE.MeshStandardMaterial({
      color: '#ffffff',
      roughness: 0.3,
      metalness: 0,
    }),
    pupil: new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      roughness: 0.2,
      metalness: 0.3,
    }),
    iris: new THREE.MeshStandardMaterial({
      color: '#4a3728',
      roughness: 0.4,
      metalness: 0.1,
    }),
    glasses: new THREE.MeshStandardMaterial({
      color: '#2a2a3e',
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.9,
    }),
    glassLens: new THREE.MeshStandardMaterial({
      color: '#88ccff',
      roughness: 0.1,
      metalness: 0.3,
      transparent: true,
      opacity: 0.15,
    }),
    shirt: new THREE.MeshStandardMaterial({
      color: '#3b82f6',
      roughness: 0.6,
      metalness: 0.1,
    }),
    lips: new THREE.MeshStandardMaterial({
      color: '#c4847a',
      roughness: 0.5,
      metalness: 0,
    }),
  }), []);

  useFrame(() => {
    const maxRotation = 0.15;
    targetRotation.current.x = THREE.MathUtils.clamp(mouseY * 0.2, -maxRotation, maxRotation);
    targetRotation.current.y = THREE.MathUtils.clamp(mouseX * 0.25, -maxRotation * 1.5, maxRotation * 1.5);

    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      targetRotation.current.x,
      0.08
    );
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      targetRotation.current.y,
      0.08
    );

    if (leftPupilGroupRef.current && rightPupilGroupRef.current) {
      const pupilOffset = 0.03;
      const targetPupilX = THREE.MathUtils.clamp(mouseX * pupilOffset, -0.025, 0.025);
      const targetPupilY = THREE.MathUtils.clamp(mouseY * pupilOffset, -0.02, 0.02);

      leftPupilGroupRef.current.position.x = THREE.MathUtils.lerp(
        leftPupilGroupRef.current.position.x,
        -0.15 + targetPupilX,
        0.1
      );
      leftPupilGroupRef.current.position.y = THREE.MathUtils.lerp(
        leftPupilGroupRef.current.position.y,
        0.15 + targetPupilY,
        0.1
      );

      rightPupilGroupRef.current.position.x = THREE.MathUtils.lerp(
        rightPupilGroupRef.current.position.x,
        0.15 + targetPupilX,
        0.1
      );
      rightPupilGroupRef.current.position.y = THREE.MathUtils.lerp(
        rightPupilGroupRef.current.position.y,
        0.15 + targetPupilY,
        0.1
      );
    }

    if (groupRef.current) {
      groupRef.current.rotation.x = currentRotation.current.x;
      groupRef.current.rotation.y = currentRotation.current.y;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
        <mesh position={[0, 0.1, 0]} material={materials.skin}>
          <sphereGeometry args={[0.5, 32, 32]} />
        </mesh>

        <mesh position={[0, 0.55, -0.1]} material={materials.hair}>
          <sphereGeometry args={[0.42, 32, 32]} />
        </mesh>
        
        <mesh position={[0, 0.45, 0.15]} rotation={[0.3, 0, 0]} material={materials.hair}>
          <boxGeometry args={[0.7, 0.15, 0.3]} />
        </mesh>
        
        <mesh position={[-0.35, 0.2, 0.2]} material={materials.hair}>
          <sphereGeometry args={[0.18, 16, 16]} />
        </mesh>
        <mesh position={[0.35, 0.2, 0.2]} material={materials.hair}>
          <sphereGeometry args={[0.18, 16, 16]} />
        </mesh>

        <mesh ref={leftEyeRef} position={[-0.15, 0.15, 0.4]} material={materials.eyeWhite}>
          <sphereGeometry args={[0.1, 32, 32]} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.15, 0.15, 0.4]} material={materials.eyeWhite}>
          <sphereGeometry args={[0.1, 32, 32]} />
        </mesh>

        <group ref={leftPupilGroupRef} position={[-0.15, 0.15, 0.48]}>
          <mesh material={materials.iris}>
            <sphereGeometry args={[0.055, 32, 32]} />
          </mesh>
          <mesh position={[0, 0, 0.02]} material={materials.pupil}>
            <sphereGeometry args={[0.03, 32, 32]} />
          </mesh>
          <mesh position={[0.015, 0.015, 0.03]} material={materials.eyeWhite}>
            <sphereGeometry args={[0.008, 16, 16]} />
          </mesh>
        </group>
        
        <group ref={rightPupilGroupRef} position={[0.15, 0.15, 0.48]}>
          <mesh material={materials.iris}>
            <sphereGeometry args={[0.055, 32, 32]} />
          </mesh>
          <mesh position={[0, 0, 0.02]} material={materials.pupil}>
            <sphereGeometry args={[0.03, 32, 32]} />
          </mesh>
          <mesh position={[0.015, 0.015, 0.03]} material={materials.eyeWhite}>
            <sphereGeometry args={[0.008, 16, 16]} />
          </mesh>
        </group>

        <mesh position={[-0.15, 0.28, 0.35]} rotation={[0, 0, 0.1]} material={materials.hair}>
          <boxGeometry args={[0.14, 0.025, 0.02]} />
        </mesh>
        <mesh position={[0.15, 0.28, 0.35]} rotation={[0, 0, -0.1]} material={materials.hair}>
          <boxGeometry args={[0.14, 0.025, 0.02]} />
        </mesh>

        <mesh position={[-0.15, 0.15, 0.48]} material={materials.glasses}>
          <torusGeometry args={[0.12, 0.012, 16, 32]} />
        </mesh>
        <mesh position={[0.15, 0.15, 0.48]} material={materials.glasses}>
          <torusGeometry args={[0.12, 0.012, 16, 32]} />
        </mesh>
        
        <mesh position={[-0.15, 0.15, 0.47]} material={materials.glassLens}>
          <circleGeometry args={[0.1, 32]} />
        </mesh>
        <mesh position={[0.15, 0.15, 0.47]} material={materials.glassLens}>
          <circleGeometry args={[0.1, 32]} />
        </mesh>
        
        <mesh position={[0, 0.15, 0.47]} material={materials.glasses}>
          <boxGeometry args={[0.06, 0.01, 0.01]} />
        </mesh>
        
        <mesh position={[-0.35, 0.15, 0.35]} rotation={[0, 0.4, 0]} material={materials.glasses}>
          <boxGeometry args={[0.15, 0.01, 0.01]} />
        </mesh>
        <mesh position={[0.35, 0.15, 0.35]} rotation={[0, -0.4, 0]} material={materials.glasses}>
          <boxGeometry args={[0.15, 0.01, 0.01]} />
        </mesh>

        <mesh position={[0, 0.02, 0.42]} rotation={[0.2, 0, 0]} material={materials.skin}>
          <boxGeometry args={[0.08, 0.12, 0.1]} />
        </mesh>
        <mesh position={[0, -0.02, 0.48]} material={materials.skin}>
          <sphereGeometry args={[0.045, 16, 16]} />
        </mesh>

        <mesh position={[0, -0.12, 0.38]} rotation={[0.1, 0, 0]} material={materials.lips}>
          <capsuleGeometry args={[0.02, 0.08, 8, 16]} />
        </mesh>

        <mesh position={[0, -0.45, 0]} material={materials.shirt}>
          <cylinderGeometry args={[0.25, 0.35, 0.4, 32]} />
        </mesh>
        
        <mesh position={[0, -0.35, 0.12]} material={materials.shirt}>
          <sphereGeometry args={[0.18, 16, 16]} />
        </mesh>

        <mesh position={[0, -0.38, 0.08]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.12, 0.08, 0.02]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.5} />
        </mesh>
        
        <mesh position={[0, -0.38, 0.095]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.08, 0.05, 0.01]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

export default DeveloperModel;
