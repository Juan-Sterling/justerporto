import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import QRCode from 'qrcode';
import { RefreshCw } from 'lucide-react';

/**
 * Creates a rounded rectangular 2D shape for extrusion in Three.js.
 */
function createRoundedRectShape(width, height, radius) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return shape;
}

/**
 * Performs progressive halving downscale on high-resolution source images.
 * This prevents single-pass browser downsampling aliasing (white speckles / moiré).
 */
function drawImageProgressive(ctx, img, targetX, targetY, targetW, targetH) {
  const sW = img.naturalWidth;
  const sH = img.naturalHeight;
  if (!sW || !sH) return;

  const targetAspect = targetW / targetH;
  const srcAspect = sW / sH;
  let sx = 0;
  let sy = 0;
  let cropW = sW;
  let cropH = sH;

  if (srcAspect > targetAspect) {
    cropW = sH * targetAspect;
    sx = (sW - cropW) / 2;
  } else {
    // Focus framing on upper portion (head/chest)
    cropH = sW / targetAspect;
    sy = 0;
  }

  let curW = Math.round(cropW);
  let curH = Math.round(cropH);
  let sourceEl = img;
  let srcRect = [sx, sy, cropW, cropH];

  // Progressive halving loop
  while (curW * 0.5 > targetW) {
    const nextW = Math.max(targetW, Math.round(curW * 0.5));
    const nextH = Math.max(targetH, Math.round(curH * 0.5));
    const stepCanvas = document.createElement('canvas');
    stepCanvas.width = nextW;
    stepCanvas.height = nextH;
    const stepCtx = stepCanvas.getContext('2d');
    if (!stepCtx) break;

    stepCtx.imageSmoothingEnabled = true;
    stepCtx.imageSmoothingQuality = 'high';
    stepCtx.drawImage(
      sourceEl,
      srcRect[0],
      srcRect[1],
      srcRect[2],
      srcRect[3],
      0,
      0,
      nextW,
      nextH
    );

    sourceEl = stepCanvas;
    srcRect = [0, 0, nextW, nextH];
    curW = nextW;
    curH = nextH;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    sourceEl,
    srcRect[0],
    srcRect[1],
    srcRect[2],
    srcRect[3],
    targetX,
    targetY,
    targetW,
    targetH
  );
}

/**
 * Draws the high-resolution front texture of the Stage ID Pass.
 */
function renderFrontTexture(canvas, img, isDark, passDetails) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // 1. Background Card Body (Pure deep obsidian in dark mode, clean white in light mode)
  const bgColor = isDark ? '#0B0C10' : '#FFFFFF';
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, w, h);

  // Outer rounded border line matching card corner curve
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(22, 22, w - 44, h - 44, 52);
  ctx.stroke();

  // 2. Header Area
  ctx.font = 'bold 28px "Space Grotesk", sans-serif';
  ctx.fillStyle = isDark ? '#FFFFFF' : '#09090B';
  ctx.letterSpacing = '2px';
  ctx.fillText('STAGE ID · ALL ACCESS', 50, 75);

  ctx.font = '600 20px monospace';
  ctx.fillStyle = '#E11D2E';
  ctx.textAlign = 'right';
  ctx.fillText('NO. 07 · VIP', w - 50, 75);
  ctx.textAlign = 'left';

  // 3. Photo Card Frame
  const photoX = 50;
  const photoY = 105;
  const photoW = w - 100;
  const photoH = 920;
  const radius = 24;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(photoX + radius, photoY);
  ctx.lineTo(photoX + photoW - radius, photoY);
  ctx.quadraticCurveTo(photoX + photoW, photoY, photoX + photoW, photoY + radius);
  ctx.lineTo(photoX + photoW, photoY + photoH - radius);
  ctx.quadraticCurveTo(photoX + photoW, photoY + photoH, photoX + photoW - radius, photoY + photoH);
  ctx.lineTo(photoX + radius, photoY + photoH);
  ctx.quadraticCurveTo(photoX, photoY + photoH, photoX, photoY + photoH - radius);
  ctx.lineTo(photoX, photoY + radius);
  ctx.quadraticCurveTo(photoX, photoY, photoX + radius, photoY);
  ctx.closePath();
  ctx.clip();

  // Photo placeholder background
  ctx.fillStyle = isDark ? '#181920' : '#EAE9E3';
  ctx.fillRect(photoX, photoY, photoW, photoH);

  // Draw user's actual photo using progressive downsampling
  if (img && img.complete && img.naturalWidth > 0) {
    drawImageProgressive(ctx, img, photoX, photoY, photoW, photoH);
  }
  ctx.restore();

  // Tactical Crimson Brackets on Photo Corners
  const bracketSize = 36;
  const bracketThickness = 6;
  ctx.fillStyle = '#E11D2E';

  // Top-Left
  ctx.fillRect(photoX + 10, photoY + 10, bracketSize, bracketThickness);
  ctx.fillRect(photoX + 10, photoY + 10, bracketThickness, bracketSize);
  // Top-Right
  ctx.fillRect(photoX + photoW - 10 - bracketSize, photoY + 10, bracketSize, bracketThickness);
  ctx.fillRect(photoX + photoW - 10 - bracketThickness, photoY + 10, bracketThickness, bracketSize);
  // Bottom-Left
  ctx.fillRect(photoX + 10, photoY + photoH - 10 - bracketThickness, bracketSize, bracketThickness);
  ctx.fillRect(photoX + 10, photoY + photoH - 10 - bracketSize, bracketThickness, bracketSize);
  // Bottom-Right
  ctx.fillRect(photoX + photoW - 10 - bracketSize, photoY + photoH - 10 - bracketThickness, bracketSize, bracketThickness);
  ctx.fillRect(photoX + photoW - 10 - bracketThickness, photoY + photoH - 10 - bracketSize, bracketThickness, bracketSize);

  // 4. Identity & Typography Info
  const textStartY = photoY + photoH + 52;
  ctx.font = 'bold 44px "Space Grotesk", sans-serif';
  ctx.fillStyle = isDark ? '#FFFFFF' : '#09090B';
  ctx.fillText(passDetails?.name || 'Juan Sterling', 50, textStartY);

  ctx.font = '600 24px monospace';
  ctx.fillStyle = '#E11D2E';
  ctx.fillText(passDetails?.role || 'Software Developer', 50, textStartY + 38);

  // 5. Decorative Barcode Strip at Bottom
  const barY = textStartY + 85;
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(50, barY);
  ctx.lineTo(w - 50, barY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Barcode Lines
  const barCodeY = barY + 30;
  const barCodeH = 55;
  ctx.fillStyle = isDark ? '#E4E4E7' : '#18181B';
  const pattern = [3, 1, 4, 2, 5, 2, 1, 4, 2, 3, 1, 5, 2, 3, 1, 4, 6, 2, 1, 3, 5, 2, 4, 1, 3, 2, 5, 1, 4, 2];
  let curX = 50;
  for (let i = 0; i < pattern.length; i++) {
    const barWidth = pattern[i] * 3;
    ctx.fillRect(curX, barCodeY, barWidth, barCodeH);
    curX += barWidth + (i % 2 === 0 ? 5 : 8);
    if (curX > w - 240) break;
  }

  // Barcode Label
  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = isDark ? '#A1A1AA' : '#52525B';
  ctx.textAlign = 'right';
  ctx.fillText('ALL · ACCESS', w - 50, barCodeY + 36);
  ctx.font = '16px monospace';
  ctx.fillText('BANDUNG · JAKARTA', w - 50, barCodeY + 58);
  ctx.textAlign = 'left';
}

/**
 * Draws the high-resolution back texture of the Stage ID Pass with QR code, NFC chip & manifesto.
 */
function renderBackTexture(canvas, isDark, qrCanvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // 1. Background Card Body
  const bgColor = isDark ? '#0B0C10' : '#F8F8FA';
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, w, h);

  // Clip interior elements inside the rounded border
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(22, 22, w - 44, h - 44, 52);
  ctx.clip();

  // 2. Magnetic Security Stripe (clipped neatly to rounded edges)
  ctx.fillStyle = isDark ? '#050608' : '#27272A';
  ctx.fillRect(0, 62, w, 118);

  // Shimmer foil line on magnetic stripe
  const stripeGrad = ctx.createLinearGradient(0, 0, w, 0);
  stripeGrad.addColorStop(0, '#E11D2E');
  stripeGrad.addColorStop(0.3, '#FF8A00');
  stripeGrad.addColorStop(0.7, '#E11D2E');
  stripeGrad.addColorStop(1, '#990011');
  ctx.fillStyle = stripeGrad;
  ctx.fillRect(0, 180, w, 8);
  ctx.restore();

  // Outer rounded border line matching card corner curve
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(22, 22, w - 44, h - 44, 52);
  ctx.stroke();

  // 3. Gold Smartcard / NFC Contact Chip
  const chipX = (w - 180) / 2;
  const chipY = 220;
  const chipW = 180;
  const chipH = 135;
  const chipRadius = 14;

  // Gold gradient
  const goldGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
  goldGrad.addColorStop(0, '#E8C15A');
  goldGrad.addColorStop(0.25, '#FDE08B');
  goldGrad.addColorStop(0.5, '#C99E32');
  goldGrad.addColorStop(0.75, '#F6D365');
  goldGrad.addColorStop(1, '#B38728');

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(chipX, chipY, chipW, chipH, chipRadius);
  ctx.fillStyle = goldGrad;
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#8C6718';
  ctx.stroke();

  // Etched circuit lines on chip
  ctx.strokeStyle = 'rgba(74, 52, 10, 0.65)';
  ctx.lineWidth = 2;
  // Center divider
  ctx.beginPath();
  ctx.moveTo(chipX, chipY + chipH / 2);
  ctx.lineTo(chipX + chipW, chipY + chipH / 2);
  // Vertical dividers
  ctx.moveTo(chipX + chipW * 0.35, chipY);
  ctx.lineTo(chipX + chipW * 0.35, chipY + chipH);
  ctx.moveTo(chipX + chipW * 0.65, chipY);
  ctx.lineTo(chipX + chipW * 0.65, chipY + chipH);
  // Center micro ring
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(chipX + chipW / 2, chipY + chipH / 2, 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Chip Label
  ctx.font = 'bold 20px monospace';
  ctx.fillStyle = isDark ? '#A1A1AA' : '#71717A';
  ctx.textAlign = 'center';
  ctx.fillText('NFC · TAP SECURE PASS', w / 2, chipY + chipH + 34);

  // 4. Scannable QR Code Block
  const qrBoxSize = 420;
  const qrBoxX = (w - qrBoxSize) / 2;
  const qrBoxY = chipY + chipH + 65;

  // QR Container background
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 20);
  ctx.fill();
  ctx.strokeStyle = isDark ? '#E11D2E' : '#E4E4E7';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw the actual QR Code
  if (qrCanvas) {
    const pad = 24;
    ctx.drawImage(qrCanvas, qrBoxX + pad, qrBoxY + pad, qrBoxSize - pad * 2, qrBoxSize - pad * 2);
  }

  // QR Subtitle
  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = isDark ? '#FFFFFF' : '#18181B';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN FOR DIRECT CONNECT', w / 2, qrBoxY + qrBoxSize + 45);

  ctx.font = '18px monospace';
  ctx.fillStyle = '#E11D2E';
  ctx.fillText('LINKEDIN · JUAN STERLING', w / 2, qrBoxY + qrBoxSize + 75);

  // 5. Backstage Manifesto & Compliance Info (Strictly NO // or -- per rules)
  const manifestoY = qrBoxY + qrBoxSize + 145;
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(60, manifestoY);
  ctx.lineTo(w - 60, manifestoY);
  ctx.stroke();

  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.fillStyle = isDark ? '#E4E4E7' : '#27272A';
  ctx.fillText('AUTHORIZED BACKSTAGE ACCESS ONLY', w / 2, manifestoY + 45);

  ctx.font = '600 18px monospace';
  ctx.fillStyle = '#E11D2E';
  ctx.fillText('CURIOUS LIKE BABY · CREATIVE LIKE MONSTER', w / 2, manifestoY + 75);

  ctx.font = '16px monospace';
  ctx.fillStyle = isDark ? '#71717A' : '#A1A1AA';
  ctx.fillText('BUILT FOR TECHNOLOGY · ALL RIGHTS RESERVED', w / 2, manifestoY + 104);
  ctx.fillText('SERIAL: JS-2002-BM07 · OFFICIAL STAGE PASS', w / 2, manifestoY + 130);
  ctx.textAlign = 'left';
}

export default function ThreePassBadge({ passDetails, isDark }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Three.js internal references
  const threeRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    badgeGroup: null,
    frontTexture: null,
    backTexture: null,
    frontCanvas: null,
    backCanvas: null,
    qrCanvas: null,
    loadedImg: null,
    animationFrameId: null,
    baseRotationY: 0,
    targetRotationY: 0,
    currentRotationY: 0,
    targetRotationX: 0,
    currentRotationX: 0,
    dragStartX: 0,
    dragStartRotationY: 0,
    isDragging: false,
    isVisible: true,
  });

  // Pre-generate QR code once
  useEffect(() => {
    const qrCanvas = document.createElement('canvas');
    const linkedinUrl = 'https://www.linkedin.com/in/juan-sterling-martua-1487b3287/';
    QRCode.toCanvas(qrCanvas, linkedinUrl, {
      width: 400,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    }).then(() => {
      threeRef.current.qrCanvas = qrCanvas;
      if (threeRef.current.backCanvas) {
        renderBackTexture(threeRef.current.backCanvas, isDark, qrCanvas);
        if (threeRef.current.backTexture) {
          threeRef.current.backTexture.needsUpdate = true;
        }
      }
    }).catch((err) => {
      console.warn('QR Code generation notice:', err);
    });
  }, [isDark]);

  // Preload Pass Photo (Same-origin local or CORS-friendly remote)
  useEffect(() => {
    const rawPhotoUrl = isDark ? passDetails?.photo : (passDetails?.photoLight || passDetails?.photo);
    const photoUrl = rawPhotoUrl || (isDark ? '/images/profile/pass-photo-dark.jpg' : '/images/profile/pass-photo-light.jpg');
    if (!photoUrl) return;

    const img = new Image();
    // Only set crossOrigin for external remote URLs
    if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }
    img.src = photoUrl;

    const handleSuccess = () => {
      threeRef.current.loadedImg = img;
      if (threeRef.current.frontCanvas) {
        renderFrontTexture(threeRef.current.frontCanvas, img, isDark, passDetails);
        if (threeRef.current.frontTexture) {
          threeRef.current.frontTexture.needsUpdate = true;
        }
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      handleSuccess();
    } else {
      img.onload = handleSuccess;
      img.onerror = () => {
        // Fallback to local bundled asset if remote fails
        const fallbackUrl = isDark ? '/images/profile/pass-photo-dark.jpg' : '/images/profile/pass-photo-light.jpg';
        if (photoUrl !== fallbackUrl) {
          const fallbackImg = new Image();
          fallbackImg.src = fallbackUrl;
          fallbackImg.onload = () => {
            threeRef.current.loadedImg = fallbackImg;
            if (threeRef.current.frontCanvas) {
              renderFrontTexture(threeRef.current.frontCanvas, fallbackImg, isDark, passDetails);
              if (threeRef.current.frontTexture) {
                threeRef.current.frontTexture.needsUpdate = true;
              }
            }
          };
        }
      };
    }
  }, [isDark, passDetails]);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const threeState = threeRef.current;

    // Dimensions
    const width = container.clientWidth || 320;
    const height = Math.round(width * 1.55); // 1 : 1.55 pass aspect ratio

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // 2. Renderer with Performance Clamping
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.0;

    // 3. Calibrated Physical Studio Lighting (PI-normalized for exact 1.0x natural brightness)
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 2.05 : 2.15);
    scene.add(ambientLight);

    // Main Key Light (Neutral White)
    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 1.15 : 1.25);
    keyLight.position.set(3, 4, 6);
    scene.add(keyLight);

    // Fill Light (Neutral White)
    const fillLight = new THREE.DirectionalLight(0xffffff, isDark ? 0.35 : 0.4);
    fillLight.position.set(-3, -1, 5);
    scene.add(fillLight);

    // Balanced backlight so the flipped Back Face (QR & NFC chip) is equally bright
    const backLight = new THREE.DirectionalLight(0xffffff, isDark ? 1.15 : 1.25);
    backLight.position.set(0, 3, -6);
    scene.add(backLight);

    // 4. Badge Group (Pivot set near top clip)
    const badgeGroup = new THREE.Group();
    scene.add(badgeGroup);

    // 5. Build Badge Geometry (Rounded Beveled Card)
    const cardW = 3.0;
    const cardH = 4.65;
    const cardThickness = 0.08;
    const cardRadius = 0.22;

    const cardShape = createRoundedRectShape(cardW, cardH, cardRadius);
    const extrudeSettings = {
      depth: cardThickness,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.035,
    };
    const cardGeometry = new THREE.ExtrudeGeometry(cardShape, extrudeSettings);
    cardGeometry.center();

    // Sleek Solid Obsidian / Silver Bevel Body Material (no muddy transmission haze)
    const acrylicMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x090a0d : 0xe4e4e7,
      metalness: isDark ? 0.15 : 0.1,
      roughness: 0.28,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
    });
    const cardMesh = new THREE.Mesh(cardGeometry, acrylicMat);
    badgeGroup.add(cardMesh);

    // 6. Canvases for Front & Back Textures (1024 x 1536 px)
    const texW = 1024;
    const texH = 1536;
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 1;

    const frontCanvas = document.createElement('canvas');
    frontCanvas.width = texW;
    frontCanvas.height = texH;
    renderFrontTexture(frontCanvas, threeRef.current.loadedImg, isDark, passDetails);
    const frontTexture = new THREE.CanvasTexture(frontCanvas);
    frontTexture.colorSpace = THREE.SRGBColorSpace;
    frontTexture.generateMipmaps = true;
    frontTexture.minFilter = THREE.LinearMipmapLinearFilter;
    frontTexture.magFilter = THREE.LinearFilter;
    frontTexture.anisotropy = Math.min(maxAnisotropy, 8);

    const backCanvas = document.createElement('canvas');
    backCanvas.width = texW;
    backCanvas.height = texH;
    renderBackTexture(backCanvas, isDark, threeRef.current.qrCanvas);
    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.colorSpace = THREE.SRGBColorSpace;
    backTexture.generateMipmaps = true;
    backTexture.minFilter = THREE.LinearMipmapLinearFilter;
    backTexture.magFilter = THREE.LinearFilter;
    backTexture.anisotropy = Math.min(maxAnisotropy, 8);

    // Rounded Face Geometry matching the beveled card corners cleanly
    const faceW = cardW - 0.01;
    const faceH = cardH - 0.01;
    const faceRadius = cardRadius - 0.005;
    const faceShape = createRoundedRectShape(faceW, faceH, faceRadius);
    const planeGeo = new THREE.ShapeGeometry(faceShape, 24);
    const posAttr = planeGeo.attributes.position;
    const uvAttr = planeGeo.attributes.uv;
    for (let i = 0; i < posAttr.count; i++) {
      const px = posAttr.getX(i);
      const py = posAttr.getY(i);
      uvAttr.setXY(i, (px + faceW / 2) / faceW, (py + faceH / 2) / faceH);
    }
    uvAttr.needsUpdate = true;

    const frontMat = new THREE.MeshPhysicalMaterial({
      map: frontTexture,
      roughness: 0.42,
      metalness: 0.0,
      specularIntensity: 0.12, // Eliminates broad gray dielectric sheen on deep dark cards
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
    const frontPlane = new THREE.Mesh(planeGeo, frontMat);
    frontPlane.position.z = cardThickness / 2 + 0.04;
    badgeGroup.add(frontPlane);

    // Back Face Plane Mesh (Faced backward)
    const backMat = new THREE.MeshPhysicalMaterial({
      map: backTexture,
      roughness: 0.42,
      metalness: 0.0,
      specularIntensity: 0.12,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
    const backPlane = new THREE.Mesh(planeGeo, backMat);
    backPlane.rotation.y = Math.PI; // Face opposite
    backPlane.position.z = -(cardThickness / 2 + 0.04);
    badgeGroup.add(backPlane);

    // 7. Metallic Clip & Lanyard at the Top
    const clipGroup = new THREE.Group();
    clipGroup.position.set(0, cardH / 2 + 0.14, 0);

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x3f3f46 : 0xd4d4d8,
      metalness: 0.88,
      roughness: 0.22,
    });

    // Metal clip bracket
    const clipBracket = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.28, 16), metalMaterial);
    clipBracket.rotation.z = Math.PI / 2;
    clipGroup.add(clipBracket);

    // Carabiner ring
    const clipRing = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.035, 12, 24), metalMaterial);
    clipRing.position.y = 0.16;
    clipGroup.add(clipRing);

    // Woven Fabric Lanyard Strap running to top
    const strapGeo = new THREE.BoxGeometry(0.38, 2.4, 0.02);
    const strapMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x18181b : 0x27272a,
      roughness: 0.85,
      metalness: 0.05,
    });
    const strap = new THREE.Mesh(strapGeo, strapMat);
    strap.position.y = 1.35;
    clipGroup.add(strap);

    badgeGroup.add(clipGroup);

    // Initial position of badgeGroup slightly lowered so pivot feels realistic
    badgeGroup.position.y = -0.3;

    // Store references
    threeRef.current.scene = scene;
    threeRef.current.camera = camera;
    threeRef.current.renderer = renderer;
    threeRef.current.badgeGroup = badgeGroup;
    threeRef.current.frontTexture = frontTexture;
    threeRef.current.backTexture = backTexture;
    threeRef.current.frontCanvas = frontCanvas;
    threeRef.current.backCanvas = backCanvas;

    // 8. Performance Guard: Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0]?.isIntersecting ?? true;
        threeRef.current.isVisible = isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 9. Animation & Render Loop
    let clock = new THREE.Clock();
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    const animate = () => {
      threeRef.current.animationFrameId = requestAnimationFrame(animate);

      if (!threeRef.current.isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const state = threeRef.current;

      // Smooth Lerping of Rotation
      state.currentRotationY += (state.targetRotationY - state.currentRotationY) * 0.085;
      state.currentRotationX += (state.targetRotationX - state.currentRotationX) * 0.085;

      // Subtle Idle Swaying when not dragging
      const idleSwayY = prefersReducedMotion ? 0 : Math.sin(elapsedTime * 1.3) * 0.05;
      const idleSwayX = prefersReducedMotion ? 0 : Math.cos(elapsedTime * 1.8) * 0.03;
      const idleSwayZ = prefersReducedMotion ? 0 : Math.sin(elapsedTime * 1.1) * 0.025;

      badgeGroup.rotation.y = state.currentRotationY + idleSwayY;
      badgeGroup.rotation.x = state.currentRotationX + idleSwayX;
      badgeGroup.rotation.z = idleSwayZ;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth || 320;
      const newH = Math.round(newW * 1.55);
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    // Cleanup on unmount
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      if (threeState?.animationFrameId) {
        cancelAnimationFrame(threeState.animationFrameId);
      }
      renderer.dispose();
      cardGeometry.dispose();
      planeGeo.dispose();
      strapGeo.dispose();
      acrylicMat.dispose();
      frontMat.dispose();
      backMat.dispose();
      metalMaterial.dispose();
      strapMat.dispose();
      frontTexture.dispose();
      backTexture.dispose();
    };
  }, [isDark, passDetails]);

  // Pointer Interaction Handlers (Desktop Mouse & Mobile Touch)
  const handlePointerDown = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    threeRef.current.isDragging = true;
    threeRef.current.dragStartX = clientX;
    threeRef.current.dragStartRotationY = threeRef.current.targetRotationY;
    if (e.pointerId !== undefined) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture is not supported
      }
    }
  };

  const handlePointerMove = useCallback((e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (threeRef.current.isDragging) {
      const deltaX = clientX - threeRef.current.dragStartX;
      // Responsive drag: ~105px swipe cleanly crosses 90 degrees in the exact drag direction
      threeRef.current.targetRotationY = threeRef.current.dragStartRotationY + deltaX * 0.015;
    } else {
      // Subtle parallax tilt around the current resting baseRotationY
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const normX = (clientX - rect.left) / rect.width - 0.5;
      const normY = (clientY - rect.top) / rect.height - 0.5;

      threeRef.current.targetRotationX = normY * 0.22;
      threeRef.current.targetRotationY = threeRef.current.baseRotationY + normX * 0.28;
    }
  }, []);

  const handlePointerUp = useCallback((e) => {
    if (!threeRef.current.isDragging) return;
    threeRef.current.isDragging = false;
    if (e?.pointerId !== undefined) {
      try {
        e.currentTarget?.releasePointerCapture?.(e.pointerId);
      } catch {
        // Ignore
      }
    }

    // Snap cleanly to nearest half-turn (multiple of Math.PI) along the shortest path
    const rot = threeRef.current.targetRotationY;
    const nearestHalfTurn = Math.round(rot / Math.PI);
    const snappedRot = nearestHalfTurn * Math.PI;

    threeRef.current.baseRotationY = snappedRot;
    threeRef.current.targetRotationY = snappedRot;
  }, []);

  // Toggle Flip Programmatically (Button Click)
  const toggleFlip = () => {
    threeRef.current.baseRotationY += Math.PI;
    threeRef.current.targetRotationY = threeRef.current.baseRotationY;
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* 1. Lanyard Ceiling Slot Decoration */}
      <div className="w-20 h-3 mx-auto mb-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center shadow-xs">
        <div className="w-10 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
      </div>

      {/* 2. Interactive 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => {
          if (!threeRef.current.isDragging) {
            threeRef.current.targetRotationX = 0;
            threeRef.current.targetRotationY = threeRef.current.baseRotationY;
          }
        }}
        className={`relative w-full max-w-[320px] aspect-[1/1.55] cursor-grab active:cursor-grabbing touch-pan-y transition-shadow duration-300 rounded-3xl ${
          isDark
            ? 'hover:drop-shadow-[0_0_35px_rgba(225,29,46,0.22)]'
            : 'hover:drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)]'
        }`}
        title="Interactive 3D Stage ID Pass · Drag to Rotate"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block rounded-3xl pointer-events-auto"
        />
      </div>

      {/* 3. Interactive Quick Controls Below Badge */}
      <div className="mt-3.5 flex items-center justify-center">
        <button
          type="button"
          onClick={toggleFlip}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 text-zinc-700 dark:text-zinc-200 text-xs font-mono border border-zinc-200 dark:border-zinc-700/80 transition-colors shadow-xs cursor-pointer active:scale-95"
          aria-label="Flip Stage ID Badge"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#E11D2E]" />
          <span>Flip Badge</span>
        </button>
      </div>
    </div>
  );
}

