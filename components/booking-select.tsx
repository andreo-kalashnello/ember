"use client";

import { ChevronDown } from "lucide-react";
import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";

type BookingSelectOption = {
  value: string;
  label: string;
};

type BookingSelectProps = {
  name: string;
  options: readonly BookingSelectOption[];
  placeholder: string;
  defaultValue?: string;
};

export function BookingSelect({
  name,
  options,
  placeholder,
  defaultValue = "",
}: BookingSelectProps) {
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => {
    const selectedIndex = options.findIndex((option) => option.value === defaultValue);
    return Math.max(selectedIndex, 0);
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [isOpen]);

  const selectOption = (index: number) => {
    setValue(options[index].value);
    setActiveIndex(index);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (event.key === "Tab") {
      setIsOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setIsOpen(true);
      setActiveIndex((current) => (current + direction + options.length) % options.length);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isOpen) selectOption(activeIndex);
      else setIsOpen(true);
    }
  };

  return (
    <div className="booking-select" ref={rootRef}>
      <input name={name} type="hidden" value={value} readOnly />
      <button
        ref={triggerRef}
        className="booking-select-trigger"
        type="button"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        <span className={selectedOption ? "" : "is-placeholder"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown aria-hidden="true" />
      </button>
      {isOpen ? (
        <div className="booking-select-menu" id={listboxId} role="listbox">
          {options.map((option, index) => (
            <button
              key={option.value}
              className="booking-select-option"
              type="button"
              role="option"
              aria-selected={value === option.value}
              data-active={activeIndex === index}
              onClick={() => selectOption(index)}
              onPointerEnter={() => setActiveIndex(index)}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
