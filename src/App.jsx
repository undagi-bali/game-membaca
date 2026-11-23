import React, { useState } from "react";
import { BookOpen, Volume2, VolumeX } from "lucide-react";
import "./styles/temaBelajar.css";
import MenuPilihGame from "./components/MenuPilihGame";
import GameMembaca from "./components/GameMembaca";
import PlaceholderGameLain from "./components/PlaceholderGameLain";
import FooterAplikasi from "./components/FooterAplikasi";
import { mainkanSuaraTombol } from "./utils/suaraTombol";

export default function App() {
  // 'menu-game' | 'membaca' | 'game-kedua'
  const [gameAktif, setGameAktif] = useState("menu-game");
  const [suaraAktif, setSuaraAktif] = useState(true);

  const bunyikan = (jenis = "klik") => {
    if (suaraAktif) {
      mainkanSuaraTombol(jenis);
    }
  };

  const handlePilihGame = (idGame) => {
    bunyikan("klik");
    setGameAktif(idGame);
  };

  return (
    <div className="tema-belajar-wrapper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* Header Bersama */}
        <header className="kartu-ceria p-4 sm:p-5 border-4 border-amber-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            onClick={() => {
              bunyikan("kembali");
              setGameAktif("menu-game");
            }}
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
              onClick={() => {
                bunyikan("kembali");
                setGameAktif("menu-game");
              }}
              className={`tombol-3d px-4 py-2 rounded-2xl font-bold text-sm cursor-pointer ${
                gameAktif === "menu-game"
                  ? "bg-amber-400 text-slate-900 border-amber-600"
                  : "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200"
              }`}
            >
              Semua Game
            </button>

            <button
              onClick={() => handlePilihGame("membaca")}
              className={`tombol-3d px-4 py-2 rounded-2xl font-bold text-sm cursor-pointer ${
                gameAktif === "membaca"
                  ? "bg-rose-500 text-white border-rose-700"
                  : "bg-rose-100 text-rose-600 border-rose-300 hover:bg-rose-200"
              }`}
            >
              Game Membaca
            </button>

            {/* Tombol Aktifkan / Matikan Suara Tombol */}
            <button
              onClick={() => {
                const statusBaru = !suaraAktif;
                setSuaraAktif(statusBaru);
                if (statusBaru) {
                  mainkanSuaraTombol("klik");
                }
              }}
              aria-label={
                suaraAktif ? "Matikan suara tombol" : "Aktifkan suara tombol"
              }
              className={`tombol-3d inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-sm cursor-pointer border-2 ${
                suaraAktif
                  ? "bg-emerald-100 text-emerald-700 border-emerald-400"
                  : "bg-slate-100 text-slate-500 border-slate-300"
              }`}
            >
              {suaraAktif ? (
                <>
                  <Volume2 className="w-4 h-4" /> Suara
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" /> Bisukan
                </>
              )}
            </button>
          </div>
        </header>

        {/* Konten Utama */}
        {gameAktif === "menu-game" && (
          <MenuPilihGame onPilihGame={handlePilihGame} />
        )}

        {gameAktif === "membaca" && (
          <GameMembaca
            suaraAktif={suaraAktif}
            onKembaliKeMenuGame={() => {
              bunyikan("kembali");
              setGameAktif("menu-game");
            }}
          />
        )}

        {gameAktif !== "menu-game" && gameAktif !== "membaca" && (
          <PlaceholderGameLain
            onKembali={() => {
              bunyikan("kembali");
              setGameAktif("menu-game");
            }}
          />
        )}

        {/* Footer Terpisah */}
        <FooterAplikasi namaAplikasi="Dunia Main & Belajar" tahun={2026} />
      </div>
    </div>
  );
}
