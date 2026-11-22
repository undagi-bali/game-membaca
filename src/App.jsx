import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import "./styles/temaBelajar.css";
import MenuPilihGame from "./components/MenuPilihGame";
import GameMembaca from "./components/GameMembaca";
import PlaceholderGameLain from "./components/PlaceholderGameLain";

export default function App() {
  // 'menu-game' | 'membaca' | 'game-kedua'
  const [gameAktif, setGameAktif] = useState("menu-game");

  return (
    <div className="tema-belajar-wrapper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* Header Bersama */}
        <header className="kartu-ceria p-4 sm:p-5 border-4 border-amber-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            onClick={() => setGameAktif("menu-game")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="bg-gradient-to-tr from-amber-400 to-orange-500 p-3 rounded-2xl text-white shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight judul-pelangi">
                Dunia Main & Belajar
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Kumpulan Game Edukasi Anak Warna-Warni
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setGameAktif("menu-game")}
              className={`tombol-3d px-4 py-2 rounded-2xl font-bold text-sm cursor-pointer ${
                gameAktif === "menu-game"
                  ? "bg-amber-400 text-slate-900 border-amber-600"
                  : "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200"
              }`}
            >
              Semua Game
            </button>
            <button
              onClick={() => setGameAktif("membaca")}
              className={`tombol-3d px-4 py-2 rounded-2xl font-bold text-sm cursor-pointer ${
                gameAktif === "membaca"
                  ? "bg-rose-500 text-white border-rose-700"
                  : "bg-rose-100 text-rose-600 border-rose-300 hover:bg-rose-200"
              }`}
            >
              Game Membaca
            </button>
          </div>
        </header>

        {/* Konten Utama */}
        {gameAktif === "menu-game" && (
          <MenuPilihGame onPilihGame={(idGame) => setGameAktif(idGame)} />
        )}

        {gameAktif === "membaca" && (
          <GameMembaca onKembaliKeMenuGame={() => setGameAktif("menu-game")} />
        )}

        {gameAktif !== "menu-game" && gameAktif !== "membaca" && (
          <PlaceholderGameLain onKembali={() => setGameAktif("menu-game")} />
        )}
      </div>
    </div>
  );
}
