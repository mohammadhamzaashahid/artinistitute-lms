"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Pause, Play, Volume2, VolumeX } from "lucide-react";

function formatTime(seconds) {
  const s = Math.floor(seconds || 0);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function BookAudioPlayer({ src, title, onClose }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function onLoaded() {
      setDuration(audio.duration || 0);
      setLoading(false);
    }
    function onTime() {
      setCurrentTime(audio.currentTime);
    }
    function onEnded() {
      setPlaying(false);
    }
    function onWaiting() {
      setLoading(true);
    }
    function onCanPlay() {
      setLoading(false);
    }

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, [src]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }

  function handleSeek(e) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * duration;
  }

  function handleVolume(e) {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    setMuted(v === 0);
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    setMuted(next);
    audio.muted = next;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e3eaf3] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#f0f4fb] bg-[#f8fbff] px-5 py-3.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#377dff]/10 text-[#377dff]">
          <Volume2 className="h-4 w-4" />
        </div>
        <p className="min-w-0 flex-1 truncate text-[14px] font-semibold text-[#20242a]">
          {title}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="text-[12px] font-medium text-[#8a9aad] hover:text-[#20242a]"
        >
          Close
        </button>
      </div>

      {/* Controls */}
      <div className="px-5 py-4">
        {/* Progress bar */}
        <button
          type="button"
          className="group relative mb-3 h-2 w-full cursor-pointer rounded-full bg-[#e8eef6] hover:h-3"
          onClick={handleSeek}
          aria-label="Seek"
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-[#377dff] transition-all"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-[#377dff] shadow-md opacity-0 transition group-hover:opacity-100"
            style={{ left: `calc(${progress}% - 8px)` }}
          />
        </button>

        {/* Time */}
        <div className="mb-4 flex items-center justify-between text-[12px] font-medium text-[#8a9aad]">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Play + Volume */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={togglePlay}
            disabled={loading}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#377dff] text-white shadow-[0_8px_20px_rgba(55,125,255,0.3)] transition hover:bg-[#236bf1] disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : playing ? (
              <Pause className="h-5 w-5 fill-white" />
            ) : (
              <Play className="h-5 w-5 fill-white" />
            )}
          </button>

          <div className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="text-[#8a9aad] transition hover:text-[#20242a]"
            >
              {muted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={muted ? 0 : volume}
              onChange={handleVolume}
              className="h-1.5 flex-1 cursor-pointer accent-[#377dff]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
