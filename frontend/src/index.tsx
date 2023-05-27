"use client";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { persistor } from './components/Slices/store';
import { Provider } from 'react-redux';
import { store } from './components/Slices/store';
import { PersistGate } from 'redux-persist/integration/react';
import * as THREE from 'three';

import { ErrorBoundary } from "react-error-boundary";
import { ChatContext } from './components/context/ChatContext';
import {ChatContextProvider} from './components/context/ChatContext';

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
    1000,
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const ShowError = ({ error, resetErrorBoundary }) => {

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const logError = (error: Error, info: { componentStack: string }) => {
  console.log("Error dectected");
  console.log(error);
  console.log("Error details");
  console.log(info);

};

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary
        fallbackRender={ShowError}
        onError={logError}
        onReset={() => window.location.reload()}
      >
        <ChatContextProvider children={undefined}>
          <App />
        </ChatContextProvider>
      </ErrorBoundary>
    </PersistGate>
  </Provider>
  // </React.StrictMode>,
);
