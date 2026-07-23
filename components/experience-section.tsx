import Image from "next/image";
import { ParticleField } from "./atmosphere";
import { SectionHeading } from "./ui";

const experiences = [
  { title: "Private Dining", text: "Intimate. Exclusive. Yours.", image: "/images/experience-private.jpg" },
  { title: "Chef’s Table", text: "A front row seat to the kitchen.", image: "/images/experience-chef.jpg" },
  { title: "Wine Evenings", text: "Curated tastings from around the world.", image: "/images/experience-wine.jpg" },
  { title: "Special Events", text: "Celebrate life’s finest moments.", image: "/images/experience-events.jpg" },
  { title: "Cocktail Bar", text: "Signature cocktails, crafted to impress.", image: "/images/experience-cocktail.jpg" },
];

export function ExperienceSection() {
  return (
    <section className="experience-section section" id="experience">
      <div className="experience-aura" aria-hidden="true" />
      <ParticleField count={25} />
      <div className="container">
        <div data-reveal="up"><SectionHeading eyebrow="The experience" title="Elevated Experiences" /></div>
        <div className="experience-grid" data-stagger>
          {experiences.map((item) => (
            <article className="experience-card" key={item.title} data-reveal="up">
              <div className="experience-image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 80vw, 20vw" /></div>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
