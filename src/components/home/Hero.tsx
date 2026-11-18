"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { PropertyVisual } from "@/components/common/PropertyVisual";

/** Video-ready hero.
 *  Videos live in /public/videos: hero-drone.mp4 (1080p) and hero-drone-mobile.mp4 (720p).
 *  Layers (bottom to top): illustrated fallback, poster image, video, dark overlay. */
const VIDEO_SRC = "/videos/hero-drone.mp4"; // 1080p, desktop
const VIDEO_SRC_MOBILE = "/videos/hero-drone-mobile.mp4"; // 720p, phones
const POSTER_SRC = "/images/hero-poster.jpg";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Respect users who prefer reduced motion: show the poster instead of moving video.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.pause();

    // The error event can fire before React hydrates, so also check the state on mount.
    const fail = () => setFailed(true);
    // Errors from <source> children do not bubble, so listen in the capture phase.
    v.addEventListener("error", fail, true);
    const timer = window.setTimeout(() => {
      if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) fail();
    }, 1500);
    return () => {
      v.removeEventListener("error", fail, true);
      window.clearTimeout(timer);
    };
  }, []);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  }

  return (
    <section aria-label="Introduction" className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-ink text-white sm:min-h-[calc(100svh-5rem)]">
      <div className="absolute inset-0 -z-30" aria-hidden="true">
        <PropertyVisual seed="hero-skyline" label="" />
      </div>
      <Image src={POSTER_SRC} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      {!failed && (
        <video
          ref={videoRef}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          poster={POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={VIDEO_SRC_MOBILE} type="video/mp4" media="(max-width: 767px)" />
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 -z-[5] bg-gradient-to-t from-ink via-ink/55 to-ink/35" aria-hidden="true" />
      <div className="absolute inset-0 -z-[5] bg-gradient-to-r from-ink/70 to-transparent" aria-hidden="true" />

      <div className="container-width pb-28 pt-24 sm:pb-36">
        <h1 className="font-display hero-rise max-w-4xl text-5xl leading-[1.04] sm:text-7xl lg:text-8xl">
          Discover Spaces.
          <br />
          Experience Luxury.
        </h1>
        <p className="hero-rise-2 mt-6 max-w-xl text-lg leading-relaxed text-white/85">
          Residential, commercial and pre-rented properties from builders across Gurgaon, Delhi NCR, with advice from people who will tell you what to check before you buy.
        </p>
        <div className="hero-rise-3 mt-9 flex flex-wrap gap-4">
          <Link href="/projects" className="btn btn-gold">Explore Projects</Link>
          <Link href="/contact" className="btn btn-outline">Talk to an Expert</Link>
        </div>
      </div>

      {!failed && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/40 bg-ink/50 text-white hover:bg-ink/80 sm:right-8 sm:top-8"
        >
          {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
        </button>
      )}
    </section>
  );
}
