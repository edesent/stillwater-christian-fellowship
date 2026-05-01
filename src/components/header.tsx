"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, MapPin, Menu, X } from "lucide-react";
import { navItems, isDropdown, site } from "@/lib/site";
import type { NavLink, NavDropdown } from "@/lib/site";

function DesktopDropdown({ item }: { item: NavDropdown }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        className="flex items-center gap-1 text-sm font-bold uppercase tracking-[0.14em] text-white/70 transition hover:text-white"
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <div className="min-w-[10rem] border border-white/12 bg-ink/95 py-2 shadow-xl backdrop-blur-xl">
            {item.children.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="block px-5 py-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white/70 transition hover:bg-white/8 hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileDropdown({
  item,
  onNavigate,
}: {
  item: NavDropdown;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between border-b border-white/8 py-4 text-base font-bold uppercase tracking-[0.16em] text-white/85 transition hover:text-white"
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="flex flex-col">
          {item.children.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={onNavigate}
              className="border-b border-white/8 py-3.5 pl-6 text-sm font-bold uppercase tracking-[0.16em] text-white/65 transition hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

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
          {navItems.map((item, i) =>
            isDropdown(item) ? (
              <DesktopDropdown key={item.label} item={item} />
            ) : (
              <a
                key={(item as NavLink)[0]}
                href={(item as NavLink)[1]}
                className="text-sm font-bold uppercase tracking-[0.14em] text-white/70 transition hover:text-white"
              >
                {(item as NavLink)[0]}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/steps-to-salvation"
            className="hidden items-center gap-2 border border-white/18 bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-sky md:inline-flex"
          >
            Steps to Salvation
          </Link>

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
            {navItems.map((item) =>
              isDropdown(item) ? (
                <MobileDropdown
                  key={item.label}
                  item={item}
                  onNavigate={() => setOpen(false)}
                />
              ) : (
                <a
                  key={(item as NavLink)[0]}
                  href={(item as NavLink)[1]}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/8 py-4 text-base font-bold uppercase tracking-[0.16em] text-white/85 transition hover:text-white"
                >
                  {(item as NavLink)[0]}
                </a>
              )
            )}
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
