"use client";

import { FormEvent, useState } from "react";
import { ParticleField } from "./atmosphere";
import { BookingDatePicker } from "./booking-date-picker";
import { BookingSelect } from "./booking-select";

const timeOptions = [
  { value: "17:00", label: "17:00" },
  { value: "18:30", label: "18:30" },
  { value: "20:00", label: "20:00" },
  { value: "21:30", label: "21:30" },
] as const;

const guestOptions = [
  { value: "1", label: "1 Guest" },
  { value: "2", label: "2 Guests" },
  { value: "3", label: "3 Guests" },
  { value: "4", label: "4 Guests" },
  { value: "5", label: "5+ Guests" },
] as const;

export function ReservationSection() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="reservation-section section" id="reservation">
      <ParticleField count={25} />
      <div className="container reservation-grid">
        <div className="reservation-copy" data-reveal="left">
          <p className="eyebrow">Reservations</p>
          <h2>Your Table<br />Awaits</h2>
          <p>Book your experience and let us take care of the rest. Our reservations open 30 days in advance.</p>
        </div>
        <form className="booking-form" id="booking-form" onSubmit={submit} data-reveal="right">
          {submitted ? (
            <div className="form-success" role="status">
              <h3>Your table request is received.</h3>
              <p>Our reservations team will contact you shortly to confirm the details.</p>
              <button type="button" className="button button--outline" onClick={() => setSubmitted(false)}>Make another request</button>
            </div>
          ) : (
            <>
              <div className="form-row">
                <label>Date<BookingDatePicker /></label>
                <label>Time<BookingSelect name="time" options={timeOptions} placeholder="Select time" /></label>
              </div>
              <div className="form-row">
                <label>Guests<BookingSelect name="guests" options={guestOptions} placeholder="Select guests" defaultValue="2" /></label>
                <label>Phone<input required name="phone" type="tel" autoComplete="tel" placeholder="+44 20 0000 0000" /></label>
              </div>
              <button className="button button--solid submit-button" type="submit">Check availability</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
