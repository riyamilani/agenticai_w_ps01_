import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Detailed bronze chariot wheel with rim, tire, hub, bolts, and spokes. */
function makeChariotWheel(mats, scale = 1) {
  const { bronze, gold, iron, wood } = mats;
  const wheel = new THREE.Group();
  wheel.scale.setScalar(scale);

  // Outer tire band
  const tire = new THREE.Mesh(
    new THREE.TorusGeometry(1.72, 0.14, 24, 96),
    wood
  );
  wheel.add(tire);

  // Bronze outer rim
  const outerRim = new THREE.Mesh(
    new THREE.TorusGeometry(1.55, 0.1, 20, 96),
    bronze
  );
  wheel.add(outerRim);

  // Inner decorative rim
  const midRim = new THREE.Mesh(
    new THREE.TorusGeometry(1.28, 0.045, 16, 80),
    gold
  );
  wheel.add(midRim);

  // Hub ring
  const hubRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.48, 0.07, 16, 64),
    iron
  );
  wheel.add(hubRing);

  // Hub core + axle stub
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.4, 0.38, 32),
    bronze
  );
  hub.rotation.x = Math.PI / 2;
  wheel.add(hub);

  const axle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.7, 16),
    iron
  );
  axle.rotation.x = Math.PI / 2;
  wheel.add(axle);

  const axleCap = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), gold);
  axleCap.position.z = 0.38;
  wheel.add(axleCap);

  // Spokes — thicker, tapered feel via cylinders
  const spokeCount = 12;
  for (let i = 0; i < spokeCount; i++) {
    const angle = (i / spokeCount) * Math.PI * 2;
    const spoke = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.055, 1.05, 10),
      i % 2 === 0 ? bronze : gold
    );
    spoke.position.set(Math.cos(angle) * 0.88, Math.sin(angle) * 0.88, 0);
    spoke.rotation.z = angle + Math.PI / 2;
    wheel.add(spoke);

    // Rim bolt
    const bolt = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 10, 10),
      gold
    );
    bolt.position.set(Math.cos(angle) * 1.55, Math.sin(angle) * 1.55, 0.08);
    wheel.add(bolt);
  }

  // Cross plates near hub
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.PI / 8;
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.08, 0.04),
      iron
    );
    plate.position.set(Math.cos(angle) * 0.55, Math.sin(angle) * 0.55, 0.06);
    plate.rotation.z = angle;
    wheel.add(plate);
  }

  return wheel;
}

function makeArrow(shaftMat, tipMat) {
  const group = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 6), shaftMat);
  shaft.rotation.z = Math.PI / 2;
  group.add(shaft);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 6), tipMat);
  tip.rotation.z = -Math.PI / 2;
  tip.position.x = 0.7;
  group.add(tip);
  return group;
}

/**
 * Kurukshetra battlefield backdrop — hero 3D chariot wheel as the main graphic.
 */
export default function AnimatedBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x140e09, 0.022);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    // Push wheel slightly back so UI panels stay readable
    camera.position.set(0, 1.85, 8.4);
    camera.lookAt(0, 1.15, -0.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    // Lighting stage for the wheel
    scene.add(new THREE.AmbientLight(0xffd4a8, 0.45));
    scene.add(new THREE.HemisphereLight(0xffc98a, 0x1a1008, 0.7));

    const key = new THREE.DirectionalLight(0xffc078, 2.2);
    key.position.set(-3.5, 4.5, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffe0b0, 0.9);
    fill.position.set(4, 2, 3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xff8a3c, 1.1);
    rim.position.set(0, 1, -4);
    scene.add(rim);

    const wheelSpot = new THREE.SpotLight(0xffb45a, 28, 18, Math.PI / 5, 0.45, 1.2);
    wheelSpot.position.set(0, 5.5, 4);
    wheelSpot.target.position.set(0, 1.2, -0.5);
    scene.add(wheelSpot);
    scene.add(wheelSpot.target);

    const underGlow = new THREE.PointLight(0xff7a28, 3.5, 10, 2);
    underGlow.position.set(0, 0.2, 1.5);
    scene.add(underGlow);

    // Soft ground disc under the wheel
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(7, 64),
      new THREE.MeshStandardMaterial({
        color: 0x2a1c12,
        roughness: 1,
        metalness: 0,
        transparent: true,
        opacity: 0.85,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.35, -0.4);
    scene.add(ground);

    const mats = {
      bronze: new THREE.MeshStandardMaterial({
        color: 0xd4a05a,
        metalness: 0.88,
        roughness: 0.28,
        emissive: 0x5c3010,
        emissiveIntensity: 0.35,
      }),
      gold: new THREE.MeshStandardMaterial({
        color: 0xf0c878,
        metalness: 0.92,
        roughness: 0.2,
        emissive: 0x8a5018,
        emissiveIntensity: 0.4,
      }),
      iron: new THREE.MeshStandardMaterial({
        color: 0x4a3a2c,
        metalness: 0.7,
        roughness: 0.45,
        emissive: 0x1a1008,
        emissiveIntensity: 0.15,
      }),
      wood: new THREE.MeshStandardMaterial({
        color: 0x6b4428,
        metalness: 0.15,
        roughness: 0.75,
        emissive: 0x2a1508,
        emissiveIntensity: 0.12,
      }),
    };

    // Hero wheel — large but set behind the content plane
    const mainWheel = makeChariotWheel(mats, 1.7);
    mainWheel.position.set(0, 1.5, -2.2);
    mainWheel.rotation.x = -0.12;
    scene.add(mainWheel);

    // Soft luminous halo behind the wheel
    const halo = new THREE.Mesh(
      new THREE.RingGeometry(2.2, 3.4, 64),
      new THREE.MeshBasicMaterial({
        color: 0xff9a3c,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );
    halo.position.set(0, 1.5, -2.7);
    scene.add(halo);

    const haloInner = new THREE.Mesh(
      new THREE.CircleGeometry(2.1, 48),
      new THREE.MeshBasicMaterial({
        color: 0xffb45a,
        transparent: true,
        opacity: 0.06,
        depthWrite: false,
      })
    );
    haloInner.position.set(0, 1.5, -2.75);
    scene.add(haloInner);

    // Smaller side wheels for depth
    const leftWheel = makeChariotWheel(mats, 0.55);
    leftWheel.position.set(-4.2, 0.85, -2.2);
    leftWheel.rotation.y = 0.65;
    leftWheel.rotation.x = -0.1;
    scene.add(leftWheel);

    const rightWheel = makeChariotWheel(mats, 0.5);
    rightWheel.position.set(4.4, 0.75, -2.4);
    rightWheel.rotation.y = -0.6;
    rightWheel.rotation.x = -0.1;
    scene.add(rightWheel);

    // Embers
    const dustCount = 200;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    const dustSpeed = new Float32Array(dustCount);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 12;
      dustPos[i * 3 + 1] = Math.random() * 5;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      dustSpeed[i] = 0.2 + Math.random() * 0.4;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0xffc878,
        size: 0.055,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        sizeAttenuation: true,
      })
    );
    scene.add(dust);

    // A few distant arrows
    const tipMat = new THREE.MeshStandardMaterial({
      color: 0xb0b0b0,
      metalness: 0.85,
      roughness: 0.25,
    });
    const arrows = [];
    for (let i = 0; i < 5; i++) {
      const arrow = makeArrow(mats.wood, tipMat);
      arrow.userData = {
        delay: Math.random() * 6,
        y: 0.8 + Math.random() * 2,
        z: -2 + Math.random() * 1.5,
        startX: -11,
      };
      scene.add(arrow);
      arrows.push(arrow);
    }

    // Sunset disc
    const sunDisc = new THREE.Mesh(
      new THREE.CircleGeometry(1.4, 32),
      new THREE.MeshBasicMaterial({ color: 0xff9a3c, transparent: true, opacity: 0.55 })
    );
    sunDisc.position.set(-4.8, 3.6, -8);
    scene.add(sunDisc);

    let raf = 0;
    const start = performance.now();

    const onResize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const animate = (now) => {
      raf = requestAnimationFrame(animate);
      const t = (now - start) / 1000;

      if (!reducedMotion) {
        // Hero wheel — clear tumbling rotation so metal catches light
        mainWheel.rotation.z = t * 0.28;
        mainWheel.rotation.y = Math.sin(t * 0.2) * 0.28;
        mainWheel.rotation.x = -0.12 + Math.sin(t * 0.16) * 0.06;
        mainWheel.position.y = 1.5 + Math.sin(t * 0.6) * 0.1;

        leftWheel.rotation.z = -t * 0.5;
        rightWheel.rotation.z = t * 0.45;

        halo.rotation.z = -t * 0.08;
        halo.material.opacity = 0.16 + Math.sin(t * 0.9) * 0.08;
        haloInner.material.opacity = 0.06 + Math.sin(t * 0.7) * 0.03;

        underGlow.intensity = 3.2 + Math.sin(t * 1.4) * 0.8;
        wheelSpot.intensity = 26 + Math.sin(t * 0.8) * 4;

        const dPos = dust.geometry.attributes.position.array;
        for (let i = 0; i < dustCount; i++) {
          dPos[i * 3 + 1] += dustSpeed[i] * 0.01;
          dPos[i * 3] += Math.sin(t * 0.3 + i) * 0.0025;
          if (dPos[i * 3 + 1] > 5) {
            dPos[i * 3 + 1] = -0.2;
            dPos[i * 3] = (Math.random() - 0.5) * 12;
          }
        }
        dust.geometry.attributes.position.needsUpdate = true;

        arrows.forEach((arrow) => {
          const progress = ((t + arrow.userData.delay) % 8) / 8;
          arrow.position.x = arrow.userData.startX + progress * 24;
          arrow.position.y = arrow.userData.y + Math.sin(progress * Math.PI) * 0.3;
          arrow.position.z = arrow.userData.z;
          arrow.visible = progress > 0.02 && progress < 0.98;
        });

        camera.position.x = Math.sin(t * 0.1) * 0.4;
        camera.position.y = 1.85 + Math.sin(t * 0.14) * 0.08;
        camera.lookAt(0, 1.2, -0.8);

        sunDisc.material.opacity = 0.45 + Math.sin(t * 0.4) * 0.1;
      }

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div className="particle-layer kurukshetra-field" aria-hidden="true">
      <div className="field-wash" />
      <div ref={mountRef} className="particles-canvas" />
      <div className="field-vignette" />
    </div>
  );
}
