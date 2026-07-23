"use client";

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

const pad = (value: number) => String(value).padStart(2, "0");

const toValue = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

const formatValue = (value: string) => {
  if (!value) return "DD.MM.YYYY";
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
};

export function BookingDatePicker() {
  const today = new Date();
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: 42 }, (_, index) => index - firstWeekday + 1);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const selectToday = () => {
    setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setValue(toValue(today.getFullYear(), today.getMonth(), today.getDate()));
    setIsOpen(false);
  };

  return (
    <div className="booking-date" ref={rootRef}>
      <input name="date" type="hidden" value={value} readOnly />
      <button
        className="booking-date-trigger"
        type="button"
        aria-controls={dialogId}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className={value ? "" : "is-placeholder"}>{formatValue(value)}</span>
        <CalendarDays aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="booking-calendar" id={dialogId} role="dialog" aria-label="Choose a reservation date">
          <div className="booking-calendar-header">
            <strong>
              {visibleMonth.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </strong>
            <div>
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setVisibleMonth(new Date(year, month - 1, 1))}
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setVisibleMonth(new Date(year, month + 1, 1))}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="booking-calendar-grid booking-calendar-weekdays" aria-hidden="true">
            {weekdays.map((weekday, index) => <span key={`${weekday}-${index}`}>{weekday}</span>)}
          </div>
          <div className="booking-calendar-grid">
            {days.map((day, index) => {
              const dateValue = day > 0 && day <= daysInMonth ? toValue(year, month, day) : "";
              return dateValue ? (
                <button
                  key={dateValue}
                  className={value === dateValue ? "is-selected" : ""}
                  type="button"
                  aria-label={new Date(year, month, day).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  aria-pressed={value === dateValue}
                  onClick={() => {
                    setValue(dateValue);
                    setIsOpen(false);
                  }}
                >
                  {day}
                </button>
              ) : <span key={`empty-${index}`} />;
            })}
          </div>

          <div className="booking-calendar-footer">
            <button type="button" onClick={() => setValue("")}>Clear</button>
            <button type="button" onClick={selectToday}>Today</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
