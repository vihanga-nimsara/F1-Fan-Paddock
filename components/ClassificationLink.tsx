'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ClassificationLink() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/standings"
      style={{
        display: 'block',
        textAlign: 'center',
        backgroundColor: hovered ? '#E10600' : 'transparent',
        border: `1px solid ${hovered ? '#E10600' : '#27272A'}`,
        color: '#FFFFFF',
        padding: '0.875rem',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono, monospace)',
        fontWeight: 800,
        textTransform: 'uppercase',
        textDecoration: 'none',
        borderRadius: '6px',
        letterSpacing: '0.1em',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Full Classification →
    </Link>
  );
}
