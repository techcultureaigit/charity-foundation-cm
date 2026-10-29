/**
 * Upsert nav page shells + seed campaigns/blog posts when collections are empty.
 * Safe to run on every boot — does not overwrite existing content.
 */
const { Page, Campaign, BlogPost } = require("../models");

const NAV_PAGES = [
  {
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
  {
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
  {
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
  {
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
];

const CAMPAIGN_SEED = [
  {
    order: 0,
    slug: "featured-education",
    title: "Education for Every Child",
    subtitle: "Give the Gift of Education, Give a Brighter Future",
    description:
      "Help underprivileged children stay in school with scholarships, learning kits and after-school support across Uttarakhand.",
    category: "education",
    imageUrl: "/uploads/campaign-education-girl.jpg",
    raised: 375000,
    target: 500000,
    status: "featured",
    highlights: [
      { icon: "book", label: "1,000+\nChildren Supported" },
      { icon: "people", label: "25+\nLearning Centers" },
      { icon: "graduation", label: "Better\nFuture Opportunities" },
    ],
  },
  {
    order: 1,
    slug: "education-every-child",
    title: "Education for Every Child",
    description:
      "Providing education, school supplies and learning support to underprivileged children.",
    category: "education",
    imageUrl: "/uploads/campaign-education-girl.jpg",
    raised: 375000,
    target: 500000,
    status: "ongoing",
  },
  {
    order: 2,
    slug: "women-empowerment",
    title: "Women Empowerment",
    description:
      "Skill development, vocational training and financial support for a stronger, self-reliant future.",
    category: "women",
    imageUrl: "/uploads/campaign-women-group.jpg",
    raised: 240000,
    target: 400000,
    status: "ongoing",
  },
  {
    order: 3,
    slug: "community-health",
    title: "Community Health & Wellness",
    description:
      "Medical camps, health awareness programs and essential healthcare support for communities.",
    category: "health",
    imageUrl: "/uploads/campaign-health-bp.jpg",
    raised: 180000,
    target: 400000,
    status: "ongoing",
  },
  {
    order: 4,
    slug: "green-community",
    title: "Green Community Initiative",
    description:
      "Tree plantation drives, clean environment campaigns and sustainable community programs.",
    category: "environment",
    imageUrl: "/uploads/campaign-green-planting.jpg",
    raised: 220000,
    target: 400000,
    status: "ongoing",
  },
  {
    order: 5,
    slug: "community-support",
    title: "Community Support Drive",
    description:
      "Essential aid, dignity kits and collective care for vulnerable families in our region.",
    category: "community",
    imageUrl: "/uploads/cause-03-welfare.jpg",
    raised: 95000,
    target: 200000,
    status: "ongoing",
  },
  {
    order: 6,
    slug: "child-development",
    title: "Child Development Programme",
    description:
      "Early learning, nutrition and safe spaces that help every child grow with confidence.",
    category: "education",
    imageUrl: "/uploads/focus-02-child-development.jpg",
    raised: 168000,
    target: 300000,
    status: "ongoing",
  },
  {
    order: 7,
    slug: "social-welfare",
    title: "Social Welfare Outreach",
    description:
      "On-ground support for elderly care, emergency relief and community welfare needs.",
    category: "community",
    imageUrl: "/uploads/focus-04-social-welfare.jpg",
    raised: 125000,
    target: 220000,
    status: "ongoing",
  },
  {
    order: 8,
    slug: "school-kit",
    title: "School Kit Drive",
    description:
      "Bags, notebooks and stationery so children can start the academic year ready to learn.",
    category: "education",
    imageUrl: "/uploads/event-02-education.jpg",
    raised: 185000,
    target: 250000,
    status: "ongoing",
  },
];

const emptyDetail = {
  intro: "",
  challenge: { title: "", body: "", image: "" },
  initiative: { title: "", body: "", items: [] },
  impact: { title: "", body: "", quote: { text: "", author: "", role: "" } },
  lookingAhead: { title: "", body: "" },
};

const BLOG_SEED = [
  {
    order: 0,
    slug: "education-brings-new-hope",
    title: "Education Brings New Hope to Rural Children",
    excerpt:
      "How school kits, learning support and community care are helping children in remote villages stay in school and dream bigger.",
    dateLabel: "12 Oct 2024",
    category: "education",
    imageUrl: "/uploads/blog-education-feature.jpg",
    featureImageUrl: "/uploads/blog-education-feature.jpg",
    author: "Sewa Sankalp Foundation",
    views: 1245,
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
  },
  {
    order: 1,
    slug: "classroom-of-hope",
    title: "A Classroom of Hope in the Hills",
    excerpt:
      "How learning kits and volunteer tutors are helping children stay in school across remote villages.",
    dateLabel: "12 Mar 2026",
    category: "education",
    imageUrl: "/uploads/blog-education-feature.jpg",
    featureImageUrl: "/uploads/blog-education-feature.jpg",
    author: "Sewa Sankalp Foundation",
    views: 980,
    ...emptyDetail,
    tags: ["Education"],
  },
  {
    order: 2,
    slug: "green-hands-dehradun",
    title: "Tree Plantation Drive 2024",
    excerpt:
      "Volunteers planted over 500 saplings along community roads — a small step toward cleaner air.",
    dateLabel: "05 Mar 2026",
    category: "environment",
    imageUrl: "/uploads/event-01-planting.jpg",
    featureImageUrl: "/uploads/event-01-planting.jpg",
    author: "Sewa Sankalp Foundation",
    views: 860,
    ...emptyDetail,
    intro:
      "Volunteers planted over 500 saplings along community roads — a small step toward cleaner air and cooler streets for families across Dehradun.",
    challenge: {
      title: "The Challenge",
      body: "Dehradun and its surrounding neighbourhoods have grown quickly, but green cover has not kept pace. Open stretches along community roads, school boundaries and residential belts are losing shade trees to heat, dust and unplanned expansion. Families feel the change in hotter summers, poorer air quality and fewer shared spaces where children can play safely under natural cover.\n\nMany plantation efforts stop at a single-day event. Saplings are placed without watering plans, fencing or community ownership, so survival rates stay low. Local groups want to help, yet they often lack saplings, guidance and a simple system to care for young trees through the first dry seasons.\n\nSewa Sankalp Foundation stepped into this gap with a neighbourhood-led drive: plant native and resilient saplings where people live and travel every day, then stay with the community to protect, water and watch those trees grow. The challenge is not only to plant more — it is to make every sapling a lasting part of the street, the school and the city’s shared future.",
      image: "/uploads/event-01-planting.jpg",
    },
    tags: ["Environment"],
  },
  {
    order: 3,
    slug: "care-for-our-elders",
    title: "Care for Our Elders",
    excerpt:
      "Health check-ups and companionship visits bringing dignity and warmth to senior citizens.",
    dateLabel: "28 Feb 2026",
    category: "health",
    imageUrl: "/uploads/event-03-elderly.jpg",
    featureImageUrl: "/uploads/event-03-elderly.jpg",
    author: "Sewa Sankalp Foundation",
    views: 742,
    ...emptyDetail,
    tags: ["Health"],
  },
  {
    order: 4,
    slug: "women-leading-change",
    title: "Women Leading Change",
    excerpt:
      "Skill workshops that turn confidence into livelihood for mothers in Defence Colony.",
    dateLabel: "20 Feb 2026",
    category: "women",
    imageUrl: "/uploads/focus-01-women-empowerment.jpg",
    featureImageUrl: "/uploads/focus-01-women-empowerment.jpg",
    author: "Sewa Sankalp Foundation",
    views: 654,
    ...emptyDetail,
    tags: ["Women Empowerment"],
  },
  {
    order: 5,
    slug: "little-steps-big-smiles",
    title: "Little Steps, Big Smiles",
    excerpt:
      "Child development sessions focused on nutrition, play and early learning support.",
    dateLabel: "14 Feb 2026",
    category: "community",
    imageUrl: "/uploads/focus-02-child-development.jpg",
    featureImageUrl: "/uploads/focus-02-child-development.jpg",
    author: "Sewa Sankalp Foundation",
    views: 610,
    ...emptyDetail,
    tags: ["Community Support"],
  },
  {
    order: 6,
    slug: "health-camp-notes",
    title: "Notes from Our Health Camp",
    excerpt:
      "Free consultations and awareness talks reached families who rarely get clinic access.",
    dateLabel: "02 Feb 2026",
    category: "health",
    imageUrl: "/uploads/campaign-health-bp.jpg",
    featureImageUrl: "/uploads/campaign-health-bp.jpg",
    author: "Sewa Sankalp Foundation",
    views: 588,
    ...emptyDetail,
    tags: ["Health"],
  },
  {
    order: 7,
    slug: "together-for-welfare",
    title: "Together for Social Welfare",
    excerpt:
      "Community kitchens and ration drives keeping support flowing where it is needed most.",
    dateLabel: "22 Jan 2026",
    category: "community",
    imageUrl: "/uploads/focus-04-social-welfare.jpg",
    featureImageUrl: "/uploads/focus-04-social-welfare.jpg",
    author: "Sewa Sankalp Foundation",
    views: 520,
    ...emptyDetail,
    tags: ["Community Support"],
  },
  {
    order: 8,
    slug: "cause-for-green",
    title: "Why Green Spaces Matter",
    excerpt:
      "From school gardens to city parks — how shared green spaces build healthier neighbourhoods.",
    dateLabel: "15 Jan 2026",
    category: "environment",
    imageUrl: "/uploads/cause-01-environment.jpg",
    featureImageUrl: "/uploads/cause-01-environment.jpg",
    author: "Sewa Sankalp Foundation",
    views: 490,
    ...emptyDetail,
    tags: ["Environment"],
  },
  {
    order: 9,
    slug: "volunteer-day-recap",
    title: "Volunteer Day Recap",
    excerpt:
      "Helpers, supporters and first-time volunteers came together for a day of service.",
    dateLabel: "08 Jan 2026",
    category: "events",
    imageUrl: "/uploads/involve-01-helper.jpg",
    featureImageUrl: "/uploads/involve-01-helper.jpg",
    author: "Sewa Sankalp Foundation",
    views: 455,
    ...emptyDetail,
    tags: ["Events & Activities"],
  },
];

async function ensureNavContent() {
  for (const page of NAV_PAGES) {
    const existing = await Page.findOne({ slug: page.slug }).lean();
    if (!existing) {
      await Page.create(page);
      console.log(`[seed] created page ${page.slug}`);
      continue;
    }
    const mergedExtras = { ...(page.extras || {}), ...(existing.extras || {}) };
    const patch = {};
    if (JSON.stringify(mergedExtras) !== JSON.stringify(existing.extras || {})) {
      patch.extras = mergedExtras;
    }
    const staleHeadlines = [
      "Support a Campaign. Change a Life.",
      "Stories of Change",
    ];
    if (staleHeadlines.includes(existing.headline) && page.headline) {
      patch.headline = page.headline;
      patch.body = page.body;
      patch.seoTitle = page.seoTitle;
      patch.seoDescription = page.seoDescription;
    }
    if (Object.keys(patch).length) {
      await Page.updateOne({ slug: page.slug }, { $set: patch });
      console.log(`[seed] updated page shell ${page.slug}`);
    }
  }

  const campaignCount = await Campaign.countDocuments();
  if (campaignCount === 0) {
    await Campaign.insertMany(
      CAMPAIGN_SEED.map((item) => ({
        ...item,
        isPublished: true,
        href: "/get-involved",
      })),
    );
    console.log(`[seed] inserted ${CAMPAIGN_SEED.length} campaigns`);
  }

  let blogInserted = 0;
  for (const post of BLOG_SEED) {
    const exists = await BlogPost.findOne({ slug: post.slug }).lean();
    if (!exists) {
      await BlogPost.create({ ...post, isPublished: true });
      blogInserted += 1;
    }
  }
  if (blogInserted) {
    console.log(`[seed] inserted ${blogInserted} blog posts`);
  }
}

module.exports = { ensureNavContent };