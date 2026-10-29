import type {
  Cause,
  ContactSettings,
  EventItem,
  ImpactHighlight,
  InvolvementCard,
  MediaCategory,
  MediaItem,
  PageContent,
  PageSlug,
  WorkArea,
} from "@/lib/types";

export const fallbackPages: Record<PageSlug, PageContent> = {
  home: {
    slug: "home",
    title: "Home",
    headline: "It's Time for Better Help.",
    body: "Dedicated to the upliftment of the weaker sections of society, Sewa Sankalp Foundation works towards supporting poor, helpless, and deprived families through service, cooperation, and social welfare initiatives. Our aim is to help individuals live with dignity, encourage self-reliance, and contribute to the balanced development of society.",
    introHeadline: "Great Futures Begin with the Right Support.",
    introBody:
      "We believe that every individual deserves an opportunity to grow and every family deserves the support needed to move forward.\n\nThrough our commitment to women, children, education, health, and community welfare, we strive to create opportunities for those who need them most.",
    heroAccentWords: "Better Help",
    introAccentWords: "Right Support.",
    quote: "Together for a brighter tomorrow.",
    aboutObjectiveTitle: "Establishment Objective",
    aboutObjectiveBody:
      "Inspired by collective cooperation, the foundation works towards the balanced development of individuals and society.",
    ctaHeadline: "Looking For Exclusive Services?",
    ctaBody:
      "Join hands with us to create a brighter, healthier and more inclusive society.",
    ctaButtonLabel: "Contact Now",
    ctaButtonHref: "/impact-contact",
    ctaImageUrl: "/uploads/cta-corner.png",
    seoTitle: "Sewa Sankalp Foundation | Home",
    seoDescription:
      "Sewa Sankalp Foundation supports women, children, education, health, and social welfare.",
  },
  about: {
    slug: "about",
    title: "About Us",
    headline: "Help Us Achieve Our Goal",
    body: "Sewa Sankalp Foundation has been established as a non-governmental trust, dedicated to the upliftment and service of the weaker sections of the society. The objective of the organization is to promote collective cooperation for the balanced development of the society.",
    seoTitle: "About Us | Sewa Sankalp Foundation",
    seoDescription:
      "Learn about Sewa Sankalp Foundation’s vision, mission, values, and inspiration.",
  },
  "our-work": {
    slug: "our-work",
    title: "Our Work",
    headline: "Working Together for a Better Society.",
    body: "Sewa Sankalp Foundation focuses on women empowerment, child development, education, health, and social welfare.",
    seoTitle: "Our Work | Sewa Sankalp Foundation",
    seoDescription: "Explore Sewa Sankalp Foundation’s focus areas.",
  },
  "get-involved": {
    slug: "get-involved",
    title: "Get Involved",
    headline: "Help Us Achieve Our Goal.",
    body: "Join as a volunteer, supporter, or partner and help strengthen our commitment to families, women, and children.",
    seoTitle: "Get Involved | Sewa Sankalp Foundation",
    seoDescription: "Volunteer, support, or partner with Sewa Sankalp Foundation.",
  },
  "impact-contact": {
    slug: "impact-contact",
    title: "Contact Us",
    headline: "Contact Us",
    body: "We'd love to hear from you. Reach out to us for any queries, collaborations, partnerships or to get involved in our mission.",
    heroAccentWords: "Us",
    heroImageUrl: "/uploads/contact-hero.png",
    seoTitle: "Contact Us | Sewa Sankalp Foundation",
    seoDescription:
      "Contact Sewa Sankalp Foundation in Dehradun — address, phone, email and enquiry form.",
  },
  education: {
    slug: "education",
    title: "Education",
    headline: "Building a Better Future Through Education",
    body: "We believe education is the foundation of a stronger, more equitable society. Our initiatives focus on providing quality education, learning resources and opportunities for underprivileged children and youth.",
    heroImageUrl: "/uploads/contact-hero.png",
    heroAccentWords: "Education",
    seoTitle: "Education | Sewa Sankalp Foundation",
    seoDescription:
      "Education programmes supporting underprivileged children and youth across Uttarakhand.",
    extras: {
      pageHeroEyebrow: "Our Objectives",
      heroLine1: "Building a Better",
      heroLine2Before: "Future Through ",
      heroAccent: "Education",
    },
  },
  campaigns: {
    slug: "campaigns",
    title: "Campaigns",
    headline: "Every Campaign. A Brighter Tomorrow.",
    body: "Together, we can create real change. Our campaigns focus on supporting children, empowering women, improving health and strengthening communities for a better tomorrow.",
    heroImageUrl: "/uploads/contact-hero.png",
    seoTitle: "Campaigns | Every Campaign. A Brighter Tomorrow.",
    seoDescription:
      "Explore Sewa Sankalp Foundation campaigns — education, women empowerment, health, environment and community support.",
    extras: {
      pageHeroEyebrow: "Our Campaigns",
      heroLine1: "Every Campaign.",
      heroLine2: "A Brighter Tomorrow.",
      ctaBgImageUrl: "/uploads/campaign-cta-bg.png",
      featuredImageUrl: "/uploads/featured-campaign-education.jpg",
    },
  },
  gallery: {
    slug: "gallery",
    title: "Gallery",
    headline: "Moments of Hope & Impact",
    body: "A visual journey through our programmes, community events and the lives we serve together.",
    heroImageUrl: "/uploads/contact-hero.png",
    seoTitle: "Photo Gallery",
    seoDescription:
      "Explore Sewa Sankalp Foundation photo albums — events, education, health, environment and community support.",
    extras: {
      pageHeroEyebrow: "Our Gallery",
    },
  },
  blog: {
    slug: "blog",
    title: "Blog",
    headline: "Stories that Create Change.",
    body: "Real stories from classrooms, communities and campaigns — how collective care creates lasting change.",
    heroImageUrl: "/uploads/contact-hero.png",
    seoTitle: "Blog | Stories of Change",
    seoDescription:
      "Stories, updates and inspiration from Sewa Sankalp Foundation — education, health, environment and community work.",
    extras: {
      pageHeroEyebrow: "Our Blog",
      heroHeadline: "Stories that Create Change.",
      heroAccent: "Create Change.",
      heroBody:
        "Real stories from classrooms, communities and campaigns — how collective care creates lasting change.",
    },
  },
};

export const fallbackWorkAreas: WorkArea[] = [
  {
    id: "1",
    order: 1,
    title: "Women Empowerment",
    subtitle: "Encouraging Independence. Creating Opportunities.",
    description:
      "Encouraging women to become socially and financially self-reliant through empowerment initiatives.",
    theme: "pink",
    iconKey: "women",
    href: "/our-work",
    imageUrl: "/uploads/focus-card-women.png",
  },
  {
    id: "2",
    order: 2,
    title: "Child Development",
    subtitle: "Supporting Every Child's Growth and Development.",
    description:
      "Supporting the physical, mental, and moral development of children, particularly those who lack adequate resources and opportunities.",
    theme: "green",
    iconKey: "child",
    href: "/our-work",
    imageUrl: "/uploads/focus-card-child.png",
  },
  {
    id: "3",
    order: 3,
    title: "Social Welfare",
    subtitle: "Serving Those Who Need It Most.",
    description:
      "Working towards the upliftment of poor, helpless, and deprived families and promoting a life of dignity and self-reliance.",
    theme: "orange",
    iconKey: "social",
    href: "/our-work",
    imageUrl: "/uploads/focus-card-welfare.png",
  },
  {
    id: "4",
    order: 4,
    title: "Education & Health",
    subtitle: "Helping Children Move Towards a Better Future.",
    description:
      "Helping families facing financial difficulties provide for their children's education and health needs.",
    theme: "blue",
    iconKey: "education",
    href: "/our-work",
    imageUrl: "/uploads/focus-card-education.png?v=4",
  },
];

export const fallbackImpact: ImpactHighlight[] = [
  { id: "i1", label: "CAMPAIGNS", value: "500" },
  { id: "i2", label: "PEOPLE HELPED", value: "1000" },
  { id: "i3", label: "VOLUNTEER", value: "50" },
];

export const fallbackInvolvement: InvolvementCard[] = [
  {
    id: "inv1",
    order: 1,
    title: "Become a Helper",
    description:
      "Offer your time and care to support families and communities in need.",
    imageUrl: "/uploads/involve-01-helper.jpg",
    iconKey: "helper",
    theme: "cream",
    ctaLabel: "Help Someone",
    ctaHref: "/get-involved",
  },
  {
    id: "inv2",
    order: 2,
    title: "Become a Volunteer",
    description:
      "Share your skills and be part of meaningful social welfare initiatives.",
    imageUrl: "/uploads/involve-02-volunteer.jpg",
    iconKey: "volunteer",
    theme: "mint",
    ctaLabel: "Join as a Volunteer",
    ctaHref: "/get-involved",
  },
  {
    id: "inv3",
    order: 3,
    title: "Become a Supporter",
    description:
      "Stand with our mission to encourage dignity, opportunity and self-reliance.",
    imageUrl: "/uploads/involve-03-supporter.jpg",
    iconKey: "supporter",
    theme: "peach",
    ctaLabel: "Support Our Mission",
    ctaHref: "/get-involved",
  },
];

export const fallbackCauses: Cause[] = [
  {
    id: "c1",
    order: 1,
    title: "Community & Environment",
    description:
      "Bringing people together to create cleaner, greener, healthier communities.",
    imageUrl: "/uploads/cause-01-environment.jpg",
    iconKey: "tree",
    helpedCount: 764,
    goalCount: 1500,
    href: "/our-work",
  },
  {
    id: "c2",
    order: 2,
    title: "Education for Every Child",
    description:
      "Helping children access learning opportunities and build a brighter future.",
    imageUrl: "/uploads/cause-02-education.jpg",
    iconKey: "book",
    helpedCount: 612,
    goalCount: 1200,
    href: "/our-work",
  },
  {
    id: "c3",
    order: 3,
    title: "Community Welfare",
    description:
      "Supporting families through collective care, dignity and essential community services.",
    imageUrl: "/uploads/cause-03-welfare.jpg",
    iconKey: "people",
    helpedCount: 528,
    goalCount: 1000,
    href: "/our-work",
  },
];

export const fallbackEvents: EventItem[] = [
  {
    id: "e1",
    order: 1,
    title: "Planting Trees Event",
    description:
      "Join us in making our environment greener and healthier. Let's plant trees for a cleaner and brighter future.",
    imageUrl: "/uploads/event-01-planting.jpg",
    iconKey: "tree",
    dateLabel: "25 Oct 2024",
    location: "Dehradun, UK",
    ticketInfo: "Free of Cost",
    isFeatured: true,
    theme: "green",
    href: "/get-involved",
  },
  {
    id: "e2",
    order: 2,
    title: "Child Education Event",
    description:
      "Support children's education and help them build a brighter future through learning opportunities.",
    imageUrl: "/uploads/event-02-education.jpg",
    iconKey: "book",
    dateLabel: "25 Nov 2024",
    location: "Dehradun, UK",
    ticketInfo: "Free of Cost",
    isFeatured: false,
    theme: "blue",
    href: "/get-involved",
  },
  {
    id: "e3",
    order: 3,
    title: "Helping Oldage Event",
    description:
      "Let's come together to support and care for our elderly, giving them the respect, dignity and love they deserve.",
    imageUrl: "/uploads/event-03-elderly.jpg",
    iconKey: "heart",
    dateLabel: "25 Mar 2024",
    location: "Dehradun, UK",
    ticketInfo: "Free of Cost",
    isFeatured: false,
    theme: "red",
    href: "/get-involved",
  },
];

export const fallbackContact: ContactSettings = {
  address:
    "C-97, Sector-3, Defence Colony, Near Vidhan Sabha, Dehradun, Uttarakhand - 248002, India",
  phone: "+91 94111 09464",
  email: "sewasankalpfoundation.uk@gmail.com",
  website: "https://sewasanklapfoundation.org/",
  socialLinks: {
    facebook:
      "https://www.facebook.com/profile.php?id=61560728081587&mibextid=ZbWKwL",
    instagram:
      "https://www.instagram.com/sewasankalpfoundation?igsh=cTJiZmF5NTNieWM2",
    youtube: "https://youtube.com/@sevasankalpfoundation?si=xjKxzxo4c0XPl7K4",
  },
  footerTagline: "Together for a Brighter Tomorrow",
};

/** Static media when MongoDB is unavailable (e.g. Vercel without Atlas). */
export const fallbackMediaByCategory: Partial<
  Record<MediaCategory, MediaItem[]>
> = {
  hero: [
    {
      id: "fallback-hero",
      title: "Hero",
      alt: "Sewa Sankalp Foundation community work",
      url: "/uploads/hero-home.jpg",
      category: "hero",
    },
    {
      id: "fallback-hero-2",
      title: "Hero 2",
      alt: "Women planting saplings in the mountains",
      url: "/uploads/hero-home-2.png",
      category: "hero",
    },
  ],
  about: [
    {
      id: "fallback-about",
      title: "About",
      alt: "Sewa Sankalp Foundation community work",
      url: "/uploads/1793021222636-x82thu.jpg",
      category: "about",
    },
  ],
  cta: [
    {
      id: "fallback-cta",
      title: "CTA",
      alt: "Join our mission",
      url: "/uploads/cta-corner.png",
      category: "cta",
    },
  ],
  contact: [
    {
      id: "fallback-contact-hero",
      title: "Contact hero",
      alt: "",
      url: "/uploads/contact-hero.png",
      category: "contact",
    },
  ],
};