"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Menu, X } from "lucide-react";
import { navItems, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-ink/82 text-white backdrop-blur-xl">
      <div className="section-shell flex min-h-20 items-center justify-between gap-5">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
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

        <div className="flex items-center gap-3">
          <a
            href="https://maps.google.com/?q=51+Main+St+Hope+RI"
            className="hidden items-center gap-2 border border-white/18 bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-sky md:inline-flex"
          >
            <MapPin aria-hidden="true" className="size-4" />
            {site.address}
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center border border-white/18 text-white transition hover:bg-white/10 lg:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-white/12 bg-ink/95 lg:hidden"
        >
          <div className="section-shell flex flex-col gap-1 py-6">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-white/8 py-4 text-base font-bold uppercase tracking-[0.16em] text-white/85 transition hover:text-white"
              >
                {label}
              </a>
            ))}
            <a
              href="https://maps.google.com/?q=51+Main+St+Hope+RI"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-ink transition hover:bg-sky"
            >
              <MapPin aria-hidden="true" className="size-4" />
              {site.address}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
