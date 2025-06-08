import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function GlobalNetworkEarth() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<{ scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, controls: OrbitControls } | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controls.enableZoom = false; // Disable zoom with scroll

    sceneRef.current = { scene, camera, renderer, controls };

    // Earth geometry
    const earthGeometry = new THREE.SphereGeometry(3.5, 64, 64);
    
    // Create dot pattern texture for continents
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (!ctx) return; // Handle case where context is null
    
    // Black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Simplified continent outlines with dots
    ctx.fillStyle = '#ffffff';
    
    // North America
    for (let i = 0; i < 200; i++) {
      const x = 150 + Math.random() * 200;
      const y = 100 + Math.random() * 150;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // South America
    for (let i = 0; i < 120; i++) {
      const x = 200 + Math.random() * 80;
      const y = 250 + Math.random() * 200;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Europe
    for (let i = 0; i < 100; i++) {
      const x = 480 + Math.random() * 100;
      const y = 120 + Math.random() * 80;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Africa
    for (let i = 0; i < 150; i++) {
      const x = 500 + Math.random() * 120;
      const y = 200 + Math.random() * 250;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Asia
    for (let i = 0; i < 300; i++) {
      const x = 650 + Math.random() * 300;
      const y = 80 + Math.random() * 200;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Australia
    for (let i = 0; i < 80; i++) {
      const x = 850 + Math.random() * 100;
      const y = 350 + Math.random() * 80;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    const earthTexture = new THREE.CanvasTexture(canvas);
    const earthMaterial = new THREE.MeshBasicMaterial({
      map: earthTexture,
      transparent: true,
      opacity: 0.8
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;

    // Atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(4.0, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(1.0, 0.4, 0.1, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Outer glow
    const outerGlowGeometry = new THREE.SphereGeometry(4.8, 32, 32);
    const outerGlowMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(1.0, 0.3, 0.0, 0.3) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    
    const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
    scene.add(outerGlow);

    // Stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const positions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.8
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Camera position
    camera.position.z = 8;
    camera.position.y = 1;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.001; // Slower automatic rotation
      }
      controls.update(); // Required for damping
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      controls.dispose(); // Dispose controls
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0" />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 pointer-events-none">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            <span className="block">A truly global network</span>
            <span className="block">for lightning-fast inference</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed animate-fade-in-up animation-delay-500">
            <span className="block">Global global network consists of more than 160 locations,</span>
            <span className="block">allowing you to reach your users anywhere in the world.</span>
          </p>
        </div>
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}