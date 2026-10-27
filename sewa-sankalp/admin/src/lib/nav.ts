export interface AdminNavItem {
  label: string;
  href: string;
  icon:
    | "dashboard"
    | "pages"
    | "work"
    | "enquiries"
    | "volunteers"
    | "impact"
    | "media"
    | "contact"
    | "seo"
    | "legal"
    | "involvement"
    | "causes"
    | "events";
}

export interface AdminNavSection {
  title: string;
  items: AdminNavItem[];
}

/** Modules mapped from the website blueprint */
export const adminNavSections: AdminNavSection[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/admin", icon: "dashboard" }],
  },
  {
    title: "Website content",
    items: [
      { label: "Pages", href: "/admin/pages", icon: "pages" },
      { label: "Work Areas", href: "/admin/work-areas", icon: "work" },
      { label: "Involvement", href: "/admin/involvement", icon: "involvement" },
      { label: "Causes", href: "/admin/causes", icon: "causes" },
      { label: "Events", href: "/admin/events", icon: "events" },
      { label: "Media", href: "/admin/media", icon: "media" },
      { label: "Impact", href: "/admin/impact", icon: "impact" },
    ],
  },
  {
    title: "Get involved",
    items: [
      { label: "Enquiries", href: "/admin/enquiries", icon: "enquiries" },
      { label: "Volunteers", href: "/admin/volunteers", icon: "volunteers" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Contact Settings", href: "/admin/settings/contact", icon: "contact" },
      { label: "SEO", href: "/admin/settings/seo", icon: "seo" },
      { label: "Legal Pages", href: "/admin/settings/legal", icon: "legal" },
    ],
  },
];

export const adminNav: AdminNavItem[] = adminNavSections.flatMap(
  (section) => section.items,
);
