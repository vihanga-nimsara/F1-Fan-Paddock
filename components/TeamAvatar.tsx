"use client";

import { useState } from "react";

export default function TeamAvatar({
  src,
  name,
  className = "",
}: {
  src?: string;
  name: string;
  className?: string;
}) {
  const [err, setErr] = useState(false);

  if (src && !err) {
    return (
      <span
        className={`inline-flex h-16 w-16 shrink-0 overflow-hidden rounded-full bg-pebble-15 ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setErr(true)}
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-f1red font-display text-2xl font-semibold text-white ${className}`}
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}
