import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  Plus,
  Minus,
  Scale,
  Hash,
  RotateCcw,
  ArrowRight,
  Star,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Eraser,
} from "lucide-react";
import {
  SOAL_PENJUMLAHAN,
  SOAL_PENGURANGAN,
  SOAL_GENAP_GANJIL,
} from "../data/dataBerhitung";
import DaduIkon from "./DaduIkon";
import FooterAplikasi from "./FooterAplikasi";
import { mainkanSuaraTombol } from "../utils/suaraTombol";

// Fungsi acak Fisher-Yates
function acakArray(items) {
  const salinan = [...items];
  for (let i = salinan.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [salinan[i], salinan[j]] = [salinan[j], salinan[i]];
  }
  return salinan;
}

// Format angka dengan pemisah koma ribuan: 1000 -> 1,000, 10000 -> 10,000
function formatAngkaRibuan(nilai) {
  const hanyaAngka = String(nilai ?? "").replace(/\D/g, "");
  if (!hanyaAngka) return "";
  const bersih = hanyaAngka.replace(/^0+(?=\d)/, "");
  return bersih.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function GameBerhitung({
  onKembaliKeMenuGame,
  suaraAktif = true,
}) {
  // 'menu' | 'penjumlahan' | 'pengurangan' | 'genap-ganjil' | 'pengenalan-angka'
  const [modeHitung, setModeHitung] = useState("menu");
  const [indeksSoal, setIndeksSoal] = useState(0);
  const [pilihanTerpilih, setPilihanTerpilih] = useState(null);
  const [skor, setSkor] = useState(0);
  const [tampilkanGambarKurang, setTampilkanGambarKurang] = useState(false);
  const [angkaKetik, setAngkaKetik] = useState("1000");

  const bunyi = (jenis = "klik") => {
    if (suaraAktif) {
      mainkanSuaraTombol(jenis);
    }
  };

  const daftarSoalAktif =
    modeHitung === "penjumlahan"
      ? SOAL_PENJUMLAHAN
      : modeHitung === "pengurangan"
        ? SOAL_PENGURANGAN
        : modeHitung === "genap-ganjil"
          ? SOAL_GENAP_GANJIL
          : [];

  const soalSekarang = daftarSoalAktif[indeksSoal] || null;

  const pilihanAcak = useMemo(() => {
    if (!soalSekarang || !soalSekarang.pilihan) return [];
    return acakArray(soalSekarang.pilihan);
  }, [soalSekarang]);

  const mulaiMode = (modeBaru) => {
    bunyi("klik");
    setModeHitung(modeBaru);
    setIndeksSoal(0);
    setPilihanTerpilih(null);
    setSkor(0);
    setTampilkanGambarKurang(false);
    if (modeBaru === "pengenalan-angka") {
      setAngkaKetik("1000");
    }
  };

  const handleJawab = (nilaiPilihan) => {
    if (!soalSekarang || pilihanTerpilih !== null) return;
    setPilihanTerpilih(nilaiPilihan);

    if (nilaiPilihan === soalSekarang.jawaban) {
      bunyi("benar");
      setSkor((s) => s + 1);
    } else {
      bunyi("salah");
    }
  };

  const handleSoalBerikutnya = () => {
    bunyi("klik");
    setPilihanTerpilih(null);
    setTampilkanGambarKurang(false);
    setIndeksSoal((prev) => (prev + 1) % daftarSoalAktif.length);
  };

  const handleUlangGame = () => {
    bunyi("kembali");
    if (modeHitung === "pengenalan-angka") {
      setAngkaKetik("");
      return;
    }
    setIndeksSoal(0);
    setPilihanTerpilih(null);
    setSkor(0);
    setTampilkanGambarKurang(false);
  };

  const handleInputAngka = (e) => {
    const nilaiBersih = e.target.value.replace(/\D/g, "").slice(0, 12);
    if (nilaiBersih !== angkaKetik) {
      bunyi("klik");
    }
    setAngkaKetik(nilaiBersih);
  };

  const angkaTampilBesar = formatAngkaRibuan(angkaKetik);

  const modePermainanSoal =
    modeHitung === "penjumlahan" ||
    modeHitung === "pengurangan" ||
    modeHitung === "genap-ganjil";

  return (
    <div>
      {/* Bar Kontrol Atas */}
      <div className="flex flex-wrap items-center justify-between gap-3 kartu-ceria p-3.5 border-2 border-slate-200 mb-6">
        <button
          onClick={() => {
            bunyi("kembali");
            if (modeHitung === "menu") {
              onKembaliKeMenuGame();
            } else {
              setModeHitung("menu");
              setPilihanTerpilih(null);
              setIndeksSoal(0);
              setTampilkanGambarKurang(false);
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {modeHitung === "menu" ? "Pilih Game Lain" : "Pilihan Mode Berhitung"}
        </button>

        {modePermainanSoal && (
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 text-amber-800 px-4 py-1.5 rounded-xl font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              Skor: {skor}
            </div>
            <button
              onClick={handleUlangGame}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-700 font-bold text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Ulang
            </button>
          </div>
        )}
      </div>

      {/* Pilihan Awal di dalam Game Berhitung: 4 Pilihan */}
      {modeHitung === "menu" && (
        <section className="py-2">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Pilih Jenis Berhitung
            </h2>
            <p className="text-slate-600 text-base">
              Pilih permainan berhitung atau pengenalan angka di bawah ini:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {/* 1. Penjumlahan */}
            <button
              onClick={() => mulaiMode("penjumlahan")}
              className="kartu-ceria kartu-game-pilihan p-6 text-left border-4 border-emerald-300 hover:border-emerald-500 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Plus className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                Pilihan 1
              </span>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Penjumlahan
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Hitung gabungan pola gambar dan angka dengan tanda tambah (+).
              </p>
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-2.5 px-3 text-center text-xl font-bold text-emerald-700">
                2 + 3 = ?
              </div>
            </button>

            {/* 2. Pengurangan */}
            <button
              onClick={() => mulaiMode("pengurangan")}
              className="kartu-ceria kartu-game-pilihan p-6 text-left border-4 border-rose-300 hover:border-rose-500 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                <Minus className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span className="inline-block bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                Pilihan 2
              </span>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Pengurangan
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Cari sisa gambar dan angka setelah dikurangi (-).
              </p>
              <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl py-2.5 px-3 text-center text-xl font-bold text-rose-700">
                5 - 2 = ?
              </div>
            </button>

            {/* 3. Genap Ganjil */}
            <button
              onClick={() => mulaiMode("genap-ganjil")}
              className="kartu-ceria kartu-game-pilihan p-6 text-left border-4 border-sky-300 hover:border-sky-500 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
                <Scale className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span className="inline-block bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                Pilihan 3
              </span>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Genap Ganjil
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Tentukan apakah jumlah gambar dan angka Genap atau Ganjil.
              </p>
              <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl py-2.5 px-3 text-center text-lg font-bold text-sky-700">
                Genap / Ganjil
              </div>
            </button>

            {/* 4. Pengenalan Angka */}
            <button
              onClick={() => mulaiMode("pengenalan-angka")}
              className="kartu-ceria kartu-game-pilihan p-6 text-left border-4 border-amber-300 hover:border-amber-500 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Hash className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                Pilihan 4
              </span>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Pengenalan Angka
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Ketik angka dan lihat tampilannya besar dengan format ribuan.
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl py-2.5 px-3 text-center text-xl font-bold text-amber-600">
                1,000 • 10,000
              </div>
            </button>
          </div>
        </section>
      )}

      {/* Mode Pengenalan Angka */}
      {modeHitung === "pengenalan-angka" && (
        <section className="max-w-3xl mx-auto">
          <div className="kartu-ceria p-5 sm:p-8 border-4 border-amber-200 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">
              Pengenalan Angka
            </h3>
            <p className="text-sm text-slate-600 mb-5">
              Ketik angka pada kotak di bawah ini untuk melihat bentuk angka
              besar dan format komanya.
            </p>

            {/* Textbox Input Angka + Tombol Hapus */}
            <div className="flex items-center justify-center gap-2.5 max-w-md mx-auto mb-6">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={angkaKetik}
                onChange={handleInputAngka}
                placeholder="Ketik angka, misal: 1000"
                aria-label="Ketik angka"
                className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 focus:border-amber-500 focus:outline-none bg-white text-slate-800 font-bold text-lg sm:text-xl text-center shadow-inner"
              />
              {angkaKetik && (
                <button
                  type="button"
                  onClick={() => {
                    bunyi("kembali");
                    setAngkaKetik("");
                  }}
                  className="tombol-3d inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-700 font-bold text-sm shrink-0 cursor-pointer"
                >
                  <Eraser className="w-4 h-4" /> Hapus
                </button>
              )}
            </div>

            {/* Tampilan Angka Besar (Font Ramah Anak & 1 Warna Cerah) */}
            <div className="min-h-[140px] sm:min-h-[170px] flex flex-col items-center justify-center rounded-3xl bg-amber-50/70 border-2 border-dashed border-amber-300 px-4 py-6 mb-5">
              <div
                style={{
                  fontFamily:
                    "'Fredoka', 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif",
                }}
                className="text-5xl sm:text-7xl md:text-8xl font-bold text-amber-500 tracking-wide break-all leading-tight select-all"
              >
                {angkaTampilBesar || "?"}
              </div>
            </div>

            {/* Tombol Contoh Cepat Ribuan / Puluhan Ribu / Ratusan Ribu */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["100", "1000", "10000", "100000"].map((contoh) => (
                <button
                  key={contoh}
                  type="button"
                  onClick={() => {
                    bunyi("klik");
                    setAngkaKetik(contoh);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-amber-100 border-2 border-amber-200 text-amber-700 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  {formatAngkaRibuan(contoh)}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Area Soal Aktif */}
      {modePermainanSoal && soalSekarang && (
        <section className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="inline-block bg-white px-3.5 py-1 rounded-full border-2 border-amber-200 text-xs font-bold text-slate-600">
              Soal {indeksSoal + 1} dari {daftarSoalAktif.length}
            </span>
          </div>

          <div className="kartu-ceria p-4 sm:p-6 border-4 border-amber-200 text-center">
            {/* Mode Penjumlahan */}
            {modeHitung === "penjumlahan" && (
              <>
                <div className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
                  <span className="text-emerald-600">
                    {soalSekarang.angkaA}
                  </span>{" "}
                  <span className="text-amber-500">+</span>{" "}
                  <span className="text-sky-600">{soalSekarang.angkaB}</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-rose-500">?</span>
                </div>

                <div className="flex flex-row items-center justify-center gap-3 sm:gap-5 mb-4">
                  <DaduIkon
                    jumlah={soalSekarang.angkaA}
                    jenisIkon={soalSekarang.jenisIkon}
                    warnaIkon={soalSekarang.warnaIkon}
                  />

                  <span className="text-2xl sm:text-3xl font-bold text-amber-500 shrink-0">
                    +
                  </span>

                  <DaduIkon
                    jumlah={soalSekarang.angkaB}
                    jenisIkon={soalSekarang.jenisIkon}
                    warnaIkon={soalSekarang.warnaIkon}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                  {pilihanAcak.map((opsi) => {
                    const terpilih = pilihanTerpilih === opsi;
                    const benar = opsi === soalSekarang.jawaban;
                    let gayaTombol =
                      "bg-amber-100 hover:bg-amber-200 border-amber-400 text-slate-800";

                    if (pilihanTerpilih !== null) {
                      if (benar) {
                        gayaTombol =
                          "bg-emerald-500 border-emerald-700 text-white";
                      } else if (terpilih) {
                        gayaTombol = "bg-rose-500 border-rose-700 text-white";
                      }
                    }

                    return (
                      <button
                        key={opsi}
                        onClick={() => handleJawab(opsi)}
                        disabled={pilihanTerpilih !== null}
                        className={`tombol-3d py-3 rounded-2xl border-2 text-2xl font-bold cursor-pointer disabled:cursor-default ${gayaTombol}`}
                      >
                        {opsi}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Mode Pengurangan */}
            {modeHitung === "pengurangan" && (
              <>
                <div className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
                  <span className="text-rose-600">
                    {soalSekarang.angkaAwal}
                  </span>{" "}
                  <span className="text-amber-500">-</span>{" "}
                  <span className="text-sky-600">
                    {soalSekarang.angkaKurang}
                  </span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-emerald-600">?</span>
                </div>

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      bunyi("klik");
                      setTampilkanGambarKurang((prev) => !prev);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 border-2 border-rose-300 text-rose-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {tampilkanGambarKurang ? (
                      <>
                        <EyeOff className="w-4 h-4" /> Sembunyikan Gambar
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" /> Tampilkan Gambar
                      </>
                    )}
                  </button>
                </div>

                {tampilkanGambarKurang && (
                  <div className="bg-rose-50/80 border-2 border-rose-200 rounded-2xl px-4 py-2 max-w-xs mx-auto mb-4">
                    <p className="text-xs font-bold text-rose-700">
                      {soalSekarang.angkaAwal} {soalSekarang.labelObjek},
                      dicoret {soalSekarang.angkaKurang}
                    </p>
                    <DaduIkon
                      jumlah={soalSekarang.angkaAwal}
                      jenisIkon={soalSekarang.jenisIkon}
                      warnaIkon={soalSekarang.warnaIkon}
                      dicoretJumlah={soalSekarang.angkaKurang}
                    />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                  {pilihanAcak.map((opsi) => {
                    const terpilih = pilihanTerpilih === opsi;
                    const benar = opsi === soalSekarang.jawaban;
                    let gayaTombol =
                      "bg-amber-100 hover:bg-amber-200 border-amber-400 text-slate-800";

                    if (pilihanTerpilih !== null) {
                      if (benar) {
                        gayaTombol =
                          "bg-emerald-500 border-emerald-700 text-white";
                      } else if (terpilih) {
                        gayaTombol = "bg-rose-500 border-rose-700 text-white";
                      }
                    }

                    return (
                      <button
                        key={opsi}
                        onClick={() => handleJawab(opsi)}
                        disabled={pilihanTerpilih !== null}
                        className={`tombol-3d py-3 rounded-2xl border-2 text-2xl font-bold cursor-pointer disabled:cursor-default ${gayaTombol}`}
                      >
                        {opsi}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Mode Genap Ganjil */}
            {modeHitung === "genap-ganjil" && (
              <>
                <div className="flex items-center justify-center gap-4 mb-3">
                  <span className="text-4xl sm:text-5xl font-bold text-sky-600">
                    {soalSekarang.angka}
                  </span>
                  <div className="bg-sky-50/80 border-2 border-sky-200 rounded-2xl px-4 py-2">
                    <p className="text-xs font-bold text-sky-700">
                      {soalSekarang.angka} {soalSekarang.labelObjek}
                    </p>
                    <DaduIkon
                      jumlah={soalSekarang.angka}
                      jenisIkon={soalSekarang.jenisIkon}
                      warnaIkon={soalSekarang.warnaIkon}
                    />
                  </div>
                </div>

                <p className="text-sm font-bold text-slate-600 mb-3">
                  Termasuk Genap atau Ganjil?
                </p>

                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                  {["Genap", "Ganjil"].map((opsi) => {
                    const terpilih = pilihanTerpilih === opsi;
                    const benar = opsi === soalSekarang.jawaban;
                    let gayaTombol =
                      opsi === "Genap"
                        ? "bg-emerald-100 hover:bg-emerald-200 border-emerald-400 text-emerald-800"
                        : "bg-violet-100 hover:bg-violet-200 border-violet-400 text-violet-800";

                    if (pilihanTerpilih !== null) {
                      if (benar) {
                        gayaTombol =
                          "bg-emerald-500 border-emerald-700 text-white";
                      } else if (terpilih) {
                        gayaTombol = "bg-rose-500 border-rose-700 text-white";
                      }
                    }

                    return (
                      <button
                        key={opsi}
                        onClick={() => handleJawab(opsi)}
                        disabled={pilihanTerpilih !== null}
                        className={`tombol-3d py-3 rounded-2xl border-2 text-lg sm:text-xl font-bold cursor-pointer disabled:cursor-default ${gayaTombol}`}
                      >
                        {opsi}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Umpan Balik Jawaban & Tombol Soal Berikutnya */}
            {pilihanTerpilih !== null && (
              <div className="mt-4 pt-4 border-t-2 border-slate-100 flex flex-col items-center gap-2.5">
                {pilihanTerpilih === soalSekarang.jawaban ? (
                  <div className="inline-flex items-center gap-2 text-emerald-600 font-bold text-base">
                    <CheckCircle2 className="w-5 h-5" /> Hebat! Jawabanmu tepat.
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 text-rose-600 font-bold text-base">
                    <XCircle className="w-5 h-5" /> Belum tepat. Jawaban yang
                    benar: {soalSekarang.jawaban}
                  </div>
                )}

                <button
                  onClick={handleSoalBerikutnya}
                  className="tombol-3d inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 border-amber-600 text-slate-900 font-bold text-sm cursor-pointer"
                >
                  Soal Berikutnya <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer Terpisah */}
      <FooterAplikasi namaAplikasi="Dunia Main & Belajar" tahun={2026} />
    </div>
  );
}
