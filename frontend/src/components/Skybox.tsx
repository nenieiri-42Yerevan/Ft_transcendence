import { useThree } from '@react-three/fiber';
import * as Three from 'three';

// Loads the skybox texture and applies it to the scene.
const SkyBox = () => {
  const { scene } = useThree();
  const loader = new Three.CubeTextureLoader();

  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  // loader.setCrossOrigin('*');
  loader.setPath('/assets/skybox');
  const texture = loader.load([
    '/front.jpg',
    '/back.jpg',
    '/top.jpg',
    '/bottom.jpg',
    '/left.jpg',
    '/right.jpg',
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
};

export default SkyBox;
