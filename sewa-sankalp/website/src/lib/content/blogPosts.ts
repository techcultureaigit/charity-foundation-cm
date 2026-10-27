export type BlogCategoryId =
  | "all"
  | "education"
  | "health"
  | "environment"
  | "women"
  | "community"
  | "events";

export interface BlogCategory {
  id: BlogCategoryId;
  label: string;
  icon: "camera" | "book" | "heart" | "tree" | "people" | "calendar" | "star";
  badgeClass: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: Exclude<BlogCategoryId, "all">;
  image: string;
  author?: string;
  views?: number;
}

export type BlogInitiativeIcon =
  | "book"
  | "graduation"
  | "people"
  | "heart"
  | "star"
  | "check";

export interface BlogPostDetail extends BlogPost {
  author: string;
  views: number;
  featureImage: string;
  intro: string;
  challenge: {
    title: string;
    body: string;
    image: string;
  };
  initiative: {
    title: string;
    body: string;
    items: { icon: BlogInitiativeIcon; label: string }[];
  };
  impact: {
    title: string;
    body: string;
    quote: { text: string; author: string; role?: string };
  };
  lookingAhead: {
    title: string;
    body: string;
  };
  tags: string[];
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "all", label: "All Blogs", icon: "camera", badgeClass: "bg-[var(--forest)]" },
  {
    id: "education",
    label: "Education",
    icon: "book",
    badgeClass: "bg-[#D97706]",
  },
  {
    id: "health",
    label: "Health",
    icon: "heart",
    badgeClass: "bg-[#c04444]",
  },
  {
    id: "environment",
    label: "Environment",
    icon: "tree",
    badgeClass: "bg-[#2f7a4b]",
  },
  {
    id: "women",
    label: "Women Empowerment",
    icon: "people",
    badgeClass: "bg-[#b45a2a]",
  },
  {
    id: "community",
    label: "Community Support",
    icon: "people",
    badgeClass: "bg-[#3d6b8c]",
  },
  {
    id: "events",
    label: "Events & Activities",
    icon: "calendar",
    badgeClass: "bg-[#6b5b95]",
  },
];

/** Demo posts — replace later with CMS / admin when ready. */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "0",
    slug: "education-brings-new-hope",
    title: "Education Brings New Hope to Rural Children",
    excerpt:
      "How school kits, learning support and community care are helping children in remote villages stay in school and dream bigger.",
    date: "12 Oct 2024",
    category: "education",
    image: "/uploads/blog-education-feature.jpg",
    author: "Sewa Sankalp Foundation",
    views: 1245,
  },
  {
    id: "1",
    slug: "classroom-of-hope",
    title: "A Classroom of Hope in the Hills",
    excerpt:
      "How learning kits and volunteer tutors are helping children stay in school across remote villages.",
    date: "12 Mar 2026",
    category: "education",
    image: "/uploads/blog-education-feature.jpg",
    author: "Sewa Sankalp Foundation",
    views: 980,
  },
  {
    id: "2",
    slug: "green-hands-dehradun",
    title: "Tree Plantation Drive 2024",
    excerpt:
      "Volunteers planted over 500 saplings along community roads — a small step toward cleaner air.",
    date: "05 Mar 2026",
    category: "environment",
    image: "/uploads/event-01-planting.jpg",
    author: "Sewa Sankalp Foundation",
    views: 860,
  },
  {
    id: "3",
    slug: "care-for-our-elders",
    title: "Care for Our Elders",
    excerpt:
      "Health check-ups and companionship visits bringing dignity and warmth to senior citizens.",
    date: "28 Feb 2026",
    category: "health",
    image: "/uploads/event-03-elderly.jpg",
    author: "Sewa Sankalp Foundation",
    views: 742,
  },
  {
    id: "4",
    slug: "women-leading-change",
    title: "Women Leading Change",
    excerpt:
      "Skill workshops that turn confidence into livelihood for mothers in Defence Colony.",
    date: "20 Feb 2026",
    category: "women",
    image: "/uploads/focus-01-women-empowerment.jpg",
    author: "Sewa Sankalp Foundation",
    views: 654,
  },
  {
    id: "5",
    slug: "little-steps-big-smiles",
    title: "Little Steps, Big Smiles",
    excerpt:
      "Child development sessions focused on nutrition, play and early learning support.",
    date: "14 Feb 2026",
    category: "community",
    image: "/uploads/focus-02-child-development.jpg",
    author: "Sewa Sankalp Foundation",
    views: 610,
  },
  {
    id: "6",
    slug: "health-camp-notes",
    title: "Notes from Our Health Camp",
    excerpt:
      "Free consultations and awareness talks reached families who rarely get clinic access.",
    date: "02 Feb 2026",
    category: "health",
    image: "/uploads/campaign-health-bp.jpg",
    author: "Sewa Sankalp Foundation",
    views: 588,
  },
  {
    id: "7",
    slug: "together-for-welfare",
    title: "Together for Social Welfare",
    excerpt:
      "Community kitchens and ration drives keeping support flowing where it is needed most.",
    date: "22 Jan 2026",
    category: "community",
    image: "/uploads/focus-04-social-welfare.jpg",
    author: "Sewa Sankalp Foundation",
    views: 520,
  },
  {
    id: "8",
    slug: "cause-for-green",
    title: "Why Green Spaces Matter",
    excerpt:
      "From school gardens to city parks — how shared green spaces build healthier neighbourhoods.",
    date: "15 Jan 2026",
    category: "environment",
    image: "/uploads/cause-01-environment.jpg",
    author: "Sewa Sankalp Foundation",
    views: 490,
  },
  {
    id: "9",
    slug: "volunteer-day-recap",
    title: "Volunteer Day Recap",
    excerpt:
      "Helpers, supporters and first-time volunteers came together for a day of service.",
    date: "08 Jan 2026",
    category: "events",
    image: "/uploads/involve-01-helper.jpg",
    author: "Sewa Sankalp Foundation",
    views: 455,
  },
];

const SHOWCASE_DETAIL: BlogPostDetail = {
  ...BLOG_POSTS[0],
  author: "Sewa Sankalp Foundation",
  views: 1245,
  featureImage: "/uploads/blog-education-feature.jpg",
  intro:
    "Education is one of the strongest tools to break the cycle of poverty. In many rural communities, children still struggle to stay in school because of limited resources, long travel distances and financial pressure on families. Through our education programmes, Sewa Sankalp Foundation is working to change that story — one classroom, one kit and one child at a time.",
  challenge: {
    title: "The Challenge",
    body: "In several villages around Dehradun and nearby hill regions, children often miss school because families cannot afford books, uniforms or transport. Many first-generation learners also need extra support at home. Without timely help, bright students risk dropping out before they can build a secure future.",
    image: "/uploads/campaign-education-girl.jpg",
  },
  initiative: {
    title: "Our Initiative",
    body: "Our education campaign focuses on practical support that keeps children learning with confidence. Together with volunteers, teachers and local families, we are building a circle of care around every learner.",
    items: [
      { icon: "book", label: "Distribution of school kits" },
      { icon: "graduation", label: "Learning support programs" },
      { icon: "heart", label: "Awareness and counseling" },
      { icon: "people", label: "Community involvement" },
    ],
  },
  impact: {
    title: "The Impact",
    body: "Families tell us that school kits reduce the burden of starting a new academic year. Children attend more regularly, participate more confidently in class, and begin to see education as a path they can complete — not a temporary opportunity.",
    quote: {
      text: "Earlier I used to miss school because I did not have notebooks. Now I go every day and I want to become a teacher.",
      author: "Pooja",
      role: "Class 6 student",
    },
  },
  lookingAhead: {
    title: "Looking Ahead",
    body: "We aim to reach more villages with learning kits, after-school support and parent awareness sessions. With continued community partnership, every child can grow with dignity, curiosity and hope.",
  },
  tags: [
    "Education",
    "Rural Development",
    "Children",
    "School Kits",
    "Community Support",
  ],
};

export function categoryLabel(id: BlogCategoryId) {
  return BLOG_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function categoryBadge(id: Exclude<BlogCategoryId, "all">) {
  return (
    BLOG_CATEGORIES.find((c) => c.id === id)?.badgeClass ?? "bg-[var(--forest)]"
  );
}

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function categoryCounts() {
  const counts: Record<BlogCategoryId, number> = {
    all: BLOG_POSTS.length,
    education: 0,
    health: 0,
    environment: 0,
    women: 0,
    community: 0,
    events: 0,
  };
  for (const post of BLOG_POSTS) counts[post.category] += 1;
  return counts;
}

export function getRelatedPosts(slug: string, limit = 3) {
  const current = getBlogPost(slug);
  if (!current) return BLOG_POSTS.slice(0, limit);
  const same = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const rest = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...same, ...rest].slice(0, limit);
}

export function getRecentPosts(excludeSlug?: string, limit = 4) {
  return BLOG_POSTS.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}

/** Full article body for detail pages; showcase post has rich sections. */
export function getBlogPostDetail(slug: string): BlogPostDetail | undefined {
  const post = getBlogPost(slug);
  if (!post) return undefined;
  if (slug === SHOWCASE_DETAIL.slug) return SHOWCASE_DETAIL;

  return {
    ...post,
    author: post.author ?? "Sewa Sankalp Foundation",
    views: post.views ?? 320,
    featureImage: post.image,
    intro: post.excerpt,
    challenge: {
      title: "The Challenge",
      body: "On the ground, families still face gaps in access, awareness and resources. Our teams work closely with local partners to understand what communities need most and respond with practical support.",
      image: post.image,
    },
    initiative: {
      title: "Our Initiative",
      body: "Through volunteers, donors and neighbourhood partners, we keep programmes running where they matter — with care, consistency and community trust.",
      items: [
        { icon: "check", label: "On-ground outreach" },
        { icon: "people", label: "Volunteer support" },
        { icon: "heart", label: "Family care & counseling" },
        { icon: "star", label: "Sustained follow-up" },
      ],
    },
    impact: {
      title: "The Impact",
      body: "Every visit, kit and conversation adds up. Small, steady actions help families feel supported and children feel seen.",
      quote: {
        text: "When people come together with kindness, even a small effort can change someone’s whole week.",
        author: "Community volunteer",
      },
    },
    lookingAhead: {
      title: "Looking Ahead",
      body: "We will keep listening to the communities we serve and expanding programmes that create lasting, local change.",
    },
    tags: [categoryLabel(post.category), "Sewa Sankalp", "Community"],
  };
}
