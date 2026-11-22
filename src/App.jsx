import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Maximize2,
  Grid,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

// ============================================================================
// 1. DATA STRUKTUR PEMBELAJARAN (MUDAH DIEDIT & DITAMBAHKAN)
// ============================================================================
// Petunjuk Mengisi Gambar:
// Isi properti `gambarUrl` dengan link gambar (contoh: "https://contoh.com/apel.png"
// atau path lokal seperti "/images/apel.png"). Jika dibiarkan kosong (""),
// aplikasi akan menampilkan kotak ilustrasi placeholder yang rapi.

const DATA_VOKAL = [
  {
    id: "a",
    hurufBesar: "A",
    hurufKecil: "a",
    kataContoh: "Apel",
    gambarUrl: "/images/apel.png", // <-- Isi URL gambar Apel di sini
    warnaKartu: "bg-rose-100 border-rose-400 text-rose-600",
    warnaBadge: "bg-rose-500 text-white",
    warnaTeksKecil: "text-rose-400",
  },
  {
    id: "i",
    hurufBesar: "I",
    hurufKecil: "i",
    kataContoh: "Ikan",
    gambarUrl: "/images/ikan.png", // <-- Isi URL gambar Ikan di sini
    warnaKartu: "bg-sky-100 border-sky-400 text-sky-600",
    warnaBadge: "bg-sky-500 text-white",
    warnaTeksKecil: "text-sky-400",
  },
  {
    id: "u",
    hurufBesar: "U",
    hurufKecil: "u",
    kataContoh: "Ular",
    gambarUrl: "/images/ular.png", // <-- Isi URL gambar Ular di sini
    warnaKartu: "bg-emerald-100 border-emerald-400 text-emerald-600",
    warnaBadge: "bg-emerald-500 text-white",
    warnaTeksKecil: "text-emerald-400",
  },
  {
    id: "e",
    hurufBesar: "E",
    hurufKecil: "e",
    kataContoh: "Elang",
    gambarUrl: "/images/elang.png", // <-- Isi URL gambar Elang di sini
    warnaKartu: "bg-amber-100 border-amber-400 text-amber-600",
    warnaBadge: "bg-amber-500 text-white",
    warnaTeksKecil: "text-amber-400",
  },
  {
    id: "o",
    hurufBesar: "O",
    hurufKecil: "o",
    kataContoh: "Obat",
    gambarUrl: "/images/obat.png", // <-- Isi URL gambar Obat di sini
    warnaKartu: "bg-purple-100 border-purple-400 text-purple-600",
    warnaBadge: "bg-purple-500 text-white",
    warnaTeksKecil: "text-purple-400",
  },
];

const DATA_KONSONAN = [
  {
    konsonanBesar: "B",
    konsonanKecil: "b",
    warnaTombol: "bg-rose-500 hover:bg-rose-600 border-rose-700",
    sukuKata: [
      {
        besar: "BA",
        kecil: "ba",
        kataContoh: "Babi",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "BI",
        kecil: "bi",
        kataContoh: "Bintang",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "BU",
        kecil: "bu",
        kataContoh: "Buku",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "BE",
        kecil: "be",
        kataContoh: "Bebek",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "BO",
        kecil: "bo",
        kataContoh: "Bola",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "C",
    konsonanKecil: "c",
    warnaTombol: "bg-orange-500 hover:bg-orange-600 border-orange-700",
    sukuKata: [
      {
        besar: "CA",
        kecil: "ca",
        kataContoh: "Cabai",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "CI",
        kecil: "ci",
        kataContoh: "Cicak",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "CU",
        kecil: "cu",
        kataContoh: "Cumi",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "CE",
        kecil: "ce",
        kataContoh: "Ceri",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "CO",
        kecil: "co",
        kataContoh: "Cokelat",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "D",
    konsonanKecil: "d",
    warnaTombol: "bg-amber-500 hover:bg-amber-600 border-amber-700",
    sukuKata: [
      {
        besar: "DA",
        kecil: "da",
        kataContoh: "Dadu",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "DI",
        kecil: "di",
        kataContoh: "Dinosaurus",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "DU",
        kecil: "du",
        kataContoh: "Durian",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "DE",
        kecil: "de",
        kataContoh: "Delman",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "DO",
        kecil: "do",
        kataContoh: "Donat",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "F",
    konsonanKecil: "f",
    warnaTombol: "bg-lime-600 hover:bg-lime-700 border-lime-800",
    sukuKata: [
      {
        besar: "FA",
        kecil: "fa",
        kataContoh: "Fajar",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "FI",
        kecil: "fi",
        kataContoh: "Film",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "FU",
        kecil: "fu",
        kataContoh: "Futsal",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "FE",
        kecil: "fe",
        kataContoh: "Feri",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "FO",
        kecil: "fo",
        kataContoh: "Foto",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "G",
    konsonanKecil: "g",
    warnaTombol: "bg-emerald-500 hover:bg-emerald-600 border-emerald-700",
    sukuKata: [
      {
        besar: "GA",
        kecil: "ga",
        kataContoh: "Gajah",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "GI",
        kecil: "gi",
        kataContoh: "Gigi",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "GU",
        kecil: "gu",
        kataContoh: "Gunung",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "GE",
        kecil: "ge",
        kataContoh: "Gelas",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "GO",
        kecil: "go",
        kataContoh: "Gorila",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "H",
    konsonanKecil: "h",
    warnaTombol: "bg-teal-500 hover:bg-teal-600 border-teal-700",
    sukuKata: [
      {
        besar: "HA",
        kecil: "ha",
        kataContoh: "Harimau",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "HI",
        kecil: "hi",
        kataContoh: "Hiu",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "HU",
        kecil: "hu",
        kataContoh: "Hujan",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "HE",
        kecil: "he",
        kataContoh: "Helikopter",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "HO",
        kecil: "ho",
        kataContoh: "Hotel",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "J",
    konsonanKecil: "j",
    warnaTombol: "bg-cyan-500 hover:bg-cyan-600 border-cyan-700",
    sukuKata: [
      {
        besar: "JA",
        kecil: "ja",
        kataContoh: "Jagung",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "JI",
        kecil: "ji",
        kataContoh: "Jerapah",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "JU",
        kecil: "ju",
        kataContoh: "Jus",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "JE",
        kecil: "je",
        kataContoh: "Jeruk",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "JO",
        kecil: "jo",
        kataContoh: "Jongkok",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "K",
    konsonanKecil: "k",
    warnaTombol: "bg-sky-500 hover:bg-sky-600 border-sky-700",
    sukuKata: [
      {
        besar: "KA",
        kecil: "ka",
        kataContoh: "Katak",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "KI",
        kecil: "ki",
        kataContoh: "Kijang",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "KU",
        kecil: "ku",
        kataContoh: "Kucing",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "KE",
        kecil: "ke",
        kataContoh: "Kelinci",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "KO",
        kecil: "ko",
        kataContoh: "Kopi",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "L",
    konsonanKecil: "l",
    warnaTombol: "bg-blue-500 hover:bg-blue-600 border-blue-700",
    sukuKata: [
      {
        besar: "LA",
        kecil: "la",
        kataContoh: "Lampu",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "LI",
        kecil: "li",
        kataContoh: "Lilin",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "LU",
        kecil: "lu",
        kataContoh: "Lumba-lumba",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "LE",
        kecil: "le",
        kataContoh: "Lele",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "LO",
        kecil: "lo",
        kataContoh: "Lomba",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "M",
    konsonanKecil: "m",
    warnaTombol: "bg-indigo-500 hover:bg-indigo-600 border-indigo-700",
    sukuKata: [
      {
        besar: "MA",
        kecil: "ma",
        kataContoh: "Matahari",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "MI",
        kecil: "mi",
        kataContoh: "Mie",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "MU",
        kecil: "mu",
        kataContoh: "Musang",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "ME",
        kecil: "me",
        kataContoh: "Meja",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "MO",
        kecil: "mo",
        kataContoh: "Mobil",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "N",
    konsonanKecil: "n",
    warnaTombol: "bg-violet-500 hover:bg-violet-600 border-violet-700",
    sukuKata: [
      {
        besar: "NA",
        kecil: "na",
        kataContoh: "Nanas",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "NI",
        kecil: "ni",
        kataContoh: "Nila",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "NU",
        kecil: "nu",
        kataContoh: "Nuri",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "NE",
        kecil: "ne",
        kataContoh: "Nenek",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "NO",
        kecil: "no",
        kataContoh: "Nomor",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "P",
    konsonanKecil: "p",
    warnaTombol: "bg-purple-500 hover:bg-purple-600 border-purple-700",
    sukuKata: [
      {
        besar: "PA",
        kecil: "pa",
        kataContoh: "Payung",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "PI",
        kecil: "pi",
        kataContoh: "Pisang",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "PU",
        kecil: "pu",
        kataContoh: "Pulpen",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "PE",
        kecil: "pe",
        kataContoh: "Pesawat",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "PO",
        kecil: "po",
        kataContoh: "Pohon",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "R",
    konsonanKecil: "r",
    warnaTombol: "bg-fuchsia-500 hover:bg-fuchsia-600 border-fuchsia-700",
    sukuKata: [
      {
        besar: "RA",
        kecil: "ra",
        kataContoh: "Raja",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "RI",
        kecil: "ri",
        kataContoh: "Rusa",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "RU",
        kecil: "ru",
        kataContoh: "Rumah",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "RE",
        kecil: "re",
        kataContoh: "Kereta",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "RO",
        kecil: "ro",
        kataContoh: "Roti",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "S",
    konsonanKecil: "s",
    warnaTombol: "bg-pink-500 hover:bg-pink-600 border-pink-700",
    sukuKata: [
      {
        besar: "SA",
        kecil: "sa",
        kataContoh: "Sapi",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "SI",
        kecil: "si",
        kataContoh: "Singa",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "SU",
        kecil: "su",
        kataContoh: "Susu",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "SE",
        kecil: "se",
        kataContoh: "Sepeda",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "SO",
        kecil: "so",
        kataContoh: "Soto",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "T",
    konsonanKecil: "t",
    warnaTombol: "bg-rose-600 hover:bg-rose-700 border-rose-800",
    sukuKata: [
      {
        besar: "TA",
        kecil: "ta",
        kataContoh: "Tali",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "TI",
        kecil: "ti",
        kataContoh: "Tikus",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "TU",
        kecil: "tu",
        kataContoh: "Tupai",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "TE",
        kecil: "te",
        kataContoh: "Telur",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "TO",
        kecil: "to",
        kataContoh: "Topi",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "W",
    konsonanKecil: "w",
    warnaTombol: "bg-amber-600 hover:bg-amber-700 border-amber-800",
    sukuKata: [
      {
        besar: "WA",
        kecil: "wa",
        kataContoh: "Wajah",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "WI",
        kecil: "wi",
        kataContoh: "Wisata",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "WU",
        kecil: "wu",
        kataContoh: "Wujud",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "WE",
        kecil: "we",
        kataContoh: "Weker",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "WO",
        kecil: "wo",
        kataContoh: "Wortel",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "Y",
    konsonanKecil: "y",
    warnaTombol: "bg-teal-600 hover:bg-teal-700 border-teal-800",
    sukuKata: [
      {
        besar: "YA",
        kecil: "ya",
        kataContoh: "Yakin",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "YI",
        kecil: "yi",
        kataContoh: "Yin",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "YU",
        kecil: "yu",
        kataContoh: "Yuyu",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "YE",
        kecil: "ye",
        kataContoh: "Yeti",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "YO",
        kecil: "yo",
        kataContoh: "Yoyo",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
  {
    konsonanBesar: "Z",
    konsonanKecil: "z",
    warnaTombol: "bg-indigo-600 hover:bg-indigo-700 border-indigo-800",
    sukuKata: [
      {
        besar: "ZA",
        kecil: "za",
        kataContoh: "Zaitun",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "ZI",
        kecil: "zi",
        kataContoh: "Zebra",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "ZU",
        kecil: "zu",
        kataContoh: "Zuhur",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "ZE",
        kecil: "ze",
        kataContoh: "Zero",
        gambarUrl: "/images/apel.png",
      },
      {
        besar: "ZO",
        kecil: "zo",
        kataContoh: "Zona",
        gambarUrl: "/images/apel.png",
      },
    ],
  },
];

// Palet warna ceria untuk 5 kartu suku kata (A, I, U, E, O)
const TEMA_WARNA_SUKU_KATA = [
  {
    kartu: "bg-rose-50 border-rose-400",
    hurufBesar: "text-rose-600",
    hurufKecil: "text-rose-400",
    badge: "bg-rose-500 text-white",
  },
  {
    kartu: "bg-sky-50 border-sky-400",
    hurufBesar: "text-sky-600",
    hurufKecil: "text-sky-400",
    badge: "bg-sky-500 text-white",
  },
  {
    kartu: "bg-emerald-50 border-emerald-400",
    hurufBesar: "text-emerald-600",
    hurufKecil: "text-emerald-400",
    badge: "bg-emerald-500 text-white",
  },
  {
    kartu: "bg-amber-50 border-amber-400",
    hurufBesar: "text-amber-600",
    hurufKecil: "text-amber-400",
    badge: "bg-amber-500 text-white",
  },
  {
    kartu: "bg-purple-50 border-purple-400",
    hurufBesar: "text-purple-600",
    hurufKecil: "text-purple-400",
    badge: "bg-purple-500 text-white",
  },
];

// ============================================================================
// 2. KOMPONEN SLOT GAMBAR (DENGAN FALLBACK RAPI JIKA URL KOSONG)
// ============================================================================
const SlotGambar = ({ gambarUrl, kataContoh, tampilkanGambar }) => {
  const [gagalMuat, setGagalMuat] = useState(false);

  // Reset status error jika URL berubah
  useEffect(() => {
    setGagalMuat(false);
  }, [gambarUrl]);

  if (!tampilkanGambar) return null;

  const adaGambarValid = gambarUrl && gambarUrl.trim() !== "" && !gagalMuat;

  return (
    <div className="w-full aspect-square max-w-[150px] mx-auto my-3 rounded-2xl overflow-hidden bg-white/80 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-2 shadow-inner transition-all">
      {adaGambarValid ? (
        <img
          src={gambarUrl}
          alt={kataContoh}
          onError={() => setGagalMuat(true)}
          className="w-full h-full object-contain rounded-xl"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-slate-400 select-none p-1">
          <ImageIcon className="w-9 h-9 mb-1 text-slate-300 stroke-[1.75]" />
          <span className="text-[11px] font-medium leading-tight text-slate-400">
            Slot Gambar
          </span>
          <span className="text-[10px] font-bold text-slate-500 mt-0.5 bg-slate-100 px-2 py-0.5 rounded-full">
            {kataContoh}
          </span>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. KOMPONEN UTAMA APLIKASI
// ============================================================================
export default function App() {
  // State navigasi utama: 'beranda' | 'vokal' | 'konsonan'
  const [halamanAktif, setHalamanAktif] = useState("beranda");

  // State konsonan yang dipilih (default: 'B')
  const [konsonanTerpilih, setKonsonanTerpilih] = useState("B");

  // State opsi tampilan interaktif
  const [tampilkanGambar, setTampilkanGambar] = useState(true);
  const [modeKartuBesar, setModeKartuBesar] = useState(false);

  // State kartu yang sedang difokuskan / diklik anak
  const [kartuFokus, setKartuFokus] = useState(null);

  // Cari data konsonan yang sedang aktif
  const dataKonsonanAktif =
    DATA_KONSONAN.find((item) => item.konsonanBesar === konsonanTerpilih) ||
    DATA_KONSONAN[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-rose-50 text-slate-800 selection:bg-amber-200 pb-12">
      {/* Import Google Font Fredoka & Nunito agar bulat, lucu, dan mudah dibaca anak */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@600;700;800&display=swap');
        
        .font-anak {
          font-family: 'Fredoka', 'Nunito', sans-serif;
        }

        @keyframes membal {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .hover-membal:hover {
          animation: membal 0.5s ease-in-out;
        }
      `}</style>

      <div className="font-anak max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* ================================================================
            HEADER / NAVIGASI ATAS
           ================================================================ */}
        <header className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-lg border-4 border-amber-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            onClick={() => {
              setHalamanAktif("beranda");
              setKartuFokus(null);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="bg-gradient-to-tr from-amber-400 to-orange-500 p-3 rounded-2xl text-white shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-rose-500 via-amber-500 to-sky-500 bg-clip-text text-transparent">
                Ayo Belajar Membaca!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Mengenal Huruf Vokal & Suku Kata Dasar
              </p>
            </div>
          </div>

          {/* Tombol Navigasi Cepat */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                setHalamanAktif("vokal");
                setKartuFokus(null);
              }}
              className={`px-4 py-2.5 rounded-2xl font-bold text-sm sm:text-base transition-all cursor-pointer border-b-4 active:border-b-0 active:translate-y-1 ${
                halamanAktif === "vokal"
                  ? "bg-rose-500 text-white border-rose-700 shadow-md scale-105"
                  : "bg-rose-100 text-rose-600 border-rose-300 hover:bg-rose-200"
              }`}
            >
              1. Huruf Vokal (AIUEO)
            </button>

            <button
              onClick={() => {
                setHalamanAktif("konsonan");
                setKartuFokus(null);
              }}
              className={`px-4 py-2.5 rounded-2xl font-bold text-sm sm:text-base transition-all cursor-pointer border-b-4 active:border-b-0 active:translate-y-1 ${
                halamanAktif === "konsonan"
                  ? "bg-sky-500 text-white border-sky-700 shadow-md scale-105"
                  : "bg-sky-100 text-sky-600 border-sky-300 hover:bg-sky-200"
              }`}
            >
              2. Suku Kata (BA BI BU...)
            </button>
          </div>
        </header>

        {/* ================================================================
            HALAMAN 0: MENU PILIHAN AWAL (BERANDA)
           ================================================================ */}
        {halamanAktif === "beranda" && (
          <main className="py-4 sm:py-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 bg-amber-200/80 text-amber-800 px-4 py-1.5 rounded-full text-sm font-bold mb-3">
                <Sparkles className="w-4 h-4" /> Pilih Pelajaran Hari Ini
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
                Mau Belajar Apa Kita Sekarang?
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                Pilih salah satu kotak warna-warni di bawah ini untuk mulai
                mengenal huruf besar, huruf kecil, dan contoh gambarnya!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {/* Pilihan 1: Huruf Vokal */}
              <button
                onClick={() => setHalamanAktif("vokal")}
                className="group relative bg-white rounded-3xl p-7 sm:p-8 text-left border-4 border-rose-300 hover:border-rose-500 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-rose-100 rounded-full opacity-60 group-hover:scale-125 transition-transform" />

                <div className="relative z-10">
                  <span className="inline-block bg-rose-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4 shadow-sm">
                    Langkah Pertama
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                    Huruf Vokal
                  </h3>
                  <p className="text-slate-600 mb-6 text-base">
                    Belajar 5 huruf hidup utama dengan huruf besar dan huruf
                    kecil.
                  </p>

                  {/* Pratinjau Huruf */}
                  <div className="flex items-center justify-between gap-2 bg-rose-50 p-4 rounded-2xl border-2 border-rose-200">
                    {["Aa", "Ii", "Uu", "Ee", "Oo"].map((huruf, idx) => (
                      <span
                        key={idx}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl sm:text-2xl font-bold text-rose-500 border border-rose-200"
                      >
                        {huruf}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              {/* Pilihan 2: Huruf Konsonan & Suku Kata */}
              <button
                onClick={() => setHalamanAktif("konsonan")}
                className="group relative bg-white rounded-3xl p-7 sm:p-8 text-left border-4 border-sky-300 hover:border-sky-500 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-sky-100 rounded-full opacity-60 group-hover:scale-125 transition-transform" />

                <div className="relative z-10">
                  <span className="inline-block bg-sky-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4 shadow-sm">
                    Langkah Kedua
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                    Selain Vokal (Konsonan)
                  </h3>
                  <p className="text-slate-600 mb-6 text-base">
                    Pilih huruf B, C, D, dst. untuk membaca BA BI BU BE BO, CA
                    CI CU CE CO!
                  </p>

                  {/* Pratinjau Suku Kata */}
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
                </div>
              </button>
            </div>
          </main>
        )}

        {/* ================================================================
            BAR KONTROL TAMPILAN (UNTUK HALAMAN VOKAL & KONSONAN)
           ================================================================ */}
        {halamanAktif !== "beranda" && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border-2 border-slate-200 mb-6 shadow-sm">
            <button
              onClick={() => {
                setHalamanAktif("beranda");
                setKartuFokus(null);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Menu Utama
            </button>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Toggle Tampilkan/Sembunyikan Gambar */}
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

              {/* Toggle Mode Kartu Besar */}
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
          </div>
        )}

        {/* ================================================================
            HALAMAN 1: HURUF VOKAL (A, I, U, E, O)
           ================================================================ */}
        {halamanAktif === "vokal" && (
          <section>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Huruf Vokal: <span className="text-rose-500">A</span> -{" "}
                <span className="text-sky-500">I</span> -{" "}
                <span className="text-emerald-500">U</span> -{" "}
                <span className="text-amber-500">E</span> -{" "}
                <span className="text-purple-500">O</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Klik kartu untuk memperbesar dan fokus belajar! Perhatikan
                perbedaan <strong>Huruf Besar</strong> dan{" "}
                <strong>huruf kecil</strong>.
              </p>
            </div>

            <div
              className={`grid gap-5 sm:gap-6 ${
                modeKartuBesar
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
              }`}
            >
              {DATA_VOKAL.map((item) => {
                const isFokus = kartuFokus === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setKartuFokus(isFokus ? null : item.id)}
                    className={`hover-membal relative rounded-3xl p-5 border-4 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between shadow-lg ${
                      item.warnaKartu
                    } ${
                      isFokus
                        ? "ring-4 ring-amber-400 scale-105 shadow-2xl z-10"
                        : "hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    {/* Label Jenis Huruf */}
                    <div className="w-full flex items-center justify-between text-xs font-bold opacity-80 mb-2">
                      <span>BESAR / kecil</span>
                      {isFokus && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>

                    {/* Huruf Besar dan Kecil */}
                    <div className="flex items-baseline justify-center gap-3 my-2 select-none">
                      <span
                        className={`font-extrabold leading-none drop-shadow-sm ${
                          modeKartuBesar ? "text-8xl" : "text-6xl sm:text-7xl"
                        }`}
                      >
                        {item.hurufBesar}
                      </span>
                      <span
                        className={`font-bold leading-none ${item.warnaTeksKecil} ${
                          modeKartuBesar ? "text-7xl" : "text-5xl sm:text-6xl"
                        }`}
                      >
                        {item.hurufKecil}
                      </span>
                    </div>

                    {/* Area Gambar */}
                    <SlotGambar
                      gambarUrl={item.gambarUrl}
                      kataContoh={item.kataContoh}
                      tampilkanGambar={tampilkanGambar}
                    />

                    {/* Kata Contoh */}
                    <div className="w-full mt-2 pt-2 text-center">
                      <span
                        className={`inline-block w-full py-2 px-4 rounded-2xl font-bold shadow-sm ${
                          item.warnaBadge
                        } ${modeKartuBesar ? "text-2xl" : "text-lg sm:text-xl"}`}
                      >
                        {item.kataContoh}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ================================================================
            HALAMAN 2: HURUF KONSONAN & SUKU KATA (BA BI BU BE BO, DST.)
           ================================================================ */}
        {halamanAktif === "konsonan" && (
          <section>
            {/* Panel Pemilih Huruf Konsonan */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-4 border-sky-200 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                    Pilih Huruf Konsonan:
                  </h2>
                  <p className="text-sm text-slate-500">
                    Tekan salah satu huruf di bawah untuk memunculkan suku
                    katanya
                  </p>
                </div>
                <div className="bg-sky-100 text-sky-800 px-4 py-1.5 rounded-2xl font-bold text-sm self-start sm:self-auto">
                  Huruf Dipilih:{" "}
                  <span className="text-lg">
                    {dataKonsonanAktif.konsonanBesar}{" "}
                    {dataKonsonanAktif.konsonanKecil}
                  </span>
                </div>
              </div>

              {/* Deretan Tombol Huruf Konsonan (B, C, D, F, G, ...) */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                {DATA_KONSONAN.map((item) => {
                  const aktif = item.konsonanBesar === konsonanTerpilih;
                  return (
                    <button
                      key={item.konsonanBesar}
                      onClick={() => {
                        setKonsonanTerpilih(item.konsonanBesar);
                        setKartuFokus(null);
                      }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl font-extrabold text-xl sm:text-2xl text-white transition-all cursor-pointer border-b-4 active:border-b-0 active:translate-y-1 flex items-center justify-center shadow-sm ${
                        item.warnaTombol
                      } ${
                        aktif
                          ? "ring-4 ring-amber-400 scale-110 -translate-y-1 shadow-lg"
                          : "opacity-85 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      {item.konsonanBesar}
                      <span className="text-sm sm:text-base font-semibold opacity-90 ml-0.5">
                        {item.konsonanKecil}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Judul Suku Kata Aktif */}
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Suku Kata Huruf{" "}
                <span className="inline-block bg-amber-400 text-slate-900 px-3.5 py-0.5 rounded-2xl shadow-sm">
                  {dataKonsonanAktif.konsonanBesar} /{" "}
                  {dataKonsonanAktif.konsonanKecil}
                </span>
              </h3>
            </div>

            {/* Grid 5 Kartu Suku Kata (BA, BI, BU, BE, BO) */}
            <div
              className={`grid gap-5 sm:gap-6 ${
                modeKartuBesar
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
              }`}
            >
              {dataKonsonanAktif.sukuKata.map((suku, index) => {
                const tema =
                  TEMA_WARNA_SUKU_KATA[index % TEMA_WARNA_SUKU_KATA.length];
                const idUnik = `${dataKonsonanAktif.konsonanBesar}-${suku.besar}`;
                const isFokus = kartuFokus === idUnik;

                return (
                  <div
                    key={idUnik}
                    onClick={() => setKartuFokus(isFokus ? null : idUnik)}
                    className={`hover-membal relative rounded-3xl p-5 border-4 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between shadow-lg ${
                      tema.kartu
                    } ${
                      isFokus
                        ? "ring-4 ring-amber-400 scale-105 shadow-2xl z-10"
                        : "hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    {/* Header Kartu */}
                    <div className="w-full flex items-center justify-between text-xs font-bold text-slate-400 mb-1">
                      <span>Suku Kata {index + 1}</span>
                      {isFokus && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>

                    {/* Suku Kata Huruf Besar & Huruf Kecil */}
                    <div className="flex flex-col items-center justify-center my-2 select-none">
                      <span
                        className={`font-extrabold tracking-wide leading-none drop-shadow-sm ${
                          tema.hurufBesar
                        } ${modeKartuBesar ? "text-7xl" : "text-5xl sm:text-6xl"}`}
                      >
                        {suku.besar}
                      </span>
                      <span
                        className={`font-bold tracking-wider leading-tight mt-1 ${
                          tema.hurufKecil
                        } ${modeKartuBesar ? "text-5xl" : "text-3xl sm:text-4xl"}`}
                      >
                        {suku.kecil}
                      </span>
                    </div>

                    {/* Area Gambar */}
                    <SlotGambar
                      gambarUrl={suku.gambarUrl}
                      kataContoh={suku.kataContoh}
                      tampilkanGambar={tampilkanGambar}
                    />

                    {/* Kata Contoh */}
                    <div className="w-full mt-2 pt-2 text-center">
                      <span
                        className={`inline-block w-full py-2 px-4 rounded-2xl font-bold shadow-sm ${
                          tema.badge
                        } ${modeKartuBesar ? "text-2xl" : "text-lg sm:text-xl"}`}
                      >
                        {suku.kataContoh}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ================================================================
            FOOTER PETUNJUK PENGISIAN GAMBAR UNTUK ORANG TUA / GURU
           ================================================================ */}
        <footer className="mt-12 bg-white/70 border-2 border-slate-200 rounded-2xl p-4 text-center text-xs sm:text-sm text-slate-500">
          <p className="flex items-center justify-center gap-1.5 font-semibold text-slate-600 mb-1">
            <HelpCircle className="w-4 h-4 text-sky-500" />
            Catatan Pengisian Gambar:
          </p>
          <p>
            Untuk menambahkan gambar (Apel, Babi, Buku, Bola, dll.), buka file
            kode ini dan isi bagian{" "}
            <code className="bg-slate-200/80 text-slate-800 px-1.5 py-0.5 rounded font-mono">
              gambarUrl: "/images/apel.png"
            </code>{" "}
            pada array <code className="font-mono font-bold">DATA_VOKAL</code>{" "}
            atau <code className="font-mono font-bold">DATA_KONSONAN</code> di
            bagian paling atas.
          </p>
        </footer>
      </div>
    </div>
  );
}
