import { useEffect, useRef, useState } from "react";

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile === null || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Center of the cosmic field
    let cx = width / 2;
    let cy = height * 0.48; // Behind the headline text

    // Mouse coordinates with smooth spring easing
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      targetX: null as number | null,
      targetY: null as number | null,
      radius: 220, // Interactive field radius
    };

    const sway = {
      x: 0,
      y: 0,
    };

    // Perspective parameters for 3D simulation
    const fov = 450;
    const distanceToCamera = 300;

    // Beautiful premium light-theme palette matching Sylvan's aesthetics
    const colors = [
      { r: 79, g: 70, b: 229 },   // Deep Indigo
      { r: 168, g: 85, b: 247 },  // Soft Purple
      { r: 236, g: 72, b: 153 },  // Vivid Pink
      { r: 239, g: 68, b: 68 },   // Coral Red
      { r: 249, g: 115, b: 22 },   // Deep Orange
      { r: 245, g: 158, b: 11 },   // Amber Gold
    ];

    // Get smooth continuous color based on angular position (0 to 2*PI)
    const getColorForAngle = (angle: number, alpha: number): string => {
      // Normalize angle to [0, 1] range
      const normalizedAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2);
      
      const index = normalizedAngle * colors.length;
      const i1 = Math.floor(index) % colors.length;
      const i2 = (i1 + 1) % colors.length;
      const f = index - Math.floor(index);

      // Interpolate R, G, B channels
      const r = Math.round(colors[i1].r + (colors[i2].r - colors[i1].r) * f);
      const g = Math.round(colors[i1].g + (colors[i2].g - colors[i1].g) * f);
      const b = Math.round(colors[i1].b + (colors[i2].b - colors[i1].b) * f);

      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    interface Node3D {
      gridX: number; // Normalized -0.5 to 0.5
      gridY: number; // Normalized -0.5 to 0.5
      x3d: number;
      y3d: number;
      z3d: number;
      projX: number;
      projY: number;
      scale: number;
      color: string;
      baseLength: number;
      thickness: number;
      isDot: boolean;
      currentShrink: number;
      displaceX: number;
      displaceY: number;
      wiggleOffset: number;
      wiggleSpeedX: number;
      wiggleSpeedY: number;
      edgeFade: number;
      suitabilityScore: number;
      sourceR: number;
      sourceG: number;
      sourceB: number;
      targetR: number;
      targetG: number;
      targetB: number;
      currentR: number;
      currentG: number;
      currentB: number;
      lastChangeTime: number;
      nextChangeTime: number;
    }

    const tempNodes: Node3D[] = [];
    const cols = 21; // Column count for stable connected grid (~10% reduced from 22)
    const rows = 14; // Row count for stable connected grid (~10% reduced from 15)
    // Total = 294 nodes (approx 10% reduction from 330)

    // Spacing configuration to cover the full width/height
    const gridWidth = width * 1.25;
    const gridHeight = height * 1.15;

    // Initialize structured 3D Grid mesh (jali)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Normalize grid positions to range [-0.5, 0.5]
        const gx = (c / (cols - 1)) - 0.5;
        const gy = (r / (rows - 1)) - 0.5;

        // Base 3D coordinate distribution
        const x3d = gx * gridWidth;
        const y3d = gy * gridHeight;
        const z3d = (Math.random() - 0.5) * 110;

        // Dynamic frequencies
        const wiggleOffset = Math.random() * Math.PI * 2;
        const wiggleSpeedX = Math.random() * 0.012 + 0.005;
        const wiggleSpeedY = Math.random() * 0.012 + 0.005;

        // Smooth horizontal color spectrum (original fallback)
        const colorIndex = Math.floor((c / cols) * colors.length);
        const color = `rgba(${colors[colorIndex % colors.length].r}, ${colors[colorIndex % colors.length].g}, ${colors[colorIndex % colors.length].b}, 0.75)`;

        // Setup dynamic color cycle targets for Request 3 (randomly 3s to 8s transitions)
        const initialColorIndex = colorIndex % colors.length;
        const colorObj = colors[initialColorIndex];
        
        let targetColorIndex = Math.floor(Math.random() * colors.length);
        if (targetColorIndex === initialColorIndex) {
          targetColorIndex = (targetColorIndex + 1) % colors.length;
        }
        const targetObj = colors[targetColorIndex];
        
        const now = Date.now();
        // Stagger initial transition change times randomly between 0.5s and 8s
        const initialDuration = 500 + Math.random() * 7500;
        const nextChangeTime = now + initialDuration;

        // Suitability score for being a dot: high if near center or outskirts
        const d = Math.sqrt(gx * gx + gy * gy);
        const suitabilityScore = (d < 0.18) ? (1.5 - d) : (d > 0.44) ? (d * 2.0) : (Math.random() * 0.15);

        tempNodes.push({
          gridX: gx,
          gridY: gy,
          x3d,
          y3d,
          z3d,
          projX: 0,
          projY: 0,
          scale: 1,
          color,
          baseLength: (Math.random() * 3.5 + 4.0), // Sleeker, more compact dashes (1/2 to 1/3 of original size)
          thickness: (Math.random() * 0.4 + 1.1), // Much thinner, elegant dashes (1/3 of original thickness)
          isDot: false,
          currentShrink: 1.0,
          displaceX: 0,
          displaceY: 0,
          wiggleOffset,
          wiggleSpeedX,
          wiggleSpeedY,
          edgeFade: 1.0,
          suitabilityScore,
          sourceR: colorObj.r,
          sourceG: colorObj.g,
          sourceB: colorObj.b,
          targetR: targetObj.r,
          targetG: targetObj.g,
          targetB: targetObj.b,
          currentR: colorObj.r,
          currentG: colorObj.g,
          currentB: colorObj.b,
          lastChangeTime: now,
          nextChangeTime,
        });
      }
    }

    // Sort to identify the top 50% candidates for being dots (increased by 30% from 20%)
    const sortedIndices = tempNodes
      .map((node, index) => ({ index, score: node.suitabilityScore }))
      .sort((a, b) => b.score - a.score);

    const dotCount = Math.round(tempNodes.length * 0.50); // Increased to 50% total dot particles
    for (let i = 0; i < dotCount; i++) {
      const idx = sortedIndices[i].index;
      tempNodes[idx].isDot = true;
      tempNodes[idx].baseLength = 1.0;
      tempNodes[idx].thickness = (Math.random() * 0.4 + 1.2); // Small elegant circular dots
    }

    const nodes = tempNodes;

    let time = 0;

    // Main render frame loop
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Detect dark mode reactively
      const isDark = document.documentElement.classList.contains("dark");

      // Smooth lag interpolation for mouse coordinate easing
      if (mouse.targetX !== null && mouse.targetY !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.125;
          mouse.y += (mouse.targetY - mouse.y) * 0.125;
        }

        // Smoothly interpolate sway targets to avoid flicker
        const targetSwayX = ((mouse.x - cx) / width) * 95;
        const targetSwayY = ((mouse.y - cy) / height) * 85;
        sway.x += (targetSwayX - sway.x) * 0.08;
        sway.y += (targetSwayY - sway.y) * 0.08;
      } else {
        mouse.x = null;
        mouse.y = null;

        // Decelerate sway smoothly back to zero when mouse leaves (fixes sudden flickers)
        sway.x += (0 - sway.x) * 0.05;
        sway.y += (0 - sway.y) * 0.05;
      }

      time += 0.012; // Wave motion speed multiplier

      // 1. Calculate 3D wave and tilt transformations & project to 2D
      nodes.forEach((node) => {
        // Organic continuous wavy motion
        const waveX = Math.sin(node.gridX * 3 + time) * 35;
        const waveY = Math.cos(node.gridY * 2.5 + time * 0.8) * 30;
        const waveZ = Math.sin(node.gridX * 2 + node.gridY * 2 + time * 1.2) * 60;

        const xCurrent = node.x3d + waveX;
        const yCurrent = node.y3d + waveY;
        const zCurrent = node.z3d + waveZ;

        // Rotate slightly in 3D over time
        const angleX = Math.sin(time * 0.25) * 0.06;
        const angleY = Math.cos(time * 0.2) * 0.09;

        // Apply 3D Y-axis rotation
        let rotX = xCurrent * Math.cos(angleY) - zCurrent * Math.sin(angleY);
        let rotZ = xCurrent * Math.sin(angleY) + zCurrent * Math.cos(angleY);

        // Apply 3D X-axis rotation
        let rotY = yCurrent * Math.cos(angleX) - rotZ * Math.sin(angleX);
        rotZ = yCurrent * Math.sin(angleX) + rotZ * Math.cos(angleX);

        // Organic viewport shift
        const scrollOffset = Math.sin(time * 0.1) * 20;
        rotX += scrollOffset;

        // Mouse parallax sway & global drift flow towards cursor (unconditionally applied via smooth sway state)
        rotX += sway.x;
        rotY += sway.y;

        // Perspective Projection
        const scale = fov / (fov + rotZ + distanceToCamera);
        node.scale = scale;

        const baseProjX = cx + rotX * scale;
        const baseProjY = cy + rotY * scale;

        // 2. Depth-of-Field Edge Fading (natural boundaries fading out)
        const padX = width * 0.12;
        const padY = height * 0.12;
        
        let fadeX = 1.0;
        if (baseProjX < padX) {
          fadeX = baseProjX / padX;
        } else if (baseProjX > width - padX) {
          fadeX = (width - baseProjX) / padX;
        }

        let fadeY = 1.0;
        if (baseProjY < padY) {
          fadeY = baseProjY / padY;
        } else if (baseProjY > height - padY) {
          fadeY = (height - baseProjY) / padY;
        }

        node.edgeFade = Math.max(0, Math.min(1.0, fadeX * fadeY));

        // 3. Mouse Repulsion (fleeing away) + Hover Scaling (keep visible at minimum 65% size)
        let pushX = 0;
        let pushY = 0;
        let targetShrink = 1.0;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = baseProjX - mouse.x;
          const dy = baseProjY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const factor = dist / mouse.radius; // 0 near mouse, 1 at edge
            targetShrink = 0.65 + 0.35 * Math.pow(factor, 1.4);
            
            // Flee repulsion force vector - push away gracefully up to 110px
            const force = (1 - factor) * 110; 
            pushX = (dx / (dist || 1)) * force;
            pushY = (dy / (dist || 1)) * force;
          }
        }

        // Interpolate individual node displacement
        node.displaceX += (pushX - node.displaceX) * 0.12;
        node.displaceY += (pushY - node.displaceY) * 0.12;

        node.projX = baseProjX + node.displaceX;
        node.projY = baseProjY + node.displaceY;

        // Smoothly ease shrinking
        node.currentShrink += (targetShrink - node.currentShrink) * 0.14;

        // Update color dynamically over time (minimum 3s, maximum 8s)
        const nowTime = Date.now();
        if (nowTime >= node.nextChangeTime) {
          node.sourceR = node.targetR;
          node.sourceG = node.targetG;
          node.sourceB = node.targetB;

          let nextTargetIndex = Math.floor(Math.random() * colors.length);
          if (colors[nextTargetIndex].r === node.targetR && colors[nextTargetIndex].g === node.targetG) {
            nextTargetIndex = (nextTargetIndex + 1) % colors.length;
          }
          const nextTarget = colors[nextTargetIndex];
          node.targetR = nextTarget.r;
          node.targetG = nextTarget.g;
          node.targetB = nextTarget.b;

          node.lastChangeTime = nowTime;
          node.nextChangeTime = nowTime + (3000 + Math.random() * 5000); // 3s to 8s
        }

        const elapsed = nowTime - node.lastChangeTime;
        const duration = node.nextChangeTime - node.lastChangeTime;
        const progress = Math.min(1, elapsed / duration);
        // cubic ease-in-out
        const easeProgress = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        node.currentR = node.sourceR + (node.targetR - node.sourceR) * easeProgress;
        node.currentG = node.sourceG + (node.targetG - node.sourceG) * easeProgress;
        node.currentB = node.sourceB + (node.targetB - node.sourceB) * easeProgress;
      });

      // 5. Draw individual capsules (floating dashes) or dots
      nodes.forEach((node) => {
        const finalFade = node.edgeFade * node.currentShrink;
        if (finalFade < 0.05) return;

        // Custom individual capsule rotation along wavy trajectory + Magnetic direction alignment towards cursor
        const waveAngle = Math.sin(node.gridX * 2 + time * 1.5) * 0.14;
        let finalAngle = waveAngle;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.projX;
          const dy = mouse.y - node.projY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 15) {
            const angleToMouse = Math.atan2(dy, dx);
            // Stronger alignment closer to mouse, light drift alignment overall
            const alignmentFactor = 0.12 + 0.58 * (1 - Math.min(1, dist / mouse.radius));
            // Wrap angle diff cleanly to interpolate smoothly
            let diff = angleToMouse - waveAngle;
            diff = Math.atan2(Math.sin(diff), Math.cos(diff));
            finalAngle = waveAngle + diff * alignmentFactor;
          }
        }

        ctx.save();
        ctx.translate(node.projX, node.projY);
        ctx.rotate(finalAngle);

        const currentLength = (node.baseLength * finalFade + 0.5) * node.scale;
        const currentThickness = (node.thickness * finalFade + 0.5) * node.scale;

        // Extract alpha channel: 100% solid opacity fading gracefully at boundaries
        const baseAlpha = 1.0 * finalFade * node.scale;
        // Construct dynamic transitioning color string (Request 3)
        const colorString = `rgba(${Math.round(node.currentR)}, ${Math.round(node.currentG)}, ${Math.round(node.currentB)}, ${Math.max(0.01, Math.min(1.0, baseAlpha))})`;

        ctx.beginPath();
        if (node.isDot || currentLength < 1.6) {
          // Draw as circle for tiny dot particles
          ctx.arc(0, 0, currentThickness / 1.3, 0, Math.PI * 2);
          ctx.fillStyle = colorString;
          ctx.fill();
        } else {
          // Draw as premium elongated capsule
          ctx.moveTo(-currentLength / 2, 0);
          ctx.lineTo(currentLength / 2, 0);
          ctx.strokeStyle = colorString;
          ctx.lineWidth = currentThickness;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.offsetHeight;
      cx = width / 2;
      cy = height * 0.48;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  if (isMobile === null || isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-[100px] left-1/2 -translate-x-1/2 w-screen min-w-[100vw] h-[calc(100%-100px)] pointer-events-none select-none z-0 block bg-transparent"
    />
  );
}
