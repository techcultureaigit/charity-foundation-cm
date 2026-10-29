import { connection } from "next/server";
import { AboutSection } from "@/components/home/AboutSection";
import { CausesSection } from "@/components/home/CausesSection";
import { CtaSection } from "@/components/home/CtaSection";
import { EventsSection } from "@/components/home/EventsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { InvolveSection } from "@/components/home/InvolveSection";
import { IntroSection } from "@/components/home/IntroSection";
import {
  getCauses,
  getEvents,
  getInvolvementCards,
  getPage,
  getPublishedImpact,
  getPublishedMedia,
  getWorkAreas,
} from "@/lib/services/content";

export const instant = false;

export default async function HomePage() {
  await connection();
  const [home, about, workAreas, impact, involvement, causes, events, aboutMedia, ctaMedia] =
    await Promise.all([
      getPage("home"),
      getPage("about"),
      getWorkAreas(),
      getPublishedImpact(),
      getInvolvementCards(),
      getCauses(),
      getEvents(),
      getPublishedMedia("about"),
      getPublishedMedia("cta"),
    ]);

  // Prefer page CTA image, then Media “cta”. Never fall back to hero photos —
  // those break the strip layout and look like a footer overlap.
  const ctaImage = home.ctaImageUrl
    ? {
        id: "cta-page",
        title: "CTA",
        alt: home.ctaHeadline || "CTA",
        url: home.ctaImageUrl,
        category: "cta" as const,
      }
    : ctaMedia[0];

  return (
    <div>
      <HeroSection page={home} impact={impact} />
      <IntroSection page={home} areas={workAreas} />
      <AboutSection
        home={home}
        about={about}
        image={
          home.extras?.aboutImageUrl
            ? {
                id: "about-page",
                title: "About",
                alt: "Sewa Sankalp Foundation community work",
                url: home.extras.aboutImageUrl,
                category: "about" as const,
              }
            : aboutMedia[0]
        }
      />
      <InvolveSection page={home} cards={involvement} />
      <CausesSection page={home} causes={causes} />
      <EventsSection page={home} events={events} />
      <CtaSection page={home} image={ctaImage} />
    </div>
  );
}