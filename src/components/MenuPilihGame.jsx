import React from "react";
import { Sparkles, Play } from "lucide-react";
import { DAFTAR_GAME } from "../data/daftarGame";

export default function MenuPilihGame({ onPilihGame }) {
  return (
    <main className="py-4 sm:py-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 bg-amber-200/80 text-amber-800 px-4 py-1.5 rounded-full text-sm font-bold mb-3">
          <Sparkles className="w-4 h-4" /> Pilih Permainan Edukasi
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
          Mau Main Game Apa Hari Ini?
        </h2>
        <p className="text-slate-600 text-base sm:text-lg">
          Pilih salah satu game di bawah ini untuk mulai bermain sambil belajar!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {DAFTAR_GAME.map((game) => (
          <button
            key={game.id}
            onClick={() => onPilihGame(game.id)}
            className={`group relative kartu-ceria kartu-game-pilihan p-7 sm:p-8 text-left border-4 ${game.tema.kartu} cursor-pointer overflow-hidden`}
          >
            <div
              className={`absolute -right-6 -top-6 w-32 h-32 ${game.tema.lingkaran} rounded-full opacity-60 group-hover:scale-125 transition-transform`}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className={`inline-block ${game.tema.badge} text-sm font-bold px-4 py-1 rounded-full shadow-sm`}
                >
                  {game.badge}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                  Mulai <Play className="w-4 h-4 fill-current" />
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                {game.judul}
              </h3>
              <p className="text-slate-600 mb-6 text-base">{game.deskripsi}</p>

              <div
                className={`flex items-center justify-between gap-2 ${game.tema.chipBg} p-4 rounded-2xl border-2`}
              >
                {game.pratinjau.map((item, idx) => (
                  <span
                    key={idx}
                    className={`min-w-[2.75rem] h-11 px-2.5 rounded-xl bg-white shadow-sm flex items-center justify-center text-base sm:text-lg font-bold ${game.tema.chipTeks} border border-current/20`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
