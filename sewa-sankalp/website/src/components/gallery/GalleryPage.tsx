"use client";

import { useMemo, useState } from "react";
import { AccentText, LeafCorner } from "@/components/home/shared";
import { UtilityIcon } from "@/components/site/icons";
import {
  GALLERY_ALBUMS,
  buildAlbumCards,
  type GalleryAlbumId,
  type GalleryPhoto,
} from "@/lib/content/galleryAlbums";

export function GalleryPageView({
  photos,
  heroImageUrl,
}: {
  photos: GalleryPhoto[];
  heroImageUrl: string;
}) {
  const [active, setActive] = useState<GalleryAlbumId>("all");
  const albums = useMemo(() => buildAlbumCards(photos), [photos]);

  const filteredPhotos = useMemo(
    () =>
      active === "all" ? photos : photos.filter((p) => p.albumId === active),
    [active, photos],
  );

  const showAlbumCards = active === "all";

  return (
    <div className="bg-[var(--cream)]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#FDF8EE] leading-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImageUrl}
          alt=""
          aria-hidden
          className="m-0 block h-[240px] w-full max-w-none object-cover object-[85%_center] sm:h-[230px] sm:object-right lg:h-[260px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#FDF8EE] from-[0%] via-[#FDF8EE] via-[48%] to-transparent to-[78%] sm:from-[#FDF8EE]/70 sm:via-[#FDF8EE]/30 sm:to-transparent"
        />
        <div className="pointer-events-none absolute inset-0 z-[2] flex items-center">
          <div className="page-shell pointer-events-auto flex w-full justify-start">
            <div className="w-full max-w-[34rem] py-3 sm:py-4 sm:pl-[4%] lg:pl-[8%]">
              <p className="nav-bar text-[10px] font-bold uppercase tracking-[0.22em] text-[#D68C23] sm:text-[11px]">
                Our Journey in Pictures
              </p>
              <h1 className="display mt-1.5 text-[clamp(1.7rem,7vw,3.25rem)] font-bold leading-[1.05] text-[#0A2E26] sm:mt-2">
                <AccentText
                  text="Photo Gallery"
                  accent="Gallery"
                  accentClass="text-[#D68C23]"
                />
              </h1>
              <p className="mt-2 max-w-[28rem] line-clamp-3 text-[12px] leading-[1.65] text-[#4A4A4A] sm:mt-2.5 sm:line-clamp-none sm:text-[13.5px] sm:leading-[1.7]">
                Moments of service, smiles and solidarity — explore albums from
                our drives, education programmes, health camps and community
                work across Uttarakhand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*
        LEFT  → Gallery Albums sidebar (parallel to right column)
        RIGHT → Filter pills ABOVE images (2nd SS), then cards
      */}
      <section className="relative overflow-hidden py-8 sm:py-10 lg:py-12">
        <LeafCorner corner="bl" tone="forest" className="opacity-70" />
        <LeafCorner corner="br" tone="forest" className="opacity-65" />

        <div className="page-shell relative z-[1]">
          <div className="grid gap-4 lg:grid-cols-[168px_1fr] lg:items-stretch lg:gap-5 xl:grid-cols-[176px_minmax(0,920px)]">
            <aside className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-[0_6px_18px_rgba(0,51,43,0.05)]">
              <div className="shrink-0 border-b border-[var(--border)] px-3 py-2.5">
                <h2 className="display text-[1rem] font-bold text-[var(--forest)]">
                  Gallery Albums
                </h2>
              </div>
              <nav
                className="flex flex-1 flex-col"
                aria-label="Gallery albums"
              >
                {GALLERY_ALBUMS.map((album, index) => {
                  const selected = active === album.id;
                  return (
                    <button
                      key={album.id}
                      type="button"
                      onClick={() => setActive(album.id)}
                      className={`flex w-full flex-1 items-center gap-2 px-3 py-2 text-left text-[11.5px] font-semibold transition-colors ${
                        index < GALLERY_ALBUMS.length - 1
                          ? "border-b border-[var(--border)]"
                          : ""
                      } ${
                        selected
                          ? "bg-[#F8EBD7] text-[#D97706]"
                          : "text-[var(--charcoal)] hover:bg-[var(--ivory)]"
                      }`}
                    >
                      <UtilityIcon
                        name={album.icon}
                        className={`h-3 w-3 shrink-0 ${
                          selected ? "text-[#D97706]" : "text-[var(--muted)]"
                        }`}
                      />
                      <span className="min-w-0 flex-1 leading-tight">
                        {album.label}
                      </span>
                      {selected ? (
                        <UtilityIcon
                          name="chevron"
                          className="h-2.5 w-2.5 shrink-0 text-[#D97706]"
                        />
                      ) : null}
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div className="min-w-0 space-y-3.5 sm:space-y-4">
              {/* Filters sit only above the images — not over the sidebar */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
                          : "border border-black/10 bg-[#F7F4EE] text-[var(--charcoal)] hover:border-[var(--gold)]/40"
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
                        <h3 className="display text-[0.82rem] font-bold leading-snug text-[var(--forest)] group-hover:text-[var(--orange-deep)]">
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
                <div>
                  <div className="mb-3 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="display text-[1.05rem] font-bold text-[var(--forest)]">
                        {GALLERY_ALBUMS.find((a) => a.id === active)?.label}
                      </h3>
                      <p className="mt-0.5 text-[11.5px] text-[var(--muted)]">
                        {filteredPhotos.length} photos
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActive("all")}
                      className="text-[11.5px] font-semibold text-[#D97706] hover:underline"
                    >
                      ← All albums
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-3.5">
                    {filteredPhotos.map((photo) => (
                      <figure
                        key={photo.id}
                        className="overflow-hidden rounded-lg border border-[var(--border)] bg-white shadow-[0_4px_14px_rgba(0,51,43,0.04)]"
                      >
                        <div className="relative aspect-[16/10] bg-[#e8e2d6]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photo.url}
                            alt={photo.alt}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <figcaption className="px-2 py-1.5 text-[11.5px] font-semibold text-[var(--forest)]">
                          {photo.title}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
