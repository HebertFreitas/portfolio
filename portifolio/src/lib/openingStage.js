import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createOpeningTimeline } from "./openingTimeline.js";

export function createOpeningStage(canvas, { reduced, onReady, onError }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    queueMicrotask(onError);
    return () => {};
  }
  renderer.setClearColor(0xd9d9d5, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xd9d9d5);
  scene.fog = new THREE.Fog(0xd9d9d5, 30, 90);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xc2c2bd, 0.24));
  const key = new THREE.DirectionalLight(0xffffff, 5);
  key.position.set(2.6, 5, 5.2);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, {
    near: 1,
    far: 22,
    left: -7,
    right: 7,
    top: 3.85,
    bottom: -2.45,
  });
  Object.assign(key.shadow, { normalBias: 0.022, bias: -0.0004, radius: 3.2 });
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.34);
  fill.position.set(-5.5, 2.8, 3.5);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 1.15);
  rim.position.set(-1.2, 3.4, -6);
  scene.add(rim);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300),
    new THREE.MeshStandardMaterial({
      color: 0xc6c6c1,
      roughness: 0.94,
      metalness: 0,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  const environment = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environmentMap = environment.fromScene(room, 0.04);
  scene.environment = environmentMap.texture;
  scene.environmentIntensity = 0.3;
  environment.dispose();
  room.dispose();
  const white = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0,
    envMapIntensity: 0.55,
  });
  const black = new THREE.MeshStandardMaterial({
    color: 0x0d0d10,
    roughness: 0.34,
    metalness: 0.08,
    envMapIntensity: 1,
  });
  const group = new THREE.Group();
  scene.add(group);
  const cameraState = { push: 0 };
  let width = 8,
    height = 1,
    timeline,
    frame,
    disposed = false;
  function positionCamera() {
    const factor = camera.aspect < 1 ? 1.24 : 1.26;
    const tangent = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const distance = Math.max(
      (width * factor) / (2 * tangent * camera.aspect),
      (height * factor * (camera.aspect < 1 ? 2.6 : 1.75)) / (2 * tangent),
    );
    camera.position.set(
      0,
      height * 0.6 + cameraState.push * height * 0.04,
      distance * (1 - cameraState.push * 0.085),
    );
    camera.lookAt(0, height * 0.44, 0);
    camera.updateProjectionMatrix();
    scene.fog.near = distance * 1.5;
    scene.fog.far = distance * 3.6;
  }
  function resize() {
    const mobile = window.innerWidth < 700;
    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio || 1,
        mobile ? 1.5 : window.innerWidth * window.innerHeight > 2600000 ? 1.6 : 2,
      ),
    );
    const shadowSize = mobile ? 1024 : 2048;
    if (key.shadow.mapSize.x !== shadowSize) {
      key.shadow.mapSize.set(shadowSize, shadowSize);
      key.shadow.needsUpdate = true;
    }
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    positionCamera();
  }
  resize();
  window.addEventListener("resize", resize);
  new FontLoader().load(
    "/fonts/poppins-bold.json",
    (font) => {
      if (disposed) return;
      const lines = ["HEBERT DEV"];
      const options = {
        font,
        size: 1,
        depth: 0.42,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.065,
        bevelSize: 0.038,
        bevelSegments: 6,
      };
      const geometryFor = (character) => {
        const geometry = new TextGeometry(character, options);
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        geometry.translate(
          -(box.min.x + box.max.x) / 2,
          -box.min.y,
          -(box.min.z + box.max.z) / 2,
        );
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();
        return geometry;
      };
      const advance = (character) =>
        font.data.glyphs[character].ha / 1000 + 0.028;
      const hGeometry = geometryFor("H");
      const glyphHeight = hGeometry.boundingBox.max.y;
      const glyphWidth =
        hGeometry.boundingBox.max.x - hGeometry.boundingBox.min.x;
      const depth = hGeometry.boundingBox.max.z - hGeometry.boundingBox.min.z;
      const letters = [];
      let slot;
      width = 0;
      height = (lines.length - 1) * 1.18 + glyphHeight;
      lines.forEach((line, row) => {
        const lineWidth =
          [...line].reduce((sum, character) => sum + advance(character), 0) -
          0.028 +
          (row === 0 ? 0.26 : 0);
        width = Math.max(width, lineWidth);
        let left = -lineWidth / 2;
        const y = (lines.length - 1 - row) * 1.18;
        [...line].forEach((character, index) => {
          const padding = row === 0 && index === 0 ? 0.13 : 0;
          const step = advance(character) + padding * 2;
          const x = left + (step - 0.028) / 2;
          left += step;
          if (character === " ") return;
          if (row === 0 && index === 0) {
            slot = { x, y };
            return;
          }
          const mesh = new THREE.Mesh(geometryFor(character), white);
          mesh.position.set(x, y, 0);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          group.add(mesh);
          letters.push({ character, x, y, row, mesh });
        });
      });
      const mascot = new THREE.Group();
      mascot.userData.phones = [];
      mascot.userData.eyes = [];
      const body = new THREE.Mesh(hGeometry, white);
      body.castShadow = true;
      body.receiveShadow = true;
      mascot.add(body);
      const shell = new THREE.CapsuleGeometry(0.135, 0.075, 7, 28);
      const stem = new THREE.CapsuleGeometry(0.042, 0.3, 5, 18);
      const dot = new THREE.SphereGeometry(0.0135, 10, 8);
      [-1, 1].forEach((side) => {
        const phones = new THREE.Group();
        const ear = new THREE.Mesh(shell, black);
        ear.scale.x = 0.62;
        ear.position.set(side * (glyphWidth / 2 + 0.03), 0, 0.03);
        ear.castShadow = true;
        phones.add(ear);
        const support = new THREE.Mesh(stem, black);
        support.position.set(side * (glyphWidth / 2 + 0.105), 0.135, -0.05);
        support.rotation.z = side * -0.14;
        support.castShadow = true;
        phones.add(support);
        phones.position.y = glyphHeight * 0.64;
        mascot.add(phones);
        mascot.userData.phones.push(phones);
        const eyes = new THREE.Group();
        for (let row = 0; row < 5; row++)
          for (let column = 0; column < 5; column++) {
            const x = row - 2,
              y = column - 2;
            if (Math.hypot(x, y) > 2.35) continue;
            const bead = new THREE.Mesh(dot, black);
            bead.position.set(x * 0.038, y * 0.038, 0);
            eyes.add(bead);
          }
        eyes.position.set(
          side * (glyphWidth / 2 - 0.0855),
          glyphHeight * 0.66,
          depth / 2 + 0.004,
        );
        mascot.add(eyes);
        mascot.userData.eyes.push(eyes);
      });
      group.add(mascot);
      positionCamera();
      if (reduced) {
        mascot.position.set(slot.x, slot.y, 0);
        cameraState.push = 1;
        positionCamera();
        onReady();
      } else {
        timeline = createOpeningTimeline({
          letters,
          mascot,
          slot,
          width,
          camera,
          cameraState,
          positionCamera,
          onComplete: onReady,
        });
        timeline.timeScale(1.38).play();
      }
    },
    undefined,
    onError,
  );
  const captionPosition = new THREE.Vector3(0, -0.3, 0);
  function render() {
    const projected = captionPosition.clone().project(camera);
    canvas.parentElement.style.setProperty(
      "--legenda-y",
      `${(-projected.y * 0.5 + 0.5) * 100}%`,
    );
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }
  frame = requestAnimationFrame(render);
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    timeline?.kill();
    window.removeEventListener("resize", resize);
    const geometries = new Set(),
      materials = new Set();
    scene.traverse((item) => {
      if (item.geometry) geometries.add(item.geometry);
      if (item.material) materials.add(item.material);
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    environmentMap.dispose();
    renderer.dispose();
  };
}
