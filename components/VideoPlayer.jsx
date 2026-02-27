import { useEffect, useRef } from "react";

export default function VideoPlayer({ videoId, playerRef, onTimeUpdate }) {
  const intervalRef = useRef(null);
  const ytPlayerRef = useRef(null);

  useEffect(() => {
    if (!videoId) return;

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    const initPlayer = () => {
      ytPlayerRef.current = new window.YT.Player(`yt-player-${videoId}`, {
        videoId,
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onReady: (e) => {
            if (playerRef) playerRef.current = e.target;
            intervalRef.current = setInterval(() => {
              if (e.target && typeof e.target.getCurrentTime === "function") {
                onTimeUpdate && onTimeUpdate(e.target.getCurrentTime());
              }
            }, 500);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      clearInterval(intervalRef.current);
      if (ytPlayerRef.current && ytPlayerRef.current.destroy) {
        ytPlayerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <div className="player-container">
      <div id={`yt-player-${videoId}`} />
      <style jsx>{`
        .player-container {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 14px;
          overflow: hidden;
          background: #000;
          border: 1px solid rgba(255,255,255,0.07);
        }
        :global(#yt-player-${videoId}) {
          width: 100% !important;
          height: 100% !important;
        }
        :global(#yt-player-${videoId} iframe) {
          width: 100% !important;
          height: 100% !important;
          border-radius: 14px;
        }
      `}</style>
    </div>
  );
}