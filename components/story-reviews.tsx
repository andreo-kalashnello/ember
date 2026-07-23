"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Award, CalendarDays, Heart, Users } from "lucide-react";
import { CSSProperties, useEffect, useState } from "react";
import { AnimatedCounter } from "./animated-counter";
import { ParticleField } from "./atmosphere";
import { SectionHeading } from "./ui";

const stats = [
  { icon: CalendarDays, value: 10, suffix: "+", label: "Years of heritage" },
  { icon: Users, value: 25, suffix: "K+", label: "Happy guests" },
  { icon: Award, value: 4, suffix: "", label: "Awards won" },
  { icon: Heart, value: 100, suffix: "%", label: "Passion" },
];

const reviews = [
  { name: "Oliver T.", quote: "The steak was perfection. Cooked over fire exactly as it should be.", image: "/images/avatar-oliver-stitch.jpg" },
  { name: "Sophie M.", quote: "An unforgettable evening. We’ll be back again and again.", image: "/images/avatar-sophie-stitch.jpg" },
  { name: "David K.", quote: "One of the best restaurants in London. Simply outstanding.", image: "/images/avatar-david-stitch.jpg" },
  { name: "Maria L.", quote: "A journey for the senses. The food, the ambiance, the service – all world class.", image: "/images/avatar-maria-stitch.jpg" },
];

export function StoryReviews() {
  const [activeReview, setActiveReview] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(3);

  useEffect(() => {
    const updateVisibleReviews = () => {
      if (window.innerWidth <= 640) setVisibleReviews(1);
      else if (window.innerWidth <= 900) setVisibleReviews(2);
      else setVisibleReviews(3);
    };

    updateVisibleReviews();
    window.addEventListener("resize", updateVisibleReviews);
    return () => window.removeEventListener("resize", updateVisibleReviews);
  }, []);

  const lastReview = Math.max(0, reviews.length - visibleReviews);

  useEffect(() => {
    setActiveReview((current) => Math.min(current, lastReview));
  }, [lastReview]);

  const move = (direction: number) => {
    setActiveReview((current) => Math.min(lastReview, Math.max(0, current + direction)));
  };

  return (
    <section className="story-reviews" id="story">
      <div className="story-section">
        <div className="container story-grid">
          <div className="story-copy" data-reveal="up">
            <SectionHeading eyebrow="Our story" title={<>A Decade of<br />Passion &amp; Fire</>} />
            <p>Founded on the belief that fire brings out the truest flavors. EMBER is where culinary art meets unforgettable experiences.</p>
          </div>
          <div className="stats-list" data-stagger>
            {stats.map(({ icon: Icon, value, suffix, label }) => (
              <div className="stat" key={label} data-reveal="up"><Icon aria-hidden="true" /><p><strong><AnimatedCounter value={value} suffix={suffix} /></strong><small>{label}</small></p></div>
            ))}
          </div>
        </div>
      </div>
      <div className="reviews-section">
        <div className="section-aura" aria-hidden="true" />
        <ParticleField count={3} />
        <div className="container">
          <div data-reveal="up"><SectionHeading eyebrow="Kind words" title="From Our Guests" centered /></div>
          <div className="reviews-wrap">
            <button className="side-arrow" type="button" onClick={() => move(-1)} aria-label="Previous reviews" disabled={activeReview === 0}><ArrowLeft /></button>
            <div className="reviews-viewport">
              <div
                className="reviews-track"
                aria-live="polite"
                style={{ transform: `translate3d(${-activeReview * (100 / visibleReviews)}%, 0, 0)` }}
              >
              {reviews.map((review, index) => (
                <div
                  className="review-slide"
                  key={review.name}
                  data-reveal="up"
                  style={{ "--reveal-delay": `${index * 80}ms`, flexBasis: `${100 / visibleReviews}%` } as CSSProperties}
                >
                  <article className="review-card">
                    <p className="stars" aria-label="5 out of 5 stars">★★★★★</p>
                    <blockquote>“{review.quote}”</blockquote>
                    <div className="reviewer">
                      <span className="reviewer-avatar"><Image src={review.image} alt={`${review.name}, EMBER guest`} fill sizes="58px" /></span>
                      <p><strong>{review.name}</strong><small>Google Reviews</small></p>
                    </div>
                  </article>
                </div>
              ))}
              </div>
            </div>
            <button className="side-arrow" type="button" onClick={() => move(1)} aria-label="Next reviews" disabled={activeReview === lastReview}><ArrowRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
