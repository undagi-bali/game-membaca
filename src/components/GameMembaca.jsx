import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Maximize2,
  Grid,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import {
  DATA_VOKAL,
  DATA_KONSONAN,
  TEMA_WARNA_SUKU_KATA,
} from "../data/dataMembaca";
import SlotGambar from "./SlotGambar";

export default function GameMembaca({ onKembaliKeMenuGame }) {
  // 'menu' | 'vokal' | 'konsonan'
  const [modeBelajar, setModeBelajar] = useState("menu");
  const [konsonanTerpilih, setKonsonanTerpilih] = useState("B");
  const [tampilkanGambar, setTampilkanGambar] = useState(true);
  const [modeKartuBesar, setModeKartuBesar] = useState(false);
  const [kartuFokus, setKartuFokus] = useState(null);

  const dataKonsonanAktif =
    DATA_KONSONAN.find((item) => item.konsonanBesar === konsonanTerpilih) ||
    DATA_KONSONAN[0];

  return (
    <div>
      {/* Bar Kontrol Atas */}
      <div className="flex flex-wrap items-center justify-between gap-3 kartu-ceria p-3.5 border-2 border-slate-200 mb-6">
        <button
          onClick={() => {
            if (modeBelajar === "menu") {
              onKembaliKeMenuGame();
            } else {
              setModeBelajar("menu");
              setKartuFokus(null);
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {modeBelajar === "menu"
            ? "Pilih Game Lain"
            : "Pilihan Vokal / Konsonan"}
        </button>

        {modeBelajar !== "menu" && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setTampilkanGambar(!tampilkanGambar)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all cursor-pointer border-2 ${
                tampilkanGambar
                  ? "bg-emerald-100 border-emerald-400 text-emerald-700"
                  : "bg-slate-100 border-slate-300 text-slate-600"
              }`}
            >
              {tampilkanGambar ? (
                <>
                  <Eye className="w-4 h-4" /> Gambar Aktif
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4" /> Gambar Disembunyikan
                </>
              )}
            </button>

            <button
              onClick={() => setModeKartuBesar(!modeKartuBesar)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all cursor-pointer border-2 ${
                modeKartuBesar
                  ? "bg-amber-100 border-amber-400 text-amber-800"
                  : "bg-slate-100 border-slate-300 text-slate-600"
              }`}
            >
              {modeKartuBesar ? (
                <>
                  <Grid className="w-4 h-4" /> Tampilan Normal
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" /> Mode Kartu Besar
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Pilihan Awal di dalam Game Membaca: Vokal vs Selain Vokal */}
      {modeBelajar === "menu" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto py-4">
          <button
            onClick={() => setModeBelajar("vokal")}
            className="group relative kartu-ceria kartu-game-pilihan p-7 sm:p-8 text-left border-4 border-rose-300 hover:border-rose-500 cursor-pointer overflow-hidden"
          >
            <span className="inline-block bg-rose-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4 shadow-sm">
              Vokal (AIUEO)
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Huruf Vokal
            </h3>
            <p className="text-slate-600 mb-6 text-base">
              Belajar huruf hidup A, I, U, E, O dengan huruf besar dan kecil.
            </p>
            <div className="flex items-center justify-between gap-2 bg-rose-50 p-4 rounded-2xl border-2 border-rose-200">
              {["Aa", "Ii", "Uu", "Ee", "Oo"].map((huruf, idx) => (
                <span
                  key={idx}
                  className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl font-bold text-rose-500 border border-rose-200"
                >
                  {huruf}
                </span>
              ))}
            </div>
          </button>

          <button
            onClick={() => setModeBelajar("konsonan")}
            className="group relative kartu-ceria kartu-game-pilihan p-7 sm:p-8 text-left border-4 border-sky-300 hover:border-sky-500 cursor-pointer overflow-hidden"
          >
            <span className="inline-block bg-sky-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4 shadow-sm">
              Selain Vokal
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Konsonan & Suku Kata
            </h3>
            <p className="text-slate-600 mb-6 text-base">
              Pilih B, C, D, dst. untuk membaca BA BI BU BE BO, CA CI CU CE CO!
            </p>
            <div className="flex items-center justify-between gap-1.5 bg-sky-50 p-4 rounded-2xl border-2 border-sky-200">
              {["BA", "BI", "BU", "BE", "BO"].map((suku, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-2 rounded-xl bg-white shadow-sm flex items-center justify-center text-base sm:text-lg font-bold text-sky-600 border border-sky-200"
                >
                  {suku}
                </span>
              ))}
            </div>
          </button>
        </div>
      )}

      {/* Halaman Vokal */}
      {modeBelajar === "vokal" && (
        <section>
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Huruf Vokal: <span className="text-rose-500">A</span> -{" "}
              <span className="text-sky-500">I</span> -{" "}
              <span className="text-emerald-500">U</span> -{" "}
              <span className="text-amber-500">E</span> -{" "}
              <span className="text-purple-500">O</span>
            </h2>
          </div>

          <div
            className={`grid gap-5 sm:gap-6 ${
              modeKartuBesar
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            }`}
          >
            {DATA_VOKAL.map((item) => {
              const sedangFokus = kartuFokus === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setKartuFokus(sedangFokus ? null : item.id)}
                  className={`kartu-ceria kartu-game-pilihan rounded-3xl p-5 border-4 cursor-pointer flex flex-col justify-between text-center ${
                    item.warnaKartu
                  } ${sedangFokus ? "ring-4 ring-amber-300 scale-[1.02]" : ""}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${item.warnaBadge}`}
                    >
                      Vokal
                    </span>
                    {sedangFokus && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>

                  <div className="my-2 flex items-baseline justify-center gap-2">
                    <span
                      className={`font-bold leading-none ${
                        modeKartuBesar ? "text-7xl" : "text-6xl"
                      }`}
                    >
                      {item.hurufBesar}
                    </span>
                    <span
                      className={`font-bold leading-none ${item.warnaTeksKecil} ${
                        modeKartuBesar ? "text-6xl" : "text-5xl"
                      }`}
                    >
                      {item.hurufKecil}
                    </span>
                  </div>

                  <SlotGambar
                    gambarUrl={item.gambarUrl}
                    kataContoh={item.kataContoh}
                    tampilkanGambar={tampilkanGambar}
                  />

                  <div className="mt-2 bg-white/85 rounded-2xl py-2 px-3 border border-white">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                      Contoh Kata
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-slate-800">
                      {item.kataContoh}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Halaman Konsonan & Suku Kata */}
      {modeBelajar === "konsonan" && (
        <section>
          <div className="text-center mb-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Pilih Huruf Konsonan
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Klik huruf di bawah untuk melihat kombinasi suku kata (
              <strong>BA BI BU BE BO</strong>, <strong>CA CI CU CE CO</strong>,
              dst.)
            </p>
          </div>

          <div className="kartu-ceria p-4 sm:p-5 border-2 border-slate-200 mb-7">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {DATA_KONSONAN.map((konsonan) => {
                const aktif =
                  konsonan.konsonanBesar === dataKonsonanAktif.konsonanBesar;
                return (
                  <button
                    key={konsonan.konsonanBesar}
                    onClick={() => {
                      setKonsonanTerpilih(konsonan.konsonanBesar);
                      setKartuFokus(null);
                    }}
                    className={`tombol-3d w-12 h-12 sm:w-14 sm:h-14 rounded-2xl font-bold text-lg sm:text-xl text-white flex items-center justify-center cursor-pointer ${
                      konsonan.warnaTombol
                    } ${
                      aktif
                        ? "ring-4 ring-amber-300 scale-110 z-10"
                        : "opacity-85 hover:opacity-100"
                    }`}
                  >
                    {konsonan.konsonanBesar}
                    <span className="text-sm ml-0.5 opacity-90">
                      {konsonan.konsonanKecil}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-sm border-2 border-sky-200 mb-2">
              <span className="text-sm font-bold text-slate-500">
                Suku Kata Huruf:
              </span>
              <span className="text-xl font-bold text-sky-600">
                {dataKonsonanAktif.konsonanBesar}{" "}
                {dataKonsonanAktif.konsonanKecil}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-wide">
              {dataKonsonanAktif.sukuKata.map((s) => s.besar).join(" - ")}
            </h3>
          </div>

          <div
            className={`grid gap-5 sm:gap-6 ${
              modeKartuBesar
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            }`}
          >
            {dataKonsonanAktif.sukuKata.map((suku, idx) => {
              const tema =
                TEMA_WARNA_SUKU_KATA[idx % TEMA_WARNA_SUKU_KATA.length];
              const idKartu = `${dataKonsonanAktif.konsonanBesar}-${suku.besar}`;
              const sedangFokus = kartuFokus === idKartu;

              return (
                <div
                  key={idKartu}
                  onClick={() => setKartuFokus(sedangFokus ? null : idKartu)}
                  className={`kartu-ceria kartu-game-pilihan rounded-3xl p-5 border-4 cursor-pointer flex flex-col justify-between text-center ${
                    tema.kartu
                  } ${sedangFokus ? "ring-4 ring-amber-300 scale-[1.02]" : ""}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${tema.badge}`}
                    >
                      {dataKonsonanAktif.konsonanBesar} + {suku.besar.slice(-1)}
                    </span>
                    {sedangFokus && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>

                  <div className="my-2 flex items-baseline justify-center gap-2">
                    <span
                      className={`font-bold leading-none ${tema.hurufBesar} ${
                        modeKartuBesar ? "text-6xl" : "text-5xl"
                      }`}
                    >
                      {suku.besar}
                    </span>
                    <span
                      className={`font-bold leading-none ${tema.hurufKecil} ${
                        modeKartuBesar ? "text-5xl" : "text-4xl"
                      }`}
                    >
                      {suku.kecil}
                    </span>
                  </div>

                  <SlotGambar
                    gambarUrl={suku.gambarUrl}
                    kataContoh={suku.kataContoh}
                    tampilkanGambar={tampilkanGambar}
                  />

                  <div className="mt-2 bg-white/85 rounded-2xl py-2 px-3 border border-white">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                      Contoh Kata
                    </span>
                    <span className="text-xl font-bold text-slate-800">
                      {suku.kataContoh}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Catatan Bantuan */}
      <footer className="mt-10 kartu-ceria p-4 sm:p-5 border-2 border-amber-200 flex items-start sm:items-center gap-3 text-sm text-slate-600">
        <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 sm:mt-0" />
        <p>
          <strong>Tips:</strong> Taruh gambar di{" "}
          <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-700">
            public/images/
          </code>{" "}
          lalu isi{" "}
          <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-700">
            gambarUrl
          </code>{" "}
          di{" "}
          <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-700">
            src/data/dataMembaca.js
          </code>
          .
        </p>
      </footer>
    </div>
  );
}
