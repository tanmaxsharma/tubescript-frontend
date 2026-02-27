import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";
import TranscriptViewer from "../components/TranscriptViewer";
import CopyButton from "../components/CopyButton";
import LanguageSelector from "../components/LanguageSelector";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function TranscriptPage() {
  const router = useRouter();
  const { v: videoId } = router.query;

  const [transcript, setTranscript] = useState([]);
  const [fullText, setFullText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [language, setLanguage] = useState("en");
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [translating, setTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const playerRef = useRef(null);

  const TRANSLATE_LANGUAGES = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "ar", name: "Arabic" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "it", name: "Italian" },
    { code: "tr", name: "Turkish" },
    { code: "pl", name: "Polish" },
    { code: "nl", name: "Dutch" },
    { code: "sv", name: "Swedish" },
    { code: "bn", name: "Bengali" },
    { code: "ur", name: "Urdu" },
  ];

  const fetchTranscript = async (lang = language) => {
    if (!videoId) return;
    setLoading(true);
    setError("");
    setTranslatedText("");
    try {
      const res = await axios.post(`${API}/transcript`, {
        url: `https://www.youtube.com/watch?v=${videoId}`,
        language: lang,
      });
      setTranscript(res.data.transcript);
      setFullText(res.data.full_text);
      setWordCount(res.data.word_count);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to fetch transcript. This video may not have captions.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchLanguages = async () => {
    if (!videoId) return;
    try {
      const res = await axios.get(`${API}/languages/${videoId}`);
      setAvailableLanguages(res.data.languages);
    } catch {}
  };

  useEffect(() => {
    if (videoId) {
      fetchTranscript();
      fetchLanguages();
    }
  }, [videoId]);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    fetchTranscript(langCode);
  };

  const handleTranslate = async (targetLangCode) => {
    if (!targetLangCode || !fullText) return;
    setTranslating(true);
    setTargetLang(targetLangCode);
    try {
      const res = await axios.post(`${API}/translate`, {
        text: fullText,
        target_language: targetLangCode,
      });
      setTranslatedText(res.data.translated);
    } catch (err) {
      alert("Translation failed. Please try again.");
    } finally {
      setTranslating(false);
    }
  };

  const seekTo = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds, true);
    }
  };

  const readMinutes = wordCount > 0 ? Math.ceil(wordCount / 200) : 0;

  return (
    <>
      <Head>
        <title>Transcript — TubeScript</title>
        <meta
          name="description"
          content={`YouTube transcript for video ${videoId}`}
        />
        {/* ✅ NEW FONTS — replaced Syne + DM Sans */}
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
      </Head>

      <div className="page">
        <nav className="navbar">
          <a href="/" className="nav-brand">
            <img
              src="/favicon.png"
              alt="TubeScript Logo"
              className="brand-logo"
            />
            <span className="brand-text">TubeScript</span>
          </a>
          <a href="/" className="back-btn">
            ← New Transcript
          </a>
        </nav>

        {loading && (
          <div className="loading-screen">
            <div className="spinner" />
            <p className="loading-text">Fetching transcript...</p>
          </div>
        )}

        {error && (
          <div className="error-screen">
            <div className="error-icon">⚠</div>
            <h2 className="error-title">Transcript Unavailable</h2>
            <p className="error-desc">{error}</p>
            <a href="/" className="btn-primary">
              Try Another Video
            </a>
          </div>
        )}

        {!loading && !error && videoId && (
          <div className="layout">
            <div className="left-panel">
              <VideoPlayer
                videoId={videoId}
                playerRef={playerRef}
                onTimeUpdate={setCurrentTime}
              />

              <div className="stats-bar">
                <span className="stat-chip">
                  📝 {wordCount.toLocaleString()} words
                </span>
                <span className="stat-chip">⏱ ~{readMinutes} min read</span>
                <span className="stat-chip">🔤 {transcript.length} lines</span>
              </div>

              <div className="controls-card">
                <h3 className="controls-title">Transcript Language</h3>
                <LanguageSelector
                  languages={availableLanguages}
                  selected={language}
                  onChange={handleLanguageChange}
                />
              </div>

              <div className="controls-card">
                <h3 className="controls-title">Translate To</h3>
                <div className="translate-row">
                  <select
                    className="select"
                    onChange={(e) => handleTranslate(e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose language...
                    </option>
                    {TRANSLATE_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                  {translating && (
                    <span className="translating-badge">Translating...</span>
                  )}
                </div>
              </div>

              <div className="controls-card">
                <h3 className="controls-title">Export</h3>
                <div className="copy-row">
                  <CopyButton
                    text={translatedText || fullText}
                    label="Copy Transcript"
                  />
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      const blob = new Blob([translatedText || fullText], {
                        type: "text/plain",
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `transcript-${videoId}.txt`;
                      a.click();
                    }}
                  >
                    ↓ Download .txt
                  </button>
                </div>
              </div>
            </div>

            <div className="right-panel">
              <div className="transcript-header">
                <h2 className="transcript-title">
                  {translatedText
                    ? `Translated (${TRANSLATE_LANGUAGES.find((l) => l.code === targetLang)?.name || targetLang})`
                    : "Transcript"}
                </h2>
                <p className="transcript-hint">
                  💡 Click any line to jump to that moment in the video
                </p>
              </div>

              {translatedText ? (
                <div className="translated-block">
                  <pre className="translated-text">{translatedText}</pre>
                </div>
              ) : (
                <TranscriptViewer
                  transcript={transcript}
                  currentTime={currentTime}
                  onLineClick={seekTo}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: "Outfit", sans-serif; /* ✅ WAS: DM Sans */
          background: #0a0a0f;
          color: #e8e8f0;
        }
      `}</style>

      <style jsx>{`
        .page {
          min-height: 100vh;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(10, 10, 15, 0.9);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-family: "Michroma", sans-serif; /* ✅ WAS: Syne */
          font-weight: 400;
          font-size: 18px;
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
        .back-btn {
          font-family: "Lexend", sans-serif; /* ✅ WAS: DM Sans */
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
          font-weight: 300;
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.02em;
        }
        .back-btn:hover {
          color: #fff;
        }

        .loading-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 60vh;
          gap: 20px;
        }
        .spinner {
          width: 48px;
          height: 48px;
          border: 3px solid rgba(255, 75, 43, 0.15);
          border-top-color: #ff4b2b;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .loading-text {
          font-family: "Lexend", sans-serif; /* ✅ WAS: DM Sans */
          color: rgba(255, 255, 255, 0.4);
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0.05em;
        }

        .error-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 60vh;
          gap: 16px;
          padding: 24px;
          text-align: center;
        }
        .error-icon {
          font-size: 48px;
        }
        .error-title {
          font-family: "Michroma", sans-serif; /* ✅ WAS: Syne */
          font-size: 22px;
          font-weight: 400;
          color: #fff;
        }
        .error-desc {
          font-family: "Outfit", sans-serif; /* ✅ WAS: DM Sans */
          color: rgba(255, 255, 255, 0.45);
          max-width: 400px;
          line-height: 1.6;
          font-weight: 300;
        }
        .btn-primary {
          font-family: "Lexend", sans-serif; /* ✅ WAS: DM Sans */
          background: linear-gradient(135deg, #ff4b2b, #ff8c42);
          color: #fff;
          text-decoration: none;
          padding: 12px 28px;
          border-radius: 10px;
          font-weight: 400;
          font-size: 14px;
          letter-spacing: 0.03em;
          transition: opacity 0.2s;
        }
        .btn-primary:hover {
          opacity: 0.85;
        }

        .layout {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 0;
          min-height: calc(100vh - 65px);
        }

        .brand-logo {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }
        .left-panel {
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
          max-height: calc(100vh - 65px);
          position: sticky;
          top: 65px;
        }

        .stats-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .stat-chip {
          font-family: "Lexend", sans-serif; /* ✅ WAS: DM Sans */
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.02em;
        }

        .controls-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 14px;
          padding: 18px;
        }
        .controls-title {
          font-family: "Josefin Sans", sans-serif; /* ✅ WAS: Syne */
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }

        .select {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-family: "Outfit", sans-serif; /* ✅ WAS: DM Sans */
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }
        .select:hover {
          border-color: rgba(255, 75, 43, 0.4);
        }
        .select option {
          background: #1a1a25;
          color: #fff;
        }

        .translate-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .translating-badge {
          font-family: "Lexend", sans-serif; /* ✅ WAS: DM Sans */
          font-size: 11px;
          font-weight: 300;
          color: #ff8c42;
          letter-spacing: 0.05em;
          animation: pulse 1s infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }

        .copy-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .btn-secondary {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-family: "Lexend", sans-serif; /* ✅ WAS: DM Sans */
          font-weight: 300;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
          letter-spacing: 0.02em;
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }

        .right-panel {
          display: flex;
          flex-direction: column;
          max-height: calc(100vh - 65px);
          overflow: hidden;
        }
        .transcript-header {
          padding: 24px 32px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .transcript-title {
          font-family: "Josefin Sans", sans-serif; /* ✅ WAS: Syne */
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .transcript-hint {
          font-family: "Outfit", sans-serif; /* ✅ WAS: DM Sans */
          font-size: 13px;
          color: rgba(255, 255, 255, 0.35);
          font-weight: 300;
        }

        .translated-block {
          flex: 1;
          overflow-y: auto;
          padding: 24px 32px;
        }
        .translated-text {
          white-space: pre-wrap;
          font-family:
            "Afacad", sans-serif; /* ✅ WAS: DM Sans — Afacad for reading */
          font-size: 16px;
          line-height: 1.85;
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr;
          }
          .left-panel {
            position: static;
            max-height: none;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }
          .right-panel {
            max-height: 70vh;
          }
        }
      `}</style>
    </>
  );
}
