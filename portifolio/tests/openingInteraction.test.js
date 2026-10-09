import test from "node:test";
import assert from "node:assert/strict";
import {
  capsulePoint,
  createButtonEntrance,
} from "../src/lib/openingButtonEntrance.js";
import { playOpeningExitSound } from "../src/lib/openingSound.js";

test("the comet follows a closed rounded pill without jumping at its edges", () => {
  const bounds = { x: 400, y: 600, width: 360, height: 70 };
  const perimeter =
    2 * (bounds.width - bounds.height) + Math.PI * bounds.height;
  assert.deepEqual(capsulePoint(0, bounds), capsulePoint(perimeter, bounds));
  for (const boundary of [290, 290 + Math.PI * 35, 580 + Math.PI * 35]) {
    const before = capsulePoint(boundary - 0.0001, bounds),
      after = capsulePoint(boundary + 0.0001, bounds);
    assert.ok(Math.hypot(after.x - before.x, after.y - before.y) < 0.001);
  }
});

test("reduced-motion mode reveals the button immediately without a frame loop", () => {
  const styles = {};
  let ready = 0;
  const cleanup = createButtonEntrance(
    {
      getContext() {
        return null;
      },
    },
    {},
    {
      style: {
        setProperty(key, value) {
          styles[key] = value;
        },
      },
    },
    {
      reduced: true,
      onReady() {
        ready++;
      },
    },
  );
  assert.equal(styles["--nasce"], "1");
  assert.equal(ready, 1);
  cleanup();
});

test("click sound is a short one-shot sound with no persistent oscillators", () => {
  const sources = [],
    frequencies = [];
  const parameter = () => ({
    setValueAtTime() {},
    exponentialRampToValueAtTime(value) {
      frequencies.push(value);
    },
  });
  const node = () => ({
    gain: parameter(),
    frequency: parameter(),
    Q: {},
    connect() {
      return this;
    },
    start(time) {
      this.started = time;
    },
    stop(time) {
      this.stopped = time;
    },
  });
  let contexts = 0,
    resumes = 0;
  class FakeAudioContext {
    constructor() {
      contexts++;
      this.currentTime = 0;
      this.sampleRate = 48000;
    }
    createGain() {
      return node();
    }
    createOscillator() {
      const source = node();
      sources.push(source);
      return source;
    }
    createBufferSource() {
      const source = node();
      sources.push(source);
      return source;
    }
    createBiquadFilter() {
      return node();
    }
    createBuffer(channels, length) {
      return {
        getChannelData() {
          return new Float32Array(length);
        },
      };
    }
    resume() {
      resumes++;
      return Promise.resolve();
    }
  }
  assert.equal(contexts, 0);
  assert.equal(playOpeningExitSound(undefined), null);
  playOpeningExitSound(FakeAudioContext);
  assert.equal(contexts, 1);
  assert.equal(resumes, 1);
  assert.equal(sources.length, 3);
  assert.ok(
    sources.every(
      (source) => source.stopped > source.started && source.stopped <= 0.8,
    ),
  );
  assert.ok(frequencies.includes(38) && frequencies.includes(52));
});
