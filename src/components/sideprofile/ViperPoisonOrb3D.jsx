import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

const PLASMA_VERTEX_SHADER = `
  uniform float uTime;
  uniform float uSurge;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vLocalPos;
  varying float vDisplacement;

  // Compact 3D Simplex Noise (Ashima / Gustavson)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vLocalPos = position;
    float speed = 0.45 + uSurge * 0.55;
    float amp = 0.032 + uSurge * 0.042;
    float n1 = snoise(position * 1.85 + vec3(uTime * speed, -uTime * speed * 0.7, uTime * 0.3));
    float n2 = snoise(position * 3.4 - vec3(0.0, uTime * speed * 1.1, uTime * 0.5)) * 0.5;
    float disp = (n1 + n2) * amp;

    vDisplacement = n1 + n2;
    vec3 displaced = position + normal * disp;

    vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
    vWorldPos = worldPosition.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const PLASMA_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uSurge;
  uniform float uFuel;
  uniform float uLightMode;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vLocalPos;
  varying float vDisplacement;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0, 0, 0)), hash(i + vec3(1, 0, 0)), f.x),
          mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
          mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.05 + vec3(1.7, 9.2, 4.3);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.35);

    float flowSpeed = 0.38 + uSurge * 0.65;
    vec3 samplePos = vLocalPos * 2.15 + vec3(uTime * flowSpeed * 0.4, -uTime * flowSpeed, uTime * 0.25);
    float q = fbm(samplePos);
    float pattern = fbm(samplePos + vec3(q * 1.6, -q * 1.2, uTime * 0.15));

    // Swirling toxic veins
    float veins = smoothstep(0.42, 0.78, pattern + vDisplacement * 0.18);
    float hotCore = smoothstep(0.68, 0.94, pattern);

    vec3 deepVoid = vec3(0.008, 0.045, 0.025);
    vec3 midEmerald = vec3(0.02, 0.47, 0.34);
    vec3 neonToxin = vec3(0.0, 0.96, 0.61);
    vec3 whiteHot = vec3(0.75, 1.0, 0.9);
    vec3 lowFuelAlert = vec3(0.95, 0.28, 0.22);

    vec3 color = mix(deepVoid, midEmerald, smoothstep(0.2, 0.6, pattern));
    color = mix(color, neonToxin, veins * (0.75 + uSurge * 0.35));
    color = mix(color, whiteHot, hotCore * (0.35 + uSurge * 0.45));

    // Subtle crimson warning pulse when fuel drops below 20%
    float lowFuelFactor = smoothstep(0.22, 0.02, uFuel);
    float alertPulse = 0.5 + 0.5 * sin(uTime * 6.0);
    color = mix(color, lowFuelAlert, lowFuelFactor * alertPulse * veins * 0.55);

    // Bright Fresnel rim (deeper emerald outline in Light Mode for crisp contrast)
    vec3 darkRimColor = mix(neonToxin, lowFuelAlert, lowFuelFactor * 0.5);
    vec3 lightRimColor = mix(vec3(0.015, 0.35, 0.24), lowFuelAlert, lowFuelFactor * 0.55);
    vec3 rimColor = mix(darkRimColor, lightRimColor, uLightMode);
    float rimIntensity = mix(1.05 + uSurge * 0.65, 0.72 + uSurge * 0.35, uLightMode);
    color = mix(color, color * 0.9 + rimColor * 0.45, uLightMode * fresnel);
    color += rimColor * fresnel * rimIntensity * (1.0 - uLightMode * 0.65);

    // Fuel energy brightness scale (never fully dark)
    float energy = 0.62 + 0.38 * uFuel + uSurge * 0.25;
    gl_FragColor = vec4(color * energy, 1.0);
  }
`;

const SHELL_VERTEX_SHADER = `
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPosition.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const SHELL_FRAGMENT_SHADER = `
  uniform float uSurge;
  uniform float uFuel;
  uniform float uLightMode;

  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float rim = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 3.1);

    vec3 toxicGlow = mix(vec3(0.0, 0.96, 0.61), vec3(0.016, 0.47, 0.34), uLightMode);
    vec3 alertGlow = mix(vec3(0.95, 0.32, 0.24), vec3(0.86, 0.15, 0.15), uLightMode);
    float lowFuel = smoothstep(0.22, 0.02, uFuel);
    vec3 baseColor = mix(toxicGlow, alertGlow, lowFuel * 0.55);

    float alpha = rim * (0.55 + uSurge * 0.38) * mix(1.0, 0.85, uLightMode);
    gl_FragColor = vec4(baseColor, alpha);
  }
`;

/**
 * Generates a soft radial glow texture on an offscreen 2D canvas for toxic vapor particles.
 */
function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(220, 255, 240, 1)');
  gradient.addColorStop(0.25, 'rgba(0, 245, 155, 0.85)');
  gradient.addColorStop(0.65, 'rgba(16, 185, 129, 0.25)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Interactive 3D Viper Poison Orb Containment Core.
 * Built with vanilla Three.js + custom GLSL shaders to stay lightweight and responsive.
 */
export default function ViperPoisonOrb3D({
  fuel = 100,
  isToxinActive = false,
  isDesktop = false,
  isExiting = false,
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerRef = useRef(null);
  const fallbackRef = useRef(null);

  // Live state refs so animation loop reacts smoothly without rebuilding the WebGL scene
  const stateRef = useRef({
    fuel: 100,
    isToxinActive: false,
    isDesktop: false,
    isExiting: false,
    isDark: true,
  });

  useEffect(() => {
    stateRef.current = {
      fuel,
      isToxinActive,
      isDesktop,
      isExiting,
      isDark,
    };
  }, [fuel, isToxinActive, isDesktop, isExiting, isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let renderer = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return undefined;
    }

    if (!renderer || !renderer.getContext()) {
      return undefined;
    }

    if (fallbackRef.current) {
      fallbackRef.current.style.display = 'none';
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0.1, 5.4);

    // Tactical Lighting for mechanical emitter rings & nodes
    const ambientLight = new THREE.AmbientLight(0x10b981, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x00f59b, 4.5, 16);
    keyLight.position.set(2.8, 2.4, 3.2);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x34d399, 3.0, 14);
    rimLight.position.set(-3.0, -2.0, -2.2);
    scene.add(rimLight);

    // Root Assembly
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    const segments = stateRef.current.isDesktop ? 48 : 32;

    // 1. Swirling Toxic Plasma Core
    const plasmaGeo = new THREE.SphereGeometry(0.92, segments, segments);
    const plasmaMat = new THREE.ShaderMaterial({
      vertexShader: PLASMA_VERTEX_SHADER,
      fragmentShader: PLASMA_FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uSurge: { value: 0 },
        uFuel: { value: 1 },
        uLightMode: { value: stateRef.current.isDark ? 0 : 1 },
      },
    });
    const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
    orbGroup.add(plasmaMesh);

    // 2. Glassy Fresnel Containment Shell
    const shellGeo = new THREE.SphereGeometry(1.13, 36, 36);
    const shellMat = new THREE.ShaderMaterial({
      vertexShader: SHELL_VERTEX_SHADER,
      fragmentShader: SHELL_FRAGMENT_SHADER,
      uniforms: {
        uSurge: { value: 0 },
        uFuel: { value: 1 },
        uLightMode: { value: stateRef.current.isDark ? 0 : 1 },
      },
      transparent: true,
      blending: stateRef.current.isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
      side: THREE.FrontSide,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    orbGroup.add(shellMesh);

    // 3. Kingdom Tactical Wireframe Lattice
    const cageSourceGeo = new THREE.IcosahedronGeometry(1.22, 1);
    const cageGeo = new THREE.EdgesGeometry(cageSourceGeo);
    cageSourceGeo.dispose();
    const initialDark = stateRef.current.isDark;
    const cageMat = new THREE.LineBasicMaterial({
      color: initialDark ? 0x00f59b : 0x047857,
      transparent: true,
      opacity: initialDark ? 0.24 : 0.36,
    });
    const cageLines = new THREE.LineSegments(cageGeo, cageMat);
    orbGroup.add(cageLines);

    // 4. Mechanical Orbital Rings & Emitter Nodes
    const ringsGroup = new THREE.Group();
    orbGroup.add(ringsGroup);

    const ringPrimaryGeo = new THREE.TorusGeometry(1.5, 0.022, 12, 96);
    const ringPrimaryMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      emissive: 0x00f59b,
      emissiveIntensity: 0.45,
      metalness: 0.85,
      roughness: 0.25,
    });
    const ringPrimary = new THREE.Mesh(ringPrimaryGeo, ringPrimaryMat);
    ringPrimary.rotation.x = Math.PI * 0.42;
    ringsGroup.add(ringPrimary);

    const ringGyroGeo = new THREE.TorusGeometry(1.36, 0.013, 10, 84);
    const ringGyroMat = new THREE.MeshStandardMaterial({
      color: 0x022c22,
      emissive: 0x34d399,
      emissiveIntensity: 0.7,
      metalness: 0.8,
      roughness: 0.2,
    });
    const ringGyro = new THREE.Mesh(ringGyroGeo, ringGyroMat);
    ringGyro.rotation.set(Math.PI * 0.26, Math.PI * 0.35, 0);
    ringsGroup.add(ringGyro);

    const ringOuterGeo = new THREE.TorusGeometry(1.68, 0.008, 8, 96);
    const ringOuterMat = new THREE.MeshBasicMaterial({
      color: initialDark ? 0x00f59b : 0x047857,
      transparent: true,
      opacity: initialDark ? 0.45 : 0.55,
    });
    const ringOuter = new THREE.Mesh(ringOuterGeo, ringOuterMat);
    ringOuter.rotation.set(-Math.PI * 0.32, Math.PI * 0.18, 0);
    ringsGroup.add(ringOuter);

    // 4 Radianite Emitter Nodes mounted onto the primary orbital ring
    const emitterGeo = new THREE.OctahedronGeometry(0.06, 0);
    const emitterMat = new THREE.MeshStandardMaterial({
      color: 0x00f59b,
      emissive: 0x00f59b,
      emissiveIntensity: 1.4,
      metalness: 0.4,
      roughness: 0.15,
    });
    const emitterAngles = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
    emitterAngles.forEach((angle) => {
      const node = new THREE.Mesh(emitterGeo, emitterMat);
      node.position.set(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0);
      ringPrimary.add(node);
    });

    // 5. Rising Helical Toxic Vapor / Radianite Embers
    const particleCount = stateRef.current.isDesktop ? 72 : 38;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleMeta = new Float32Array(particleCount * 3); // [angle, radius, speed]

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.05 + Math.random() * 0.85;
      const y = (Math.random() - 0.5) * 3.2;
      const speed = 0.28 + Math.random() * 0.45;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      particleMeta[i * 3] = angle;
      particleMeta[i * 3 + 1] = radius;
      particleMeta[i * 3 + 2] = speed;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleTexture = createParticleTexture();
    const particlesMat = new THREE.PointsMaterial({
      size: stateRef.current.isDesktop ? 0.11 : 0.13,
      map: particleTexture,
      color: initialDark ? 0x00f59b : 0x047857,
      transparent: true,
      opacity: 0.65,
      blending: initialDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    orbGroup.add(particles);

    // Responsive Sizing
    const updateSize = () => {
      if (!container) return;
      const width = container.clientWidth || 320;
      const height = container.clientHeight || 320;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Slightly pull back camera on tall/narrow containers so rings never clip
      camera.position.z = width < 360 ? 5.9 : 5.35;
      camera.updateProjectionMatrix();
    };
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // Desktop Pointer Parallax via window (never blocks clicks on TacticalRangeArena)
    const pointer = { x: 0, y: 0, smoothX: 0, smoothY: 0 };
    const handlePointerMove = (e) => {
      if (!stateRef.current.isDesktop) return;
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Pause animation loop when scrolled out of view or tab is hidden
    let isVisible = true;
    let isTabHidden = document.hidden;
    let rafId = null;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isTabHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Smooth animation state
    let lastTime = performance.now();
    let elapsed = 0;
    let smoothSurge = stateRef.current.isToxinActive ? 1 : 0;
    let smoothFuel = Math.max(0, Math.min(1, stateRef.current.fuel / 100));
    let smoothLight = stateRef.current.isDark ? 0 : 1;
    let lastDarkMode = stateRef.current.isDark;

    const animate = (now) => {
      rafId = window.requestAnimationFrame(animate);

      const rawDt = (now - lastTime) * 0.001;
      lastTime = now;

      if (!isVisible || isTabHidden || stateRef.current.isExiting) {
        return;
      }

      const dt = Math.min(rawDt, 0.05);
      elapsed += dt;

      const currentDark = stateRef.current.isDark;
      const targetSurge = stateRef.current.isToxinActive ? 1 : 0;
      const targetFuel = Math.max(0, Math.min(1, stateRef.current.fuel / 100));
      const targetLight = currentDark ? 0 : 1;
      smoothSurge += (targetSurge - smoothSurge) * Math.min(1, dt * 4.5);
      smoothFuel += (targetFuel - smoothFuel) * Math.min(1, dt * 6.0);
      smoothLight += (targetLight - smoothLight) * Math.min(1, dt * 6.0);

      // Switch blending/colors cleanly when theme toggles between Toxic Lab and Sterile Lab
      if (currentDark !== lastDarkMode) {
        lastDarkMode = currentDark;
        shellMat.blending = currentDark ? THREE.AdditiveBlending : THREE.NormalBlending;
        shellMat.needsUpdate = true;
        particlesMat.blending = currentDark ? THREE.AdditiveBlending : THREE.NormalBlending;
        particlesMat.color.setHex(currentDark ? 0x00f59b : 0x047857);
        particlesMat.needsUpdate = true;
        cageMat.color.setHex(currentDark ? 0x00f59b : 0x047857);
        ringOuterMat.color.setHex(currentDark ? 0x00f59b : 0x047857);
      }

      // Update GLSL shader uniforms
      plasmaMat.uniforms.uTime.value = elapsed;
      plasmaMat.uniforms.uSurge.value = smoothSurge;
      plasmaMat.uniforms.uFuel.value = smoothFuel;
      plasmaMat.uniforms.uLightMode.value = smoothLight;

      shellMat.uniforms.uSurge.value = smoothSurge;
      shellMat.uniforms.uFuel.value = smoothFuel;
      shellMat.uniforms.uLightMode.value = smoothLight;

      // Pointer parallax smoothing
      pointer.smoothX += (pointer.x - pointer.smoothX) * Math.min(1, dt * 5.0);
      pointer.smoothY += (pointer.y - pointer.smoothY) * Math.min(1, dt * 5.0);

      // Gentle levitation + pointer tilt
      orbGroup.position.y = Math.sin(elapsed * 1.45) * 0.08;
      orbGroup.rotation.y = pointer.smoothX * 0.35 + elapsed * 0.12;
      orbGroup.rotation.x = -pointer.smoothY * 0.25;

      // Wireframe cage & orbital ring dynamics
      const spinMult = 1 + smoothSurge * 1.75;
      cageLines.rotation.y -= dt * 0.22 * spinMult;
      cageLines.rotation.x += dt * 0.11 * spinMult;
      cageMat.opacity = (currentDark ? 0.2 : 0.36) + smoothSurge * 0.3;

      const ringScale = 1 + smoothSurge * 0.075;
      ringsGroup.scale.setScalar(ringScale);

      ringPrimary.rotation.z += dt * 0.45 * spinMult;
      ringGyro.rotation.z -= dt * 0.65 * spinMult;
      ringGyro.rotation.y += dt * 0.28 * spinMult;
      ringOuter.rotation.z += dt * 0.32 * spinMult;

      ringPrimaryMat.emissiveIntensity = (currentDark ? 0.4 : 0.22) + smoothSurge * 0.75;
      ringGyroMat.emissiveIntensity = (currentDark ? 0.65 : 0.32) + smoothSurge * 0.7;
      ringOuterMat.opacity = (currentDark ? 0.38 : 0.55) + smoothSurge * 0.35;
      emitterMat.emissiveIntensity = (currentDark ? 1.1 : 0.65) + smoothSurge * 1.2;
      keyLight.intensity = 4.0 + smoothSurge * 3.0;

      // Rising helical particles
      const posAttr = particlesGeo.getAttribute('position');
      const posArr = posAttr.array;
      const particleSpeedBoost = 1 + smoothSurge * 1.35;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const speed = particleMeta[idx + 2] * particleSpeedBoost;
        particleMeta[idx] += dt * (0.45 + smoothSurge * 0.65);

        let y = posArr[idx + 1] + dt * speed;
        if (y > 1.65) {
          y = -1.65;
        }

        const angle = particleMeta[idx];
        const radius = particleMeta[idx + 1] * (1 + smoothSurge * 0.08);
        posArr[idx] = Math.cos(angle) * radius;
        posArr[idx + 1] = y;
        posArr[idx + 2] = Math.sin(angle) * radius;
      }
      posAttr.needsUpdate = true;
      particlesMat.opacity = 0.45 + smoothSurge * 0.45;

      renderer.render(scene, camera);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      plasmaGeo.dispose();
      plasmaMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ringPrimaryGeo.dispose();
      ringPrimaryMat.dispose();
      ringGyroGeo.dispose();
      ringGyroMat.dispose();
      ringOuterGeo.dispose();
      ringOuterMat.dispose();
      emitterGeo.dispose();
      emitterMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      if (particleTexture) particleTexture.dispose();

      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  const roundedFuel = Math.round(fuel);
  const isCriticalFuel = roundedFuel < 20;
  const hudAccentStroke = isDark ? '#00f59b' : '#047857';

  return (
    <div className="relative w-72 h-72 sm:w-96 sm:h-88 lg:w-[440px] lg:h-[420px] xl:w-[490px] xl:h-[460px] flex items-center justify-center select-none pointer-events-none">
      {/* Ambient Radial Bloom behind the 3D Orb */}
      <div
        className={`absolute inset-4 rounded-full bg-radial ${
          isCriticalFuel && !isToxinActive
            ? 'from-red-500/20 via-[#047857]/10 to-transparent'
            : 'from-[#10b981]/25 via-[#059669]/10 dark:from-[#00f59b]/30 dark:via-[#047857]/15 to-transparent'
        } blur-3xl pointer-events-none transform-gpu transition-all duration-700 ${
          isToxinActive ? 'opacity-100 scale-110' : 'opacity-75 scale-100'
        }`}
      />

      {/* Subtle Tactical Containment Reticle Frame (Zero //) */}
      <svg
        viewBox="0 0 460 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-70 dark:opacity-65"
      >
        <circle
          cx="230"
          cy="230"
          r="212"
          stroke={isCriticalFuel ? (isDark ? '#f87171' : '#dc2626') : hudAccentStroke}
          strokeWidth="0.9"
          strokeDasharray="4 8"
          opacity="0.45"
        />
        <circle
          cx="230"
          cy="230"
          r="186"
          stroke="#047857"
          strokeWidth="0.7"
          strokeDasharray="18 12"
          opacity="0.5"
        />
        {/* Corner Tactical Brackets */}
        <path d="M 32 56 L 32 32 L 56 32" stroke={hudAccentStroke} strokeWidth="1.5" opacity="0.55" />
        <path d="M 404 32 L 428 32 L 428 56" stroke={hudAccentStroke} strokeWidth="1.5" opacity="0.55" />
        <path d="M 32 404 L 32 428 L 56 428" stroke={hudAccentStroke} strokeWidth="1.5" opacity="0.55" />
        <path d="M 404 428 L 428 428 L 428 404" stroke={hudAccentStroke} strokeWidth="1.5" opacity="0.55" />
      </svg>

      {/* Top HUD Readout */}
      <div className="absolute top-2 inset-x-0 text-center font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-[#047857] dark:text-[#34d399]/80">
        POISON ORB : CONTAINMENT CORE
      </div>

      {/* CSS Fallback Orb (hidden automatically once WebGL canvas mounts) */}
      <div
        ref={fallbackRef}
        className={`absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-[#047857]/50 dark:border-[#00f59b]/50 bg-radial from-[#10b981]/65 via-[#047857]/45 to-[#064e3b] dark:from-[#00f59b]/70 dark:via-[#047857]/50 dark:to-[#020805] shadow-[0_0_50px_rgba(4,120,87,0.35)] dark:shadow-[0_0_60px_rgba(0,245,155,0.45)] transition-transform duration-700 ${
          isToxinActive ? 'scale-110' : 'scale-100'
        }`}
      />

      {/* Three.js WebGL Mount */}
      <div ref={containerRef} className="w-full h-full relative z-10 pointer-events-none" />

      {/* Bottom Live Telemetry Status */}
      <div
        className={`absolute bottom-2 inset-x-0 text-center font-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase transition-colors duration-300 ${
          isToxinActive
            ? 'text-[#047857] dark:text-[#00f59b] font-bold'
            : isCriticalFuel
              ? 'text-red-600 dark:text-red-400 font-bold'
              : 'text-[#065f46]/85 dark:text-[#00f59b]/75'
        }`}
      >
        {isToxinActive
          ? `TOXIN SURGE : DEPLOYED (${roundedFuel}%)`
          : isCriticalFuel
            ? `FUEL CRITICAL : RECHARGING (${roundedFuel}%)`
            : `CONTAINMENT : STABLE (${roundedFuel}%)`}
      </div>
    </div>
  );
}
