import Link from "next/link";
import Image from "next/image";
import AppLogo from "@/components/common/AppLogo";
import {
  Globe,
  Users,
  ShieldCheck,
  Headphones,
  Award,
  HelpCircle,
  FileText,
  Shield,
  RefreshCcw,
  Cookie,
  Mail,
  Lock,
  ChevronRight,
} from "lucide-react";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z" />
  </svg>
);


const exploreLinks = [
  { label: "All Courses", href: "/courses" },
  { label: "Live Online Classes", href: "/live-online-classes" },
  { label: "New Arrivals", href: "/courses?sort=newest" },
  { label: "Popular Courses", href: "/courses?sort=popular" },
  { label: "Learning Paths", href: "/learning-paths" },
  { label: "Books", href: "/explore-us?section=books" },
];

const learnerLinks = [
  { label: "My Dashboard", href: "/dashboard" },
  { label: "My Courses", href: "/dashboard/courses" },
  { label: "Certificates", href: "/dashboard/certificates" },
  { label: "Wishlist", href: "/dashboard/wishlist" },
  { label: "Order History", href: "/dashboard/orders" },
  { label: "Help Center", href: "/explore-us?section=help" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Study Guides", href: "/explore-us?section=study-guides" },
  { label: "Webinars", href: "/explore-us?section=webinars" },
  { label: "Career Support", href: "/explore-us?section=career-support" },
  { label: "Learning Support", href: "/explore-us?section=learning-support" },
  { label: "Student Stories", href: "/explore-us?section=student-stories" },
];

const instituteLinks = [
  { label: "About Us", href: "/explore-us?section=about" },
  { label: "Our Instructors", href: "/explore-us?section=instructors" },
  { label: "KHDA Certification", href: "/explore-us?section=khda" },
  { label: "Reviews", href: "/explore-us?section=reviews" },
  { label: "News & Updates", href: "/explore-us?section=news" },
  { label: "Contact Us", href: "/explore-us?section=contact" },
];

const socialLinks = [
  { Icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { Icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { Icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
  { Icon: TikTokIcon, href: "https://tiktok.com", label: "TikTok" },
  // { Icon: XIcon, href: "https://x.com", label: "X" },
];

const trustBadges = [
  {
    Icon: Globe,
    title: "Learn from Anywhere",
    desc: "Access courses anytime, anywhere in the world.",
  },
  {
    Icon: Users,
    title: "Trusted by Thousands",
    desc: "Join a global community of successful learners.",
  },
  {
    Icon: ShieldCheck,
    title: "Secure & Reliable",
    desc: "Your data and learning journey are always safe.",
  },
  {
    Icon: Headphones,
    title: "24/7 Support",
    desc: "We're here to help you every step of the way.",
  },
  {
    Icon: Award,
    title: "Recognized Certificates",
    desc: "Earn certificates that boost your career.",
  },
];

const bottomLinks = [
  { Icon: HelpCircle, label: "Help Center", href: "/explore-us?section=help" },
  { Icon: FileText, label: "Terms of Use", href: "/terms" },
  { Icon: Shield, label: "Privacy Policy", href: "/privacy" },
  { Icon: RefreshCcw, label: "Refund Policy", href: "/refund-policy" },
  { Icon: Cookie, label: "Cookie Policy", href: "/cookie-policy" },
  { Icon: Mail, label: "Contact Us", href: "/explore-us?section=contact" },
];

function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-[13px] font-bold tracking-widest text-white uppercase">
        {title}
      </h3>
      <div className="mb-4 h-0.5 w-8 bg-blue-500" />
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="flex items-center gap-1.5 text-[13.5px] text-slate-400 transition-colors hover:text-white"
            >
              <ChevronRight className="h-3 w-3 shrink-0 text-slate-500" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-[#0b1629] text-white">
      {/* Main footer grid */}
      <div className="mx-auto max-w-350 px-6 pt-10 pb-8 lg:pt-16 lg:pb-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[320px_1fr_1fr_1fr_1fr_280px] lg:gap-10 xl:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-1">
            <AppLogo
              className="h-30 w-42.5 justify-start py-2 lg:h-40 lg:w-58.5"
              imageClassName="object-left"
              priority={false}
            />

            <div>
              <p className="text-xl font-bold text-white">
                Learn.{" "}
                <span className="text-blue-400">Connect.</span>{" "}
                Succeed.
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">
                Empowering learners worldwide with high-quality online education.
                Learn new skills, achieve your goals, and shape your future.
              </p>
            </div>

            <div>
              <p className="mb-3 text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    <Icon />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <FooterLinkColumn title="Explore" links={exploreLinks} />
          <FooterLinkColumn title="For Learners" links={learnerLinks} />
          <FooterLinkColumn title="Resources" links={resourceLinks} />
          <FooterLinkColumn title="Institute" links={instituteLinks} />

          
          <div className="rounded-xl border border-slate-700 bg-[#0f1f3d] p-5 md:col-span-2 lg:col-span-1">
            

            <div className="mb-5">
              <Image
                src="/assets/KHDA Permit.png"
                alt="KHDA Permit"
                width={200}
                height={50}
                className="object-contain"
              />
            </div>

            <div className="mb-4 flex items-center gap-3">
              {/* <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div> */}
              <p className="text-lg font-extrabold">
                <span className="text-blue-400">KHDA</span>{" "}
                <span className="text-white">Certified</span>
              </p>
            </div>

            <p className="mb-5 text-[12.5px] leading-relaxed text-slate-400">
              Artin Institute is proud to be certified by the Knowledge and
              Human Development Authority (KHDA), Dubai.
            </p>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mx-auto max-w-350 px-6 pb-6 lg:pb-10">
        <div className="rounded-xl border border-slate-700/60 bg-[#0f1f3d]/40 px-4 py-5 sm:px-6 sm:py-7">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
            {trustBadges.map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-700 bg-blue-900/40">
                  <Icon className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white">{title}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-350 px-6 py-4">
          {/* Row 1 — nav links */}
          <nav className="mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-b border-slate-800 pb-4 sm:gap-x-6 lg:justify-start">
            {bottomLinks.map(({ Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-1.5 text-[12.5px] text-slate-400 transition-colors hover:text-white"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {label}
              </Link>
            ))}
          </nav>


          <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">

            <p className="text-center text-[12.5px] text-slate-400 lg:text-left">
              © 2026{" "}
              <Link href="/" className="text-blue-400 hover:underline">
                Artin Institute
              </Link>
              . All rights reserved.
            </p>

            {/* Language selector — centered */}
            <button className="mx-auto flex items-center gap-1.5 rounded-md border border-slate-700 px-3 py-1.5 text-[12px] text-slate-400 transition hover:border-slate-500 hover:text-white">
              <Globe className="h-3.5 w-3.5" />
              English
              <ChevronRight className="h-3 w-3 rotate-90" />
            </button>

            {/* Payment icons — right-aligned */}
            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end lg:gap-3">
              <div className="flex items-center gap-1.5 text-[12px] text-slate-400">
                <Lock className="h-3.5 w-3.5" />
                Secure Payments
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded bg-white px-2 py-1 text-[11px] font-extrabold tracking-wider text-blue-700">
                  VISA
                </span>
                <span className="flex h-7 items-center rounded bg-white px-2">
                  <span className="inline-block h-4 w-4 rounded-full bg-red-500 -mr-1.5" />
                  <span className="inline-block h-4 w-4 rounded-full bg-yellow-400" />
                </span>
                <span className="rounded bg-[#016fd0] px-2 py-1 text-[10px] font-extrabold tracking-widest text-white">
                  AMEX
                </span>
                <span className="rounded bg-white px-2 py-1 text-[11px] font-bold text-black">
                  Apple Pay
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
