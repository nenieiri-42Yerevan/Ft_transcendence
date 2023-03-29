import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { persistor } from './components/Slices/store'
import { Provider } from 'react-redux';
import {store} from './components/Slices/store'
import {PersistGate} from 'redux-persist/integration/react'
import * as THREE from 'three';

interface ErrorBoundaryState {
    hasError: boolean;
}
interface ErrorBoundaryProps {
    children: React.ReactNode;
  }


let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.Camera;
let mesh: THREE.Mesh;

function init() {
  const container = document.getElementById('box');
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    1,
    1000
  );
  camera.position.z = 5;

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Check if the WebGL context has been lost
  if (renderer.getContext().isContextLost()) {
    // Recreate the renderer and re-add the mesh to the scene
    init();
    return;
  }

  // Render the scene
  renderer.render(scene, camera);

  // Rotate the mesh
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
}

init();

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: Error) {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Error:', error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children;
    }
  }


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading = {null} persistor = {persistor}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
      </PersistGate> 
    </Provider>
  </React.StrictMode>
);