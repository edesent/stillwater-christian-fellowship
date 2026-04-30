import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { navItems, site } from "@/lib/site";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-ink/82 text-white backdrop-blur-xl">
      <div className="section-shell flex min-h-20 items-center justify-between gap-5">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/stillwater/stillwater-ri-logo.png"
            alt={`${site.name} logo`}
            width={48}
            height={48}
            priority
            className="size-11 shrink-0"
          />
          <span className="leading-none">
            <span className="block text-sm font-bold uppercase tracking-[0.18em]">
              Still Water
            </span>
            <span className="mt-1 hidden text-xs font-semibold uppercase tracking-[0.18em] text-white/55 sm:block">
              Christian Fellowship
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm font-bold uppercase tracking-[0.14em] text-white/70 transition hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="https://maps.google.com/?q=51+Main+St+Hope+RI"
          className="hidden items-center gap-2 border border-white/18 bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-sky md:inline-flex"
        >
          <MapPin aria-hidden="true" className="size-4" />
          {site.address}
        </a>
      </div>
    </header>
  );
}
