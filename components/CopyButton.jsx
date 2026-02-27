import { useState } from "react";

export default function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={handleCopy}>
      {copied ? "✓ Copied!" : `📋 ${label}`}

      <style jsx>{`
        .copy-btn {
          width: 100%;
          background: linear-gradient(135deg, #ff4b2b, #ff8c42);
          color: #fff;
          border: none;
          padding: 11px 18px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 400;
          font-family: 'Lexend', sans-serif; /* ✅ WAS: DM Sans */
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
          letter-spacing: 0.03em;
        }
        .copy-btn:hover:not(.copied) {
          opacity: 0.85;
          transform: translateY(-1px);
        }
        .copy-btn.copied {
          background: linear-gradient(135deg, #00c97a, #00a862);
        }
      `}</style>
    </button>
  );
}