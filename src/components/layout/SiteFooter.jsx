import Link from "next/link";
import { FactoryIcon} from "lucide-react";
import Container from "@/components/common/Container";

const links = [
  { label: "Help", href: "/help" },
  { label: "Become a teacher", href: "/teach" },
  { label: "Affiliates", href: "/affiliates" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact Us", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#e2eaf4] bg-[#f6f9fd]">
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 py-12 lg:flex-row">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[16px] font-medium text-[#66788f] sm:text-[18px]">
            {links.map((link, index) => (
              <span key={link.label} className="inline-flex items-center gap-x-5">
                <Link href={link.href} className="transition hover:text-[#377dff]">
                  {link.label}
                </Link>
                {index !== links.length - 1 ? (
                  <span className="text-[#9aa8b8]">/</span>
                ) : null}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e9eef6] text-[#7b8da3] transition hover:bg-[#377dff] hover:text-white"
              aria-label="Facebook"
            >
              <FactoryIcon className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e9eef6] text-[#7b8da3] transition hover:bg-[#377dff] hover:text-white"
              aria-label="Twitter"
            >
              <FactoryIcon className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e9eef6] text-[#7b8da3] transition hover:bg-[#377dff] hover:text-white"
              aria-label="Instagram"
            >
              <FactoryIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="border-t border-transparent pb-10 pt-4 text-center">
          <p className="text-[15px] font-medium text-[#8a9aad] sm:text-[16px]">
            © Artin Institute, 2026. All rights reserved.
          </p>

          <p className="mx-auto mt-7 max-w-4xl text-[15px] leading-7 text-[#8a9aad] sm:text-[17px]">
            When you visit or interact with our site, services or tools, we may
            use cookies for storing information to help provide you with a better,
            faster and safer learning experience.
          </p>
        </div>
      </Container>
    </footer>
  );
}