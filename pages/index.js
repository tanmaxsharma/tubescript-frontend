import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import UrlInput from "../components/UrlInput";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (url) => {
    setError("");
    if (!url.trim()) {
      setError("Please enter a YouTube URL.");
      return;
    }
    setLoading(true);
    const patterns = [
      /v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    let videoId = null;
    for (const p of patterns) {
      const m = url.match(p);
      if (m) {
        videoId = m[1];
        break;
      }
    }
    if (!videoId) {
      setError("Invalid YouTube URL. Please try again.");
      setLoading(false);
      return;
    }
    router.push(`/transcript?v=${videoId}`);
  };

  const SITE_URL = "https://yourdomain.com";
  const SITE_NAME = "TubeScript";
  const TITLE =
    "YouTube Video to Text Converter — 100% Free Transcript Generator | TubeScript";
  const DESC =
    "Convert any YouTube video to text instantly for free. Best YouTube transcript generator — paste any URL and get a clean script in seconds. Supports 25+ languages, YouTube Shorts, lectures & podcasts. No sign up required.";
  const KEYWORDS = [
    "youtube video to text",
    "youtube to transcript",
    "youtube transcript generator",
    "youtube video to script",
    "youtube video transcriber",
    "convert youtube video to text",
    "youtube captions to text",
    "youtube subtitle extractor",
    "youtube transcript free",
    "video to text converter",
    "youtube to text free",
    "youtube shorts transcript",
    "get transcript from youtube",
    "youtube video text extractor",
    "free youtube transcript",
    "youtube transcript download",
    "youtube script generator",
    "youtube closed captions extractor",
    "youtube video notes generator",
    "youtube video to text converter free",
    "extract text from youtube video",
    "youtube transcription tool",
    "video transcription free",
    "youtube lecture notes",
    "youtube podcast transcript",
  ].join(", ");

  return (
    <>
      <Head>
        <title>YouTube to Transcript — 100% Free & Instant</title>
        <meta
          name="description"
          content="Convert any YouTube video or Short to a full transcript instantly. Free, fast, supports 25+ languages."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Convert any YouTube video or Short to a full transcript instantly. Free, fast, supports 25+ languages."
        />
        <meta
          name="keywords"
          content="youtube video to text, youtube transcript generator, youtube video transcriber,youtube video to script, youtube shorts transcript, convert youtube video to text "
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content={SITE_NAME} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon180.png" />

        {/* ── OPEN GRAPH (WhatsApp / LinkedIn / Facebook previews) ── */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* ── TWITTER CARD ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

        {/* ✅ YOUR NEW FONTS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Lexend:wght@100..900&family=Michroma&family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />

        {/* ── SCHEMA.ORG — Helps Google show rich results ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  name: "TubeScript — YouTube Video to Text Converter",
                  url: SITE_URL,
                  description: DESC,
                  applicationCategory: "UtilitiesApplication",
                  operatingSystem: "Web Browser",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                  featureList: [
                    "YouTube video to text",
                    "YouTube Shorts transcript",
                    "125+ languages",
                    "Translation",
                    "Download .txt",
                  ],
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "How do I convert a YouTube video to text?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Paste your YouTube URL into TubeScript and click Get Transcript. It converts instantly, for free.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Is this YouTube transcript generator free?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, 100% free. No account, no credit card, no limits.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Does it work on YouTube Shorts?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes! Works on YouTube Shorts, long videos, lectures and podcasts.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How do I get a YouTube video script?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Paste the YouTube link — TubeScript extracts the full script with timestamps instantly.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What languages are supported?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "TubeScript supports 125+ languages for transcript extraction and translation.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Can I use transcripts with ChatGPT?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes — copy and paste into ChatGPT, Claude or any AI for instant summaries and notes.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </Head>

      <div className="page-wrapper">
        {/* Animated background blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        <nav className="navbar">
          <div className="nav-brand">
            <img
              src="/favicon.png"
              alt="TubeScript Logo"
              className="brand-logo"
            />
            <span className="brand-text">TubeScript</span>
          </div>
          <div className="nav-links">
            <a href="#how" className="nav-link">
              How it works
            </a>
            <a href="#features" className="nav-link">
              Features
            </a>
          </div>
        </nav>

        <main className="hero">
          <div className="hero-badge">✦ 100% Free — No Sign Up Required</div>
          <h1 className="hero-title">
            YouTube Videos
            <br />
            <span className="hero-accent">Into Text</span>
            <br />
            Instantly.
          </h1>
          <p className="hero-subtitle">
            Paste any YouTube link — videos, Shorts, lectures, podcasts.
            <br />
            Get a clean, clickable transcript in seconds.
          </p>

          <UrlInput onSubmit={handleSubmit} loading={loading} />
          {error && <p className="error-msg">⚠ {error}</p>}

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">25+</span>
              <span className="stat-label">Languages</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">∞</span>
              <span className="stat-label">Videos</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">0s</span>
              <span className="stat-label">Wait Time</span>
            </div>
          </div>
        </main>

        {/* How it works */}
        <section id="how" className="section">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            {[
              {
                n: "01",
                title: "Paste URL",
                desc: "Copy any YouTube video or Shorts link and paste it above.",
              },
              {
                n: "02",
                title: "Get Transcript",
                desc: "We instantly fetch YouTube's captions in your language.",
              },
              {
                n: "03",
                title: "Use It",
                desc: "Copy, translate, or feed it into ChatGPT/Claude for summaries.",
              },
            ].map((step) => (
              <div className="step-card" key={step.n}>
                <div className="step-number">{step.n}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="section">
          <h2 className="section-title">Everything You Need</h2>
          <div className="features-grid">
            {[
              {
                icon: "⚡",
                title: "Instant Results",
                desc: "No audio processing — fetches YouTube's own captions instantly.",
              },
              {
                icon: "🌍",
                title: "25+ Languages",
                desc: "Switch transcript language and translate to any language.",
              },
              {
                icon: "🎬",
                title: "Works on Shorts",
                desc: "YouTube Shorts, long videos, live recordings all supported.",
              },
              {
                icon: "🔗",
                title: "Click to Seek",
                desc: "Click any line in the transcript to jump to that moment.",
              },
              {
                icon: "📋",
                title: "One-Click Copy",
                desc: "Copy the entire transcript to clipboard instantly.",
              },
              {
                icon: "🤖",
                title: "AI Ready",
                desc: "Paste transcripts into ChatGPT or Claude for instant summaries.",
              },
            ].map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <div className="footer-brand">
            <img
              src="/favicon.png"
              alt="TubeScript Logo"
              className="brand-logo"
            />
            <span className="brand-text">TubeScript</span>
          </div>
          <p className="footer-note">
            Developed By Gradmarc AdTech LLP © {new Date().getFullYear()}{" "}
            TubeScript.
          </p>
        </footer>
      </div>

      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: "Outfit", sans-serif; /* ✅ WAS: DM Sans → NOW: Outfit */
          background: #0a0a0f;
          color: #e8e8f0;
          overflow-x: hidden;
        }
      `}</style>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        /* Animated blobs */
        .blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.12;
          animation: float 12s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 600px;
          height: 600px;
          background: #ff4b2b;
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }
        .blob-2 {
          width: 500px;
          height: 500px;
          background: #6c63ff;
          top: 40%;
          right: -150px;
          animation-delay: -4s;
        }
        .blob-3 {
          width: 400px;
          height: 400px;
          background: #00d4aa;
          bottom: -100px;
          left: 30%;
          animation-delay: -8s;
        }
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }

        /* Navbar */
        .navbar {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family:
            "Michroma", sans-serif; /* ✅ WAS: Syne → NOW: Michroma */
          font-weight: 400;
          font-size: 20px;
          letter-spacing: 0.05em;
        }
        .brand-icon {
          background: linear-gradient(135deg, #ff4b2b, #ff8c42);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .brand-text {
          color: #fff;
        }
        .nav-links {
          display: flex;
          gap: 32px;
        }
        .nav-link {
          font-family: "Lexend", sans-serif; /* ✅ WAS: DM Sans → NOW: Lexend */
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          font-size: 14px;
          font-weight: 300;
          transition: color 0.2s;
          letter-spacing: 0.03em;
        }
        .nav-link:hover {
          color: #fff;
        }

        /* Hero */
        .hero {
          position: relative;
          z-index: 10;
          max-width: 820px;
          margin: 0 auto;
          padding: 100px 24px 80px;
          text-align: center;
        }
        .hero-badge {
          display: inline-block;
          background: rgba(255, 75, 43, 0.12);
          border: 1px solid rgba(255, 75, 43, 0.3);
          color: #ff8c42;
          font-family: "Lexend", sans-serif; /* ✅ WAS: DM Sans → NOW: Lexend */
          font-size: 13px;
          font-weight: 300;
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 32px;
          letter-spacing: 0.04em;
        }
        .hero-title {
          font-family:
            "Michroma", sans-serif; /* ✅ WAS: Syne → NOW: Michroma */
          font-size: clamp(40px, 7vw, 82px);
          font-weight: 400;
          line-height: 1.08;
          color: #fff;
          margin-bottom: 24px;
          letter-spacing: -0.01em;
        }
        .hero-accent {
          background: linear-gradient(90deg, #ff4b2b, #ff8c42, #ffcc02);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-family: "Outfit", sans-serif; /* ✅ WAS: DM Sans → NOW: Outfit */
          font-size: 18px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto 48px;
          font-weight: 300;
        }
        .error-msg {
          font-family: "Outfit", sans-serif;
          color: #ff6b6b;
          margin-top: 16px;
          font-size: 14px;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 32px;
          margin-top: 56px;
        }
        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .stat-num {
          font-family:
            "Michroma", sans-serif; /* ✅ WAS: Syne → NOW: Michroma */
          font-weight: 400;
          font-size: 26px;
          color: #fff;
        }
        .stat-label {
          font-family: "Lexend", sans-serif; /* ✅ WAS: DM Sans → NOW: Lexend */
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 300;
        }
        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Sections */
        .section {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 24px;
          text-align: center;
        }
        .section-title {
          font-family:
            "Josefin Sans", sans-serif; /* ✅ WAS: Syne → NOW: Josefin Sans */
          font-size: clamp(26px, 4vw, 42px);
          font-weight: 600;
          color: #fff;
          margin-bottom: 56px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Steps */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }
        .step-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 36px 28px;
          text-align: left;
          transition:
            border-color 0.3s,
            transform 0.3s;
        }
        .step-card:hover {
          border-color: rgba(255, 75, 43, 0.3);
          transform: translateY(-4px);
        }
        .step-number {
          font-family:
            "Michroma", sans-serif; /* ✅ WAS: Syne → NOW: Michroma */
          font-size: 44px;
          font-weight: 400;
          color: rgba(255, 75, 43, 0.2);
          margin-bottom: 16px;
          line-height: 1;
        }
        .step-title {
          font-family:
            "Josefin Sans", sans-serif; /* ✅ WAS: Syne → NOW: Josefin Sans */
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .step-desc {
          font-family: "Outfit", sans-serif; /* ✅ WAS: DM Sans → NOW: Outfit */
          color: rgba(255, 255, 255, 0.45);
          font-size: 15px;
          line-height: 1.6;
          font-weight: 300;
        }

        /* Features */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .feature-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          padding: 28px;
          text-align: left;
          transition: all 0.3s;
        }
        .feature-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(108, 99, 255, 0.3);
          transform: translateY(-3px);
        }
        .feature-icon {
          font-size: 28px;
          margin-bottom: 14px;
        }
        .feature-title {
          font-family:
            "Josefin Sans", sans-serif; /* ✅ WAS: Syne → NOW: Josefin Sans */
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .feature-desc {
          font-family: "Outfit", sans-serif; /* ✅ WAS: DM Sans → NOW: Outfit */
          color: rgba(255, 255, 255, 0.4);
          font-size: 14px;
          line-height: 1.6;
          font-weight: 300;
        }
        .brand-logo {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }

        /* Footer */
        .footer {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 40px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .footer-brand {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family:
            "Michroma", sans-serif; /* ✅ WAS: Syne → NOW: Michroma */
          font-weight: 400;
          font-size: 16px;
          margin-bottom: 12px;
          letter-spacing: 0.05em;
        }
        .footer-note {
          font-family: "Outfit", sans-serif; /* ✅ WAS: DM Sans → NOW: Outfit */
          color: rgba(255, 255, 255, 0.25);
          font-size: 13px;
          font-weight: 300;
        }

        @media (max-width: 640px) {
          .navbar {
            padding: 16px 20px;
          }
          .nav-links {
            display: none;
          }
          .hero {
            padding: 64px 20px 60px;
          }
        }
      `}</style>
    </>
  );
}
