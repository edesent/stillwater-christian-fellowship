import Image from "next/image";
import { Facebook, Headphones, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="section-shell flex flex-col items-center gap-10 py-14 text-center">
        <Image
          src="/stillwater/stillwater-ri-logo.png"
          alt=""
          width={160}
          height={160}
          className="size-36 sm:size-40"
        />
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
            {site.name}
          </p>
          <h2 className="serif mt-4 max-w-2xl text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Where faith and love meet in Hope.
          </h2>
        </div>
        <div className="grid justify-items-center gap-3 text-sm text-white/75 sm:grid-cols-2">
          <a className="footer-link" href="https://maps.google.com/?q=51+Main+St+Hope+RI">
            <MapPin aria-hidden="true" className="size-4" />
            {site.address} - {site.addressNote}
          </a>
          <a className="footer-link" href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}>
            <Phone aria-hidden="true" className="size-4" />
            {site.phone}
          </a>
          <a className="footer-link" href={site.sermonAudio}>
            <Headphones aria-hidden="true" className="size-4" />
            SermonAudio live stream at 10:30 AM Sunday
          </a>
          <a className="footer-link" href={site.facebook}>
            <Facebook aria-hidden="true" className="size-4" />
            Facebook
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="section-shell text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          Copyright Still Water Christian Fellowship
        </div>
      </div>
    </footer>
  );
}
