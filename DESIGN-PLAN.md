# Prognova Health AI planning assistant — website design plan

Status: plan only. Nothing built yet.
Reference brand: https://prognovahealth.com/ and the supplied logo.
Stack already in the folder: `motion` 14.9 (Motion for React) with the Motion skill and MCP server.

---

## 1. What this site is

**Assumption (confirm before build):** this is a single-page showcase site for Prognova
Health's AI planning assistant. It sits beside the main prognovahealth.com site and
has one job: let a prospective patient *watch the assistant plan a treatment trip to
India*, understand what it does and does not decide, and then start a conversation or
book the free planning call.

"Portfolio type" is read as a showcase / landing experience, not a multi-page product
app: one long scroll, one live demo, one clear exit (book a call).

**Subject.** An AI assistant that plans medical travel to India: compares care options
and prices, shortlists a stay, arranges transfers and an interpreter, requests the
hospital's visa invitation letter, keeps reports and appointments in one workspace, and
carries follow-up home. It never makes clinical decisions; the treating doctor does.
A human coordinator confirms every booking.

**Audience.** Self-paying patients abroad (UK first; also US, UAE, Nigeria, Kenya,
Bangladesh) who are anxious, comparing prices, and unsure whom to trust. Secondary:
Prognova's own partners and investors who want to see the assistant in action.

**Primary job of the page.** Turn "an AI that plans my surgery trip" from unsettling
into reassuring, by showing it working on a real-looking case, with the human and the
doctor visibly in the loop, then get the visitor to book the free call.

**Working name for the assistant.** The brand does not name it yet. The plan uses
"the Prognova planning assistant" throughout. If a product name is wanted, decide it
before build; "Nova" is one option that keeps the brand mark's "pro·g·nova" rhythm.

---

## 2. Brand facts pulled from the logo and live site

Logo: a deep forest green wordmark and figure, a sage green "leaf / arm" and
HEALTH in sage. The figure is a person leaning into a crescent, which reads as
"someone being carried / looked after". That crescent is the brand's own shape and
we reuse it; nothing else is invented.

Live site tokens (measured from the page's CSS):

| Role | Value |
|---|---|
| Forest 950 / 900 / 800 / 700 | #042B25 / #053F35 / #0A4D41 / #135F50 |
| Forest 100 / 50 | #E3EEE9 / #F1F6F3 |
| Sage 600 / 400 | #5B7650 / #879D78 |
| Lime 300 / 400 (accent on dark) | #C9E27A / #B5D34F |
| Neutral 25 / 50 / 200 / 500 / 700 | #FAFBFA / #F3F6F4 / #DDE5E1 / #5D716B / #34504A |
| Type | Manrope Variable, display and body |
| Radii | control 12, card 20, lg 28, pill |
| Easing | cinematic cubic-bezier(.16,1,.3,1), fluid (.22,1,.36,1) |
| Motion timings | micro .16s, ui .2s, section .7s, hero 1.4s, stagger 80ms |

The parent site is calm, white, photo-led, Manrope everywhere, a lime headline on a
hospital video. The assistant site should be recognisably the same family but must
not be a copy: it is the *product* page, so its hero is the product, not stock footage.

---

## 3. Token system

### Colour (6 named values)

| Token | Hex | Use |
|---|---|---|
| `forest` | #053F35 | brand ink: headlines, primary buttons |
| `forest-deep` | #042B25 | the only dark surface: the assistant's transcript panel and the closing band |
| `sage` | #879D78 | the logo's second green: the assistant's voice, rules, captions, the stage rail |
| `sage-tint` | #E8EFE4 | tinted surfaces: stage artefacts, workspace mock, hover fills |
| `paper` | #F7F8F5 | page background: green-tinted off-white, not cream |
| `lime` | #C9E27A | one accent only: the assistant's live cursor, the "confirmed" state, focus ring on dark |

Rules. Lime appears in at most three places on the whole page. Sage does the work the
parent site leaves to grey: rules, captions, the stage rail. No warm accent, no
terracotta, no gradient washes. Body text is forest on paper; muted text is #5D716B.

Contrast: forest on paper 11.9:1, sage on paper 3.1:1 (large text and rules only,
never body), paper on forest-deep 15:1, lime on forest-deep 11:1.

### Type

Two families, clearly different jobs.

- **Display: Bricolage Grotesque** (Google Fonts, variable: weight, width, optical
  size). Headlines at weight 600, width 90, opsz 96, tracking -0.02em. Friendly,
  slightly compressed; the optical-size axis lets the hero line and a 20px lead share
  one family without looking like interface text. This is the one deliberate
  departure from the parent site's all-Manrope system.
- **Body and interface: Manrope** (same as parent). Weight 400 body, 500 controls,
  600 for the assistant's name line. Keeps the family resemblance.

Scale (desktop rem, mobile in brackets), ratio about 1.25 from a 17px base:

| Step | Size | Line | Use |
|---|---|---|---|
| hero | 5.0 (2.6) | 1.0 | the one hero line |
| h2 | 2.75 (1.9) | 1.08 | section titles |
| h3 | 1.5 (1.3) | 1.2 | stage and treatment titles |
| lead | 1.25 (1.1) | 1.45 | section intros, max 60ch |
| body | 1.0625 | 1.55 | max 68ch |
| small | 0.9 | 1.45 | captions, chips, table notes |

No all-caps labels anywhere. No eyebrow above headings. Sentence case throughout.

### Layout

- 12-column grid, 1200px content max, 24px gutter (16px on mobile).
- Alignment: **left-aligned** throughout, including the hero. The parent site centres
  its hero; this site reads like a plan being written, which is left-to-right work.
- Spacing scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 112 · 160. Sections are
  separated by 112px desktop / 72px mobile, applied once through a single `.section`
  rule and never also on children, so padding cannot double up.
- Radii follow hierarchy, not habit: pill for buttons and chips, 20px for the
  assistant's panel, 12px for stage artefacts, **0** for the stage rail, tables and
  rules.
- Shadow: the parent's `0 1px 2px #053F350D, 0 10px 30px #053F3512`, used on the
  assistant panel only. Nothing else floats.

### Principles

1. **The product is the hero.** The first screen is the assistant planning a real
   case, live. No stock hospital footage.
2. **One memorable thing: the trip rail.** A six-stage horizontal rail that the
   assistant fills in as it works. Every other section is quiet and typographic.
3. **Show the hand-offs.** Wherever the assistant acts, show who confirms (the
   coordinator) and who decides (the doctor). Trust is the content.
4. **Motion means a change of state.** Something moves only when the plan changes,
   something opens, or the visitor acts. No entrance fades on every section.
5. **Reuse the brand's crescent.** The logo's crescent is the only decorative shape,
   used once as the hero backdrop and once as the stage marker.

---

## 4. Page structure and wireframes

Single route `/`. Anchors: `#demo`, `#stages`, `#prices`, `#trust`, `#faq`.

### Header (sticky, 72px, paper at 92% with blur)

```
[logo]   What it does   Stages   Prices   Questions        [GBP ▾]  [Book a call]
```

Logo at 132px wide, exact brand asset. The country/currency control sets the
currency used in the demo and in the price table.

### 1. Hero: live demo (`#demo`)

```
+----------------------------------------------------------------------------+
|  Plan your treatment trip                      | Prognova planning assistant |
|  in one conversation.                          |  (forest-deep panel)        |
|                                                |  You: I need a knee         |
|  The assistant compares care options,          |  replacement, from Leeds,   |
|  prices your stay and transfers, and           |  late January.              |
|  asks your hospital for a visa letter.         |  Assistant: Here is a first |
|  A coordinator confirms every booking.         |  plan. ...                  |
|  Your doctor makes every medical decision.     |  [ Ask about your trip   ↵ ]|
|                                                +-----------------------------+
|  [ Start a conversation ]  [ Book a free call ] |  crescent, sage at 8%,     |
|                                                |  behind the panel           |
|  -- trip rail ------------------------------------------------------------ |
|  ● Reports   ● Call   ○ Stay   ○ Visa letter   ○ Treatment   ○ Home        |
+----------------------------------------------------------------------------+
```

- Left column 5/12: headline (Bricolage, hero step), lead, two buttons.
- Right column 7/12: the assistant panel. On load it plays one scripted case
  (knee replacement, UK, GBP). As it answers, the trip rail underneath fills:
  Reports, Call, Stay turn from outline to filled, and three small artefacts drop
  into the rail: a price line, a stay shortlist, a visa-letter status.
- The visitor can interrupt at any time: typing into the box replaces the script
  with a canned-answer matcher (no backend in v1; see section 5) and the rail
  responds.
- On mobile the panel stacks under the headline and the rail becomes a horizontal
  scroll strip pinned under the panel.
- The headline is one colour. No word is picked out in lime.

### 2. What it does, by stage (`#stages`)

The six stages from the parent site are a genuine sequence, so they are numbered.

```
 1  Share your reports        | [ artefact: upload list with "reviewed by          |
    Upload what you have.     |   coordinator" status ]                            |
    The assistant lists what  |                                                    |
    is missing.               |   (sticky; crossfades to the stage in view)        |
 ---------------------------------------------------------------------------------
 2  Book a call               | [ artefact: a calendar slot, £0 ]                  |
 3  Choose your stay          | [ artefact: three stays side by side ]             |
 4  Your visa letter          | [ artefact: letter status planned → requested →    |
                              |   confirmed ]                                      |
 5  During your stay          | [ artefact: appointment list, coordinator note ]   |
 6  Back home                 | [ artefact: discharge papers, follow-up task ]     |
```

- Layout: a two-column list, not cards. Left: number, title, two sentences, and one
  line in sage saying who is in the loop ("Coordinator confirms", "Your doctor
  decides"). Right: the artefact the assistant produces at that stage, drawn as a
  flat interface fragment on sage-tint, 12px radius.
- Scroll behaviour: the right column is sticky; as the left list scrolls, the
  artefact crossfades to the matching stage (`useScroll` and `useTransform` on
  opacity and y only). One moving thing on screen at a time.
- The trip rail from the hero reappears as the section's thin top edge, with the
  current stage marked by the brand crescent.

### 3. Prices, explained by the assistant (`#prices`)

```
 Compare prices at home and in India                      Prices for patients from
                                                          [ United Kingdom ▾ ]
 Treatment                      At home        India with Prognova
 Hip replacement (one side)     £17,000        from £5,000
 Knee replacement (one side)    £16,000        from £5,000
 3 dental implants with crowns  £9,000         from £3,000
 IVF cycle with donor eggs      £9,000         from £4,500
 Full-body health check         £8,000         from £2,000

 Assistant: These are starting prices. The final cost depends on the
 treatment plan your doctor agrees with you.
```

- A real table, 0 radius, sage hairlines, numbers right-aligned in tabular figures.
- Changing the country swaps currency and figures; numbers count to the new value
  (`animate()` on a motion value, 400ms, no overshoot). This is the one place
  numbers animate.
- The assistant's caveat sits under the table in its own voice, replacing a footnote.

### 4. Who decides what (`#trust`)

Three columns, one short paragraph each, separated by vertical sage rules, no cards:

```
 Your doctor            |  The assistant              |  Your coordinator
 Every clinical         |  Compares options, prices   |  Confirms each booking
 decision. The          |  the trip, drafts requests, |  with the supplier and
 assistant never        |  keeps your workspace       |  tells you when it is
 advises on treatment.  |  up to date.                |  planned, requested or
                        |                             |  confirmed.
```

Under it, one line of three chips showing the real states the workspace uses:
`planned` (outline), `requested` (sage-tint), `confirmed` (lime). This teaches the
vocabulary used in the demo and the stages section.

### 5. Treatments the assistant knows

A four-row list: IVF and fertility, Cancer care, Dental care, Orthopaedics. Each row
is the title at h3 and one line of description. On hover or focus a sample first
question the assistant asks for that treatment slides in from the right edge (200ms,
fluid easing). On touch the row expands instead. No images.

### 6. Questions people ask (`#faq`)

Accordion of the parent site's four questions plus two for the assistant:
"Is the assistant a doctor?" (no) and "What happens to my reports?" (private
workspace, coordinator-reviewed, nothing shared without consent). Height animates
with `layout` on the item and `AnimatePresence` on the body.

### 7. Closing

```
 Start planning your treatment trip.
 The first call is free. Bring rough dates and your questions.
 [ Start a conversation ]  [ Book a call ]   Or chat on WhatsApp
```

Forest-deep band, paper text, lime only on the focus ring.
Footer: logo, the parent's disclaimer language ("representative, not actual
providers"), privacy, cookie policy, sign in.

---

## 5. The demo: how the assistant behaves on the page

Version 1 is fully client-side and honest about it.

- **Scripted case** plays on load unless `prefers-reduced-motion` is set, in which
  case the finished plan is shown at once with a "Replay" control.
- Script: four exchanges, about 18 seconds. Visitor lines appear instantly;
  assistant lines type at 28 characters per second with the lime block cursor, then
  the matching rail stage fills and an artefact appears under the transcript.
- **Visitor input:** a small intent matcher over about 20 patterns (treatment names,
  "how much", "visa", "hotel", "interpreter", "follow-up", country names). Each
  pattern has a canned answer and a rail effect. Unmatched input gets the honest
  answer: "I can plan stays, transfers, prices and visa letters. For that one, a
  coordinator will reply on the free call." with the Book a call button inline.
- **Never claims to be clinical.** Any input containing "should I", "is it safe",
  "which treatment" returns the doctor hand-off line.
- A one-line note under the panel: "Demo with sample data. Your real plan starts on
  the free call."
- v2 hook: the same component takes an `onSend` prop so a real backend can replace
  the matcher without touching the interface.

---

## 6. Motion plan (Motion for React, already installed)

Budget: one orchestrated moment, two scroll-linked behaviours, and interaction
feedback. Nothing else moves on its own.

| Where | What | How |
|---|---|---|
| Hero, on load | the one orchestrated sequence: headline settles (y 16 to 0, opacity), panel appears, transcript types, rail stages fill in order | `motion.div` with `transition={{ ease: [.16,1,.3,1], duration: .7 }}`; stages use `staggerChildren: 0.08`; typing driven by `useMotionValue` and `animate()` with `onUpdate` slicing the string |
| Trip rail | stage goes outline to filled, crescent marker slides to it | `layoutId="stage-marker"` on the marker; fill via `animate` on `scale` and `opacity` of an inner disc, spring `visualDuration .4, bounce .15` |
| Stages section | sticky artefact crossfades with scroll | `useScroll({ target, offset })` and `useTransform` to opacity and y per artefact; transforms and opacity only |
| Prices | numbers count on country change | `animate(mv, target, { duration: .4, ease: "easeOut" })` rendered through a `<motion.span>`; no spring, no overshoot |
| Treatments | sample question slides in on hover or focus | `whileHover` and `whileFocus` on `x` and `opacity`, 200ms fluid; `whileTap` on touch |
| FAQ | open and close | `layout` on item, `AnimatePresence` with `height: "auto"` on body, 250ms |
| Buttons | press feedback | `whileTap={{ scale: .98 }}` only; no hover scale |
| Reduced motion | everything above collapses to instant state changes | `MotionConfig reducedMotion="user"` at the root; the demo shows the finished plan |

Performance rules from the Motion skill applied: transforms and opacity only,
`layout` for size changes, no per-frame allocations in `useTransform` callbacks,
`will-change` only on the typing cursor. Run the Motion reviewer agent before
shipping.

Not used: parallax, cursor followers, magnetic buttons, marquee tickers, per-section
fade-ups, gradient blobs.

---

## 7. Copy direction

Voice: the parent site's voice, which is plain, second person, and careful about what
is and is not promised. Reuse its exact distinctions: "planned / requested /
confirmed", "starting prices", "your doctor makes every clinical decision".

- Buttons say what happens: "Start a conversation", "Book a free call", "Change
  country". A button that says "Book a call" opens a dialog titled "Book a call".
- The assistant speaks in short declaratives and asks one question at a time.
- No superlatives, no "revolutionary", no "seamless". No emoji.
- Disclaimers are sentences in sage small text, not asterisks.

Draft hero:

> **Plan your treatment trip in one conversation.**
> The assistant compares care options in India, prices your stay and transfers, and
> asks your hospital for a visa letter. A coordinator confirms every booking. Your
> doctor makes every medical decision.

---

## 8. Technical plan

- Vite + React 19 + TypeScript. `motion` 14 (already in `package.json`; the folder's
  `node_modules` also carries `framer-motion`, which must not sit alongside it, so
  remove it when scaffolding).
- Styling: plain CSS with the tokens above as custom properties in one `tokens.css`,
  CSS Modules per component. One global `.section` spacing rule. No utility
  framework, so specificity stays flat.
- Fonts: Bricolage Grotesque and Manrope from Google Fonts, `font-display: swap`,
  latin subset.
- Logo: use the supplied asset as SVG; export the crescent as a separate SVG symbol.
- Accessibility floor: visible 2px focus ring (forest on paper, lime on forest-deep),
  all demo controls keyboard-operable, transcript is an `aria-live="polite"` region,
  the rail is an ordered list, the price table is a real `<table>` with a caption.
- Responsive: 1200 / 900 / 600 breakpoints. Hero stacks at 900; rail becomes a
  horizontal scroll strip at 600; stages list drops the sticky column at 900 and
  inlines each artefact under its text.
- Content: all demo scripts, prices and FAQ in one `content.ts` so copy edits need
  no component changes.

### Build order

1. Scaffold, tokens, fonts, header and footer, empty sections with correct spacing.
2. Trip rail component (shared by hero and stages).
3. Assistant panel with scripted playback and the intent matcher.
4. Hero orchestration.
5. Stages section with sticky artefacts.
6. Prices table with country switch and number animation.
7. Trust, treatments, FAQ, closing.
8. Reduced-motion pass, keyboard pass, mobile pass, Motion performance audit.

---

## 9. Review against generic defaults

The first draft of this plan was checked against the usual tells and four things
changed:

- **Hero.** First draft was a headline, three stats, and a gradient. Replaced by the
  live demo plus the rail: the product is the hero, and the one memorable element is
  a shape the brand already owns.
- **Dark panel with lime.** The brand's own system puts lime on forest, so it stays,
  but the page is light, the dark surface is only the transcript and closing band,
  and lime is capped at three uses. This is not a dark site with an acid accent.
- **Cards.** Stages, trust and treatments were cards in the first draft. Now: a
  numbered two-column list with one sticky artefact, three ruled columns, and a plain
  row list. Only the assistant panel and the artefacts carry a radius or shadow.
- **Type.** Not Inter, not a serif-and-cream pairing. Bricolage's width and optical
  axes carry the personality; Manrope keeps the family link to the parent site.
- Kept on purpose: numbering the six stages (they are a sequence), the parent's
  easing curves, and its disclaimer language.

---

## 10. Decisions needed before build

1. Confirm the assumption in section 1: a showcase for Prognova's own assistant, not
   a portfolio piece about one.
2. Whether the assistant gets a product name.
3. Which countries the currency switch should offer (UK, US, UAE suggested; the
   parent site lists more).
4. Whether the v1 demo stays client-side with canned answers (recommended) or
   connects to a live model from day one.
5. The exact logo SVG and whether the crescent may be reused as a separate graphic.
