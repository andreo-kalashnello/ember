import { ButtonLink, SectionHeading } from "./ui";

export function WineSection() {
  return (
    <section className="wine-section section" id="wine">
      <div className="wine-glow" aria-hidden="true" />
      <div className="container wine-inner">
        <div className="wine-copy" data-reveal="left">
          <SectionHeading eyebrow="Perfect pairing" title={<>Discover our<br />Wine Collection</>} />
          <p>Handpicked labels from iconic vineyards around the globe. Each bottle has a story.</p>
          <ButtonLink href="#reservation" variant="outline">Explore wines</ButtonLink>
        </div>
      </div>
    </section>
  );
}
