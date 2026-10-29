import type {
  Cause,
  ContactSettings,
  EventItem,
  InvolvementCard,
  DashboardStats,
  Enquiry,
  ImpactHighlight,
  LegalPage,
  MediaItem,
  PageContent,
  VolunteerRequest,
  WorkArea,
} from "../types";

import { homeExtraDefaults } from "./homeExtras";

/** Previous (pre-mockup) about copy — used to detect unedited pages for migration. */
export const LEGACY_ABOUT_HEADLINE =
  "Dedicated to Service. Committed to Social Upliftment.";

export const ABOUT_HEADLINE = "Help Us Achieve Our Goal";
export const ABOUT_BODY =
  "Sewa Sankalp Foundation has been established as a non-governmental trust, dedicated to the upliftment and service of the weaker sections of the society. The objective of the organization is to promote collective cooperation for the balanced development of the society.";

export const dashboardStats: DashboardStats = {
  newEnquiries: 4,
  volunteerRequests: 2,
  publishedPages: 5,
  mediaItems: 8,
};

export const pagesSeed: PageContent[] = [
  {
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
    heroImageUrl: "/uploads/hero-home.jpg",
    extras: homeExtraDefaults,
    seoTitle: "Sewa Sankalp Foundation | Home",
    seoDescription:
      "Sewa Sankalp Foundation supports women, children, education, health, and social welfare in underserved communities.",
    updatedAt: "2026-10-20T10:00:00.000Z",
  },
  {
    slug: "about",
    title: "About Us",
    headline: ABOUT_HEADLINE,
    body: ABOUT_BODY,
    seoTitle: "About Us | Sewa Sankalp Foundation",
    seoDescription:
      "Learn about Sewa Sankalp Foundation’s vision, mission, values, and inspiration.",
    updatedAt: "2026-10-20T10:05:00.000Z",
  },
  {
    slug: "our-work",
    title: "Our Work",
    headline: "Working Together for a Better Society.",
    body: "Sewa Sankalp Foundation focuses on the welfare and development of weaker sections of society through women empowerment, child development, education, health, and social welfare.",
    seoTitle: "Our Work | Sewa Sankalp Foundation",
    seoDescription:
      "Explore Sewa Sankalp Foundation’s focus areas across women, children, education, health, and social welfare.",
    updatedAt: "2026-10-20T10:10:00.000Z",
  },
  {
    slug: "get-involved",
    title: "Get Involved",
    headline: "Help Us Achieve Our Goal.",
    body: "Join as a volunteer, supporter, or partner and help strengthen our commitment to poor and deprived families, women, and children.",
    seoTitle: "Get Involved | Sewa Sankalp Foundation",
    seoDescription:
      "Volunteer, support, or partner with Sewa Sankalp Foundation.",
    updatedAt: "2026-10-20T10:15:00.000Z",
  },
  {
    slug: "impact-contact",
    title: "Contact Us",
    headline: "Contact Us",
    body: "We'd love to hear from you. Reach out to us for any queries, collaborations, partnerships or to get involved in our mission.",
    heroAccentWords: "Us",
    heroImageUrl: "/uploads/contact-hero.png",
    seoTitle: "Contact Us | Sewa Sankalp Foundation",
    seoDescription:
      "Contact Sewa Sankalp Foundation in Dehradun — address, phone, email and enquiry form.",
    updatedAt: "2026-10-20T10:20:00.000Z",
  },
];

export const workAreasSeed: WorkArea[] = [
  {
    id: "wa-1",
    order: 1,
    title: "Women Empowerment",
    subtitle: "Encouraging Independence. Creating Opportunities.",
    description:
      "Encouraging women to become socially and financially self-reliant through empowerment initiatives.",
    theme: "pink",
    iconKey: "women",
    href: "/our-work",
    imageUrl: "/uploads/focus-01-women-empowerment.jpg",
    isPublished: true,
  },
  {
    id: "wa-2",
    order: 2,
    title: "Child Development",
    subtitle: "Supporting Every Child's Growth and Development.",
    description:
      "Supporting the physical, mental, and moral development of children, particularly those who lack adequate resources and opportunities.",
    theme: "green",
    iconKey: "child",
    href: "/our-work",
    imageUrl: "/uploads/focus-02-child-development.jpg",
    isPublished: true,
  },
  {
    id: "wa-3",
    order: 3,
    title: "Education & Health",
    subtitle: "Helping Children Move Towards a Better Future.",
    description:
      "Helping families facing financial difficulties provide for their children's education and health needs.",
    theme: "blue",
    iconKey: "education",
    href: "/our-work",
    imageUrl: "/uploads/focus-03-education-health.jpg",
    isPublished: true,
  },
  {
    id: "wa-4",
    order: 4,
    title: "Social Welfare",
    subtitle: "Serving Those Who Need It Most.",
    description:
      "Working towards the upliftment of poor, helpless, and deprived families and promoting a life of dignity and self-reliance.",
    theme: "orange",
    iconKey: "social",
    href: "/our-work",
    imageUrl: "/uploads/focus-04-social-welfare.jpg",
    isPublished: true,
  },
];

export const involvementCardsSeed: InvolvementCard[] = [
  {
    id: "inv-1",
    order: 1,
    title: "Become a Helper",
    description:
      "Offer your time and care to support families and communities in need.",
    imageUrl: "/uploads/involve-01-helper.jpg",
    iconKey: "helper",
    theme: "cream",
    ctaLabel: "Help Someone",
    ctaHref: "/get-involved",
    isPublished: true,
  },
  {
    id: "inv-2",
    order: 2,
    title: "Become a Volunteer",
    description:
      "Share your skills and be part of meaningful social welfare initiatives.",
    imageUrl: "/uploads/involve-02-volunteer.jpg",
    iconKey: "volunteer",
    theme: "mint",
    ctaLabel: "Join as a Volunteer",
    ctaHref: "/get-involved",
    isPublished: true,
  },
  {
    id: "inv-3",
    order: 3,
    title: "Become a Supporter",
    description:
      "Stand with our mission to encourage dignity, opportunity and self-reliance.",
    imageUrl: "/uploads/involve-03-supporter.jpg",
    iconKey: "supporter",
    theme: "peach",
    ctaLabel: "Support Our Mission",
    ctaHref: "/get-involved",
    isPublished: true,
  },
];

export const causesSeed: Cause[] = [
  {
    id: "cau-1",
    order: 1,
    title: "Community & Environment",
    description:
      "Bringing people together to create cleaner, greener, healthier communities.",
    imageUrl: "/uploads/cause-01-environment.jpg",
    iconKey: "tree",
    helpedCount: 764,
    goalCount: 1500,
    href: "/our-work",
    isPublished: true,
  },
  {
    id: "cau-2",
    order: 2,
    title: "Education for Every Child",
    description:
      "Helping children access learning opportunities and build a brighter future.",
    imageUrl: "/uploads/cause-02-education.jpg",
    iconKey: "book",
    helpedCount: 612,
    goalCount: 1200,
    href: "/our-work",
    isPublished: true,
  },
  {
    id: "cau-3",
    order: 3,
    title: "Community Welfare",
    description:
      "Supporting families through collective care, dignity and essential community services.",
    imageUrl: "/uploads/cause-03-welfare.jpg",
    iconKey: "people",
    helpedCount: 528,
    goalCount: 1000,
    href: "/our-work",
    isPublished: true,
  },
];

export const eventsSeed: EventItem[] = [
  {
    id: "evt-1",
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
    isPublished: true,
  },
  {
    id: "evt-2",
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
    isPublished: true,
  },
  {
    id: "evt-3",
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
    isPublished: true,
  },
];
export const enquiriesSeed: Enquiry[] = [
  {
    id: "enq-1",
    name: "Ananya Sharma",
    email: "ananya@example.com",
    mobile: "+91 98765 43210",
    subject: "Partnership enquiry",
    message: "We would like to discuss collaboration opportunities with the foundation.",
    status: "new",
    createdAt: "2026-10-25T09:30:00.000Z",
  },
  {
    id: "enq-2",
    name: "Rohit Negi",
    email: "rohit@example.com",
    subject: "General enquiry",
    message: "Please share more details about your education support work.",
    status: "new",
    createdAt: "2026-10-24T14:10:00.000Z",
  },
  {
    id: "enq-3",
    name: "Priya Rawat",
    email: "priya@example.com",
    mobile: "+91 98111 22334",
    subject: "Support the mission",
    message: "I want to know how I can support your ongoing work.",
    status: "read",
    createdAt: "2026-10-22T11:00:00.000Z",
  },
  {
    id: "enq-4",
    name: "Vikram Singh",
    email: "vikram@example.com",
    message: "Looking for contact details of your Dehradun office.",
    status: "replied",
    createdAt: "2026-10-18T16:45:00.000Z",
  },
];

export const volunteersSeed: VolunteerRequest[] = [
  {
    id: "vol-1",
    name: "Meera Joshi",
    email: "meera@example.com",
    mobile: "+91 99000 11223",
    interest: "Child Development",
    message: "I can help with weekend learning support sessions.",
    status: "new",
    createdAt: "2026-10-25T08:00:00.000Z",
  },
  {
    id: "vol-2",
    name: "Aman Thapa",
    email: "aman@example.com",
    interest: "Women Empowerment",
    message: "Interested in community outreach support.",
    status: "contacted",
    createdAt: "2026-10-21T12:20:00.000Z",
  },
];

export const impactSeed: ImpactHighlight[] = [
  {
    id: "imp-1",
    label: "CAMPAIGNS",
    value: "500",
    isVerified: true,
    isPublished: true,
  },
  {
    id: "imp-2",
    label: "PEOPLE HELPED",
    value: "1000",
    isVerified: true,
    isPublished: true,
  },
  {
    id: "imp-3",
    label: "VOLUNTEER",
    value: "50",
    isVerified: true,
    isPublished: true,
  },
];
export const mediaSeed: MediaItem[] = [];

export const contactSettingsSeed: ContactSettings = {
  address:
    "C-97, Sector-3, Defence Colony, Near Vidhan Sabha, Dehradun, Uttarakhand – 248002, India",
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

export const legalPagesSeed: LegalPage[] = [
  {
    id: "leg-1",
    title: "Privacy Policy",
    slug: "privacy-policy",
    content:
      "Draft privacy policy placeholder. Publish only after legal review.",
    isPublished: false,
    updatedAt: "2026-10-20T10:00:00.000Z",
  },
];
