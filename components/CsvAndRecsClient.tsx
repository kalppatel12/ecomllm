"use client";

import { useState } from "react";
import UploadCsvSection from "./UploadCsvSection";
import RecommendButton from "./RecommendButton";

export default function CsvAndRecsClient() {
  const [batchId, setBatchId] = useState<string | undefined>(undefined);

  return (
    <section className="space-y-3">
      <h2 className="text-xl text-gray-800  font-semibold">Upload your list & get recommendations</h2>
      <UploadCsvSection onUploaded={(id) => setBatchId(id)} />
      <div className="pt-2">
        <RecommendButton batchId={batchId} />
      </div>
    </section>
  );
}
