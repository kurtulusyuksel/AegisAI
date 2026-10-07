import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CyberDefenseCore3DProps {
  isCompromised: boolean;
  riskScore: number;
  criticalCount: number;
}

export const CyberDefenseCore3D: React.FC<CyberDefenseCore3DProps> = ({
  isCompromised,
  riskScore,
  criticalCount
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isCompromisedRef = useRef(isCompromised);
  isCompromisedRef.current = isCompromised;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. İç Çekirdek (Icosahedron Core)
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: isCompromised ? 0xf43f5e : 0x06b6d4,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
      emissive: isCompromised ? 0xe11d48 : 0x0891b2,
      emissiveIntensity: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 2. İç Küre (İç Parıltı)
    const innerGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: isCompromised ? 0x9f1239 : 0x0e7490,
      transparent: true,
      opacity: 0.4
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    // 3. Yörünge Halkaları (Orbital Shield Rings)
    const ringMat = new THREE.MeshBasicMaterial({
      color: isCompromised ? 0xfb7185 : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.3, 0.04, 16, 64), ringMat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.04, 16, 64), ringMat);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // 4. Işıklandırma
    const pointLight = new THREE.PointLight(isCompromised ? 0xf43f5e : 0x06b6d4, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Fare ile döndürme etkileşimi
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      coreMesh.rotation.y += deltaX * 0.01;
      coreMesh.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animasyon Döngüsü
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      const compromised = isCompromisedRef.current;
      const targetColor = compromised ? new THREE.Color(0xf43f5e) : new THREE.Color(0x06b6d4);
      const targetEmissive = compromised ? new THREE.Color(0xe11d48) : new THREE.Color(0x0891b2);

      coreMat.color.lerp(targetColor, 0.08);
      coreMat.emissive.lerp(targetEmissive, 0.08);
      ringMat.color.lerp(compromised ? new THREE.Color(0xfb7185) : new THREE.Color(0x38bdf8), 0.08);

      const rotSpeed = compromised ? 1.8 : 0.8;
      coreMesh.rotation.y += 0.008 * rotSpeed;
      coreMesh.rotation.x += 0.005 * rotSpeed;

      ring1.rotation.z += 0.012 * rotSpeed;
      ring2.rotation.x += 0.014 * rotSpeed;

      const scalePulse = 1 + Math.sin(elapsed * (compromised ? 6 : 2.5)) * (compromised ? 0.08 : 0.03);
      innerSphere.scale.set(scalePulse, scalePulse, scalePulse);

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 260;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[260px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-[#0a1024]/80 to-[#070b16]/90 border border-slate-800">
      
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Siber HUD Tepe Etiketi */}
      <div className="absolute top-3 left-4 flex items-center space-x-2 pointer-events-none">
        <span className={`w-2 h-2 rounded-full ${isCompromised ? 'bg-rose-500 animate-ping' : 'bg-cyan-400'}`} />
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
          3D Siber Savunma Çekirdeği (Holo-Core)
        </span>
      </div>

      {/* Siber HUD Durum Göstergesi */}
      <div className="absolute bottom-3 right-4 pointer-events-none text-right font-mono">
        <div className={`text-xs font-black tracking-tight ${isCompromised ? 'text-rose-400' : 'text-cyan-400'}`}>
          {isCompromised ? `TEHDİT SEVİYESİ: KRİTİK (${criticalCount} AÇIK)` : 'KALKAN DURUMU: %100 KORUMALI'}
        </div>
        <div className="text-[10px] text-slate-500">
          Döndürmek için fareyle sürükleyin
        </div>
      </div>

    </div>
  );
};
