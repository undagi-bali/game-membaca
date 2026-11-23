import React from "react";

export default function FooterAplikasi({
  namaAplikasi = "Dunia Main & Belajar",
  tahun = 2026,
}) {
  return (
    <footer className="mt-12 kartu-ceria py-4 px-6 border-2 border-amber-200 text-center text-sm font-bold text-slate-600">
      {namaAplikasi} &copy; {tahun}
    </footer>
  );
}
