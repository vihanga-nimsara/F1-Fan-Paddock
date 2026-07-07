'use client';

import Link from 'next/link';
import Image from 'next/image';

const ARTICLES = [
  { tag: 'Technical', accent: '#8b5cf6', title: 'Reading The Floor', dek: 'How teams chase ground effect.', image: '/images/floor.jpg' },
  { tag: 'Race Reports', accent: '#f59e0b', title: 'Strategy Calls', dek: 'The calls that mattered most.', image: '/images/strategy.jpg' },
  // Add remaining articles here...
];

export default function ArticlesPage() {
  return (
    <>
      <header className="page-header wrap py-12">
        <span className="eyebrow text-sm font-bold uppercase tracking-widest text-gray-500">Articles</span>
        <h1 className="text-4xl font-extrabold mt-2">From The Paddock</h1>
        <p className="text-gray-400 mt-4">Analysis, race reports, and history — written by the TFB staff.</p>
      </header>

      <section className="articles wrap pb-20">
        <div className="article-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((a, idx) => (
            <Link 
              href={`/articles/${idx}`} 
              key={a.title}
              className="article-card group block overflow-hidden"
              style={{ '--card-accent': a.accent } as React.CSSProperties}
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-800">
                <Image 
                  src={a.image} 
                  alt={a.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="card-body mt-5">
                <span className="text-xs font-bold uppercase" style={{ color: 'var(--card-accent)' }}>{a.tag}</span>
                <h3 className="text-xl font-semibold mt-2 group-hover:underline decoration-2 underline-offset-4">
                  {a.title}
                </h3>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed">{a.dek}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}