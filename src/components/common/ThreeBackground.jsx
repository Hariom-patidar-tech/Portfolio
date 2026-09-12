import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 1. Interactive 3D Particles Neural Network Cloud
    const particleCount = 220;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color('#0f172a'), // Dark Slate
      new THREE.Color('#3B82F6'), // Blue
      new THREE.Color('#8B5CF6'), // Purple
      new THREE.Color('#EC4899'), // Pink
      new THREE.Color('#10B981'), // Emerald
      new THREE.Color('#F59E0B'), // Amber
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const color = palette[i % palette.length];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.55,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.NormalBlending,
    });

    const pointCloud = new THREE.Points(geometry, pMaterial);
    scene.add(pointCloud);

    // 2. 3D Floating Geometry Nodes (Icosahedron, Torus, Octahedron)
    const geoGroup = new THREE.Group();

    // 3D Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(3.8, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    icosahedron.position.set(-14, 8, -5);
    geoGroup.add(icosahedron);

    // 3D Torus Knot
    const torusGeo = new THREE.TorusKnotGeometry(2.5, 0.6, 100, 16);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    torusKnot.position.set(15, -6, -8);
    geoGroup.add(torusKnot);

    // 3D Octahedron
    const octGeo = new THREE.OctahedronGeometry(2.2, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const octahedron = new THREE.Mesh(octGeo, octMat);
    octahedron.position.set(11, 12, -10);
    geoGroup.add(octahedron);

    scene.add(geoGroup);

    // 3. Mouse Interaction & Camera Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate Point Cloud & Geometries
      pointCloud.rotation.y = elapsedTime * 0.04;
      pointCloud.rotation.x = elapsedTime * 0.02;

      icosahedron.rotation.x = elapsedTime * 0.2;
      icosahedron.rotation.y = elapsedTime * 0.3;

      torusKnot.rotation.x = elapsedTime * 0.25;
      torusKnot.rotation.z = elapsedTime * 0.15;

      octahedron.rotation.y = elapsedTime * 0.35;

      // Parallax Camera movement
      camera.position.x = mouseX * 3.5;
      camera.position.y = -mouseY * 3.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.9 }}
    />
  );
}
