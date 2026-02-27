import { useEffect, useRef, useState } from "react";

export default function TranscriptViewer({ transcript, currentTime, onLineClick }) {
  const containerRef = useRef(null);
  const activeRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);

  const getActiveLine = () => {
    if (!transcript.length || currentTime == null) return -1;
    let activeIdx = 0;
    for (let i = 0; i < transcript.length; i++) {
      if (transcript[i].start <= currentTime) activeIdx = i;
      else break;
    }
    return activeIdx;
  };

  const activeIdx = getActiveLine();

  useEffect(() => {
    if (autoScroll && activeRef.current) {
      activeRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [activeIdx, autoScroll]);

  const filteredTranscript = searchQuery
    ? transcript.filter((t) => t.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : transcript;

  return (
    <div className="viewer-wrap">
      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery("")}>✕</button>
          )}
        </div>
        <button
          className={`autoscroll-btn ${autoScroll ? "active" : ""}`}
          onClick={() => setAutoScroll(!autoScroll)}
        >
          {autoScroll ? "🔒 Auto-scroll ON" : "🔓 Auto-scroll OFF"}
        </button>
      </div>

      <div className="lines-container" ref={containerRef}>
        {filteredTranscript.length === 0 ? (
          <div className="no-results">No results for "{searchQuery}"</div>
        ) : (
          filteredTranscript.map((line, idx) => {
            const isActive = !searchQuery && idx === activeIdx;
            return (
              <div
                key={`${line.start}-${idx}`}
                ref={isActive ? activeRef : null}
                className={`line ${isActive ? "active" : ""}`}
                onClick={() => onLineClick && onLineClick(line.start)}
              >
                <span className="timestamp">{line.formatted_time || formatTime(line.start)}</span>
                <span
                  className="line-text"
                  dangerouslySetInnerHTML={{
                    __html: searchQuery ? highlight(line.text, searchQuery) : line.text,
                  }}
                />
              </div>
            );
          })
        )}
      </div>

      <style jsx>{`
        .viewer-wrap {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
          min-height: 0;
        }

        .toolbar {
          display: flex;
          gap: 10px;
          padding: 14px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          align-items: center;
          flex-wrap: wrap;
        }
        .search-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 0 14px;
          min-width: 200px;
        }
        .search-wrap:focus-within { border-color: rgba(255,75,43,0.4); }
        .search-icon { font-size: 14px; opacity: 0.5; }
        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 14px;
          font-family: 'Outfit', sans-serif; /* ✅ WAS: DM Sans */
          font-weight: 300;
          padding: 10px 0;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.25); }
        .clear-search {
          background: none;
          border: none;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          font-size: 12px;
        }
        .autoscroll-btn {
          font-family: 'Lexend', sans-serif; /* ✅ WAS: DM Sans */
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.4);
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 300;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          letter-spacing: 0.03em;
        }
        .autoscroll-btn.active {
          background: rgba(255,75,43,0.1);
          border-color: rgba(255,75,43,0.3);
          color: #ff8c42;
        }

        .lines-container {
          flex: 1;
          overflow-y: auto;
          padding: 8px 32px 32px;
          scroll-behavior: smooth;
        }
        .lines-container::-webkit-scrollbar { width: 6px; }
        .lines-container::-webkit-scrollbar-track { background: transparent; }
        .lines-container::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

        .line {
          display: flex;
          gap: 16px;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.15s;
          align-items: flex-start;
          margin: 2px 0;
          border-left: 2px solid transparent;
        }
        .line:hover { background: rgba(255,255,255,0.05); }
        .line.active {
          background: rgba(255,75,43,0.1);
          border-left: 2px solid #ff4b2b;
          padding-left: 12px;
        }

        .timestamp {
          font-family: 'Lexend', sans-serif; /* ✅ WAS: default */
          font-size: 11px;
          font-weight: 300;
          color: rgba(255,255,255,0.3);
          min-width: 42px;
          padding-top: 3px;
          font-variant-numeric: tabular-nums;
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }
        .line.active .timestamp { color: #ff8c42; }

        .line-text {
          font-family: 'Afacad', sans-serif; /* ✅ WAS: default — best for reading */
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.75);
          flex: 1;
          font-weight: 400;
        }
        .line.active .line-text { color: rgba(255,255,255,0.95); font-weight: 500; }

        .no-results {
          font-family: 'Outfit', sans-serif; /* ✅ WAS: default */
          text-align: center;
          padding: 60px 24px;
          color: rgba(255,255,255,0.3);
          font-size: 15px;
        }
      `}</style>
    </div>
  );
}

function formatTime(seconds) {
  const s = Math.floor(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

function highlight(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.replace(regex, '<mark style="background:#ff4b2b33;color:#ff8c42;border-radius:3px;padding:0 2px;">$1</mark>');
}