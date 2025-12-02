import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AnimeDeveloperProps {
  mouseX: number;
  mouseY: number;
}

function AnimeDeveloper({ mouseX, mouseY }: AnimeDeveloperProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);
  const leftPupilRef = useRef<THREE.Group>(null);
  const rightPupilRef = useRef<THREE.Group>(null);
  
  const targetHeadRotation = useRef({ x: 0, y: 0 });
  const currentHeadRotation = useRef({ x: 0, y: 0 });
  const targetEyeRotation = useRef({ x: 0, y: 0 });
  const currentEyeRotation = useRef({ x: 0, y: 0 });
  const breathingPhase = useRef(0);
  const velocity = useRef({ x: 0, y: 0 });

  const materials = useMemo(() => ({
    skin: new THREE.MeshStandardMaterial({
      color: '#d4a574',
      roughness: 0.6,
      metalness: 0.05,
    }),
    skinShadow: new THREE.MeshStandardMaterial({
      color: '#b8896a',
      roughness: 0.7,
      metalness: 0.05,
    }),
    hair: new THREE.MeshStandardMaterial({
      color: '#0a0a0f',
      roughness: 0.9,
      metalness: 0.1,
    }),
    hairHighlight: new THREE.MeshStandardMaterial({
      color: '#1a1a25',
      roughness: 0.8,
      metalness: 0.15,
    }),
    eyeWhite: new THREE.MeshStandardMaterial({
      color: '#f5f5f5',
      roughness: 0.2,
      metalness: 0,
    }),
    iris: new THREE.MeshStandardMaterial({
      color: '#2d4a3d',
      roughness: 0.3,
      metalness: 0.1,
    }),
    pupil: new THREE.MeshStandardMaterial({
      color: '#050505',
      roughness: 0.1,
      metalness: 0.2,
    }),
    eyeReflection: new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#ffffff',
      emissiveIntensity: 0.5,
      roughness: 0.1,
      metalness: 0.3,
    }),
    hoodie: new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      roughness: 0.8,
      metalness: 0.05,
    }),
    hoodieAccent: new THREE.MeshStandardMaterial({
      color: '#2a2a2a',
      roughness: 0.7,
      metalness: 0.1,
    }),
    lips: new THREE.MeshStandardMaterial({
      color: '#c4847a',
      roughness: 0.5,
      metalness: 0,
    }),
    eyebrow: new THREE.MeshStandardMaterial({
      color: '#0a0a0f',
      roughness: 0.8,
      metalness: 0.05,
    }),
  }), []);

  useFrame((state, delta) => {
    const maxHeadRotationY = 0.18;
    const maxHeadRotationX = 0.10;
    const maxEyeRotationY = 0.12;
    const maxEyeRotationX = 0.08;
    
    const clampedMouseY = THREE.MathUtils.clamp(mouseY, -0.8, 0.8);
    
    targetHeadRotation.current.x = THREE.MathUtils.clamp(
      clampedMouseY * 0.12,
      -maxHeadRotationX,
      maxHeadRotationX
    );
    targetHeadRotation.current.y = THREE.MathUtils.clamp(
      mouseX * 0.22,
      -maxHeadRotationY,
      maxHeadRotationY
    );

    targetEyeRotation.current.x = THREE.MathUtils.clamp(
      clampedMouseY * 0.10,
      -maxEyeRotationX,
      maxEyeRotationX
    );
    targetEyeRotation.current.y = THREE.MathUtils.clamp(
      mouseX * 0.15,
      -maxEyeRotationY,
      maxEyeRotationY
    );

    const dampingFactor = 0.92;
    const springForce = 0.08;

    velocity.current.x += (targetHeadRotation.current.x - currentHeadRotation.current.x) * springForce;
    velocity.current.y += (targetHeadRotation.current.y - currentHeadRotation.current.y) * springForce;
    
    velocity.current.x *= dampingFactor;
    velocity.current.y *= dampingFactor;

    currentHeadRotation.current.x += velocity.current.x;
    currentHeadRotation.current.y += velocity.current.y;

    currentEyeRotation.current.x = THREE.MathUtils.lerp(
      currentEyeRotation.current.x,
      targetEyeRotation.current.x,
      0.12
    );
    currentEyeRotation.current.y = THREE.MathUtils.lerp(
      currentEyeRotation.current.y,
      targetEyeRotation.current.y,
      0.12
    );

    breathingPhase.current += delta * 1.2;
    const breathingOffset = Math.sin(breathingPhase.current) * 0.008;
    const breathingScale = 1 + Math.sin(breathingPhase.current) * 0.005;

    if (headRef.current) {
      headRef.current.rotation.x = currentHeadRotation.current.x;
      headRef.current.rotation.y = currentHeadRotation.current.y;
    }

    if (leftPupilRef.current && rightPupilRef.current) {
      const pupilOffsetX = currentEyeRotation.current.y * 0.025;
      const pupilOffsetY = currentEyeRotation.current.x * 0.015;

      leftPupilRef.current.position.x = THREE.MathUtils.lerp(
        leftPupilRef.current.position.x,
        pupilOffsetX,
        0.15
      );
      leftPupilRef.current.position.y = THREE.MathUtils.lerp(
        leftPupilRef.current.position.y,
        pupilOffsetY,
        0.15
      );

      rightPupilRef.current.position.x = THREE.MathUtils.lerp(
        rightPupilRef.current.position.x,
        pupilOffsetX,
        0.15
      );
      rightPupilRef.current.position.y = THREE.MathUtils.lerp(
        rightPupilRef.current.position.y,
        pupilOffsetY,
        0.15
      );
    }

    if (groupRef.current) {
      groupRef.current.position.y = breathingOffset;
      groupRef.current.scale.setScalar(breathingScale);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={1.1}>
      <group ref={headRef}>
        <mesh position={[0, 0.15, 0]} material={materials.skin}>
          <sphereGeometry args={[0.48, 64, 64]} />
        </mesh>

        <mesh position={[0, 0.02, 0.35]} rotation={[-0.1, 0, 0]} material={materials.skin}>
          <boxGeometry args={[0.32, 0.22, 0.25]} />
        </mesh>
        <mesh position={[0, -0.08, 0.38]} rotation={[0.2, 0, 0]} material={materials.skin}>
          <boxGeometry args={[0.28, 0.12, 0.18]} />
        </mesh>

        <mesh position={[-0.22, 0.08, 0.28]} material={materials.skinShadow}>
          <sphereGeometry args={[0.12, 32, 32]} />
        </mesh>
        <mesh position={[0.22, 0.08, 0.28]} material={materials.skinShadow}>
          <sphereGeometry args={[0.12, 32, 32]} />
        </mesh>

        <mesh position={[0, 0.55, -0.05]} material={materials.hair}>
          <sphereGeometry args={[0.46, 64, 64]} />
        </mesh>
        
        <mesh position={[0, 0.48, 0.25]} rotation={[0.4, 0, 0]} material={materials.hair}>
          <boxGeometry args={[0.65, 0.18, 0.35]} />
        </mesh>

        <group position={[0, 0.55, 0.35]}>
          <mesh position={[-0.15, 0, 0]} rotation={[0.3, 0.2, -0.1]} material={materials.hair}>
            <boxGeometry args={[0.12, 0.25, 0.08]} />
          </mesh>
          <mesh position={[0.05, 0.02, 0]} rotation={[0.35, -0.1, 0.05]} material={materials.hairHighlight}>
            <boxGeometry args={[0.14, 0.28, 0.07]} />
          </mesh>
          <mesh position={[0.2, -0.02, 0]} rotation={[0.25, -0.2, 0.1]} material={materials.hair}>
            <boxGeometry args={[0.11, 0.22, 0.08]} />
          </mesh>
          <mesh position={[-0.05, 0.05, 0.02]} rotation={[0.4, 0.1, 0]} material={materials.hairHighlight}>
            <boxGeometry args={[0.08, 0.3, 0.05]} />
          </mesh>
        </group>

        <mesh position={[-0.35, 0.25, 0.1]} material={materials.hair}>
          <sphereGeometry args={[0.2, 32, 32]} />
        </mesh>
        <mesh position={[0.35, 0.25, 0.1]} material={materials.hair}>
          <sphereGeometry args={[0.2, 32, 32]} />
        </mesh>
        <mesh position={[-0.42, 0.15, 0.02]} material={materials.hair}>
          <sphereGeometry args={[0.15, 32, 32]} />
        </mesh>
        <mesh position={[0.42, 0.15, 0.02]} material={materials.hair}>
          <sphereGeometry args={[0.15, 32, 32]} />
        </mesh>

        <mesh position={[0, 0.35, -0.35]} material={materials.hair}>
          <sphereGeometry args={[0.38, 32, 32]} />
        </mesh>
        <mesh position={[0, 0.2, -0.4]} material={materials.hair}>
          <sphereGeometry args={[0.28, 32, 32]} />
        </mesh>

        <group ref={leftEyeRef} position={[-0.14, 0.18, 0.42]}>
          <mesh material={materials.eyeWhite}>
            <sphereGeometry args={[0.072, 32, 32]} />
          </mesh>
          <group ref={leftPupilRef}>
            <mesh position={[0, 0, 0.045]} material={materials.iris}>
              <sphereGeometry args={[0.045, 32, 32]} />
            </mesh>
            <mesh position={[0, 0, 0.06]} material={materials.pupil}>
              <sphereGeometry args={[0.025, 32, 32]} />
            </mesh>
            <mesh position={[0.015, 0.02, 0.068]} material={materials.eyeReflection}>
              <sphereGeometry args={[0.008, 16, 16]} />
            </mesh>
            <mesh position={[-0.008, 0.01, 0.065]} material={materials.eyeReflection}>
              <sphereGeometry args={[0.004, 16, 16]} />
            </mesh>
          </group>
        </group>

        <group ref={rightEyeRef} position={[0.14, 0.18, 0.42]}>
          <mesh material={materials.eyeWhite}>
            <sphereGeometry args={[0.072, 32, 32]} />
          </mesh>
          <group ref={rightPupilRef}>
            <mesh position={[0, 0, 0.045]} material={materials.iris}>
              <sphereGeometry args={[0.045, 32, 32]} />
            </mesh>
            <mesh position={[0, 0, 0.06]} material={materials.pupil}>
              <sphereGeometry args={[0.025, 32, 32]} />
            </mesh>
            <mesh position={[0.015, 0.02, 0.068]} material={materials.eyeReflection}>
              <sphereGeometry args={[0.008, 16, 16]} />
            </mesh>
            <mesh position={[-0.008, 0.01, 0.065]} material={materials.eyeReflection}>
              <sphereGeometry args={[0.004, 16, 16]} />
            </mesh>
          </group>
        </group>

        <mesh position={[-0.14, 0.30, 0.38]} rotation={[0, 0, 0.08]} material={materials.eyebrow}>
          <boxGeometry args={[0.12, 0.018, 0.015]} />
        </mesh>
        <mesh position={[-0.19, 0.29, 0.37]} rotation={[0, 0, 0.3]} material={materials.eyebrow}>
          <boxGeometry args={[0.04, 0.02, 0.012]} />
        </mesh>
        <mesh position={[0.14, 0.30, 0.38]} rotation={[0, 0, -0.08]} material={materials.eyebrow}>
          <boxGeometry args={[0.12, 0.018, 0.015]} />
        </mesh>
        <mesh position={[0.19, 0.29, 0.37]} rotation={[0, 0, -0.3]} material={materials.eyebrow}>
          <boxGeometry args={[0.04, 0.02, 0.012]} />
        </mesh>

        <mesh position={[0, 0.05, 0.45]} rotation={[0.15, 0, 0]} material={materials.skin}>
          <boxGeometry args={[0.06, 0.11, 0.08]} />
        </mesh>
        <mesh position={[0, 0.01, 0.49]} material={materials.skinShadow}>
          <sphereGeometry args={[0.032, 16, 16]} />
        </mesh>

        <mesh position={[0, -0.08, 0.43]} rotation={[0.05, 0, 0]} material={materials.lips}>
          <capsuleGeometry args={[0.012, 0.06, 8, 16]} />
        </mesh>
        <mesh position={[0, -0.095, 0.42]} rotation={[0.1, 0, 0]} material={materials.skinShadow}>
          <capsuleGeometry args={[0.008, 0.04, 8, 16]} />
        </mesh>

        <mesh position={[-0.38, 0.1, 0.15]} material={materials.skin}>
          <sphereGeometry args={[0.08, 32, 32]} />
        </mesh>
        <mesh position={[0.38, 0.1, 0.15]} material={materials.skin}>
          <sphereGeometry args={[0.08, 32, 32]} />
        </mesh>

        <mesh position={[0, -0.28, 0.08]} material={materials.skin}>
          <cylinderGeometry args={[0.14, 0.16, 0.12, 32]} />
        </mesh>
      </group>

      <mesh position={[0, -0.52, 0]} material={materials.hoodie}>
        <cylinderGeometry args={[0.28, 0.42, 0.5, 32]} />
      </mesh>
      <mesh position={[0, -0.45, 0.15]} material={materials.hoodie}>
        <sphereGeometry args={[0.22, 32, 32]} />
      </mesh>

      <mesh position={[0, -0.32, 0.12]} rotation={[-0.3, 0, 0]} material={materials.hoodieAccent}>
        <boxGeometry args={[0.18, 0.08, 0.02]} />
      </mesh>

      <mesh position={[-0.22, -0.42, 0.08]} material={materials.hoodie}>
        <boxGeometry args={[0.08, 0.16, 0.02]} />
      </mesh>
      <mesh position={[0.22, -0.42, 0.08]} material={materials.hoodie}>
        <boxGeometry args={[0.08, 0.16, 0.02]} />
      </mesh>

      <mesh position={[0, -0.38, 0.22]} rotation={[-0.5, 0, 0]} material={materials.hoodieAccent}>
        <torusGeometry args={[0.08, 0.012, 8, 32, Math.PI]} />
      </mesh>
    </group>
  );
}

export default AnimeDeveloper;
