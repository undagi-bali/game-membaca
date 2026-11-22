import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";

export default function SlotGambar({ gambarUrl, kataContoh, tampilkanGambar }) {
  const [gagalMuat, setGagalMuat] = useState(false);

  useEffect(() => {
    setGagalMuat(false);
  }, [gambarUrl]);

  if (!tampilkanGambar) return null;

  const adaGambarValid = gambarUrl && gambarUrl.trim() !== "" && !gagalMuat;

  return (
    <div className="w-full aspect-square max-w-[150px] mx-auto my-3 rounded-2xl overflow-hidden bg-white/85 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-2 shadow-inner transition-all">
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
}
