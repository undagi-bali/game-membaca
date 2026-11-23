let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function mainkanNada(
  ctx,
  {
    frekuensi = 440,
    tipe = "sine",
    mulai = 0,
    durasi = 0.15,
    volume = 0.12,
    frekuensiAkhir = null,
  },
) {
  const now = ctx.currentTime + mulai;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = tipe;
  osc.frequency.setValueAtTime(frekuensi, now);
  if (frekuensiAkhir !== null) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(20, frekuensiAkhir),
      now + durasi,
    );
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + durasi);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + durasi + 0.02);
}

// Efek letupan singkat ("pop" / kerlap petasan) menggunakan white noise
function mainkanLetupanPetasan(ctx, mulai = 0, durasi = 0.12, volume = 0.14) {
  const sampleRate = ctx.sampleRate;
  const jumlahSample = Math.floor(sampleRate * durasi);
  const buffer = ctx.createBuffer(1, jumlahSample, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < jumlahSample; i++) {
    // Peluruhan cepat agar terdengar seperti "pop / crackle" petasan mini
    const envelope = Math.pow(1 - i / jumlahSample, 2.5);
    data[i] = (Math.random() * 2 - 1) * envelope;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1800, ctx.currentTime + mulai);
  filter.Q.setValueAtTime(1.2, ctx.currentTime + mulai);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime + mulai);
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    ctx.currentTime + mulai + durasi,
  );

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(ctx.currentTime + mulai);
  noise.stop(ctx.currentTime + mulai + durasi + 0.01);
}

export function mainkanSuaraTombol(jenis = "klik") {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (jenis === "benar") {
    // 1. Nada congratulation ceria (C5 - E5 - G5 - C6)
    const nadaFanfare = [
      { freq: 523.25, delay: 0.0, dur: 0.12 }, // C5
      { freq: 659.25, delay: 0.09, dur: 0.12 }, // E5
      { freq: 783.99, delay: 0.18, dur: 0.14 }, // G5
      { freq: 1046.5, delay: 0.28, dur: 0.28 }, // C6
    ];

    nadaFanfare.forEach(({ freq, delay, dur }) => {
      mainkanNada(ctx, {
        frekuensi: freq,
        tipe: "triangle",
        mulai: delay,
        durasi: dur,
        volume: 0.16,
      });
    });

    // 2. Efek petasan ulang tahun ("pop" + kerlap konfeti)
    mainkanLetupanPetasan(ctx, 0.02, 0.09, 0.18);
    mainkanLetupanPetasan(ctx, 0.16, 0.11, 0.14);
    mainkanLetupanPetasan(ctx, 0.28, 0.14, 0.16);
    mainkanNada(ctx, {
      frekuensi: 1318.5,
      frekuensiAkhir: 1760,
      tipe: "sine",
      mulai: 0.3,
      durasi: 0.18,
      volume: 0.07,
    });
    return;
  }

  if (jenis === "salah") {
    // Dua nada turun lembut (E4 -> C4)
    mainkanNada(ctx, {
      frekuensi: 329.63,
      frekuensiAkhir: 293.66,
      tipe: "triangle",
      mulai: 0,
      durasi: 0.16,
      volume: 0.13,
    });
    mainkanNada(ctx, {
      frekuensi: 261.63,
      frekuensiAkhir: 220.0,
      tipe: "triangle",
      mulai: 0.14,
      durasi: 0.22,
      volume: 0.13,
    });
    return;
  }

  if (jenis === "acak") {
    mainkanNada(ctx, {
      frekuensi: 587.33,
      frekuensiAkhir: 880,
      tipe: "sine",
      mulai: 0,
      durasi: 0.12,
      volume: 0.1,
    });
    return;
  }

  if (jenis === "kembali") {
    mainkanNada(ctx, {
      frekuensi: 440,
      frekuensiAkhir: 330,
      tipe: "sine",
      mulai: 0,
      durasi: 0.11,
      volume: 0.09,
    });
    return;
  }

  // Default: "klik"
  mainkanNada(ctx, {
    frekuensi: 660,
    frekuensiAkhir: 780,
    tipe: "sine",
    mulai: 0,
    durasi: 0.07,
    volume: 0.09,
  });
}
