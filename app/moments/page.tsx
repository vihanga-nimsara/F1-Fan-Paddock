"use client";

import { useState, useCallback } from "react";
import { Play, Eye, X, Plus, TrendingUp } from "lucide-react";

// ─── Types ─────────────────────────────────────────────
interface Video {
    id: string;
    title: string;
    desc: string;
    tags: Tag[];
    year: string;
    duration: string;
    views: string;
    featured?: boolean;
}

type Tag = "rivalry" | "championship" | "strategy" | "crash" | "comeback" | "drama";

// ─── Data ──────────────────────────────────────────────
const initialVideos: Video[] = [
    {
        id: "mcKfbRAgBCk",
        title: "THE SILVER WAR",
        desc: "The epic 2016 season-long battle between Lewis Hamilton and Nico Rosberg at Mercedes. Old friends turned fierce rivals fighting for the championship.",
        tags: ["rivalry", "championship"],
        year: "2016",
        duration: "Documentary",
        views: "2.4M",
        featured: true,
    },
    {
        id: "7QJ-N-AQJYc",
        title: "2021 Abu Dhabi Grand Prix",
        desc: "The most controversial championship decider in F1 history. Max Verstappen vs Lewis Hamilton in a final-lap showdown under the Yas Marina lights.",
        tags: ["championship", "drama"],
        year: "2021",
        duration: "8:07",
        views: "12M",
        featured: true,
    },
    {
        id: "7bjpguXESI8",
        title: "Mercedes' Strategic Masterclass",
        desc: "Behind the scenes of the tactical plan that helped Lewis Hamilton overhaul Max Verstappen to win the 2021 Spanish Grand Prix.",
        tags: ["strategy", "comeback"],
        year: "2021",
        duration: "Documentary",
        views: "890K",
    },
    {
        id: "0lj6Q9gN4RQ",
        title: "2018 Monaco Grand Prix",
        desc: "The streets of Monte Carlo deliver one of the most chaotic and dramatic races of the modern era with multiple incidents and strategic gambles.",
        tags: ["drama", "strategy"],
        year: "2018",
        duration: "7:45",
        views: "5.1M",
    },
    {
        id: "gp-i8vtgzJE",
        title: "2018 German Grand Prix",
        desc: "A rain-soaked Hockenheimring produces one of the most dramatic races ever, with Lewis Hamilton winning from 14th on the grid in treacherous conditions.",
        tags: ["comeback", "drama"],
        year: "2018",
        duration: "6:30",
        views: "8.3M",
    },
    {
        id: "sNd1-1GjMDY",
        title: "2024 Las Vegas Grand Prix",
        desc: "The glitz and glamour of Vegas delivers a spectacular night race under the neon lights of the Las Vegas Strip.",
        tags: ["drama"],
        year: "2024",
        duration: "8:14",
        views: "3.2M",
    },
    {
        id: "yO2SBWOgci4",
        title: "Top 10 Most Dramatic Moments of 2021",
        desc: "A compilation of the most jaw-dropping, heart-stopping moments from one of the greatest F1 seasons ever contested.",
        tags: ["drama", "championship"],
        year: "2021",
        duration: "12:30",
        views: "15M",
    },
    {
        id: "ZQ7_En2xEm4",
        title: "Grosjean Walks Away from Fireball",
        desc: "The miraculous survival of Romain Grosjean after a terrifying 53G crash and fireball at the 2020 Bahrain Grand Prix. A testament to modern F1 safety.",
        tags: ["crash"],
        year: "2020",
        duration: "4:15",
        views: "28M",
    },
];

const TAGS: { key: Tag; label: string }[] = [
    { key: "rivalry", label: "Rivalry" },
    { key: "championship", label: "Championship" },
    { key: "strategy", label: "Strategy" },
    { key: "crash", label: "Crash" },
    { key: "comeback", label: "Comeback" },
    { key: "drama", label: "Drama" },
];

const TAG_COLORS: Record<Tag, string> = {
    rivalry: "#E10600",
    championship: "#F59E0B",
    strategy: "#6CD3BF",
    crash: "#FF8000",
    comeback: "#3671C6",
    drama: "#A1A1AA",
};

// ─── Components ────────────────────────────────────────
export default function TrendsPage() {
    const [videos, setVideos] = useState<Video[]>(initialVideos);
    const [activeFilter, setActiveFilter] = useState<Tag | "all">("all");
    const [showModal, setShowModal] = useState(false);

    const [formUrl, setFormUrl] = useState("");
    const [formTitle, setFormTitle] = useState("");
    const [formDesc, setFormDesc] = useState("");
    const [formYear, setFormYear] = useState("2026");
    const [formTags, setFormTags] = useState<Tag[]>([]);

    const filtered =
        activeFilter === "all"
            ? videos
            : videos.filter((v) => v.tags.includes(activeFilter));

    const toggleTag = (tag: Tag) => {
        setFormTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const extractVideoId = (url: string): string | null => {
        const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    };

    const handleAdd = useCallback(() => {
        const id = extractVideoId(formUrl);
        if (!id || !formTitle) return;

        const newVideo: Video = {
            id,
            title: formTitle,
            desc: formDesc || "An iconic F1 moment worth watching.",
            tags: formTags.length > 0 ? formTags : ["drama"],
            year: formYear,
            duration: "New",
            views: "0",
        };

        setVideos((prev) => [newVideo, ...prev]);
        setShowModal(false);
        setFormUrl("");
        setFormTitle("");
        setFormDesc("");
        setFormYear("2026");
        setFormTags([]);
    }, [formUrl, formTitle, formDesc, formYear, formTags]);

    return (
        <div className="trends-page">
            {/* ─── Page Header ─── */}
            <div className="page-header">
                <div className="eyebrow">
                    <TrendingUp style={{ width: 14, height: 14, marginRight: 8 }} />
                    Fan Curated
                </div>
                <h1>Iconic Moments</h1>
                <p style={{
                    fontSize: '15px',
                    fontFamily: 'Formula1 Display-Regular',
                    color: '#A1A1AA',
                    marginTop: '12px',
                    maxWidth: '500px',
                    lineHeight: 1.5,
                }}>
                    Curated collection of the most unforgettable F1 moments every fan
                    should watch. From championship deciders to dramatic crashes and
                    strategic masterclasses.
                </p>
            </div>

            {/* ─── Content ─── */}
            <div className="wrap">
                {/* Filters */}




                {/* Grid */}
                <div className="trends-grid">
                    {filtered.map((video) => (
                        <a
                            key={video.id}
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="trends-card"
                        >
                            {/* Thumbnail */}
                            <div className="trends-thumb">
                                <img
                                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                    alt={video.title}
                                    className="trends-thumb-img"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                                    }}
                                />
                                <div className="trends-thumb-overlay" />

                                <div className="trends-play">
                                    <div className="trends-play-btn">
                                        <Play style={{ width: 20, height: 20, fill: "white", marginLeft: 2 }} />
                                    </div>
                                </div>

                                <span className="trends-duration">{video.duration}</span>

                                {video.featured && (
                                    <span className="trends-featured-badge">Featured</span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="trends-card-body">
                                <div className="trends-tags">
                                    {video.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="trends-tag"
                                            style={{
                                                background: `${TAG_COLORS[tag]}15`,
                                                color: TAG_COLORS[tag],
                                                border: `1px solid ${TAG_COLORS[tag]}25`,
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    <span className="trends-tag-year">{video.year}</span>
                                </div>

                                <h3 className="trends-card-title">{video.title}</h3>
                                <p className="trends-card-desc">{video.desc}</p>

                                <div className="trends-card-meta">
                                    <div className="trends-views">
                                        <Eye style={{ width: 14, height: 14 }} />
                                        <span>{video.views}</span>
                                    </div>
                                    <span className="text-link" style={{ fontSize: 11 }}>
                                        Watch Now →
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* ─── FAB ─── */}
            <button
                onClick={() => setShowModal(true)}
                className="trends-fab"
                title="Add Moment"
            >
                <Plus style={{ width: 24, height: 24 }} />
            </button>

            {/* ─── Modal ─── */}
            {showModal && (
                <div
                    className="trends-modal-overlay"
                    onClick={(e) =>
                        e.target === e.currentTarget && setShowModal(false)
                    }
                >
                    <div className="trends-modal">
                        <div className="trends-modal-header">
                            <h3>Add New Moment</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="trends-modal-close"
                            >
                                <X style={{ width: 20, height: 20 }} />
                            </button>
                        </div>

                        <div className="trends-modal-body">
                            <div className="trends-form-group">
                                <label>YouTube URL</label>
                                <input
                                    type="text"
                                    value={formUrl}
                                    onChange={(e) => setFormUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                            </div>

                            <div className="trends-form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    placeholder="e.g. The Silver War"
                                />
                            </div>

                            <div className="trends-form-group">
                                <label>Description</label>
                                <textarea
                                    value={formDesc}
                                    onChange={(e) => setFormDesc(e.target.value)}
                                    placeholder="Brief description..."
                                    rows={3}
                                />
                            </div>

                            <div className="trends-form-group">
                                <label>Tags</label>
                                <div className="trends-tag-selector">
                                    {TAGS.map((t) => (
                                        <button
                                            key={t.key}
                                            onClick={() => toggleTag(t.key)}
                                            className={`trends-tag-option ${formTags.includes(t.key) ? "selected" : ""}`}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="trends-form-group">
                                <label>Year</label>
                                <select
                                    value={formYear}
                                    onChange={(e) => setFormYear(e.target.value)}
                                >
                                    <option value="2026">2026</option>
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2018">2018</option>
                                    <option value="2016">2016</option>
                                </select>
                            </div>
                        </div>

                        <div className="trends-modal-actions">
                            <button
                                onClick={() => setShowModal(false)}
                                className="trends-btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAdd}
                                className="trends-btn-primary"
                            >
                                Add Moment
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .trends-page {
          min-height: 100%;
        }

        .trends-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 32px;
        }

        .trends-filter-btn {
          padding: 8px 16px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border: 1px solid var(--line);
          background: var(--surface);
          color: var(--muted-dim);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .trends-filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--f1-red-glow);
        }

        .trends-filter-btn.active {
          background: var(--f1-red);
          border-color: var(--f1-red);
          color: white;
        }

        .trends-count {
          margin-left: 6px;
          opacity: 0.6;
        }

        /* ===== GRID: Uniform standard layout ===== */
        .trends-grid {
          display: grid;
          /* Automatically fits as many 300px min-width columns as possible */
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 64px;
        }

        /* Force the container to align children to the left */
.page-header {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important; /* This aligns to the left */
  text-align: left !important;
  margin-bottom: 40px;
  width: 100%;
}

/* Ensure the text elements inside respect the alignment */
.page-header h1, 
.page-header p, 
.page-header .eyebrow {
  margin-left: 0 !important;
  margin-right: auto !important;
  text-align: left !important;
}

        /* ===== REGULAR CARD: Uniform Size ===== */
        .trends-card {
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          text-decoration: none;
          color: inherit;
        }

        .trends-card:hover {
          transform: translateY(-4px);
          border-color: var(--f1-red);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px var(--f1-red-dim);
        }

        /* ===== THUMB: Standard 16:9 Aspect Ratio ===== */
        .trends-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: var(--surface-raised);
        }

        .trends-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .trends-card:hover .trends-thumb-img {
          transform: scale(1.05);
        }

        .trends-thumb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
        }

        .trends-play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trends-play-btn {
          width: 52px;
          height: 52px;
          background: rgba(225, 6, 0, 0.92);
          backdrop-filter: blur(8px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(225, 6, 0, 0.35);
        }

        .trends-card:hover .trends-play-btn {
          transform: scale(1.12);
          background: var(--f1-red);
          box-shadow: 0 6px 30px rgba(225, 6, 0, 0.5);
        }

        .trends-duration {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.85);
          padding: 4px 10px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: white;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .trends-featured-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: var(--f1-red);
          padding: 4px 12px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: white;
        }

        /* ===== BODY ===== */
        .trends-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 16px 20px 18px;
          min-height: 0;
        }

        .trends-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 10px;
          flex-shrink: 0;
        }

        .trends-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .trends-tag-year {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--muted-dim);
          border: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
        }

        .trends-card-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 15px;
          line-height: 1.25;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
          color: var(--text-primary);
          transition: color 0.2s ease;
          flex-shrink: 0;
        }

        .trends-card:hover .trends-card-title {
          color: var(--f1-red);
        }

        .trends-card-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.5;
          margin-bottom: 0;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .trends-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid var(--line);
          margin-top: 10px;
          flex-shrink: 0;
        }

        .trends-views {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-dim);
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
        }

        /* ===== FAB ===== */
        .trends-fab {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 60px;
          height: 60px;
          background: var(--f1-red);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          color: white;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(225, 6, 0, 0.4);
          transition: all 0.3s ease;
          z-index: 50;
        }

        .trends-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 40px rgba(225, 6, 0, 0.5);
        }

        .trends-fab:hover svg {
          transform: rotate(90deg);
        }

        .trends-fab svg {
          transition: transform 0.3s ease;
        }

        /* ===== MODAL ===== */
        .trends-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
        }

        .trends-modal {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 8px;
          width: 100%;
          max-width: 480px;
          animation: modalIn 0.3s ease-out;
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .trends-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 24px 0;
          margin-bottom: 24px;
        }

        .trends-modal-header h3 {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 18px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-primary);
        }

        .trends-modal-close {
          padding: 6px;
          border-radius: 6px;
          background: none;
          border: none;
          color: var(--muted-dim);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trends-modal-close:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .trends-modal-body {
          padding: 0 24px;
        }

        .trends-form-group {
          margin-bottom: 16px;
        }

        .trends-form-group label {
          display: block;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          color: var(--muted-dim);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
        }

        .trends-form-group input,
        .trends-form-group select,
        .trends-form-group textarea {
          width: 100%;
          padding: 12px 14px;
          border-radius: 6px;
          border: 1px solid var(--line);
          background: var(--tarmac);
          color: var(--text-primary);
          font-size: 14px;
          font-family: var(--font-body);
          outline: none;
          transition: all 0.2s ease;
        }

        .trends-form-group input:focus,
        .trends-form-group select:focus,
        .trends-form-group textarea:focus {
          border-color: var(--f1-red);
          box-shadow: 0 0 0 3px var(--f1-red-dim);
        }

        .trends-form-group input::placeholder,
        .trends-form-group textarea::placeholder {
          color: var(--text-dim);
        }

        .trends-form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .trends-tag-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .trends-tag-option {
          padding: 6px 14px;
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
          border: 1px solid var(--line);
          background: var(--tarmac);
          color: var(--muted-dim);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .trends-tag-option:hover {
          border-color: var(--f1-red-glow);
          color: var(--text-primary);
        }

        .trends-tag-option.selected {
          background: var(--f1-red);
          border-color: var(--f1-red);
          color: white;
        }

        .trends-modal-actions {
          display: flex;
          gap: 10px;
          padding: 24px;
        }

        .trends-btn-secondary,
        .trends-btn-primary {
          flex: 1;
          padding: 12px;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .trends-btn-secondary {
          background: var(--tarmac);
          color: var(--muted-dim);
          border: 1px solid var(--line);
        }

        .trends-btn-secondary:hover {
          background: var(--surface-raised);
          color: var(--text-primary);
          border-color: var(--f1-red-glow);
        }

        .trends-btn-primary {
          background: var(--f1-red);
          color: white;
        }

        .trends-btn-primary:hover {
          background: #ff1a1a;
          box-shadow: 0 8px 25px rgba(225, 6, 0, 0.3);
        }
      `}</style>
        </div>
    );
}