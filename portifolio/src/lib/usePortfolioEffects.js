import { useEffect } from "react";
import * as THREE from "three";

const fragmentShader = `
precision mediump float;
uniform vec2 resolution;
uniform float time;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float n=0.,a=.5;for(int i=0;i<4;i++){n+=noise(p)*a;p=mat2(.8,.6,-.6,.8)*p*2.03;a*=.5;}return n;}
void main(){vec2 uv=gl_FragCoord.xy/resolution;vec2 p=(uv-.5)*vec2(resolution.x/resolution.y,1.)*2.6;float t=time*.025;vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));vec2 r=vec2(fbm(p+3.*q+vec2(1.7,9.2)),fbm(p+3.*q+vec2(8.3,2.8)));float f=fbm(p+3.4*r);vec3 color=mix(vec3(.02,.024,.039),vec3(.045,.075,.145),f);color+=vec3(.06,.1,.2)*pow(max(0.,1.-abs(f-.56)*7.5),3.);color*=.6+.4*smoothstep(.8,.15,length(uv-.5));color+=(hash(gl_FragCoord.xy)-.5)*.013;gl_FragColor=vec4(color,1.);}`;

export function usePortfolioEffects({
  entered,
  portrait,
  origin,
  destination,
  setActive,
}) {
  useEffect(() => {
    if (!entered) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const face = portrait.current;
    const source = origin.current;
    const target = destination.current;
    const dot = document.querySelector(".cursor");
    const ring = document.querySelector(".cursor-anel");
    const fire = document.querySelector(".fogo-tela");
    const context = fire?.getContext("2d");
    const particles = [];
    let mouse = { x: -100, y: -100 },
      follower = { x: -100, y: -100 };
    let frame,
      distance = 1,
      fireWidth = 0,
      fireHeight = 0,
      renderer,
      material,
      scene,
      camera,
      previousTime = 0;
    const canvas = document.getElementById("textura");
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
      renderer.setPixelRatio(0.55);
      scene = new THREE.Scene();
      camera = new THREE.Camera();
      material = new THREE.ShaderMaterial({
        vertexShader: "void main(){gl_Position=vec4(position.xy,0.,1.);}",
        fragmentShader,
        uniforms: {
          resolution: { value: new THREE.Vector2() },
          time: { value: 0 },
        },
      });
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
    } catch {
      document.documentElement.classList.add("sem-textura");
    }
    const resize = () => {
      distance = Math.max(
        1,
        document.getElementById("sobre").getBoundingClientRect().top +
          window.scrollY -
          74,
      );
      if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        material.uniforms.resolution.value.set(canvas.width, canvas.height);
      }
      if (fire) {
        const box = fire.parentElement.getBoundingClientRect();
        fireWidth = box.width + 140;
        fireHeight = box.height + 140;
        fire.width = fireWidth * 1.5;
        fire.height = fireHeight * 1.5;
        fire.style.width = `${fireWidth}px`;
        fire.style.height = `${fireHeight}px`;
        context?.setTransform(1.5, 0, 0, 1.5, 0, 0);
      }
    };
    const pointer = (event) => {
      mouse = { x: event.clientX, y: event.clientY };
      document.body.classList.add("cursor-vivo");
      ring?.classList.toggle(
        "perto",
        Boolean(event.target.closest("a,button")),
      );
    };
    const leave = () => document.body.classList.remove("cursor-vivo");
    if (fine && !reduced) {
      window.addEventListener("pointermove", pointer);
      document.addEventListener("pointerleave", leave);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main > section,main > footer")
      .forEach((section) => observer.observe(section));
    const animate = (now) => {
      const start = source.getBoundingClientRect(),
        end = target.getBoundingClientRect();
      let p = Math.min(1, Math.max(0, window.scrollY / distance));
      p = p * p * (3 - 2 * p);
      if (reduced) p = window.scrollY > distance * 0.5 ? 1 : 0;
      const mix = (a, b) => a + (b - a) * p;
      const top = mix(start.top, end.top),
        height = mix(start.height, end.height);
      face.style.transform = `translate3d(${mix(start.left, end.left)}px,${top}px,0)`;
      face.style.width = `${mix(start.width, end.width)}px`;
      face.style.height = `${height}px`;
      face.style.setProperty("--fusao", 1 - p);
      face.style.visibility =
        top + height < 0 || top > window.innerHeight ? "hidden" : "visible";
      if (fine && !reduced) {
        follower.x += (mouse.x - follower.x) * 0.15;
        follower.y += (mouse.y - follower.y) * 0.15;
        dot.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0)`;
        ring.style.transform = `translate3d(${follower.x}px,${follower.y}px,0)`;
      }
      if (now - previousTime > 33) {
        previousTime = now;
        if (renderer && !document.hidden) {
          material.uniforms.time.value = reduced ? 12 : now / 1000;
          renderer.render(scene, camera);
        }
        if (
          context &&
          !reduced &&
          fire.getBoundingClientRect().top < window.innerHeight &&
          fire.getBoundingClientRect().bottom > 0
        ) {
          context.clearRect(0, 0, fireWidth, fireHeight);
          if (particles.length < 55) {
            const angle = Math.random() * Math.PI * 2;
            particles.push({
              x: fireWidth / 2 + (Math.cos(angle) * (fireWidth - 140)) / 2,
              y: fireHeight / 2 + (Math.sin(angle) * (fireHeight - 140)) / 2,
              vx: Math.cos(angle) * 0.45,
              vy: -Math.random() * 0.8 - 0.2,
              life: 1,
              size: Math.random() * 1.7 + 0.5,
            });
          }
          for (let i = particles.length - 1; i >= 0; i--) {
            const spark = particles[i];
            spark.x += spark.vx;
            spark.y += spark.vy;
            spark.life -= 0.015;
            if (spark.life <= 0) {
              particles.splice(i, 1);
              continue;
            }
            context.beginPath();
            context.fillStyle = `rgba(120,170,255,${spark.life})`;
            context.shadowColor = "#3d72c9";
            context.shadowBlur = 8;
            context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
            context.fill();
          }
        }
      }
      frame = requestAnimationFrame(animate);
    };
    resize();
    window.addEventListener("resize", resize);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.getElementById("sobre"));
    frame = requestAnimationFrame(animate);
    if (window.location.hash)
      requestAnimationFrame(() => {
        const section = document.getElementById(window.location.hash.slice(1));
        if (section) {
          section.scrollIntoView();
        }
      });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointer);
      document.removeEventListener("pointerleave", leave);
      document.body.classList.remove("cursor-vivo");
      scene?.traverse((item) => item.geometry?.dispose());
      material?.dispose();
      renderer?.dispose();
    };
  }, [entered, portrait, origin, destination, setActive]);
}
