import React from "react";
import {
  Apple,
  Star,
  CircleDot,
  Heart,
  BookOpen,
  Sun,
  Sparkles,
  Smile,
} from "lucide-react";

const KOLEKSI_IKON = {
  apel: Apple,
  bintang: Star,
  bola: CircleDot,
  hati: Heart,
  buku: BookOpen,
  matahari: Sun,
  kilau: Sparkles,
  senyum: Smile,
};

export default function DaduIkon({
  jumlah = 1,
  jenisIkon = "apel",
  warnaIkon = "text-rose-500",
  dicoretJumlah = 0,
}) {
  const KomponenIkon = KOLEKSI_IKON[jenisIkon] || Star;
  const aman = Math.max(0, Math.min(jumlah, 15));
  const batasCoretMulai = Math.max(0, aman - dicoretJumlah);

  // Lebar pas untuk maksimal 5 ikon ke samping:
  // tiap ikon + gap sekitar 26px di mobile, 30px di sm -> 5 * 28px + padding ≈ 156px (w-40 / sm:w-44)
  const lebarKotak =
    aman <= 5 ? "w-auto min-w-[72px] max-w-[172px]" : "w-[152px] sm:w-[172px]";

  return (
    <div
      className={`${lebarKotak} min-h-[56px] mx-auto my-1 px-2.5 py-2 rounded-2xl bg-white border-2 border-slate-200 shadow-inner flex flex-wrap items-center justify-start gap-1.5`}
    >
      {Array.from({ length: aman }, (_, idx) => {
        const dicoret = idx >= batasCoretMulai;
        return (
          <div
            key={idx}
            className="w-5 h-5 sm:w-6 sm:h-6 relative flex items-center justify-center shrink-0"
          >
            <KomponenIkon
              className={`w-5 h-5 sm:w-6 sm:h-6 ${warnaIkon} ${
                dicoret ? "opacity-35 scale-90" : ""
              }`}
            />
            {dicoret && (
              <span className="absolute w-6 h-0.5 bg-rose-500 rotate-45 rounded-full" />
            )}
          </div>
        );
      })}
    </div>
  );
}
