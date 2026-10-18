"use client";

import Image from "next/image";

import { cn } from "@/lib/utils/cn";

export default function PageLoader({
  label = "Loading",
  description,
  className,
}) {
  return (
    <section
      className={cn(
        "flex min-h-[70vh] items-center justify-center px-5 py-16",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="page-loader-enter flex flex-col items-center text-center">
        <div className="relative flex h-28 w-28 items-center justify-center">
          {/* Brand glow */}
          <div className="page-loader-glow absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_35%_40%,rgba(0,194,255,0.28),transparent_60%),radial-gradient(circle_at_70%_65%,rgba(255,122,47,0.22),transparent_60%)] blur-2xl" />

          {/* Static track + spinning gradient arc */}
          <div className="absolute inset-0 rounded-full border border-[#e6edf6]" />
          <div className="page-loader-ring absolute inset-0 rounded-full" />

          {/* Logo mark */}
          <div className="page-loader-breathe relative flex h-19 w-19 items-center justify-center rounded-full bg-white shadow-[0_12px_32px_rgba(15,23,42,0.10)] ring-1 ring-[#eef2f7]">
            <Image
              src="/icon-192.png"
              alt=""
              width={52}
              height={52}
              priority
              className="h-13 w-13 object-contain"
            />
          </div>
        </div>

        <p className="mt-8 text-[15px] font-bold tracking-[-0.02em] text-[#20242a]">
          {label}
          <span className="page-loader-dots" aria-hidden="true">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>

        {description ? (
          <p className="mt-1.5 max-w-xs text-[13px] leading-5 text-[#8a9aad]">
            {description}
          </p>
        ) : null}

        <div className="mt-5 h-0.75 w-36 overflow-hidden rounded-full bg-[#e9eff7]">
          <div className="page-loader-bar h-full w-1/2 rounded-full bg-linear-to-r from-[#00c2ff] via-[#377dff] to-[#ff7a2f]" />
        </div>
      </div>
    </section>
  );
}
