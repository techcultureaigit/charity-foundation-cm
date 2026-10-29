"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
} from "react";
import { FaBookOpen, FaHeartbeat, FaLeaf, FaUsers } from "react-icons/fa";
import { MdImage, MdOutlineCalendarMonth } from "react-icons/md";
import {
  HiChevronLeft,
  HiChevronRight,
  HiXMark,
} from "react-icons/hi2";
import { AccentText, LeafCorner } from "@/components/home/shared";
import { PageBannerHero } from "@/components/site/PageBannerHero";
import { UtilityIcon } from "@/components/site/icons";
import {
  GALLERY_ALBUMS,
  buildAlbumCards,
  type GalleryAlbumId,
  type GalleryPhoto,
} from "@/lib/content/galleryAlbums";
import type { PageContent } from "@/lib/types";

/** Exact react-icons matching Gallery Albums reference mock */
const ALBUM_ICONS: Record<
  GalleryAlbumId,
  ComponentType<{ className?: string }>
> = {
  all: MdImage,
  events: MdOutlineCalendarMonth,
  education: FaBookOpen,
  health: FaHeartbeat,
  environment: FaLeaf,
  community: FaUsers,
};

export function GalleryPageView({
  photos,
  heroImageUrl,
  page,
}: {
  photos: GalleryPhoto[];
  heroImageUrl: string;
  page?: PageContent;
}) {
  const heroEyebrow =
    page?.extras?.pageHeroEyebrow?.trim() || "Our Journey in Pictures";
  const heroHeadline = page?.headline?.trim() || "Photo Gallery";
  const heroAccent =
    page?.heroAccentWords?.trim() ||
    (heroHeadline.toLowerCase().includes("gallery") ? "Gallery" : "");
  const heroBody =
    page?.body?.trim() ||
    "Moments of service, smiles and solidarity — explore albums from our drives, education programmes, health camps and community work across Uttarakhand.";
  const [active, setActive] = useState<GalleryAlbumId>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const albums = useMemo(() => buildAlbumCards(photos), [photos]);

  const filteredPhotos = useMemo(
    () =>
      active === "all" ? photos : photos.filter((p) => p.albumId === active),
    [active, photos],
  );

  const showAlbumCards = active === "all";
  const lightboxPhoto =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  useEffect(() => {
    setLightboxIndex(null);
  }, [active]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((i) =>
          i === null || filteredPhotos.length === 0
            ? i
            : (i - 1 + filteredPhotos.length) % filteredPhotos.length,
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((i) =>
          i === null || filteredPhotos.length === 0
            ? i
            : (i + 1) % filteredPhotos.length,
        );
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, filteredPhotos.length]);

  return (
    <div className="bg-[var(--cream)]">
      <PageBannerHero imageUrl={heroImageUrl} contentClassName="w-full max-w-[34rem]">
        <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
          {heroEyebrow}
        </p>
        <h1 className="display mt-1.5 text-[clamp(1.7rem,7vw,3.25rem)] font-bold leading-[1.05] text-[var(--forest)] sm:mt-2">
          <AccentText
            text={heroHeadline}
            accent={heroAccent}
            accentClass="text-[#D68C23]"
          />
        </h1>
        <p className="mt-2 max-w-[28rem] line-clamp-3 text-[12px] leading-[1.65] text-[#4A4A4A] sm:mt-2.5 sm:line-clamp-none sm:text-[13.5px] sm:leading-[1.7]">
          {heroBody}
        </p>
      </PageBannerHero>

      {/*
        LEFT  ? Gallery Albums sidebar (parallel to right column)
        RIGHT ? Filter pills ABOVE images (2nd SS), then cards
      */}
      <section className="relative overflow-hidden py-8 sm:py-10 lg:py-12">
        <LeafCorner corner="bl" tone="forest" className="opacity-70" />
        <LeafCorner corner="br" tone="forest" className="opacity-65" />

        <div className="page-shell relative z-[1]">
          <div className="grid gap-4 lg:grid-cols-[220px_1fr] lg:items-start lg:gap-5 xl:grid-cols-[240px_minmax(0,920px)]">
            {/* Sidebar — starts with image grid (below tabs on desktop) */}
            <aside className="order-2 flex w-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_8px_24px_rgba(0,51,43,0.07)] lg:order-1 lg:mt-[2.75rem]">
              <div className="shrink-0 border-b border-[var(--border)] px-4 py-3.5">
                <h2 className="text-[1.2rem] font-bold text-[var(--forest)]">
                  Gallery Albums
                </h2>
              </div>
              <nav className="flex flex-col p-1.5" aria-label="Gallery albums">
                {GALLERY_ALBUMS.map((album, index) => {
                  const selected = active === album.id;
                  const Icon = ALBUM_ICONS[album.id];
                  return (
                    <div key={album.id}>
                      <button
                        type="button"
                        onClick={() => setActive(album.id)}
                        className={`box-border flex h-12 w-full shrink-0 items-center gap-3 rounded-md border-b-2 px-3.5 text-left text-[13.5px] font-semibold transition-colors ${
                          selected
                            ? "border-[#D97706] bg-[#F8EBD7] text-[#D97706]"
                            : "border-transparent bg-transparent text-[#2C3A4A] hover:bg-[var(--ivory)]"
                        }`}
                      >
                        <Icon
                          className={`h-[18px] w-[18px] shrink-0 ${
                            selected ? "text-[#D97706]" : "text-[#4A5568]"
                          }`}
                        />
                        <span className="min-w-0 flex-1 leading-tight">
                          {album.label}
                        </span>
                        <HiChevronRight
                          className={`h-4 w-4 shrink-0 ${
                            selected
                              ? "text-[#D97706] opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </button>
                      {index < GALLERY_ALBUMS.length - 1 ? (
                        <div className="mx-3 h-px bg-[var(--border)]" />
                      ) : null}
                    </div>
                  );
                })}
              </nav>
            </aside>

            <div className="order-1 min-w-0 space-y-3.5 sm:space-y-4 lg:order-2">
              {/* Tabs only above image column — not over Gallery Albums */}
              <div className="flex w-full flex-wrap items-center justify-start gap-2 gap-y-2 sm:gap-2.5">
                {GALLERY_ALBUMS.map((album) => {
                  const selected = active === album.id;
                  return (
                    <button
                      key={album.id}
                      type="button"
                      onClick={() => setActive(album.id)}
                      className={`nav-bar rounded-full px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.05em] transition-colors sm:px-3.5 sm:text-[11px] ${
                        selected
                          ? "bg-[var(--forest)] text-white shadow-[0_4px_12px_rgba(0,51,43,0.16)]"
                          : "bg-[#FCF7EF] text-[#D97706]/80 shadow-[0_2px_8px_rgba(217,119,6,0.18)] hover:bg-[#F8EBD7]"
                      }`}
                    >
                      {album.label}
                    </button>
                  );
                })}
              </div>

              {showAlbumCards ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-3.5">
                  {albums.map((album) => (
                    <button
                      key={album.id}
                      type="button"
                      onClick={() => setActive(album.id)}
                      className="group overflow-hidden rounded-lg border border-[var(--border)] bg-white text-left shadow-[0_4px_14px_rgba(0,51,43,0.04)] transition-shadow hover:shadow-[0_8px_20px_rgba(0,51,43,0.09)]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e2d6]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={album.coverUrl}
                          alt={album.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-0.5 rounded bg-black/55 px-1.5 py-0.5 text-[9px] font-semibold text-white backdrop-blur-sm">
                          <UtilityIcon name="camera" className="h-2.5 w-2.5" />
                          {album.count}
                        </span>
                      </div>
                      <div className="px-2 py-1.5">
                        <h3 className="text-[0.82rem] font-bold leading-snug text-[var(--forest)] group-hover:text-[var(--orange-deep)]">
                          {album.title}
                        </h3>
                        <p className="mt-0.5 text-[10.5px] text-[var(--muted)]">
                          {album.count} Photos
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-3.5">
                  {filteredPhotos.map((photo, index) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="group overflow-hidden rounded-lg border border-[var(--border)] bg-white text-left shadow-[0_4px_14px_rgba(0,51,43,0.04)] transition-shadow hover:shadow-[0_8px_20px_rgba(0,51,43,0.09)]"
                    >
                      <figure>
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e2d6]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photo.url}
                            alt={photo.alt}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <figcaption className="px-2 py-1.5 text-[11.5px] font-bold text-[var(--forest)] group-hover:text-[var(--orange-deep)]">
                          {photo.title}
                        </figcaption>
                      </figure>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {lightboxPhoto && lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.title}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-3 top-3 z-[2] flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-5 sm:top-5"
          >
            <HiXMark className="h-6 w-6" />
          </button>

          {filteredPhotos.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + filteredPhotos.length) %
                      filteredPhotos.length,
                  );
                }}
                className="absolute left-2 z-[2] flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:left-5 sm:h-11 sm:w-11"
              >
                <HiChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex + 1) % filteredPhotos.length,
                  );
                }}
                className="absolute right-2 z-[2] flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-5 sm:h-11 sm:w-11 md:right-16"
              >
                <HiChevronRight className="h-6 w-6" />
              </button>
            </>
          ) : null}

          <div
            className="relative flex max-h-[min(90vh,900px)] w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxPhoto.url}
              alt={lightboxPhoto.alt}
              className="max-h-[min(78vh,820px)] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-[14px] font-semibold text-white">
              {lightboxPhoto.title}
            </p>
            {filteredPhotos.length > 1 ? (
              <p className="mt-1 text-[12px] text-white/70">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
