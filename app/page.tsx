import { CraftSection } from "@/components/craft-section";
import { ExperienceSection } from "@/components/experience-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MenuSection } from "@/components/menu-section";
import { MotionController } from "@/components/motion-controller";
import { ReservationSection } from "@/components/reservation";
import { StoryReviews } from "@/components/story-reviews";
import { WineSection } from "@/components/wine-section";

export default function Home() {
  return (
    <>
      <MotionController />
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <CraftSection />
        <ExperienceSection />
        <WineSection />
        <StoryReviews />
        <ReservationSection />
      </main>
      <Footer />
    </>
  );
}
