import type { ReactNode } from "react";

type IconProps = { className?: string };

function Svg({
  className = "h-5 w-5",
  children,
  fill = "none",
}: {
  className?: string;
  children: ReactNode;
  fill?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={fill}
      stroke={fill === "none" ? "currentColor" : "none"}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Icons selectable in admin (iconKey). Unknown keys fall back to a leaf. */
export function IconByKey({
  iconKey,
  className,
}: {
  iconKey?: string;
  className?: string;
}) {
  switch (iconKey) {
    case "women":
      return (
        <Svg className={className}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5" />
          <path d="M8.2 6.5c1.2 1.4 2.9 1.9 4.6 1.5" />
        </Svg>
      );
    case "child":
      return (
        <Svg className={className}>
          <circle cx="12" cy="8.5" r="3" />
          <path d="M6.5 20c.4-3.2 2.6-5 5.5-5s5.1 1.8 5.5 5" />
          <path d="M9.5 5.8c.9-1.2 2.9-1.6 4.9-.4" />
        </Svg>
      );
    case "education":
    case "book":
      return (
        <Svg className={className}>
          <path d="M12 6.5C10.2 5 7.6 4.6 4 5v12.2c3.6-.4 6.2 0 8 1.3 1.8-1.3 4.4-1.7 8-1.3V5c-3.6-.4-6.2 0-8 1.5Z" />
          <path d="M12 6.5v12" />
        </Svg>
      );
    case "social":
    case "people":
      return (
        <Svg className={className}>
          <circle cx="9" cy="8.5" r="2.8" />
          <circle cx="17" cy="9.5" r="2.2" />
          <path d="M3.5 19c.5-3.2 2.6-4.8 5.5-4.8s5 1.6 5.5 4.8" />
          <path d="M15 14.6c2.6-.3 4.8.9 5.5 3.9" />
        </Svg>
      );
    case "helper":
      return (
        <Svg className={className}>
          <path d="M3 13h3.2l3.6-1.6c.9-.4 1.9.1 2.2 1 .2.8-.3 1.6-1.1 1.9L9 15h4.2l5.6-2.6c.8-.4 1.8 0 2.1.8.3.7 0 1.5-.7 1.9L14 19.5c-.5.3-1.1.4-1.7.2L6 18H3" />
          <path d="M12 9.2c-1.6-1.5-3.2-2.7-3.2-4.2a2 2 0 0 1 3.2-1.5 2 2 0 0 1 3.2 1.5c0 1.5-1.6 2.7-3.2 4.2Z" />
        </Svg>
      );
    case "volunteer":
      return (
        <Svg className={className}>
          <circle cx="12" cy="7.5" r="2.6" />
          <circle cx="5.5" cy="10" r="1.9" />
          <circle cx="18.5" cy="10" r="1.9" />
          <path d="M7.5 19c.3-3 2.1-4.6 4.5-4.6s4.2 1.6 4.5 4.6" />
          <path d="M2.5 17.5c.2-2 1.2-3.2 3-3.4M21.5 17.5c-.2-2-1.2-3.2-3-3.4" />
        </Svg>
      );
    case "supporter":
      return (
        <Svg className={className}>
          <path d="M3 14h3.2l3.6-1.4c.9-.4 1.9.1 2.2 1 .2.8-.3 1.6-1.1 1.9L9 16h4.2l5.6-2.6c.8-.4 1.8 0 2.1.8.3.7 0 1.5-.7 1.9L14 20.5c-.5.3-1.1.4-1.7.2L6 19H3" />
          <path d="M12 10.5c-2.4-2-4-3.3-4-5.1A2.3 2.3 0 0 1 12 4a2.3 2.3 0 0 1 4 1.4c0 1.8-1.6 3.1-4 5.1Z" fill="currentColor" stroke="none" />
        </Svg>
      );
    case "heart":
      return (
        <Svg className={className}>
          <path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
        </Svg>
      );
    case "tree":
      return (
        <Svg className={className}>
          <path d="M12 21v-8" />
          <path d="M12 13c-3.6 0-6-2.4-6-6 3.6 0 6 2.4 6 6Z" />
          <path d="M12 15c3.6 0 6-2.4 6-6-3.6 0-6 2.4-6 6Z" />
          <path d="M8 21h8" />
        </Svg>
      );
    default:
      return (
        <Svg className={className}>
          <path d="M12 21c0-5 1-9 7-14-.5 6-2 10-7 14Z" />
          <path d="M12 21c0-4-.8-7-5.5-10.5C7 15.5 8.5 18.5 12 21Z" />
        </Svg>
      );
  }
}

export function SocialIcon({
  name,
  className = "h-4 w-4",
}: {
  name: "facebook" | "instagram" | "youtube" | "linkedin" | "twitter";
  className?: string;
}) {
  switch (name) {
    case "facebook":
      return (
        <Svg className={className} fill="currentColor">
          <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
        </Svg>
      );
    case "instagram":
      return (
        <Svg className={className}>
          <rect x="4" y="4" width="16" height="16" rx="4.5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="17" cy="7" r="0.8" fill="currentColor" />
        </Svg>
      );
    case "youtube":
      return (
        <Svg className={className} fill="currentColor">
          <path d="M21.6 7.6a2.6 2.6 0 0 0-1.8-1.9C18.2 5.3 12 5.3 12 5.3s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.6C2 9.2 2 12 2 12s0 2.8.4 4.4a2.6 2.6 0 0 0 1.8 1.9c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.9c.4-1.6.4-4.4.4-4.4s0-2.8-.4-4.4ZM10 15V9l5.2 3L10 15Z" />
        </Svg>
      );
    case "linkedin":
      return (
        <Svg className={className} fill="currentColor">
          <path d="M5.2 9.2h3v9.6h-3V9.2Zm1.5-4.7a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4ZM10.1 9.2H13v1.3c.5-.9 1.6-1.6 3.1-1.6 3 0 3.6 2 3.6 4.6v5.3h-3v-4.7c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4v4.8h-3V9.2Z" />
        </Svg>
      );
    default:
      return (
        <Svg className={className} fill="currentColor">
          <path d="M17.6 4h2.9l-6.3 7.2L21.6 20h-5.8l-4.5-5.9L6.1 20H3.2l6.7-7.7L2.8 4h5.9l4.1 5.4L17.6 4Zm-1 14.3h1.6L7.9 5.6H6.2l10.4 12.7Z" />
        </Svg>
      );
  }
}

export function UtilityIcon({
  name,
  className = "h-4 w-4",
}: {
  name:
    | "mail"
    | "phone"
    | "pin"
    | "ticket"
    | "calendar"
    | "star"
    | "arrow"
    | "chevron"
    | "chevron-down"
    | "user"
    | "camera"
    | "book"
    | "heart"
    | "tree"
    | "people"
    | "search"
    | "check"
    | "graduation"
    | "gear"
    | "chart"
    | "globe";
  className?: string;
} & IconProps) {
  switch (name) {
    case "globe":
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18" />
          <path d="M12 3a14 14 0 0 0 0 18" />
        </Svg>
      );
    case "graduation":
      return (
        <Svg className={className}>
          <path d="M3 10.5 12 6l9 4.5-9 4.5L3 10.5Z" />
          <path d="M7 13v3.5c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5V13" />
          <path d="M21 10.5V16" />
        </Svg>
      );
    case "gear":
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
        </Svg>
      );
    case "chart":
      return (
        <Svg className={className}>
          <path d="M4 19h16" />
          <path d="M7 16V11M12 16V8M17 16V5" />
        </Svg>
      );
    case "check":
      return (
        <Svg className={className}>
          <path d="M5 12.5 9.5 17 19 7.5" />
        </Svg>
      );
    case "search":
      return (
        <Svg className={className}>
          <circle cx="11" cy="11" r="6" />
          <path d="m16 16 4 4" />
        </Svg>
      );
    case "camera":
      return (
        <Svg className={className}>
          <path d="M4.5 8.5h3l1.4-2h6.2l1.4 2H19.5A1.5 1.5 0 0 1 21 10v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18v-8a1.5 1.5 0 0 1 1.5-1.5Z" />
          <circle cx="12" cy="14" r="3.2" />
        </Svg>
      );
    case "book":
      return <IconByKey iconKey="book" className={className} />;
    case "heart":
      return <IconByKey iconKey="heart" className={className} />;
    case "tree":
      return <IconByKey iconKey="tree" className={className} />;
    case "people":
      return <IconByKey iconKey="people" className={className} />;
    case "user":
      return (
        <Svg className={className}>
          <circle cx="12" cy="8.5" r="3.2" />
          <path d="M5.5 19.5c1.2-3.4 3.4-5 6.5-5s5.3 1.6 6.5 5" />
        </Svg>
      );
    case "mail":
      return (
        <Svg className={className}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="m4 7.5 8 6 8-6" />
        </Svg>
      );
    case "arrow":
      return (
        <Svg className={className}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </Svg>
      );
    case "phone":
      return (
        <Svg className={className}>
          <path d="M6.5 3.8 9 3.5l1.6 3.7-1.7 1.4a11 11 0 0 0 5.5 5.5l1.4-1.7 3.7 1.6-.3 2.5a2.2 2.2 0 0 1-2.2 1.9C9.9 18.4 5.6 14.1 4.6 6a2.2 2.2 0 0 1 1.9-2.2Z" />
        </Svg>
      );
    case "pin":
      return (
        <Svg className={className}>
          <path d="M12 21s6.5-5.2 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.8 12 21 12 21Z" />
          <circle cx="12" cy="10.5" r="2.3" />
        </Svg>
      );
    case "ticket":
      return (
        <Svg className={className}>
          <path d="M3.5 9V7a1.5 1.5 0 0 1 1.5-1.5h14A1.5 1.5 0 0 1 20.5 7v2a2.5 2.5 0 0 0 0 5v2a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 16v-2a2.5 2.5 0 0 0 0-5Z" />
          <path d="M14 6v12" strokeDasharray="1.8 2.2" />
        </Svg>
      );
    case "calendar":
      return (
        <Svg className={className}>
          <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
          <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
        </Svg>
      );
    case "star":
      return (
        <Svg className={className} fill="currentColor">
          <path d="m12 3.5 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.5Z" />
        </Svg>
      );
    case "chevron":
      return (
        <Svg className={className}>
          <path d="m9 5 7 7-7 7" />
        </Svg>
      );
    case "chevron-down":
      return (
        <Svg className={className}>
          <path d="m6 9 6 6 6-6" />
        </Svg>
      );
    default:
      return (
        <Svg className={className}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </Svg>
      );
  }
}
