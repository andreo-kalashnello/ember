import { Award, Clock3, MapPin, Mouse, Phone, Star } from "lucide-react";
import { EmberCanvas } from "./atmosphere";
import { ButtonLink } from "./ui";
import Image from "next/image";

const highlights = [
  { icon: Clock3, label: "Opening hours", value: "Daily 17:00 – 23:30" },
  { icon: MapPin, label: "Location", value: "Mayfair, London" },
  { icon: Phone, label: "Phone", value: "+44 20 7946 0958" },
  { icon: Star, label: "Google rating", value: "4.9 from 1,248 reviews" },
  { icon: Award, label: "Michelin guide", value: "Selected 2024" },
];

export function Hero() {
  return (
    <section className="hero relative" id="top">

      <div className="hero-bg absolute w-full overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Modern European cuisine"
          fill
          priority
          quality={80}
          className="object-cover"
        />
      </div>

      <div className="hero-overlay absolute w-full pointer-events-none" aria-hidden="true" />

      <div className="hero-glow relative" aria-hidden="true" />
      <EmberCanvas />
      <div className="container hero-inner relative">
        <div className="hero-copy" data-stagger>
          <p className="eyebrow" data-reveal="up">Modern European cuisine</p>
          <h1 data-reveal="up">Fire.<br /><span>Flavor.</span><br />Moments.</h1>
          <p className="hero-intro" data-reveal="up">A culinary journey where fire meets flavor.<br />Crafted with passion, served with soul.</p>
          <div className="hero-buttons" data-reveal="up">
            <ButtonLink href="#reservation">Book a table</ButtonLink>
            <ButtonLink href="#menu" variant="outline">View menu</ButtonLink>
          </div>
          <div className="rating" aria-label="Rated 4.9 out of 5 from 1,248 reviews" data-reveal="up">
            <div className="rating-faces" aria-hidden="true">
              {[1, 2, 3, 4].map((guest) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={guest} src={`/images/hero-guest-${guest}.jpg`} alt="" />
              ))}
            </div>
            <p><strong>4.9 ★★★★★</strong><span>from 1,248 reviews</span></p>
          </div>
        </div>
        <aside className="hero-facts" aria-label="Restaurant information" data-stagger>
          {highlights.slice(0, 3).map(({ icon: Icon, label, value }) => (
            <div className="hero-fact" key={label} data-reveal="right">
              <span className="icon-ring"><Icon aria-hidden="true" /></span>
              <p><small>{label}</small>{value}</p>
            </div>
          ))}
        </aside>
        <a className="scroll-cue" href="#menu" data-reveal="up">Scroll to discover <span>→</span><Mouse aria-hidden="true" /></a>
      </div>
      <div className="info-bar">
        <div className="container info-grid" data-stagger>
          {highlights.map(({ icon: Icon, label, value }) => (
            <div className="info-item" key={label} data-reveal="up">
              <Icon aria-hidden="true" />
              <p><small>{label}</small>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
