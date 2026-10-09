import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { createOpeningTimeline } from "../src/lib/openingTimeline.js";
const data = JSON.parse(
  readFileSync(
    new URL("../public/fonts/poppins-bold.json", import.meta.url),
    "utf8",
  ),
);

test("Poppins Bold matches the reference's glyph metrics", () => {
  for (const [letter, width] of Object.entries({
    N: 752,
    I: 295,
    C: 762,
    O: 786,
    L: 477,
    A: 737,
    S: 615,
    D: 727,
    E: 541,
    V: 730,
  }))
    assert.equal(data.glyphs[letter].ha, width);
  assert.equal(data.glyphs.H.ha, 731);
  assert.equal(data.glyphs.B.ha, 659);
});
test("the new HEBERT DEV glyphs render with the same cap height", () => {
  const font = new FontLoader().parse(data);
  for (const letter of "HEBRTDV") {
    const geometry = new TextGeometry(letter, {
      font,
      size: 1,
      depth: 0.42,
      bevelEnabled: true,
      bevelSize: 0.038,
      bevelThickness: 0.065,
    });
    geometry.computeBoundingBox();
    assert.ok(geometry.boundingBox.max.y > 0.7);
    assert.ok(geometry.boundingBox.max.y < 0.8);
    geometry.dispose();
  }
});
test("the scene drops its letters, performs the flip and finishes at the initial slot", () => {
  const letters = [..."EBERTDEV"].map((character, index) => {
    const geometry = new THREE.BoxGeometry(0.5, 0.778, 0.55);
    geometry.translate(0, 0.389, 0);
    geometry.computeBoundingBox();
    const mesh = new THREE.Mesh(geometry);
    mesh.position.set(-2 + index * 0.6, 0, 0);
    return { character, x: mesh.position.x, y: 0, row: 0, mesh };
  });
  const mascot = new THREE.Group(),
    camera = new THREE.PerspectiveCamera(30);
  camera.position.set(0, 0.5, 6);
  const slot = { x: -2.8, y: 0 },
    cameraState = { push: 0 };
  let completed = false;
  const timeline = createOpeningTimeline({
    letters,
    mascot,
    slot,
    width: 6,
    camera,
    cameraState,
    positionCamera() {},
    onComplete() {
      completed = true;
    },
  });
  assert.equal(mascot.visible, false);
  assert.ok(letters.every((letter) => letter.mesh.position.y > 5));
  const flip = timeline
    .getChildren()
    .find((child) => child.vars.z === Math.PI * 2);
  assert.ok(flip, "the final jump includes a complete somersault");
  timeline.seek(flip.startTime() + flip.duration() / 2, false);
  assert.ok(mascot.position.y > 1);
  assert.ok(mascot.rotation.z > 0 && mascot.rotation.z < Math.PI * 2);
  timeline.seek(timeline.duration(), false);
  assert.equal(completed, true);
  assert.ok(Math.abs(mascot.position.x - slot.x) < 1e-6);
  assert.equal(mascot.position.y, slot.y);
  assert.equal(mascot.position.z, 0);
  assert.equal(mascot.rotation.z, 0);
  assert.equal(mascot.scale.y, 1);
  assert.equal(cameraState.push, 1);
  timeline.kill();
  letters.forEach((letter) => {
    letter.mesh.geometry.dispose();
    letter.mesh.material.dispose();
  });
});
test("H crosses the single-line name before settling into HEBERT DEV", () => {
  const letters = [..."EBERTDEV"].map((character, index) => {
    const geometry = new THREE.BoxGeometry(0.5, 0.778, 0.55);
    geometry.translate(0, 0.389, 0);
    geometry.computeBoundingBox();
    const mesh = new THREE.Mesh(geometry);
    const x = -1.6 + index * 0.6;
    mesh.position.set(x, 0, 0);
    return { character, x, y: 0, row: 0, mesh };
  });
  const mascot = new THREE.Group();
  const camera = new THREE.PerspectiveCamera(30);
  camera.position.set(0, 1, 10);
  const slot = { x: -2.2, y: 0 };
  const timeline = createOpeningTimeline({
    letters,
    mascot,
    slot,
    width: 4.5,
    camera,
    cameraState: { push: 0 },
    positionCamera() {},
    onComplete() {},
  });
  assert.equal(mascot.position.y, slot.y);
  assert.equal(mascot.position.x, 4.5 / 2 + 0.9);
  timeline.seek(timeline.duration(), false);
  assert.equal(mascot.position.y, slot.y);
  assert.equal(mascot.position.x, slot.x);
  timeline.kill();
  letters.forEach(({ mesh }) => {
    mesh.geometry.dispose();
    mesh.material.dispose();
  });
});
