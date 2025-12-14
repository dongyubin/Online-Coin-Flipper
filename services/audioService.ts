// Simple synthesizer for coin sounds using Web Audio API
// This avoids external asset dependencies and broken links

let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playFlipSound = () => {
  const ctx = initAudio();
  if (!ctx) return;

  const t = ctx.currentTime;

  // 1. The "Ping" - High pitched metal ring
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  // Overtones for metallic sound
  osc.type = 'sine';
  osc.frequency.setValueAtTime(2400, t);
  osc.frequency.exponentialRampToValueAtTime(2000, t + 1.0); // Slight pitch drop

  // Envelope
  gain.gain.setValueAtTime(0.15, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.8);

  // 2. The "Thumb Click" - Short impulse
  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  
  clickOsc.frequency.setValueAtTime(150, t);
  clickOsc.frequency.exponentialRampToValueAtTime(0.01, t + 0.1);
  
  clickGain.gain.setValueAtTime(0.3, t);
  clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  
  clickOsc.connect(clickGain);
  clickGain.connect(ctx.destination);
  clickOsc.start(t);
  clickOsc.stop(t + 0.1);
};

export const playLandSound = () => {
  const ctx = initAudio();
  if (!ctx) return;

  const t = ctx.currentTime;

  // 1. Impact "Thud"
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(100, t);
  osc.frequency.exponentialRampToValueAtTime(20, t + 0.1);
  
  gain.gain.setValueAtTime(0.3, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.15);

  // 2. Short metal rattle/settle
  const rattleOsc = ctx.createOscillator();
  const rattleGain = ctx.createGain();
  
  rattleOsc.type = 'sine';
  rattleOsc.frequency.setValueAtTime(2200, t);
  
  rattleGain.gain.setValueAtTime(0.05, t);
  rattleGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  
  rattleOsc.connect(rattleGain);
  rattleGain.connect(ctx.destination);
  rattleOsc.start(t);
  rattleOsc.stop(t + 0.1);
};
