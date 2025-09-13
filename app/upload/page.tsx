"use client";

import Navbar from "@/components/Navbar";
import UploadButton from "@/components/UploadButton";

export default function UploadPage() {
  return (
    <div>
      <Navbar/>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Upload de Planilha</h1>
        <UploadButton/>
      </div>
    </div>
  );
}
