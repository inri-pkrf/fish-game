// Web Audio API sound effects — generated, no external files needed.
let ctx = null;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) ctx = new AC();
  }
  if (ctx && ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq, start, duration, type = "sine", gain = 0.2) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + start);
  g.gain.setValueAtTime(0, c.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, c.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + duration);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(c.currentTime + start);
  osc.stop(c.currentTime + start + duration + 0.05);
}

export const sounds = {
  correct() {
    tone(523.25, 0, 0.18, "triangle", 0.25);
    tone(659.25, 0.12, 0.18, "triangle", 0.25);
    tone(783.99, 0.24, 0.3, "triangle", 0.25);
  },
  wrong() {
    tone(220, 0, 0.18, "sawtooth", 0.2);
    tone(174.61, 0.16, 0.35, "sawtooth", 0.2);
  },
  tick() {
    tone(880, 0, 0.06, "square", 0.12);
  },
  cast() {
    // water splash
    const c = getCtx();
    if (!c) return;
    const noise = c.createBufferSource();
    const buffer = c.createBuffer(1, c.sampleRate * 0.3, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
    }
    noise.buffer = buffer;
    const filter = c.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, c.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.3);
    const g = c.createGain();
    g.gain.setValueAtTime(0.3, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3);
    noise.connect(filter);
    filter.connect(g);
    g.connect(c.destination);
    noise.start();
  },
  catchFish() {
    tone(440, 0, 0.1, "sine", 0.2);
    tone(587.33, 0.08, 0.12, "sine", 0.2);
  },
  victory() {
    tone(523.25, 0, 0.2, "triangle", 0.25);
    tone(659.25, 0.18, 0.2, "triangle", 0.25);
    tone(783.99, 0.36, 0.2, "triangle", 0.25);
    tone(1046.5, 0.54, 0.4, "triangle", 0.25);
  },
  click() {
    tone(600, 0, 0.05, "square", 0.08);
  }
};