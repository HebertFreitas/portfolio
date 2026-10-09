import { gsap } from "gsap";

function jump(target, { to, height, duration, tilt = 0, elastic = false }) {
  const timeline = gsap.timeline();
  const apex = Math.max(target.position.y, to.y) + height;
  timeline.to(
    target.scale,
    { y: 0.82, x: 1.11, z: 1.11, duration: 0.08, ease: "power2.out" },
    0,
  );
  timeline.to(
    target.scale,
    { y: 1.2, x: 0.9, z: 0.9, duration: duration * 0.24, ease: "power2.out" },
    0.08,
  );
  timeline.to(
    target.scale,
    { y: 1, x: 1, z: 1, duration: duration * 0.32, ease: "sine.inOut" },
    0.08 + duration * 0.24,
  );
  timeline.to(target.position, { x: to.x, duration, ease: "none" }, 0.08);
  timeline.to(target.position, { z: to.z, duration, ease: "sine.inOut" }, 0.08);
  timeline.to(
    target.position,
    { y: apex, duration: duration * 0.46, ease: "power2.out" },
    0.08,
  );
  timeline.to(
    target.position,
    { y: to.y, duration: duration * 0.54, ease: "power2.in" },
    0.08 + duration * 0.46,
  );
  timeline.to(
    target.rotation,
    { z: tilt, duration: duration * 0.45, ease: "sine.out" },
    0.08,
  );
  timeline.to(
    target.rotation,
    { z: 0, duration: duration * 0.55, ease: "sine.inOut" },
    0.08 + duration * 0.45,
  );
  timeline.to(
    target.scale,
    { y: 0.74, x: 1.17, z: 1.17, duration: 0.07, ease: "power3.out" },
    0.08 + duration,
  );
  timeline.to(
    target.scale,
    {
      y: 1,
      x: 1,
      z: 1,
      duration: elastic ? 0.7 : 0.15,
      ease: elastic ? "elastic.out(1, 0.4)" : "power2.out",
    },
    0.15 + duration,
  );
  return timeline;
}

export function createOpeningTimeline({
  letters,
  mascot,
  slot,
  width,
  camera,
  cameraState,
  positionCamera,
  onComplete,
}) {
  const timeline = gsap.timeline({ paused: true });
  const platform =
    letters.find((letter) => letter.row === 0 && letter.character === "E") ||
    letters.find((letter) => letter.character === "E");
  const top = platform.mesh.geometry.boundingBox.max.y;
  const dropHeight = Math.max(
    5.2,
    camera.position.y +
      camera.position.z * Math.tan((camera.fov * Math.PI) / 360) +
      1.4,
  );
  const dropDuration = Math.min(0.72, 0.44 * Math.sqrt(dropHeight / 5.2));
  letters.forEach((letter, index) => {
    const delay = 0.15 + index * 0.035;
    letter.mesh.position.y = letter.y + dropHeight;
    timeline.to(
      letter.mesh.position,
      { y: letter.y, duration: dropDuration, ease: "power2.in" },
      delay,
    );
    timeline.to(
      letter.mesh.scale,
      { y: 0.8, x: 1.12, z: 1.12, duration: 0.06, ease: "power3.out" },
      delay + dropDuration,
    );
    timeline.to(
      letter.mesh.scale,
      { y: 1, x: 1, z: 1, duration: 0.6, ease: "elastic.out(1, 0.45)" },
      delay + dropDuration + 0.06,
    );
  });
  const landed = 0.15 + (letters.length - 1) * 0.035 + dropDuration + 0.06;
  const startX = width / 2 + 0.9;
  const approachX = platform.x + 0.85;
  const approachY = platform.y;
  mascot.position.set(startX, approachY, 1.35);
  mascot.rotation.set(0, -0.4, 0);
  mascot.visible = false;
  let time = landed - 0.12;
  timeline.set(mascot, { visible: true }, time);
  for (let index = 0; index < 3; index++) {
    const progress = ((index + 1) / 3) ** 0.82;
    timeline.add(
      jump(mascot, {
        to: {
          x: startX + (approachX - startX) * progress,
          y: approachY,
          z: 1.35,
        },
        height: 0.66 - index * 0.04,
        duration: 0.36,
        tilt: 0.1,
      }),
      time,
    );
    time += 0.66;
  }
  timeline.to(
    mascot.rotation,
    { y: -0.1, duration: 1.98, ease: "sine.inOut" },
    landed - 0.12,
  );
  timeline.add(
    jump(mascot, {
      to: { x: platform.x, y: platform.y + top, z: 0 },
      height: 0.9,
      duration: 0.5,
      tilt: 0.14,
      elastic: true,
    }),
    time,
  );
  time += 0.58;
  const spring = { amount: 1, released: false };
  const updateSpring = () => {
    platform.mesh.scale.y = spring.amount;
    platform.mesh.scale.x = platform.mesh.scale.z =
      1 + (1 - spring.amount) * 0.42;
    if (!spring.released) mascot.position.y = platform.y + top * spring.amount;
  };
  timeline.to(
    spring,
    { amount: 0.9, duration: 0.09, ease: "power3.out", onUpdate: updateSpring },
    time,
  );
  timeline.to(
    spring,
    {
      amount: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.35)",
      onUpdate: updateSpring,
    },
    time + 0.09,
  );
  time += 0.26;
  timeline.to(
    mascot.rotation,
    { x: 0.2, duration: 0.3, ease: "power2.out" },
    time,
  );
  timeline.to(
    mascot.rotation,
    { x: 0, duration: 0.28, ease: "power2.inOut" },
    time + 0.5,
  );
  time += 0.5;
  timeline.to(
    mascot.position,
    { y: platform.y + top + 0.6, duration: 0.27, ease: "power2.out" },
    time,
  );
  timeline.to(
    mascot.scale,
    { y: 1.18, x: 0.9, z: 0.9, duration: 0.27, ease: "power2.out" },
    time,
  );
  timeline.to(
    mascot.position,
    { y: platform.y + top, duration: 0.18, ease: "power3.in" },
    time + 0.27,
  );
  timeline.to(
    mascot.scale,
    { y: 1, x: 1, z: 1, duration: 0.18, ease: "power1.in" },
    time + 0.27,
  );
  time += 0.45;
  timeline.to(
    spring,
    { amount: 0.28, duration: 0.1, ease: "power4.out", onUpdate: updateSpring },
    time,
  );
  timeline.to(
    mascot.scale,
    { y: 0.68, x: 1.22, z: 1.22, duration: 0.1, ease: "power4.out" },
    time,
  );
  time += 0.14;
  timeline.set(spring, { released: true }, time);
  timeline.to(
    spring,
    {
      amount: 1.16,
      duration: 0.15,
      ease: "power3.out",
      onUpdate: updateSpring,
    },
    time,
  );
  timeline.to(
    spring,
    {
      amount: 1,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
      onUpdate: updateSpring,
    },
    time + 0.15,
  );
  const flip = time + 0.13;
  const duration = 0.78;
  const apex = Math.max(slot.y, platform.y + top) + 1.55;
  timeline.to(
    mascot.position,
    { x: slot.x, z: 0, duration, ease: "none" },
    flip,
  );
  timeline.to(
    mascot.position,
    { y: apex, duration: duration / 2, ease: "power2.out" },
    flip,
  );
  timeline.to(
    mascot.position,
    { y: slot.y, duration: duration / 2, ease: "power2.in" },
    flip + duration / 2,
  );
  timeline.to(
    mascot.rotation,
    { z: Math.PI * 2, y: 0, duration, ease: "power1.inOut" },
    flip,
  );
  timeline.to(
    mascot.scale,
    { y: 1.34, x: 0.84, z: 0.84, duration: 0.17, ease: "power2.out" },
    flip,
  );
  timeline.to(
    mascot.scale,
    { y: 1, x: 1, z: 1, duration: 0.32, ease: "sine.inOut" },
    flip + 0.17,
  );
  const arrival = flip + duration;
  timeline.set(mascot.rotation, { z: 0 }, arrival);
  timeline.to(
    mascot.scale,
    { y: 0.62, x: 1.26, z: 1.26, duration: 0.08, ease: "power4.out" },
    arrival,
  );
  timeline.to(
    mascot.scale,
    { y: 1, x: 1, z: 1, duration: 1, ease: "elastic.out(1, 0.34)" },
    arrival + 0.08,
  );
  letters.forEach((letter) => {
    const distance = Math.hypot(letter.x - slot.x, letter.y - slot.y);
    timeline.to(
      letter.mesh.position,
      {
        y: letter.y + Math.max(0.018, 0.1 - distance * 0.011),
        duration: 0.1,
        ease: "power2.out",
      },
      arrival + distance * 0.02,
    );
    timeline.to(
      letter.mesh.position,
      { y: letter.y, duration: 0.66, ease: "elastic.out(1, 0.4)" },
      arrival + distance * 0.02 + 0.1,
    );
  });
  timeline.to(
    mascot.rotation,
    { y: 0.16, duration: 0.36, ease: "power2.out" },
    arrival + 0.32,
  );
  timeline.to(
    mascot.rotation,
    { y: 0, duration: 0.55, ease: "power2.inOut" },
    arrival + 0.68,
  );
  timeline.to(
    cameraState,
    {
      push: 1,
      duration: arrival + 1.42,
      ease: "power1.inOut",
      onUpdate: positionCamera,
    },
    0.2,
  );
  mascot.userData.phones?.forEach((phones, index) => {
    timeline.to(
      phones.rotation,
      { z: (index ? -1 : 1) * 0.14, duration: 0.42, ease: "power2.out" },
      arrival + 0.37,
    );
    timeline.to(
      phones.rotation,
      { z: 0, duration: 0.75, ease: "elastic.out(1, 0.5)" },
      arrival + 0.79,
    );
  });
  mascot.userData.eyes?.forEach((eyes) => {
    timeline.to(
      eyes.scale,
      { y: 0.06, duration: 0.075, yoyo: true, repeat: 1, ease: "power2.in" },
      arrival + 0.98,
    );
  });
  timeline.call(onComplete, [], arrival + 1.1);
  return timeline;
}
