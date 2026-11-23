let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function mainkanSuaraTombol(jenis = "klik") {
  const ctx = getAudioContext();
  if (!ctx) return;

  const sekarang = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  if (jenis === "acak") {
    // Nada naik ceria untuk tombol acak urutan
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, sekarang);
    osc.frequency.exponentialRampToValueAtTime(660, sekarang + 0.09);
  } else if (jenis === "kembali") {
    // Nada turun lembut untuk tombol kembali
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, sekarang);
    osc.frequency.exponentialRampToValueAtTime(340, sekarang + 0.08);
  } else {
    // Suara 'pop' singkat untuk klik tombol umum
    osc.type = "triangle";
    osc.frequency.setValueAtTime(580, sekarang);
    osc.frequency.exponentialRampToValueAtTime(280, sekarang + 0.065);
  }

  gain.gain.setValueAtTime(0.001, sekarang);
  gain.gain.linearRampToValueAtTime(0.14, sekarang + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, sekarang + 0.09);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(sekarang);
  osc.stop(sekarang + 0.095);
}
