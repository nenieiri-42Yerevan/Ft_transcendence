import React from 'react';

import { Canvas } from '@react-three/fiber';
import SkyBox from './Skybox';
import Scene from './Scene';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

// import { Box, Plane } from "@react-three/drei";
// import { DoubleSide, Mesh } from "three";
// import { Sky } from "@react-three/drei";

// function Box(props:any) {
//   const mesh = useRef<Mesh>(null!);

//   // mesh.current.rotation.x += Math.PI / 2;
//   // useFrame((state, delta) => (mesh.current.rotation.z += delta))

//   return (
//      <mesh castShadow receiveShadow {...props} ref={mesh} position={[0,0.5,0]}>
//         <boxGeometry args={[0.5, 0.8, 0.8]} />
//         <meshBasicMaterial attach="material" color={"red"} />
//      </mesh>
//   );
// }

// function Plane(props:any) {
//   const mesh = useRef<Mesh>(null!);

//   // mesh.current.rotation.x += Math.PI / 2;
//   // useFrame((state, delta) => (mesh.current.rotation.z += delta))

//   return (
//     <mesh castShadow receiveShadow {...props} ref={mesh} rotation={[-Math.PI/2, 0, 0]}>
//       <planeGeometry args={[7, 7]}/>
//       <meshBasicMaterial color="grey" side={DoubleSide} />
//     </mesh>
//   );
// }

const Background = () => {
  return (
    <>
      <Canvas
        className="scene"
        // colorManagement
        shadows
        // shadowMap
        camera={{ position: [15, 15, 15], fov: 60 }}
      >
        <SkyBox />

        {/* <ambientLight color="#ffffff" intensity={0.1} /> */}
        {/* <spotLight
          position={[60, 5  , 2]}
          color="#ffffff"
          intensity={2.5}
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          castShadow
        /> */}
        <directionalLight
          position={[60, 5, 2]}
          castShadow
          color={'#ffffff'}
          intensity={1.0}
        />

        <Scene />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </>
  );
};

export default Background;
