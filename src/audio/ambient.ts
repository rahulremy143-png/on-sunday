/**
 * AmbientOcean
 * ------------
 * A gentle, generative "ocean wash" built entirely with the Web Audio API — no
 * binary asset shipped. It is filtered white noise whose low-pass cutoff and
 * gain drift slowly like distant surf, kept at a very low volume.
 *
 * Rules honoured (per the vision doc): OFF by default, NEVER autoplays. The
 * AudioContext is created and resumed only in response to a user gesture (the
 * toggle), satisfying browser autoplay policies.
 */
export class AmbientOcean {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBufferSourceNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private started = false;

  get isPlaying(): boolean {
    return this.started;
  }

  private buildNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const seconds = 4;
    const length = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // Brown-ish noise: integrate white noise for a softer, surf-like spectrum.
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    return buffer;
  }

  /** Start (or resume) the ambience. Must be called from a user gesture. */
  async start(): Promise<void> {
    if (this.started) return;

    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();

      const ctx = this.ctx;
      this.master = ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(ctx.destination);

      this.noise = ctx.createBufferSource();
      this.noise.buffer = this.buildNoiseBuffer(ctx);
      this.noise.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 480;
      lowpass.Q.value = 0.6;

      // Slow surf swell modulating the filter cutoff.
      this.lfo = ctx.createOscillator();
      this.lfo.frequency.value = 0.08;
      this.lfoGain = ctx.createGain();
      this.lfoGain.gain.value = 180;
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(lowpass.frequency);

      this.noise.connect(lowpass);
      lowpass.connect(this.master);

      this.noise.start();
      this.lfo.start();
    }

    if (this.ctx.state === 'suspended') await this.ctx.resume();

    // Fade in to a very low, unobtrusive volume.
    const now = this.ctx.currentTime;
    this.master?.gain.cancelScheduledValues(now);
    this.master?.gain.setValueAtTime(this.master.gain.value, now);
    this.master?.gain.linearRampToValueAtTime(0.05, now + 1.5);
    this.started = true;
  }

  /** Fade out and suspend (keeps nodes for a quick restart). */
  async stop(): Promise<void> {
    if (!this.ctx || !this.master || !this.started) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.8);
    this.started = false;
    window.setTimeout(() => {
      if (!this.started && this.ctx && this.ctx.state === 'running') {
        void this.ctx.suspend();
      }
    }, 900);
  }

  dispose(): void {
    try {
      this.noise?.stop();
      this.lfo?.stop();
      void this.ctx?.close();
    } catch {
      /* no-op */
    }
    this.ctx = null;
    this.started = false;
  }
}
