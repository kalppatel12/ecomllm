"use client";

import { useState } from "react";

export default function UploadCsvSection({
  onUploaded,
}: {
  onUploaded: (batchId: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [inserted, setInserted] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError("Please choose a CSV file first.");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (name) fd.append("name", name);

      const res = await fetch("/api/upload-csv", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Upload failed");
      setInserted(json.inserted);
      onUploaded(json.batchId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl  bg-amber-100 shadow-md p-6 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        📂 Upload Your Product CSV
      </h3>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Batch Name Input */}
        <input
          type="text"
          placeholder="Batch name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />

        {/* File Input */}
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                     file:rounded-lg file:border-0
                     file:text-sm file:font-medium
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
        />

        {/* Submit Button */}
        <button
          disabled={loading || !file}
          className="w-full md:w-auto px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-medium shadow hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Uploading…" : "Upload CSV"}
        </button>
      </form>

      {/* Success + Error messages */}
      {inserted !== null && (
        <div className="text-sm font-medium text-emerald-700">
          ✅ Inserted {inserted} rows successfully.
        </div>
      )}
      {error && <div className="text-sm font-medium text-red-600">❌ {error}</div>}

      {/* Helper Text */}
      <p className="text-xs text-gray-500">
        CSV headers must include:{" "}
        <code className="bg-gray-100 px-1 py-0.5 rounded">
          title, description, category, price, image_url, tags
        </code>{" "}
        (tags are pipe-separated, e.g. <code>wireless|anc</code>).
      </p>
    </div>
  );
}
