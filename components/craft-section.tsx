import Image from "next/image";
import { Flame, Leaf, Utensils } from "lucide-react";
import { ParticleField } from "./atmosphere";
import { ButtonLink, SectionHeading } from "./ui";

const principles = [
  { icon: Leaf, title: "Seasonal Ingredients", text: "Sourced from the best local producers" },
  { icon: Flame, title: "Fire-Led Cooking", text: "Charred, wood & open flame" },
  { icon: Utensils, title: "Artisanal Techniques", text: "Handcrafted with passion and precision" },
];

export function CraftSection() {
  return (
    <section className="craft-section section" id="about">
      <div className="section-aura" aria-hidden="true" />
      <ParticleField count={4} />
      <div className="craft-grid">
        <div className="craft-main">
          <div className="craft-chef" data-reveal="left">
            <Image src="/images/chef.jpg" alt="Chef meticulously plating a dish" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="craft-copy" data-reveal="up">
            <SectionHeading eyebrow="The craft" title="The Art of the Flame" />
            <p className="lead">At EMBER, fire is more than heat –<br />it’s our language. Each ingredient is chosen with intention, each dish crafted with precision.</p>
            <div className="principles">
              {principles.map(({ icon: Icon, title, text }) => (
                <div className="principle" key={title}>
                  <span className="icon-ring"><Icon aria-hidden="true" /></span>
                  <p><strong>{title}</strong><small>{text}</small></p>
                </div>
              ))}
            </div>
            <ButtonLink href="#story">Our story</ButtonLink>
          </div>
        </div>
        <blockquote className="chef-quote" data-reveal="right">
          <p>“Perfection is not a goal. It’s a flame we chase every day.”</p>
          <cite>Jamie Carter<span>Chef &amp; Founder</span></cite>
        </blockquote>
      </div>
    </section>
  );
}
