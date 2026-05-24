"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Apple } from "lucide-react";

import Container from "@/components/common/Container";
import TypingWords from "@/components/home/TypingWords";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-10 sm:pt-14 lg:pt-20">
      <Container>
        <div className="grid min-h-[560px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="order-2 flex justify-center lg:order-1">
            <div className="relative h-[310px] w-full max-w-[360px] sm:h-[430px] sm:max-w-[470px] lg:h-[500px] lg:max-w-[540px]">
              <Image
                src="/images/landing/hero-listening.svg"
                alt="Person listening to course while walking"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="order-1 mx-auto max-w-[640px] text-center lg:order-2 lg:mx-0 lg:text-left">
            <h1 className="text-[44px] font-bold leading-[1.06] tracking-[-0.055em] text-[#20242a] sm:text-[62px] lg:text-[68px] xl:text-[74px]">
              Learn anything,
              <br className="hidden sm:block" /> anywhere, while{" "}
              <TypingWords
                words={["commuting.", "walking.", "traveling.", "resting."]}
              />
            </h1>

            <p className="mx-auto mt-6 max-w-[520px] text-[18px] leading-8 text-[#66788f] sm:text-[22px] sm:leading-9 lg:mx-0">
              Powerful, bite-sized audio courses authored by well-loved experts.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/courses"
                className="inline-flex h-[58px] items-center justify-center gap-2 rounded-[5px] bg-[#377dff] px-7 text-[18px] font-bold text-white shadow-[0_12px_30px_rgba(55,125,255,0.22)] transition hover:bg-[#236bf1]"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>

              {/* <button
                type="button"
                className="inline-flex h-[58px] items-center justify-center gap-3 rounded-[7px] bg-black px-5 text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)] transition hover:bg-[#111827]"
              >
                <Apple className="h-8 w-8 fill-white" />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[11px] font-medium">
                    Download on the
                  </span>
                  <span className="mt-1 text-[21px] font-bold tracking-[-0.03em]">
                    App Store
                  </span>
                </span>
              </button> */}
            </div>

            <p className="mt-4 text-[15px] font-medium text-[#66788f] sm:text-[16px]">
              Subscribe to courses, create playlists, and continue learning from anywhere. Cancel anytime.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
