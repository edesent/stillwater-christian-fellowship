"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";

type LightboxImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  /** Rich description shown inside the lightbox (Scripture, story, etc). */
  description?: ReactNode;
  /** Caption label shown above the description in the lightbox. */
  title?: string;
  /** Extra className for the clickable trigger wrapper. */
  triggerClassName?: string;
};

export function LightboxImage({
  description,
  title,
  triggerClassName = "",
  className = "",
  alt,
  src,
  ...imageProps
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={`View larger: ${alt}`}
        onClick={() => setOpen(true)}
        className={`group block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 ${triggerClassName}`}
      >
        <Image
          {...imageProps}
          src={src}
          alt={alt}
          className={`${className} transition group-hover:opacity-92`}
        />
      </button>

      {open ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title ?? alt}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden bg-paper shadow-2xl">
            <button
              type="button"
              ref={closeBtnRef}
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid size-10 place-items-center border border-rule bg-paper/90 text-ink-soft backdrop-blur transition hover:bg-cream hover:text-ink"
            >
              <X aria-hidden="true" className="size-5" />
            </button>

            <div className="relative max-h-[72vh] w-full overflow-hidden bg-mist">
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={1200}
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="mx-auto block h-auto max-h-[72vh] w-auto max-w-full object-contain"
              />
            </div>

            {description || title ? (
              <div className="border-t border-rule bg-cream px-6 py-5 sm:px-9 sm:py-7">
                {title ? (
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
                    {title}
                  </p>
                ) : null}
                {description ? (
                  <div className="mt-2 text-base leading-7 text-ink-soft sm:text-lg">
                    {description}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
