import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface AnimeCharacterModelProps {
  mouseX: number;
  mouseY: number;
}

function AnimeCharacterModel({ mouseX, mouseY }: AnimeCharacterModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isReady, setIsReady] = useState(false);
  
  const { scene } = useGLTF('/assets/anime_character.glb');
  
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const breathingPhase = useRef(0);
  const baseScale = useRef(1);

  useEffect(() => {
    if (scene && groupRef.current) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.2 / maxDim;
      baseScale.current = scale;
      
      groupRef.current.scale.setScalar(scale);
      groupRef.current.position.set(
        -center.x * scale, 
        -center.y * scale - 0.2, 
        -center.z * scale
      );
      
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
      setIsReady(true);
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current || !isReady) return;

    const maxRotationY = 0.35;
    const maxRotationX = 0.18;
    
    const clampedMouseY = THREE.MathUtils.clamp(mouseY, -0.8, 0.8);
    
    targetRotation.current.x = THREE.MathUtils.clamp(
      clampedMouseY * 0.18,
      -maxRotationX,
      maxRotationX
    );
    targetRotation.current.y = THREE.MathUtils.clamp(
      mouseX * 0.4,
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

useGLTF.preload('/assets/anime_character.glb');

export default AnimeCharacterModel;
