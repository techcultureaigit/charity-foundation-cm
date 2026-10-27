export type CampaignCategoryId =
  | "all"
  | "education"
  | "women"
  | "health"
  | "environment"
  | "community";

export type CampaignCategory = {
  id: CampaignCategoryId;
  label: string;
};

export type Campaign = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: Exclude<CampaignCategoryId, "all">;
  image: string;
  raised: number;
  target: number;
  status: "ongoing" | "featured";
  highlights?: { icon: "book" | "people" | "graduation" | "heart" | "tree"; label: string }[];
};

export const CAMPAIGN_FILTERS: CampaignCategory[] = [
  { id: "all", label: "All Campaigns" },
  { id: "education", label: "Education" },
  { id: "women", label: "Women Empowerment" },
  { id: "health", label: "Health & Welfare" },
  { id: "environment", label: "Environment" },
  { id: "community", label: "Community Support" },
];

export const FEATURED_CAMPAIGN: Campaign = {
  id: "featured-education",
  title: "Education for Every Child",
  subtitle: "Give the Gift of Education, Give a Brighter Future",
  description:
    "Help underprivileged children stay in school with scholarships, learning kits and after-school support across Uttarakhand.",
  category: "education",
  image: "/uploads/campaign-education-girl.jpg",
  raised: 375000,
  target: 500000,
  status: "featured",
  highlights: [
    { icon: "book", label: "1,000+\nChildren Supported" },
    { icon: "people", label: "25+\nLearning Centers" },
    { icon: "graduation", label: "Better\nFuture Opportunities" },
  ],
};

export const CAMPAIGNS: Campaign[] = [
  {
    id: "education-every-child",
    title: "Education for Every Child",
    description:
      "Providing education, school supplies and learning support to underprivileged children.",
    category: "education",
    image: "/uploads/campaign-education-girl.jpg",
    raised: 375000,
    target: 500000,
    status: "ongoing",
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment",
    description:
      "Skill development, vocational training and financial support for a stronger, self-reliant future.",
    category: "women",
    image: "/uploads/campaign-women-group.jpg",
    raised: 240000,
    target: 400000,
    status: "ongoing",
  },
  {
    id: "community-health",
    title: "Community Health & Wellness",
    description:
      "Medical camps, health awareness programs and essential healthcare support for communities.",
    category: "health",
    image: "/uploads/campaign-health-bp.jpg",
    raised: 180000,
    target: 400000,
    status: "ongoing",
  },
  {
    id: "green-community",
    title: "Green Community Initiative",
    description:
      "Tree plantation drives, clean environment campaigns and sustainable community programs.",
    category: "environment",
    image: "/uploads/campaign-green-planting.jpg",
    raised: 220000,
    target: 400000,
    status: "ongoing",
  },
  {
    id: "community-support",
    title: "Community Support Drive",
    description:
      "Essential aid, dignity kits and collective care for vulnerable families in our region.",
    category: "community",
    image: "/uploads/cause-03-welfare.jpg",
    raised: 95000,
    target: 200000,
    status: "ongoing",
  },
  {
    id: "child-development",
    title: "Child Development Programme",
    description:
      "Early learning, nutrition and safe spaces that help every child grow with confidence.",
    category: "education",
    image: "/uploads/focus-02-child-development.jpg",
    raised: 168000,
    target: 300000,
    status: "ongoing",
  },
  {
    id: "social-welfare",
    title: "Social Welfare Outreach",
    description:
      "On-ground support for elderly care, emergency relief and community welfare needs.",
    category: "community",
    image: "/uploads/focus-04-social-welfare.jpg",
    raised: 125000,
    target: 220000,
    status: "ongoing",
  },
  {
    id: "school-kit",
    title: "School Kit Drive",
    description:
      "Bags, notebooks and stationery so children can start the academic year ready to learn.",
    category: "education",
    image: "/uploads/event-02-education.jpg",
    raised: 185000,
    target: 250000,
    status: "ongoing",
  },
];

export function formatInr(amount: number) {
  return `₹ ${amount.toLocaleString("en-IN")}`;
}

export function campaignPct(raised: number, target: number) {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((raised / target) * 100));
}
