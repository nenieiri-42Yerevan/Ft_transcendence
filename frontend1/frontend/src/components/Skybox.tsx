import { useThree } from "@react-three/fiber";
import * as Three from "three";


// Loads the skybox texture and applies it to the scene.
const SkyBox = () => {
  const { scene } = useThree();
  const loader = new Three.CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  loader.setPath("../src/");
  const texture = loader.load([
    "assets/skybox/front.jpg",
    "assets/skybox/back.jpg",
    "assets/skybox/top.jpg",
    "assets/skybox/bottom.jpg",
    "assets/skybox/left.jpg",
    "assets/skybox/right.jpg",
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
};

export default SkyBox;