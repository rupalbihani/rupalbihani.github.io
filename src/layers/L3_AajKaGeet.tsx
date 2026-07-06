import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ping } from "../lib/telegram";
import { CONFIG } from "../config";

const PLAYLIST_ID = CONFIG.youtubePlaylistId;
const YT_API_KEY  = CONFIG.youtubeApiKey;

type LatestSong = {
  title: string;
  addedAt: string;
  videoId: string;
};

export default function AajKaGeet() {
  const nav = useNavigate();
  const [needleDown, setNeedleDown] = useState(false);
  const [song, setSong] = useState<LatestSong | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { ping("visit", { layer: "aaj-ka-geet" }); }, []);

  useEffect(() => {
    const t = setTimeout(() => setNeedleDown(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Fetch newest song from the collaborative playlist
  useEffect(() => {
    if (!YT_API_KEY || YT_API_KEY.length < 10) {
      setLoading(false);
      return;
    }
    const url =
      `https://www.googleapis.com/youtube/v3/playlistItems` +
      `?playlistId=${PLAYLIST_ID}&part=snippet&maxResults=50&key=${YT_API_KEY}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (!data.items || !data.items.length) {
          setLoading(false);
          return;
        }
        const sorted = [...data.items].sort(
          (a, b) =>
            new Date(b.snippet.publishedAt).getTime() -
            new Date(a.snippet.publishedAt).getTime()
        );
        const newest = sorted[0].snippet;
        setSong({
          title: cleanTitle(newest.title),
          addedAt: newest.publishedAt,
          videoId: newest.resourceId?.videoId ?? "",
        });

        setLoading(false);
      })
      .catch((e) => {
        console.warn("YT fetch failed", e);
        setLoading(false);
      });
  }, []);

  const openPlaylistOnYouTube = () => {
    window.open(`https://music.youtube.com/playlist?list=${PLAYLIST_ID}`, "_blank");
  };

  return (
    <div className="relative min-h-screen overflow-hidden ghibli-sky">
      <Stars />
      <Clouds />
      <MusicNotes />

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 pt-24 pb-16">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="text-center mb-4"
        >
          <h2
            className="font-hindi text-4xl sm:text-5xl md:text-7xl tracking-tight"
            style={{
              color: "#FFF6E5",
              textShadow: "0 3px 0 rgba(44,38,69,0.35), 0 8px 30px rgba(0,0,0,0.35)",
            }}
          >
            our song of the day
          </h2>
        </motion.div>

        {/* Latest song banner — appears once fetched */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: song ? 1 : loading ? 0.5 : 0, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="mb-2 max-w-lg px-6 py-2 rounded-full text-center"
          style={{
            background: "linear-gradient(135deg, #FFF6E5, #F4D6A8)",
            border: "1.5px solid rgba(139,90,60,0.4)",
            boxShadow: "0 6px 20px rgba(60,30,20,0.25)",
            minHeight: "40px",
          }}
        >
          <p className="font-playful text-sm sm:text-base md:text-lg leading-tight" style={{ color: "#5B3B1E" }}>
            {song ? (
              <>🎵 <span style={{ fontWeight: 700 }}>{song.title}</span></>
            ) : loading ? (
              "🎵 loading today's song…"
            ) : (
              "🎵 our shared playlist"
            )}
          </p>
        </motion.div>

        {/* Vinyl + needle scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative my-8"
          style={{ width: "min(75vmin, 420px)", height: "min(75vmin, 420px)" }}
        >
          <MoonlightVinyl songTitle={song?.title ?? null} />
          <Needle down={needleDown} />
        </motion.div>

        {/* Playlist embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.2 }}
          className="relative w-full max-w-2xl mt-2"
        >
          <div
            className="relative rounded-3xl p-3 overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #FFF6E5, #F4D6A8)",
              boxShadow: "0 20px 60px rgba(60,30,20,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
              border: "2px solid rgba(139,90,60,0.25)",
            }}
          >
            <div className="rounded-2xl overflow-hidden aspect-video">
              <PlaylistFrame videoId={song?.videoId} />
            </div>

            <p
              className="font-playful text-center mt-3 text-sm sm:text-base md:text-lg"
              style={{ color: "#5B3B1E" }}
            >
              every song holds a feeling we lived together, one ordinary day at a time
            </p>
          </div>

          <motion.span
            animate={{ x: [0, 8, 0], y: [0, -6, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-3 text-3xl"
          >
            🎵
          </motion.span>
        </motion.div>

        {/* Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.8 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={openPlaylistOnYouTube}
            className="font-playful text-base sm:text-lg md:text-xl px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #FFF6E5, #F4D6A8)",
              border: "1.5px solid rgba(139,90,60,0.35)",
              color: "#5B3B1E",
              boxShadow: "0 6px 20px rgba(60,30,20,0.25)",
            }}
          >
            🎼 open in YouTube Music
          </button>
        </motion.div>

        {/* The vow */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.4, delay: 2.4 }}
          className="mt-10 max-w-2xl text-center px-6"
        >
          <p
            className="italic text-base sm:text-lg md:text-2xl leading-relaxed"
            style={{
              color: "#4A2E10",
              fontWeight: 500,
              fontFamily: "'Fraunces', serif",
              textShadow: "0 1px 0 rgba(255,246,229,0.6), 0 0 16px rgba(255,246,229,0.5)",
            }}
          >
            &ldquo;every song we add is a little chapter
            <br className="hidden md:block" />
            in a story only we&rsquo;re writing.&rdquo;
          </p>
        </motion.blockquote>

        {/* Portal */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
          onClick={() => nav("/shayari")}
          className="mt-10 group relative"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
            style={{
              background: "rgba(255,246,229,0.4)",
              border: "1.5px solid rgba(139,90,60,0.35)",
              boxShadow: "0 0 30px rgba(255,214,176,0.5)",
            }}
          >
            <div
              className="w-2 h-2 rounded-full animate-breathe"
              style={{ background: "#5B3B72" }}
            />
          </div>
          <p
            className="font-playful text-xl sm:text-2xl mt-3"
            style={{
              color: "#4A2E10",
              fontWeight: 700,
              textShadow: "0 1px 0 rgba(255,246,229,0.6), 0 0 12px rgba(255,246,229,0.5)",
            }}
          >
            fall deeper →
          </p>
        </motion.button>
      </div>
    </div>
  );
}

/* Strip common noise from YouTube titles */
function cleanTitle(raw: string): string {
  return raw
    .replace(/\s*\(.*?(official|video|audio|lyric|hd|4k|mv|m\/v).*?\)\s*/gi, "")
    .replace(/\s*\[.*?(official|video|audio|lyric|hd|4k|mv|m\/v).*?\]\s*/gi, "")
    .replace(/\s*[-|]\s*(official|video|audio|lyric).*$/gi, "")
    .trim();
}

/* ---------------- MOONLIGHT VINYL ---------------- */
function MoonlightVinyl({ songTitle }: { songTitle: string | null }) {
  const display = songTitle
    ? (songTitle.length > 28 ? songTitle.slice(0, 26) + "…" : songTitle)
    : "song of the day";

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      className="relative w-full h-full rounded-full"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,246,229,0.55) 0%, rgba(255,214,176,0.25) 40%, transparent 70%)",
          filter: "blur(30px)",
          transform: "scale(1.4)",
        }}
      />

      <svg viewBox="0 0 400 400" className="relative w-full h-full">
        <defs>
          <radialGradient id="vinyl" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#FFF6E5" />
            <stop offset="12%" stopColor="#FFB8CC" />
            <stop offset="14%" stopColor="#3E2A5A" />
            <stop offset="70%" stopColor="#2C2645" />
            <stop offset="100%" stopColor="#1A1230" />
          </radialGradient>
          <radialGradient id="vinylShine" cx="30%" cy="30%" r="70%">
            <stop offset="0%"  stopColor="rgba(255,246,229,0.35)" />
            <stop offset="60%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="labelGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#FFF6E5" />
            <stop offset="70%" stopColor="#F4D6A8" />
            <stop offset="100%" stopColor="#C88A5C" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="196" fill="url(#vinyl)" />
        <circle cx="200" cy="200" r="196" fill="url(#vinylShine)" />

        {[186, 174, 162, 150, 138, 126, 114, 102].map((r) => (
          <circle key={r} cx="200" cy="200" r={r}
            fill="none" stroke="rgba(255,246,229,0.06)" strokeWidth="1" />
        ))}

        {/* Center label — song title only, wrapped */}
        <circle cx="200" cy="200" r="72" fill="url(#labelGrad)" />
        <circle cx="200" cy="200" r="72" fill="none"
          stroke="rgba(139,90,60,0.4)" strokeWidth="1.5" />

        <foreignObject x="132" y="168" width="136" height="64">
          <div
            style={{
              width: "136px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontFamily: "'Caveat', cursive",
              fontSize: "17px",
              fontWeight: 700,
              lineHeight: "1.1",
              color: "#4A2E10",
              padding: "0 6px",
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {display}
          </div>
        </foreignObject>

        {/* Spindle hole */}
        <circle cx="200" cy="200" r="7" fill="#0A0A0F" />
        <circle cx="200" cy="200" r="3" fill="#FFF6E5" />
      </svg>
    </motion.div>
  );
}

/* ---------------- NEEDLE ---------------- */
function Needle({ down }: { down: boolean }) {
  return (
    <motion.div
      initial={{ rotate: -30 }}
      animate={{ rotate: down ? -8 : -30 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      className="absolute pointer-events-none"
      style={{
        top: "-8%",
        right: "-6%",
        width: "60%",
        height: "60%",
        transformOrigin: "top right",
      }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="tonearm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#E8E8F0" />
            <stop offset="50%"  stopColor="#C0C0C8" />
            <stop offset="100%" stopColor="#8A8A96" />
          </linearGradient>
        </defs>
        <circle cx="180" cy="20" r="14" fill="url(#tonearm)" stroke="#5B3B1E" strokeWidth="1" />
        <circle cx="180" cy="20" r="6" fill="#5B3B1E" />
        <rect x="70" y="16" width="115" height="8" rx="4"
              fill="url(#tonearm)" stroke="rgba(60,30,20,0.35)" strokeWidth="0.5" />
        <rect x="60" y="10" width="18" height="22" rx="3" fill="#5B3B1E" />
        <line x1="66" y1="32" x2="66" y2="42" stroke="#FFF6E5" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
}

/* ---------------- STARS ---------------- */
function Stars() {
  const stars = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((i) => {
        const top = (i * 79) % 55;
        const left = (i * 53) % 100;
        const size = 1 + ((i * 7) % 3);
        const delay = (i % 8) * 0.5;
        return (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{
              top: top + "%", left: left + "%", width: size, height: size,
              background: "#FFF6E5", boxShadow: "0 0 6px rgba(255,246,229,0.9)",
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------------- CLOUDS ---------------- */
function Clouds() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 100 + i * 40, repeat: Infinity, ease: "linear", delay: i * -30 }}
          className="absolute rounded-full"
          style={{
            top: (8 + i * 10) + "%",
            width: (240 + i * 100) + "px",
            height: (70 + i * 18) + "px",
            background: "radial-gradient(ellipse, rgba(255,246,229,0.35), transparent 70%)",
            filter: "blur(24px)",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- MUSIC NOTES DRIFTING ---------------- */
function MusicNotes() {
  const notes = Array.from({ length: 14 }, (_, i) => i);
  const symbols = ["🎵", "🎶", "♪", "♫", "✨"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {notes.map((i) => {
        const startX = (i * 41) % 100;
        const delay = (i % 6) * 3;
        const duration = 20 + (i % 5) * 4;
        const drift = (i % 2 ? 1 : -1) * 15;
        return (
          <motion.span
            key={i}
            initial={{ y: "110vh", x: startX + "vw", rotate: 0, opacity: 0 }}
            animate={{
              y: "-10vh",
              x: "calc(" + startX + "vw + " + drift + "vw)",
              rotate: (i % 2 ? 360 : -360),
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
            className="absolute text-xl"
            style={{
              color: i % 3 === 0 ? "#FFF6E5" : i % 3 === 1 ? "#FFB8CC" : "#FFE0BC",
              textShadow: "0 2px 6px rgba(44,38,69,0.35)",
            }}
          >
            {symbols[i % symbols.length]}
          </motion.span>
        );
      })}
    </div>
  );
}

function PlaylistFrame({ videoId }: { videoId?: string }) {
  // If we have the newest videoId, start on that; otherwise fall back to playlist default
  const src = videoId
    ? "https://www.youtube.com/embed/" +
      videoId +
      "?list=" +
      PLAYLIST_ID +
      "&modestbranding=1&rel=0&color=white"
    : "https://www.youtube.com/embed/videoseries?list=" +
      PLAYLIST_ID +
      "&modestbranding=1&rel=0&color=white";

  return React.createElement("iframe", {
    key: videoId || "default",
    className: "w-full h-full",
    src,
    title: "our playlist",
    allow:
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true,
    frameBorder: "0",
  });
}