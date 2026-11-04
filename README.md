# Prognova planning assistant — prototype

A single-page showcase for Prognova Health's AI planning assistant. The design plan is in
[DESIGN-PLAN.md](DESIGN-PLAN.md).

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173.

## What is in the prototype

- Live demo in the hero: a scripted knee-replacement case plays on load; typing a question
  interrupts it and gets a canned answer from a small intent matcher in `src/content.ts`.
  No backend. Clinical questions are handed to the doctor.
- Trip rail: six stages that fill as the assistant works, with the logo's crescent as marker.
- Stages section with a sticky artefact that follows the stage in view.
- Price table with a country switch (UK, US, UAE) and counting numbers.
- Who decides what, treatments with hover reveals, FAQ accordion, closing band.

## Where things live

- `src/content.ts` — all copy, prices, FAQ, the demo script and the intent patterns.
- `src/styles/tokens.css` — colour, type, spacing and motion tokens.
- `src/components/` — one component and one CSS module per section.

Animation uses `motion` (Motion for React) with `MotionConfig reducedMotion="user"` at the root.
