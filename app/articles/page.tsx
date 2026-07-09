import Link from 'next/link';

const ARTICLES = [
  {
    tag: 'Breaking',
    accent: 'var(--purple)',
    title: 'Antonelli Steps Up: Replacing A Legend At Mercedes',
    dek: 'With Lewis Hamilton moving on, 19-year-old sensation Andrea Kimi Antonelli takes the wheel to partner George Russell.',
    image: 'https://images.unsplash.com/photo-1655821888788-6107699e173b?q=80&w=800&auto=format&fit=crop',
  },
  {
    tag: 'Race Reports',
    accent: 'var(--red)',
    title: 'The Rosso Corsa Shift: Hamilton Debuts For Ferrari',
    dek: 'An analytical breakdown of how Maranello adapted its mechanical platforms to match Lewis Hamilton’s distinct late-braking style.',
    image: 'https://images.unsplash.com/photo-1562591176-79ef94d39f31?q=80&w=800&auto=format&fit=crop',
  },
  {
    tag: 'Technical',
    accent: 'var(--purple)',
    title: 'Reading The Floor: How Teams Chase Ground Effect',
    dek: 'What separates the fastest cars through high-speed complexes like Copse and Maggots this season, and why the window remains narrow.',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop',
  },
  {
    tag: 'Paddock Gossip',
    accent: 'var(--amber)',
    title: 'Cadillac F1: Building A Grid Monster From Scratch',
    dek: 'Inside General Motors’ intense engineering sprint to scale up powertrain infrastructure ahead of their official entry into the paddock.',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop',
  },
  {
    tag: 'Strategy',
    accent: 'var(--green)',
    title: 'Tyre Degradation Dynamics Under Extreme Thermal Loads',
    dek: 'Undercuts, safety car timing, and compounding rubber graining anomalies — the algorithmic execution paths that decide wins.',
    image: 'https://images.unsplash.com/photo-1605558202138-0c7f28c74b5f?q=80&w=800&auto=format&fit=crop',
  },
  {
    tag: 'History',
    accent: 'var(--red)',
    title: 'Every Champion Since 1950, Ranked By Dominance Index',
    dek: 'Comparing different eras of motorsport is rarely fair, but correcting raw win percentages against machinery reliability changes the ranks.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop',
  },
];

export default function ArticlesPage() {
  return (
    <>
      <header className="page-header wrap">
        {/* Wrapping in a single block element keeps them stacked and perfectly aligned with the grid below */}
        <div style={{ textAlign: 'left' }}>
          <h1>From formula 1</h1>
          <p style={{
            fontSize: '15px',
            fontFamily: 'Formula1 Display-Regular',
            color: '#A1A1AA',
            marginTop: '12px',
            maxWidth: '500px',
            lineHeight: 1.5,
          }}>
            Analysis, race reports, and history — written by the Paddocks staff.
          </p>
        </div>
      </header>

      <section className="articles wrap" style={{ paddingTop: 'clamp(24px,4vw,40px)' }}>
        <div className="article-grid">
          {ARTICLES.map((a, idx) => (
            <Link 
              href={`/articles/${idx}`} 
              className="article-card" 
              key={a.title} 
              style={{ ['--card-accent' as string]: a.accent }}
            >
              {/* Preserves your native .card-visual class layout while rendering the unblocked images */}
              <div className="card-visual">
                <img 
                  src={a.image} 
                  alt="" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }} 
                />
              </div>
              
              {/* Restored completely back to your original clean structure so your global stylesheet controls typography */}
              <div className="card-body">
                <span className="card-tag">{a.tag}</span>
                <h3>{a.title}</h3>
                <p>{a.dek}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}