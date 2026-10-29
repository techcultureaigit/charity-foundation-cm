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
    | "events"
    | "blog"
    | "campaigns";
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
    title: "Website pages",
    items: [
      { label: "Homepage", href: "/admin/homepage", icon: "pages" },
      { label: "About Us", href: "/admin/about", icon: "pages" },
      { label: "Education", href: "/admin/education", icon: "pages" },
      { label: "Campaigns", href: "/admin/campaigns", icon: "campaigns" },
      { label: "Gallery", href: "/admin/gallery", icon: "media" },
      { label: "Blog", href: "/admin/blog", icon: "blog" },
      { label: "Contact Us", href: "/admin/contact-page", icon: "contact" },
    ],
  },
  {
    title: "Homepage cards",
    items: [
      { label: "Work Areas", href: "/admin/work-areas", icon: "work" },
      { label: "Involvement", href: "/admin/involvement", icon: "involvement" },
      { label: "Causes", href: "/admin/causes", icon: "causes" },
      { label: "Events", href: "/admin/events", icon: "events" },
      { label: "Impact", href: "/admin/impact", icon: "impact" },
      { label: "Media", href: "/admin/media", icon: "media" },
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
      { label: "All pages (legacy)", href: "/admin/pages", icon: "pages" },
      { label: "Contact Settings", href: "/admin/settings/contact", icon: "contact" },
      { label: "SEO", href: "/admin/settings/seo", icon: "seo" },
      { label: "Legal Pages", href: "/admin/settings/legal", icon: "legal" },
    ],
  },
];

export const adminNav: AdminNavItem[] = adminNavSections.flatMap(
  (section) => section.items,
);
