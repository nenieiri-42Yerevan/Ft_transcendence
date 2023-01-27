import { useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";


// Loads the skybox texture and applies it to the scene.
const SkyBox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "/skybox/front.jpg",
    "/skybox/back.jpg",
    "/skybox/top.jpg",
    "/skybox/bottom.jpg",
    "/skybox/left.jpg",
    "/skybox/right.jpg",
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
};

export default SkyBox;