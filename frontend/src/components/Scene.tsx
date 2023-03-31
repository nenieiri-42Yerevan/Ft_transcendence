import React, { useRef } from 'react';
// import { useFrame } from "@react-three/fiber";
import { Box, Plane } from '@react-three/drei';

const Scene = () => {
  const boxRef = useRef(null);
  //   useFrame(() => {
  //     boxRef.current.rotation.y += 0.001;
  //     boxRef.current.rotation.x += 0.001;
  //     boxRef.current.rotation.z += 0.001;
  //   });
  return (
    <group>
      <Box
        ref={boxRef}
        castShadow
        receiveShadow
        position={[0, 0.5, 0]}
        args={[3, 3, 3]}
      >
        <meshStandardMaterial attach="material" color="#C42727" />
      </Box>

      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        args={[50, 50]}
      >
        <meshStandardMaterial attach="material" color="#ffffff" />
        {/* <shadowMaterial attach="material" transparent opacity={0.4} /> */}
      </Plane>

      {/* <Plane
        receiveShadow
        rotation={[0, 0, 0]}
        position={[0, 5.5, -7.5]}
        args={[15, 15]}
      >
        <meshStandardMaterial attach="material" color="#ffffff" />
      </Plane>

      <Plane
        receiveShadow
        rotation={[0, Math.PI / 2, 0]}
        position={[-7.5, 5.5, 0]}
        args={[15, 15]}
      >
        <meshStandardMaterial attach="material" color="#ffffff" />
      </Plane> */}
    </group>
  );
};

export default Scene;
