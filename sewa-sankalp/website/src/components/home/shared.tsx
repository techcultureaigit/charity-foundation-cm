import type { CSSProperties, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Text helpers                                                        */
/* ------------------------------------------------------------------ */

/**
 * Renders `text` with the first occurrence of `accent` wrapped in an accent
 * colour. If the accent isn't found (or empty) the plain text is shown.
 */
export function AccentText({
  text,
  accent,
  accentClass = "text-[var(--gold)]",
  breakBeforeAccent = false,
}: {
  text: string;
  accent?: string;
  accentClass?: string;
  breakBeforeAccent?: boolean;
}) {
  const needle = (accent ?? "").trim();
  if (!needle) return <>{text}</>;
  const index = text.toLowerCase().indexOf(needle.toLowerCase());
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index).replace(/\s+$/, "");
  const match = text.slice(index, index + needle.length);
  const after = text.slice(index + needle.length);

  return (
    <>
      {before}
      {before ? (breakBeforeAccent ? <br /> : " ") : null}
      <span className={accentClass}>{match}</span>
      {after}
    </>
  );
}

export function paragraphs(text?: string) {
  return (text ?? "")
    .split(/\n{1,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Split a "25 Oct 2024" style label into badge parts. */
export function splitDate(label: string) {
  const parts = label.trim().split(/\s+/);
  if (parts.length === 3) return { day: parts[0], month: parts[1], year: parts[2] };
  return { day: label.trim(), month: "", year: "" };
}

/* ------------------------------------------------------------------ */
/* Decorative SVG                                                      */
/* ------------------------------------------------------------------ */

export function LeafShape({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 60 100" className={className} style={style} aria-hidden>
      <path
        d="M30 2C8 24 4 54 30 98 56 54 52 24 30 2Z"
        fill="currentColor"
      />
      <path
        d="M30 12v82M30 40 18 28M30 56 14 42M30 40l12-12M30 56l16-14"
        stroke="#fffbf2"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Corner cluster of pale leaves. `corner` decides placement + mirroring. */
export function LeafCorner({
  corner,
  className = "",
  tone = "sage",
}: {
  corner: "tl" | "tr" | "bl" | "br";
  className?: string;
  tone?: "sage" | "forest" | "gold";
}) {
  const position = {
    tl: "left-0 top-0",
    tr: "right-0 top-0 -scale-x-100",
    bl: "bottom-0 left-0 -scale-y-100",
    br: "bottom-0 right-0 -scale-100",
  }[corner];
  const colour =
    tone === "forest"
      ? "text-[#2f5d4d]/25"
      : tone === "gold"
        ? "text-[#E8D6B0]/80"
        : "text-[#b7c9b0]/55";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute h-44 w-40 sm:h-60 sm:w-56 ${position} ${colour} ${className}`}
    >
      <LeafShape className="absolute left-2 top-2 h-28 w-16 -rotate-[28deg] sm:h-40 sm:w-24" />
      <LeafShape className="absolute left-14 top-0 h-24 w-14 rotate-[14deg] opacity-80 sm:left-20 sm:h-32 sm:w-20" />
      <LeafShape className="absolute left-0 top-20 h-20 w-12 -rotate-[62deg] opacity-70 sm:top-28 sm:h-28 sm:w-16" />
      <LeafShape className="absolute left-24 top-16 hidden h-20 w-12 rotate-[48deg] opacity-60 sm:block" />
    </div>
  );
}

/** Small gold leaf used in titles and quotes. */
export function GoldLeaf({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 22C12 14 16 8 22 4c.4 7-3 14-10 18Z"
        fill="var(--gold)"
      />
      <path
        d="M12 22C12 15 9 10 3 7c-.4 6.500 3 12 9 15Z"
        fill="var(--gold)"
        opacity="0.7"
      />
    </svg>
  );
}

/** Wavy divider that fills `color` (CSS colour / var) from the bottom. */
export function WaveBottom({
  color = "var(--forest)",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`pointer-events-none block w-full ${className}`}
      aria-hidden
    >
      <path
        d="M0 70C180 20 360 10 560 40s420 70 620 30 200-40 260-50v100H0Z"
        fill={color}
      />
      <path
        d="M0 62C180 14 360 4 560 34s420 70 620 30 200-40 260-50"
        fill="none"
        stroke="var(--gold)"
        strokeOpacity="0.7"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/** Green swoosh sweeping into the bottom corner of a section. */
export function CornerSweep({ side }: { side: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 300 90"
      className={`pointer-events-none absolute bottom-0 h-16 w-56 sm:h-24 sm:w-80 ${
        side === "left" ? "left-0" : "right-0 -scale-x-100"
      }`}
      aria-hidden
    >
      <path d="M0 90V20C60 22 130 56 210 90H0Z" fill="var(--forest)" />
      <path
        d="M0 14C70 14 150 48 240 90"
        fill="none"
        stroke="var(--gold)"
        strokeOpacity="0.75"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section titles                                                      */
/* ------------------------------------------------------------------ */

/** "INTRODUCTION" style: leaf above, spaced caps title, thin gold rules. */
export function OrnamentTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <div className="mx-auto flex max-w-xs items-center justify-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--gold)]/70" />
        <GoldLeaf className="h-5 w-5" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--gold)]/70" />
      </div>
      <h2 className="display mt-2 text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold uppercase tracking-[0.05em] text-[var(--forest)]">
        {children}
      </h2>
      <div className="mx-auto mt-2 h-px w-44 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
    </div>
  );
}

/** Eyebrow with side rules, big serif headline, leaf divider, subtitle. */
export function EyebrowTitle({
  eyebrow,
  headline,
  accent,
  subtitle,
  className = "",
}: {
  eyebrow?: string;
  headline: string;
  accent?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      {eyebrow ? (
        <div className="mx-auto flex max-w-md items-center justify-center gap-4">
          <span className="h-px w-10 bg-[var(--gold)]/70 sm:w-16" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)] sm:text-xs">
            {eyebrow}
          </p>
          <span className="h-px w-10 bg-[var(--gold)]/70 sm:w-16" />
        </div>
      ) : null}
      <h2 className="display mt-3 text-[clamp(2.1rem,4.2vw,3.4rem)] font-bold leading-tight text-[var(--forest)]">
        <AccentText text={headline} accent={accent} />
      </h2>
      <div className="mx-auto mt-2 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-[var(--gold)]/60" />
        <GoldLeaf className="h-4 w-4" />
        <span className="h-px w-8 bg-[var(--gold)]/60" />
      </div>
      {subtitle ? (
        <p className="mt-3 text-sm text-[var(--charcoal)] sm:text-[15px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Images with placeholders                                            */
/* ------------------------------------------------------------------ */

/**
 * Renders the image when there is a URL, otherwise a soft gradient with a
 * helpful hint — layout never breaks without media.
 */
export function SmartImage({
  src,
  alt,
  hint,
  tint = "from-[#dfe9d6] to-[#f3e7cc]",
  className = "",
  imgClassName = "",
  children,
}: {
  src?: string;
  alt?: string;
  hint?: string;
  tint?: string;
  className?: string;
  imgClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          className={`absolute inset-0 flex items-end justify-end bg-gradient-to-br ${tint}`}
        >
          <svg
            viewBox="0 0 200 100"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-1/2 w-full text-[#2f5d4d]/15"
            aria-hidden
          >
            <path d="M0 100V60l30-24 26 18 34-40 38 46 30-22 42 34v28Z" fill="currentColor" />
          </svg>
          {hint ? (
            <span className="relative m-2 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-medium leading-tight text-[var(--forest)]/80 backdrop-blur-sm">
              {hint}
            </span>
          ) : null}
        </div>
      )}
      {children}
    </div>
  );
}
