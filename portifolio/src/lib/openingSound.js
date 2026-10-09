/** Created only by the main entry button's user gesture. No autoplay or ambient loop. */
export function playOpeningExitSound(AudioContextClass) {
  if (!AudioContextClass) return null;
  let context;
  try {
    context = new AudioContextClass();
  } catch {
    return null;
  }
  const master = context.createGain();
  master.gain.value = 0.6;
  master.connect(context.destination);
  const at = context.currentTime;
  function envelope(gain, start, peak, attack, duration) {
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(peak, start + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + attack + duration);
  }
  function tone(type, from, to, offset, duration, peak) {
    const oscillator = context.createOscillator(),
      gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(from, at + offset);
    oscillator.frequency.exponentialRampToValueAtTime(
      to,
      at + offset + duration,
    );
    envelope(gain, at + offset, peak, 0.004, duration);
    oscillator.connect(gain).connect(master);
    oscillator.start(at + offset);
    oscillator.stop(at + offset + duration + 0.05);
  }
  const buffer = context.createBuffer(
    1,
    Math.ceil(context.sampleRate * 0.08),
    context.sampleRate,
  );
  const values = buffer.getChannelData(0);
  for (let i = 0; i < values.length; i++) values[i] = Math.random() * 2 - 1;
  const noise = context.createBufferSource(),
    filter = context.createBiquadFilter(),
    gain = context.createGain();
  noise.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.value = 2200;
  filter.Q.value = 2;
  envelope(gain, at, 0.22, 0.005, 0.02);
  noise.connect(filter).connect(gain).connect(master);
  noise.start(at);
  noise.stop(at + 0.075);
  tone("sine", 95, 38, 0, 0.22, 0.34);
  tone("triangle", 220, 52, 0.04, 0.65, 0.07);
  context.resume().catch(() => {});
  return context;
}
