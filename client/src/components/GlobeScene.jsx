import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Torus } from "@react-three/drei";

function RotatingGlobe() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1.2, 64, 64]}>
        <meshStandardMaterial
          color="#1F3A5F"
          emissive="#2D6A4F"
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.3}
        />
      </Sphere>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial color="transparent" opacity={0} side={2} />
      </mesh>
      <Torus args={[1.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#F2A03D" emissive="#F2A03D" emissiveIntensity={0.5} />
      </Torus>
    </group>
  );
}

export default function GlobeScene({ route }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#F2A03D" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#2D6A4F" />
        <RotatingGlobe />
        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}