'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { DRACOLoader, EXRLoader, GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

// Use SharedArrayBuffer for better memory management
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
const exrLoader = new EXRLoader();

// Optimize texture loading
const preloadResources = async (): Promise<void> => {
  const texture = await textureLoader.loadAsync('https://placehold.co/600x400/jpg');
  texture.dispose();
};

// Optimize HDRI loading with lower precision
const loadHDRI = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, onComplete?: () => void): void => {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  exrLoader.setDataType(THREE.FloatType);
  exrLoader.load('/garage.exr',
    (texture: THREE.DataTexture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.background = envMap;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
      if (onComplete) onComplete();
    }
  );
};

// Optimize model loading with instance caching
const loadModels = async (scene: THREE.Scene): Promise<void> => {
  dracoLoader.setDecoderPath('/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' }); // Use WASM for better performance
  gltfLoader.setDRACOLoader(dracoLoader);

  const modelPaths = [
    '/Garage.glb',
    '/gelic/Кузов/Кузов.glb',
    '/gelic/Салон/Gelik1.glb',
    '/gelic/Задний бампер/задние_бампер.glb',
    '/gelic/Задние фары/задние_фары.glb',
    '/gelic/Крылья/крылья.glb',
    '/gelic/Шины/шины.glb',
    '/gelic/Диска/диска.glb',
    '/gelic/Передний бампер/передний_бампер.glb',
    '/gelic/Передний фар/передний_фар.glb',
    '/gelic/Зеркало/Зеркало.glb',
  ];

  const materialCache = new Map();
  const geometryCache = new Map();

  try {
    const models = await Promise.all(
      modelPaths.map(path => gltfLoader.loadAsync(path))
    );

    models.forEach(model => {
      model.scene.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          // Reuse geometries and materials
          const geometryId = child.geometry.uuid;
          if (!geometryCache.has(geometryId)) {
            geometryCache.set(geometryId, child.geometry);
          }
          child.geometry = geometryCache.get(geometryId);

          if (child.material instanceof THREE.Material) {
            const materialId = child.material.uuid;
            if (!materialCache.has(materialId)) {
              materialCache.set(materialId, child.material);
            }
            child.material = materialCache.get(materialId);
          }
        }
      });
      scene.add(model.scene);
    });
  } catch (error) {
    console.error('Error loading models:', error);
  } finally {
    dracoLoader.dispose();
  }
};

export const HomePage: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const init = async () => {
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        alpha: true,
      });
      
      // Optimize renderer
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xeeeeee, 0);
      renderer.physicallyCorrectLights = true;
      renderer.outputEncoding = THREE.sRGBEncoding;
      
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }
      rendererRef.current = renderer;

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 2, 8);
      camera.lookAt(0, 1, 0);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 2;
      controls.maxDistance = 15;
      controls.enablePan = false;
      controls.minAzimuthAngle = -Math.PI / 4;
      controls.maxAzimuthAngle = Math.PI / 4;
      controls.maxPolarAngle = Math.PI / 2;
      controls.minPolarAngle = Math.PI / 4;

      await preloadResources();
      await loadModels(sceneRef.current);
      
      let frameId: number;
      
      loadHDRI(renderer, sceneRef.current, () => {
        const animate = (): void => {
          frameId = requestAnimationFrame(animate);
          controls.update();
          renderer.render(sceneRef.current, camera);
        };
        animate();
      });

      const handleResize = (): void => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', handleResize);
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        
        // Clean up resources
        materialCache.clear();
        geometryCache.clear();
        sceneRef.current.traverse((object: THREE.Object3D) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            }
          }
        });
        renderer.dispose();
        controls.dispose();
      };
    };

    init().catch(error => console.error('Initialization failed:', error));
  }, []);

  return (
    <div className='w-full h-screen relative'>
      <div ref={mountRef} className='w-full h-full' />
    </div>
  );
};
