"use client";

import { ArrowRight, Facebook, Instagram } from "lucide-react";
import { FormEvent, useState } from "react";
import { Logo } from "./ui";

export function Footer() {
  const [joined, setJoined] = useState(false);
  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJoined(true);
  };

  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-grid" data-stagger>
        <div className="footer-brand" data-reveal="up"><Logo /><p>Modern cuisine. Open fire.<br />Unforgettable moments.</p><div className="socials"><a href="https://instagram.com" aria-label="Instagram"><Instagram /></a><a href="https://facebook.com" aria-label="Facebook"><Facebook /></a></div></div>
        <div className="footer-column" data-reveal="up"><h3>Explore</h3><a href="#experience">The Experience</a><a href="#menu">Menu</a><a href="#wine">Wine Collection</a><a href="#reservation">Private Dining</a><a href="#story">Gallery</a></div>
        <div className="footer-column" data-reveal="up"><h3>Information</h3><a href="#about">About Us</a><a href="#story">Our Story</a><a href="#contact">Careers</a><a href="#contact">Press</a><a href="#reservation">Gift Cards</a></div>
        <div className="footer-column" data-reveal="up"><h3>Contact</h3><a href="tel:+442079460958">+44 20 7946 0958</a><a href="mailto:hello@ember-restaurant.com">hello@ember-restaurant.com</a><p>Mayfair, London</p></div>
        <div className="newsletter" data-reveal="up"><h3>Newsletter</h3><p>Be the first to know about events, new menus and special offers.</p>{joined ? <p className="newsletter-success" role="status">Thank you — you’re on the list.</p> : <form onSubmit={subscribe}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" required type="email" placeholder="Your email address" /><button type="submit" aria-label="Subscribe"><ArrowRight /></button></form>}</div>
      </div>
      <div className="container footer-bottom"><p>© 2026 EMBER Restaurant. All rights reserved.</p><div><a href="#contact">Privacy Policy</a><a href="#contact">Terms of Service</a></div></div>
    </footer>
  );
}
