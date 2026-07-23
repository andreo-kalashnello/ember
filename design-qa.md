# EMBER Design QA

## Evidence

- Source visual truth: the user-provided mobile hero-info, Reservations dropdown, Wine-spacing, and Menu-background screenshots in this conversation, the Kind Words reference, and the connected Stitch EMBER sections.
- Mobile full-page implementation: `output/playwright/audit-mobile-after-full.png` (375 × 11,480 px, device scale factor 1).
- Mobile hero and stacked info: `output/playwright/audit-mobile-after-hero-visible.png` (390 × 1,097 px).
- Mobile review next state: `output/playwright/audit-mobile-after-reviews-next.png` (390 × 596 px).
- Mobile reservation form: `output/playwright/audit-mobile-after-reservation.png` (375 × 943 px).
- Desktop reviews initial state: `output/playwright/audit-desktop-after-reviews-three.png` (1,425 × 718 px).
- Desktop reviews next state: `output/playwright/audit-desktop-after-reviews-next.png` (1,425 × 718 px).
- Mobile Menu background: `output/playwright/audit-mobile-menu-background-final.png` (390 × 844 px).
- Mobile Wine spacing: `output/playwright/audit-mobile-wine-spacing-fixed.png` (390 × 844 px).
- Mobile Reservations open state: `output/playwright/audit-mobile-reservation-select-fixed.png` (390 × 844 px).
- Tested states: desktop at 1,440 × 900 and mobile at 390 × 844; review slider initial and next positions; all mobile sections revealed.
- Density normalization for the latest mobile comparison: source and implementation were reviewed as unframed responsive-page crops at CSS scale and device scale factor 1. No browser canvas or device frame was included.

## Findings and fixes

- P2: the hero information strip used horizontal scrolling and clipped most items on mobile. Fixed with a single-column, full-width stack and consistent row dividers.
- P2: the review carousel used native scrolling, which felt delayed and exposed partial cards. Fixed with a bounded GPU-transformed track, a focused easing curve, endpoint controls, and responsive 3/2/1-card geometry.
- P2: native select arrows sat too close to the right border. Fixed with accessible custom Lucide chevrons and an 18 px inset.
- P2: desktop-oriented minimum heights created empty vertical regions on mobile. Fixed with content-driven heights and tighter section spacing for Menu, Craft, Experiences, Wine, Story, Reviews, Reservations, and Footer.
- P2: the mobile browser rendered the native Time dropdown outside the reservation form bounds. Fixed with a form-contained listbox that supports pointer, Escape, Enter, Space, and arrow-key interaction.
- P2: Wine vertically centered its content inside a 540 px mobile frame, creating an oversized top gap. Fixed with top-aligned content, a 56 px section inset, and a 480 px content-driven minimum.
- P2: Menu used an aspect-ratio-dependent elliptical pattern and exposed a native horizontal scrollbar. Fixed with circular mobile geometry and a visually hidden, still-scrollable category rail.
- No remaining actionable P0, P1, or P2 visual differences were found in the reviewed states.

## Fidelity surfaces

- Typography remains Bodoni Moda for display copy and Manrope for body text and labels.
- Existing EMBER imagery, copy, gold/black palette, borders, radii, and interaction language were preserved.
- Desktop reviews show exactly three complete cards. Mobile shows one complete card, with no cropped neighboring slide.
- Mobile hero content uses the complete container width, while the information list below it remains readable without horizontal interaction.
- Menu rings keep consistent spacing on the narrow viewport; Wine retains the original image crop without the earlier blank lead-in.
- Reservation options reuse the existing gold, surface, line, and typography tokens instead of the browser-owned dropdown styling.

## Interaction and verification

- Review navigation: passed in mobile and desktop states; cards advance cleanly and controls disable at their valid endpoints.
- Reservation fields: passed; the dropdown stays within the form, the selected value updates, and keyboard selection (`ArrowDown` then `Enter`) closes the list and commits `18:30`.
- Mobile full-page pass: hero, info rows, Menu, Craft, Experiences, Wine, Story, Reviews, Reservations, and Footer render without large unexplained gaps.
- Browser console: 0 errors and 0 warnings during the full-page and interaction passes.
- `bun run typecheck`: passed.
- `bun run lint`: passed.
- `bun run build`: passed, including the optimized static production build.

## Latest focused comparison

- Full-view evidence: the three 390 × 844 captures above cover the same mobile layout states as the latest user screenshots.
- Focused evidence was required because the reported issues were control-boundary, section-spacing, and decorative-pattern defects; each target was inspected at readable scale.
- Post-fix comparison found no remaining P0/P1/P2 difference in the three reported regions. The visual source uses browser/device chrome in places, which was excluded from layout judgment.

final result: passed
