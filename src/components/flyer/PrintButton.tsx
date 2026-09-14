"use client";

import { useState } from "react";

export function PrintButton() {
  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      window.open("/flyer", "_blank");
    }
  };

  const handleDownloadPng = async () => {
    const flyer = document.getElementById("flyer-artboard");
    if (!flyer) {
      handlePrint();
      return;
    }

    setDownloading(true);
    try {
      const width = flyer.offsetWidth;
      const height = flyer.offsetHeight;
      const scale = 2; // 2x Retina quality

      const canvas = document.createElement("canvas");
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("No context");
      ctx.scale(scale, scale);

      // Clone flyer node and ensure all styles are computed
      const clone = flyer.cloneNode(true) as HTMLElement;
      
      const xml = new XMLSerializer().serializeToString(clone);
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              ${xml}
            </div>
          </foreignObject>
        </svg>
      `;

      const img = new Image();
      const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        
        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.download = "yami-waitlist-flyer.png";
        a.href = pngUrl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setDownloading(false);
      };

      img.onerror = () => {
        setDownloading(false);
        handlePrint();
      };

      img.src = url;
    } catch {
      setDownloading(false);
      handlePrint();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleDownloadPng}
        disabled={downloading}
        className="cursor-pointer inline-flex items-center gap-1.5 bg-[#DFFF3B] text-[#141711] font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded border border-[#141711] hover:bg-[#141711] hover:text-[#DFFF3B] transition-all shadow-[2px_2px_0_#141711] disabled:opacity-50"
      >
        <span>{downloading ? "Rendering PNG..." : "📥 Download as PNG"}</span>
      </button>

      <button
        type="button"
        onClick={handlePrint}
        className="cursor-pointer inline-flex items-center gap-1.5 bg-[#141711] text-[#F4F2EA] font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded border border-[#141711] hover:bg-[#DFFF3B] hover:text-[#141711] transition-all shadow-[2px_2px_0_#141711]"
      >
        <span>🖨️ Save as PDF / Print</span>
      </button>
    </div>
  );
}
