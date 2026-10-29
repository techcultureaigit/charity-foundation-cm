/** Site brand mark — circular emblem + Hindi wordmark (single line, locked). */

const LOGO_SRC = "/uploads/logo.png?v=2";

export function BrandEmblem({
  tone: _tone = "color",
  className = "h-12 w-12",
}: {
  tone?: "color" | "light";
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt=""
      aria-hidden
      className={`shrink-0 rounded-full object-contain ${className}`}
    />
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

  return (
    <span
      className={`notranslate inline-flex min-w-0 max-w-full items-center gap-2 sm:gap-2.5 ${className}`}
      translate="no"
      lang="hi"
    >
      <style>{`
        .brand-wordmark__text::before { content: "सेवा संकल्प फाउंडेशन"; }
      `}</style>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden
        className={
          light
            ? "h-10 w-10 shrink-0 rounded-full object-contain sm:h-11 sm:w-11 md:h-12 md:w-12"
            : "h-9 w-9 shrink-0 rounded-full object-contain sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12"
        }
      />
      {/* Wordmark via CSS content so Google Translate cannot rewrite brand name */}
      <span
        className={`brand-wordmark brand-wordmark__text min-w-0 max-w-[calc(100vw-5.5rem)] truncate leading-none tracking-normal sm:max-w-none sm:overflow-visible sm:whitespace-nowrap sm:text-clip ${
          light
            ? "text-[13px] font-semibold text-[var(--gold)] sm:text-[15px] md:text-[16px]"
            : "text-[12px] font-semibold text-[var(--forest)] sm:text-[14px] md:text-[15px] lg:text-[16px]"
        }`}
        aria-label="सेवा संकल्प फाउंडेशन"
        role="img"
      />
    </span>
  );
}
