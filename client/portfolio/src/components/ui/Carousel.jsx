import React, { useState } from "react";

export default function Carousel({ images = [] }) {
  const [idx, setIdx] = useState(0);
  if (images.length === 0) {
    return <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded" />;
  }

  return (
    <div className="w-full">
      <div className="w-full h-48 overflow-hidden rounded mb-2">
        <img src={images[idx]} alt={`slide-${idx}`} className="w-full h-full object-cover" />
      </div>

      <div className="flex items-center justify-between gap-2">
        <button onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)} className="px-3 py-1 border rounded">
          Prev
        </button>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          {idx + 1} / {images.length}
        </div>

        <button onClick={() => setIdx((i) => (i + 1) % images.length)} className="px-3 py-1 border rounded">
          Next
        </button>
      </div>
    </div>
  );
}
