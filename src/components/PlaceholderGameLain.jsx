import React from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function PlaceholderGameLain({ onKembali }) {
  return (
    <div className="kartu-ceria p-8 sm:p-10 border-4 border-sky-300 text-center max-w-2xl mx-auto my-6">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 mb-4">
        <Sparkles className="w-8 h-8" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
        Game Baru Sedang Disiapkan
      </h2>
      <p className="text-slate-600 mb-6">
        Komponen ini sudah memakai gaya CSS yang sama. Tinggal isi logika dan
        data permainan baru Anda di sini!
      </p>
      <button
        onClick={onKembali}
        className="tombol-3d inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 border-sky-700 text-white font-bold cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali Pilih Game
      </button>
    </div>
  );
}
