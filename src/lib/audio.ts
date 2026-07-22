/**
 * Dynamic Web Audio API synthesizer for premium, high-fidelity tactile micro-feedback.
 * No external .mp3 files needed, 100% offline-friendly and low latency.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

/**
 * Plays a highly refined, premium "tactile glass tap" micro-sound.
 * Optimized for professional portfolio UI feedback.
 */
export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended (browser security autoplays)
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const now = ctx.currentTime;
  
  // 1. Create primary synthesizer node (soft organic sine wave)
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc.type = "sine";
  // Initial frequency sweep to give a soft tactile 'tap' feel, then drops instantly
  osc.frequency.setValueAtTime(1100, now);
  osc.frequency.exponentialRampToValueAtTime(260, now + 0.03);
  
  // High-fidelity volume envelope
  gainNode.gain.setValueAtTime(0.0, now);
  gainNode.gain.linearRampToValueAtTime(0.035, now + 0.003); // ultra fast attack
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04); // soft organic decay

  // 2. High-pass filter to clean up low-frequency thuds and make it feel "glassy"
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(280, now);

  // Connect nodes
  osc.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Play and stop
  osc.start(now);
  osc.stop(now + 0.05);
}

/**
 * Plays a slightly deeper tactile click for secondary navigation or cancels.
 */
export function playSecondaryClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc.type = "triangle";
  osc.frequency.setValueAtTime(700, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.04);
  
  gainNode.gain.setValueAtTime(0.0, now);
  gainNode.gain.linearRampToValueAtTime(0.025, now + 0.004);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(180, now);

  osc.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.07);
}
