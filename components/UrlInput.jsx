import { useState } from "react";

export default function UrlInput({ onSubmit, loading }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {}
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <span className="yt-icon">▶</span>
        <input
          type="text"
          className="url-input"
          placeholder="Paste YouTube URL here... (video or Short)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          autoFocus
        />
        {url && (
          <button type="button" className="clear-btn" onClick={() => setUrl("")}>✕</button>
        )}
      </div>
      <div className="form-actions">
        <button type="button" className="paste-btn" onClick={handlePaste}>
          📋 Paste
        </button>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <span className="btn-loading">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </span>
          ) : (
            "Get Transcript →"
          )}
        </button>
      </div>

      <style jsx>{`
        .url-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 660px;
          margin: 0 auto;
        }
        .input-wrapper {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          padding: 0 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
          gap: 12px;
        }
        .input-wrapper:focus-within {
          border-color: rgba(255,75,43,0.6);
          box-shadow: 0 0 0 4px rgba(255,75,43,0.08);
        }
        .yt-icon {
          font-size: 18px;
          background: linear-gradient(135deg, #ff4b2b, #ff8c42);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          flex-shrink: 0;
        }
        .url-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 16px;
          font-family: 'Outfit', sans-serif; /* ✅ WAS: DM Sans */
          font-weight: 300;
          padding: 18px 0;
        }
        .url-input::placeholder { color: rgba(255,255,255,0.25); }
        .clear-btn {
          background: none;
          border: none;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          font-size: 14px;
          padding: 4px;
          transition: color 0.2s;
        }
        .clear-btn:hover { color: rgba(255,255,255,0.7); }

        .form-actions { display: flex; gap: 10px; }

        .paste-btn {
          font-family: 'Lexend', sans-serif; /* ✅ WAS: DM Sans */
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 300;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .paste-btn:hover { background: rgba(255,255,255,0.09); color: #fff; }

        .submit-btn {
          flex: 1;
          background: linear-gradient(135deg, #ff4b2b, #ff8c42);
          color: #fff;
          border: none;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 400;
          font-family: 'Lexend', sans-serif; /* ✅ WAS: DM Sans */
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          letter-spacing: 0.04em;
        }
        .submit-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        .dot {
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.8);
          border-radius: 50%;
          animation: dotPulse 1.2s ease-in-out infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotPulse {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </form>
  );
}