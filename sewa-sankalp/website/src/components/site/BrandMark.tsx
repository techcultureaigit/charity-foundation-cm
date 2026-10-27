/** Circular emblem matching the PDF header logo. */
export function BrandEmblem({
  tone = "color",
  className = "h-12 w-12",
}: {
  tone?: "color" | "light";
  className?: string;
}) {
  const light = tone === "light";
  /* Footer (light): gold figure + soft green leaf. Header (color): orange + forest. */
  const warm = light ? "#F0D9A8" : "var(--orange)";
  const leaf = light ? "#7FA88A" : "var(--forest)";
  const gold = light ? "#F0D9A8" : "var(--gold)";
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden>
      <circle
        cx="28"
        cy="28"
        r="26"
        fill={light ? "rgba(240,217,168,0.08)" : "#f7f0e4"}
      />
      <circle
        cx="28"
        cy="28"
        r="24.5"
        fill="none"
        stroke={gold}
        strokeWidth="1.5"
        opacity="0.9"
      />
      <path
        d="M27 32C16 32 10 24 11.5 13c9 1.8 14 9 15.5 19Z"
        fill={warm}
        opacity="0.95"
      />
      <path
        d="M29 32c11 0 17-8 15.5-19-9 1.8-14 9-15.5 19Z"
        fill={warm}
        opacity="0.95"
      />
      <circle cx="28" cy="19" r="4" fill={warm} />
      <path
        d="M28 24c-3.6 0-5.8 3.2-5.8 7.4h11.6c0-4.2-2.2-7.4-5.8-7.4Z"
        fill={warm}
      />
      <path
        d="M27 46C15 46 7 39 8 30.5c9.5 1 16.5 7 19 15.5Z"
        fill={leaf}
      />
      <path
        d="M29 46c12 0 20-7 19-15.5-9.5 1-16.5 7-19 15.5Z"
        fill={leaf}
        opacity="0.88"
      />
    </svg>
  );
}

export function BrandMark({
  className = "",
  tone = "color",
}: {
  className?: string;
  tone?: "color" | "light";
}) {
  const light = tone === "light";
  const src = light
    ? "/uploads/logo-footer.png?v=1"
    : "/uploads/logo-header.png?v=1";

  return (
    <span
      className={`inline-flex max-w-full items-center ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Sewa Sankalp Foundation"
        className={
          light
            ? "h-9 w-auto max-w-[min(200px,62vw)] object-contain object-left sm:h-11 sm:max-w-[240px] md:h-[3.25rem] md:max-w-[280px]"
            : "h-8 w-auto max-w-[min(148px,46vw)] object-contain object-left sm:h-10 sm:max-w-[190px] md:h-11 md:max-w-[230px] lg:h-[3.15rem] lg:max-w-[270px]"
        }
      />
    </span>
  );
}
