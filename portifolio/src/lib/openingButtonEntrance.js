const clamp = (value) => Math.max(0, Math.min(1, value));

export function capsulePoint(distance, { x, y, width, height }) {
  const radius = height / 2;
  const straight = Math.max(1, width - height);
  const perimeter = 2 * straight + 2 * Math.PI * radius;
  let d = ((distance % perimeter) + perimeter) % perimeter;
  if (d < straight) return { x: x - straight / 2 + d, y: y - radius };
  d -= straight;
  if (d < Math.PI * radius) {
    const angle = -Math.PI / 2 + d / radius;
    return {
      x: x + straight / 2 + radius * Math.cos(angle),
      y: y + radius * Math.sin(angle),
    };
  }
  d -= Math.PI * radius;
  if (d < straight) return { x: x + straight / 2 - d, y: y + radius };
  const angle = Math.PI / 2 + (d - straight) / radius;
  return {
    x: x - straight / 2 + radius * Math.cos(angle),
    y: y + radius * Math.sin(angle),
  };
}

export function createButtonEntrance(
  canvas,
  button,
  root,
  { reduced, onReady },
) {
  const context = canvas.getContext("2d");
  if (!context || reduced) {
    root.style.setProperty("--nasce", "1");
    onReady();
    return () => {};
  }
  let width,
    height,
    frame,
    started = null,
    born = false;
  const trail = [],
    particles = [];
  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);
  root.style.setProperty("--nasce", "0");
  function render(now) {
    started ??= now;
    const progress = Math.min(1, (now - started) / 1100);
    const box = button.getBoundingClientRect();
    const bounds = {
      x: box.left + box.width / 2,
      y: box.top + box.height / 2,
      width: box.width,
      height: box.height,
    };
    root.style.setProperty("--foco-y", `${(bounds.y / height) * 100}%`);
    const perimeter =
      2 * Math.max(1, box.width - box.height) + Math.PI * box.height;
    const approach = clamp(progress / 0.3),
      outline = clamp((progress - 0.3) / 0.48);
    const traveled = (1 - (1 - outline) ** 3.2) * perimeter;
    let head;
    if (outline > 0) head = capsulePoint(traveled, bounds);
    else {
      const p = 1 - (1 - approach) ** 2.2,
        q = 1 - p;
      const end = capsulePoint(0, bounds);
      head = {
        x: q * q * (width + 220) + 2 * q * p * width * 0.68 + p * p * end.x,
        y: q * q * height * 0.2 + 2 * q * p * height * 0.42 + p * p * end.y,
      };
    }
    if (outline < 1) {
      trail.push({ ...head, time: now });
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2,
          speed = 10 + Math.random() * 58;
        particles.push({
          ...head,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 16,
          time: now,
          duration: 420 + Math.random() * 520,
        });
      }
    }
    while (trail.length && now - trail[0].time > 560) trail.shift();
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "multiply";
    context.lineCap = "round";
    const outlineOpacity = 1 - clamp((progress - 0.8) / 0.12);
    if (outline > 0 && outlineOpacity > 0) {
      context.beginPath();
      for (let d = 0; d <= traveled; d += 5) {
        const point = capsulePoint(d, bounds);
        if (d === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      context.lineWidth = 8;
      context.strokeStyle = `rgba(18,49,95,${0.07 * outlineOpacity})`;
      context.stroke();
      context.lineWidth = 1.5;
      context.strokeStyle = `rgba(18,49,95,${0.62 * outlineOpacity})`;
      context.stroke();
    }
    for (let i = 1; i < trail.length; i++) {
      const previous = trail[i - 1],
        point = trail[i],
        life = 1 - (now - point.time) / 560;
      if (life <= 0) continue;
      context.beginPath();
      context.moveTo(previous.x, previous.y);
      context.lineTo(point.x, point.y);
      context.lineWidth = 2 + 9 * life * life;
      context.strokeStyle = `rgba(38,86,168,${0.16 * life ** 3})`;
      context.stroke();
      context.lineWidth = 1 + 2.4 * life * life;
      context.strokeStyle = `rgba(18,49,95,${0.5 * life * life})`;
      context.stroke();
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i],
        elapsed = (now - particle.time) / 1000,
        life = (now - particle.time) / particle.duration;
      if (life >= 1) {
        particles.splice(i, 1);
        continue;
      }
      const size = 1 + 1.6 * (1 - life);
      context.fillStyle = `rgba(18,49,95,${(1 - life) ** 2 * 0.5})`;
      context.fillRect(
        particle.x + particle.vx * elapsed - size / 2,
        particle.y + particle.vy * elapsed - size / 2,
        size,
        size,
      );
    }
    if (outline < 1 && approach > 0) {
      const radius = 34 + 10 * Math.sin(now / 90);
      const light = context.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        radius,
      );
      light.addColorStop(0, "rgba(18,49,95,.85)");
      light.addColorStop(0.18, "rgba(38,86,168,.5)");
      light.addColorStop(0.5, "rgba(38,86,168,.14)");
      light.addColorStop(1, "rgba(38,86,168,0)");
      context.fillStyle = light;
      context.beginPath();
      context.arc(head.x, head.y, radius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalCompositeOperation = "source-over";
    root.style.setProperty("--nasce", String(clamp((progress - 0.74) / 0.14)));
    if (!born && progress >= 0.84) {
      born = true;
      onReady();
    }
    if (progress < 1 || particles.length) frame = requestAnimationFrame(render);
    else context.clearRect(0, 0, width, height);
  }
  frame = requestAnimationFrame(render);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
    context.clearRect(0, 0, width, height);
  };
}
