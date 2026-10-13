/* ==========================================================================
   hero3d.js — a little physics playground of glossy shapes.
   Shapes spring back to a home position, get nudged by the cursor,
   can be dragged & thrown, and scatter when you click empty space.
   ========================================================================== */
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const canvas = document.getElementById("scene");
const hero = document.getElementById("hero");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
} catch {
  document.documentElement.classList.add("no-webgl");
  throw new Error("WebGL unavailable");
}
window.__heroReady = true;

renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
camera.position.set(0, 0, 14);

const key = new THREE.DirectionalLight(0xffffff, 1.6);
key.position.set(4, 6, 8);
scene.add(key);

/* ---------- Materials ---------- */
const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const mat = (color, extra = {}) => new THREE.MeshPhysicalMaterial({
  color, roughness: 0.25, metalness: 0.0, clearcoat: 1, clearcoatRoughness: 0.15, ...extra,
});
const M = {
  accent: mat(0xff5b1f),
  blue: mat(0x2f4bff),
  green: mat(0x14a37f),
  ink: mat(0x1b1714, { roughness: 0.35 }),
  cream: mat(0xf4ede3, { roughness: 0.4 }),
  chrome: mat(0xdddddd, { metalness: 1, roughness: 0.12, clearcoat: 0 }),
  glass: new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, thickness: 1.2, roughness: 0.05, ior: 1.4 }),
};

/* ---------- Bodies ---------- */
// [geometry, material, home (normalized -1..1 screen space), radius]
const defs = [
  [new THREE.TorusGeometry(0.62, 0.26, 40, 100),            M.accent, [-0.78,  0.52], 0.9],
  [new RoundedBoxGeometry(1.1, 1.1, 1.1, 6, 0.22),           M.blue,   [ 0.80,  0.48], 0.8],
  [new THREE.SphereGeometry(0.62, 64, 64),                   M.chrome, [-0.45, -0.62], 0.65],
  [new THREE.CapsuleGeometry(0.36, 0.9, 16, 32),             M.ink,    [ 0.55, -0.58], 0.8],
  [new THREE.ConeGeometry(0.62, 1.15, 64),                   M.green,  [-0.92, -0.08], 0.75],
  [new THREE.IcosahedronGeometry(0.66, 0),                   M.cream,  [ 0.95, -0.02], 0.7],
  [new THREE.TorusKnotGeometry(0.4, 0.15, 160, 24),          M.accent, [ 0.18,  0.80], 0.7],
  [new THREE.SphereGeometry(0.75, 64, 64),                   M.glass,  [-0.15, -0.85], 0.75],
  [new RoundedBoxGeometry(0.5, 1.5, 0.5, 6, 0.2),            M.cream,  [-0.30,  0.78], 0.85],
];

const bodies = defs.map(([geo, material, home, r], i) => {
  const mesh = new THREE.Mesh(geo, material);
  mesh.rotation.set(Math.random() * 6, Math.random() * 6, 0);
  scene.add(mesh);
  return {
    mesh, r, homeN: home,
    home: new THREE.Vector3(),
    vel: new THREE.Vector3(),
    spin: new THREE.Vector3((Math.random() - .5) * .6, (Math.random() - .5) * .6, (Math.random() - .5) * .3),
    phase: i * 1.7,
  };
});

/* ---------- Layout ---------- */
let halfW = 1, halfH = 1, scale = 1;
function layout() {
  const w = hero.clientWidth, h = hero.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
  halfW = halfH * camera.aspect;
  scale = camera.aspect < 1 ? 0.62 : camera.aspect < 1.4 ? 0.8 : 1;
  bodies.forEach((b) => {
    b.home.set(b.homeN[0] * halfW * 0.86, b.homeN[1] * halfH * 0.82, 0);
    b.mesh.scale.setScalar(scale);
  });
}
layout();
addEventListener("resize", layout);

// Start offscreen-ish and fly in after the loader
bodies.forEach((b) => b.mesh.position.set(b.home.x * 2.2, b.home.y * 2.2 - 8, -6));
let live = false;
addEventListener("siteready", () => (live = true));
setTimeout(() => (live = true), 3000);

/* ---------- Pointer ---------- */
const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2(9, 9);
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const pointer3 = new THREE.Vector3(999, 999, 0);
const prevPointer3 = new THREE.Vector3();
let dragged = null;
let pointerInside = false;

function updatePointer(e) {
  const r = canvas.getBoundingClientRect();
  ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  ray.ray.intersectPlane(plane, pointer3);
}
canvas.addEventListener("pointermove", (e) => { pointerInside = true; updatePointer(e); });
canvas.addEventListener("pointerleave", () => { pointerInside = false; pointer3.set(999, 999, 0); });

canvas.addEventListener("pointerdown", (e) => {
  updatePointer(e);
  const hit = ray.intersectObjects(bodies.map((b) => b.mesh))[0];
  if (hit) {
    dragged = bodies.find((b) => b.mesh === hit.object);
    canvas.setPointerCapture(e.pointerId);
  } else {
    // burst: everything flies away from the click
    bodies.forEach((b) => {
      const d = b.mesh.position.clone().sub(pointer3);
      const dist = Math.max(0.6, d.length());
      b.vel.add(d.normalize().multiplyScalar(26 / dist));
      b.spin.multiplyScalar(-1).addScalar((Math.random() - 0.5) * 2);
    });
  }
});
addEventListener("pointerup", () => {
  if (dragged) {
    dragged.vel.copy(pointer3).sub(prevPointer3).multiplyScalar(40);
    dragged = null;
  }
});

/* ---------- Theme reaction ---------- */
const syncTheme = () => {
  const dark = document.documentElement.dataset.theme === "dark";
  M.ink.color.set(dark ? 0x8b7bff : 0x1b1714);
  M.blue.color.set(dark ? 0x5a4bff : 0x2f4bff);
  key.intensity = dark ? 2.2 : 1.6;
  renderer.toneMappingExposure = dark ? 0.9 : 1.0;
};
syncTheme();
addEventListener("themechange", syncTheme);

/* ---------- Loop ---------- */
let visible = true;
new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(hero);

const clock = new THREE.Clock();
const tmp = new THREE.Vector3();
const camTarget = new THREE.Vector2();

function frame() {
  requestAnimationFrame(frame);
  if (!visible) { clock.getDelta(); return; }
  const dt = Math.min(clock.getDelta(), 1 / 30);
  const t = clock.elapsedTime;

  for (const b of bodies) {
    const p = b.mesh.position;
    if (b === dragged) {
      p.lerp(tmp.copy(pointer3).setZ(1.5), 0.35);
      b.vel.set(0, 0, 0);
    } else if (live) {
      // spring toward a gently bobbing home
      tmp.copy(b.home);
      if (!reduced) { tmp.y += Math.sin(t * 0.8 + b.phase) * 0.25; tmp.x += Math.cos(t * 0.6 + b.phase) * 0.15; }
      b.vel.addScaledVector(tmp.sub(p), 6 * dt);

      // cursor repulsion
      if (pointerInside) {
        tmp.copy(p).sub(pointer3); tmp.z = 0;
        const d = tmp.length(), R = 2.2 * scale;
        if (d < R && d > 0.001) b.vel.addScaledVector(tmp.normalize(), (1 - d / R) * 40 * dt);
      }
    }
    b.vel.multiplyScalar(Math.pow(0.06, dt)); // damping
    p.addScaledVector(b.vel, dt);

    // spin, a little faster when moving
    const s = reduced ? 0.2 : 1 + b.vel.length() * 0.4;
    b.mesh.rotation.x += b.spin.x * dt * s;
    b.mesh.rotation.y += b.spin.y * dt * s;
    b.mesh.rotation.z += b.spin.z * dt * s;
  }

  // soft collisions
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i], c = bodies[j];
      tmp.copy(c.mesh.position).sub(a.mesh.position);
      const d = tmp.length(), min = (a.r + c.r) * scale;
      if (d < min && d > 0.0001) {
        const push = tmp.normalize().multiplyScalar((min - d) * 0.5);
        if (a !== dragged) a.mesh.position.sub(push);
        if (c !== dragged) c.mesh.position.add(push);
        a.vel.addScaledVector(push, -4); c.vel.addScaledVector(push, 4);
      }
    }
  }
  prevPointer3.copy(pointer3);

  // subtle camera parallax
  if (pointerInside && !reduced) camTarget.set(ndc.x * 0.6, ndc.y * 0.4); else camTarget.set(0, 0);
  camera.position.x += (camTarget.x - camera.position.x) * 0.04;
  camera.position.y += (camTarget.y - camera.position.y) * 0.04;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}
frame();
