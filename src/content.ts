// All copy on the site, taken from prognova.ai.

export const nav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Why now", href: "#why-now" },
  { label: "Proof", href: "#proof" },
  { label: "Traction", href: "#traction" },
  { label: "The plan", href: "#plan" },
]

export const links = {
  chat: "https://www.prognova.ai/chat",
  email: "hello@prognovahealth.com",
  privacy: "https://www.prognova.ai/privacy",
}

export const hero = {
  eyebrow: "Clinical AI · MedGemma 1.5 · 4B parameters",
  title: "One clinical brain.",
  lead: "Every doctor deserves an intelligence that knows their patient. Every medical robot will need a brain it can trust.",
  hint: "Scroll to bring the record together",
  cta: "Try Prognova AI",
}

export const problem = {
  titleA: "The doctor has minutes.",
  titleB: "The record is everywhere.",
  paragraphs: [
    "A patient's record is scattered across labs, imaging, prescriptions, notes and discharge summaries, often across hospitals, and the doctor has minutes to put it together. The AI on their phone answers from the literature or from a general model in someone else's cloud. It is fluent, general, and unverifiable at the bedside.",
    "Nobody has trained a model on the verified record of the patient in the room, because that record never leaves the hospital.",
  ],
  pieces: ["Lab report", "Imaging", "Prescription", "Clinical notes", "Discharge summary", "Second hospital"],
  oneRecord: "…until it is one record.",
}

export const ask = {
  title: "Every answer points to the line it came from.",
  text: "Ask the record a question. Prognova answers from the page and shows the exact line it read, or it says the answer is not there. It does not fill the gap with a guess.",
  prompt: "Choose a question. The answer appears here with the line it came from.",
  refusal: "If it cannot point to the line, it says nothing. That refusal is the product.",
  questions: [
    {
      id: "q1",
      label: "Are the blood sugar results in range?",
      answer: "No. HbA1c is 8.2 % against a reference of under 5.7 %, and fasting glucose is 164 mg/dL against 70 – 99. Both are above range.",
      cites: [14, 15],
      page: "Laboratory report, page 2, lines 14 and 15",
    },
    {
      id: "q2",
      label: "Is there a family history of diabetes?",
      answer: "The record does not say. The family history section on this report is blank, so there is nothing to cite.",
      cites: [],
      page: "Family history · blank · nothing to cite",
    },
  ],
  report: {
    title: "Laboratory report",
    page: "Page 2 of 2",
    meta: "Patient: fictional · Specimen: venous blood, fasting",
    rows: [
      { line: 10, test: "Haemoglobin", result: "13.9 g/dL", ref: "13.0 – 17.0" },
      { line: 11, test: "White cell count", result: "6.8 × 10⁹/L", ref: "4.0 – 11.0" },
      { line: 12, test: "Platelets", result: "245 × 10⁹/L", ref: "150 – 410" },
      { line: 13, test: "Creatinine", result: "0.9 mg/dL", ref: "0.7 – 1.3" },
      { line: 14, test: "HbA1c", result: "8.2 %", ref: "< 5.7" },
      { line: 15, test: "Glucose, fasting", result: "164 mg/dL", ref: "70 – 99" },
      { line: 16, test: "TSH", result: "2.1 mIU/L", ref: "0.4 – 4.0" },
      { line: 17, test: "Cholesterol, total", result: "182 mg/dL", ref: "< 200" },
    ],
    familyHistory: "Blank. Nothing is recorded here.",
    note: "Fictional example. Prognova does not diagnose.",
  },
}

export const jobs = {
  title: "Read. Remember. Reason. Run.",
  text: "One small medical language model, trained on verified hospital and lab records, doing four jobs.",
  model: "MedGemma 1.5 · 4B parameters · fine-tuned with QLoRA",
  items: [
    {
      n: "01",
      name: "Read",
      text: "Reads clinical documents, lab reports first, and keeps the page and line each value came from.",
      status: "v1 · today",
      live: true,
    },
    {
      n: "02",
      name: "Remember",
      text: "Remembers each patient across visits and hospitals, in a context the patient owns.",
      status: "v2 · next",
      live: false,
    },
    {
      n: "03",
      name: "Reason",
      text: "Reasons over the record with a doctor signing off on every answer.",
      status: "Off until validated",
      live: false,
    },
    {
      n: "04",
      name: "Run",
      text: "Will run the same model inside devices: it is small enough to fit onboard.",
      status: "Device licensing · 2029+",
      live: false,
    },
  ],
  footnote:
    "v1 reads the record. v2 learns continuously: each patient gets a persistent context they own, and every doctor correction feeds back as training signal.",
}

export const whyNow = {
  title: "The model is free. The data is not.",
  text: "Anyone can download a medical model. Nobody can download the verified record of the patient in the room, and that record lives inside hospitals.",
  items: [
    {
      tag: "Open base models · MedGemma 1.5 · 4B",
      title: "The model is nearly free.",
      text: "Open medical base models such as Google's MedGemma mean a small team can fine-tune a competitive clinical model. The scarce input is now verified data, not compute.",
    },
    {
      tag: "34,000+ beds by FY2030 · ABDM",
      title: "Hospitals are digitising.",
      text: "India's corporate hospital chains are adding beds and moving records onto digital systems under the national ABDM framework. Those records are the training corpus.",
    },
    {
      tag: "DPDP Act 2023",
      title: "Regulation favours evidence.",
      text: "India's data protection law requires consent and purpose limitation for health data. A model whose every answer traces to a consented record, with a context the patient controls, is the easy way to comply.",
    },
    {
      tag: "OpenEvidence · 40%+ of US physicians",
      title: "Adoption is settled. Grounding is not.",
      text: "Doctors already use AI at the point of care. The open question is no longer whether they will, but whether the answer comes from the patient's own record.",
    },
  ],
  market: {
    label: "Market · rating-agency figures only",
    rows: [
      { name: "India private hospitals", value: "$122B (2025) → $202B by 2030", source: "Source: Brickwork Ratings" },
      { name: "Large private chains", value: "18 large chains · Rs 40,000 crore outlay", source: "Source: ICRA" },
    ],
  },
}

export const robot = {
  titleA: "Beside the doctor today.",
  titleB: "Inside the robot tomorrow.",
  text: "One model, trained on the patient's verified record. Beside the doctor it shows what changed since the last visit and what to check next, and every answer carries the exact line it came from.",
  refusal: "The refusal is what lets a doctor trust it today, and what will let a care robot run it tomorrow.",
  researchLabel: "Where the same brain runs next · Research",
  devices: [
    { name: "Ward assistant", text: "Checks on a patient overnight." },
    { name: "Triage kiosk", text: "Takes a history." },
    { name: "Home-care unit", text: "Watches recovery after discharge." },
  ],
  fits: "MedGemma 1.5 · 4B parameters · fits onboard",
  timelineTitle: "The hospital pays for the brain, then the device does.",
  timeline: [
    {
      year: "2027",
      title: "Clinical assistant subscription",
      text: "For doctors, and for patients in aftercare, answering from the verified record. Pricing will be set with the first paid pilots.",
    },
    {
      year: "2028",
      title: "Clinical reasoning tier",
      text: "A higher tier, once doctor-in-the-loop reasoning passes clinical validation.",
    },
    {
      year: "2029+",
      title: "Device & OEM licensing",
      text: "The model embedded in diagnostic instruments, patient-monitoring devices and care robots. Not surgical robotics: the brain that knows the patient, not the hand that operates.",
    },
  ],
  note: "Prognova is pre-revenue by design. The first paid pilots are planned for 2027.",
}

export const proof = {
  title: "A 4B model, read against the frontier.",
  text: "We put our 4B model against Claude Opus 5.5 and GPT-6.1 Sol, both at high effort, on identical held-out lab reports. It missed nothing and invented nothing.",
  setup: "Lab reports, 60 held-out pages, identical inputs.",
  stats: [
    { value: 99.1, suffix: "%", label: "of flags correct", compare: "Claude Opus 5.5 and GPT-6.1 Sol (high): 85.7%" },
    { value: 100, suffix: "%", label: "of abnormal results caught", compare: "" },
    { value: 0, suffix: "%", label: "invented values", compare: "" },
  ],
  tableNote: "Lab reports: 60 held-out pages, identical inputs for every model.",
  columns: ["Model", "Abnormal caught", "Flags correct", "Invented values", "Cost / page", "Time / page"],
  rows: [
    { model: "Prognova v1 (4B)", us: true, cells: ["100%", "99.1%", "0%", "$0.014", "23 s"] },
    { model: "Claude Opus 5.5 (high)", us: false, cells: ["94.4%", "85.7%", "0%", "$0.018", "5 s"] },
    { model: "GPT-6.1 Sol (high)", us: false, cells: ["94.4%", "85.7%", "0%", "$0.005", "4 s"] },
    { model: "Base MedGemma", us: false, cells: ["47%", "68%", "28%", "—", "—"] },
  ],
  dash: "— not supplied.",
  honest: {
    title: "Read it honestly.",
    points: [
      "GPT-6.1 Sol is faster and cheaper per page. Our advantage is precision and grounding, not raw speed.",
      "Counts are small, and we say so. Confidence intervals come with the next release.",
      "Lab reports are the first report type. Imaging, prescriptions and clinical notes are benchmarked next.",
    ],
  },
}

export const traction = {
  title: "The data is flowing.",
  stats: [
    { value: 25003, label: "lab visits processed through the evidence pipeline" },
    { value: 481, label: "automated tests, across ~12,000 lines of Python" },
  ],
  note: "Pre-revenue by design; first paid pilots planned for 2027.",
}

export const landscape = {
  titleA: "Everyone knows medicine.",
  titleB: "Nobody knows the patient.",
  text: "OpenEvidence knows the medical literature. Prognova knows the patient.",
  caption: "Five approaches to clinical AI: what each knows, what it is grounded in, and where it stops.",
  rows: [
    {
      name: "OpenEvidence",
      sub: "$12B valuation",
      knows: "The medical literature",
      grounded: "Citations to papers",
      stops: "What the literature says about a condition, not what this patient's record says.",
      us: false,
    },
    {
      name: "General models",
      sub: "OpenAI, Anthropic, Google",
      knows: "The internet",
      grounded: "None by default",
      stops:
        "Fluent and unverifiable at the bedside. On held-out lab reports, Claude Opus 5.5 and GPT-6.1 Sol at high effort: 85.7% of flags correct, against 99.1% for Prognova v1.",
      us: false,
    },
    {
      name: "Ambient scribes",
      sub: "Abridge, Nuance",
      knows: "Conversations",
      grounded: "The visit transcript",
      stops: "What was said in one visit. No memory of the record across visits and hospitals.",
      us: false,
    },
    {
      name: "EHR vendors",
      sub: "Epic, Oracle",
      knows: "Their own records",
      grounded: "Varies; US-centric",
      stops: "One vendor's system and one market. No presence in Indian private hospitals.",
      us: false,
    },
    {
      name: "Prognova",
      sub: "MedGemma 1.5 · 4B",
      knows: "The patient: verified hospital and lab records",
      grounded: "The exact line in the record",
      stops: "At the edge of the record. If it cannot point to the line, it says nothing.",
      us: true,
    },
  ],
  closing:
    "Every row above knows medicine. None of them is trained on the patient in the room. The real threat is an EHR vendor or a frontier lab going on-premise; by then we want the records in our corpus, the doctors' corrections in our training set, and the model inside the instruments.",
}

export const moat = {
  titleA: "You can download a model.",
  titleB: "You cannot replicate the training corpus.",
  text: "The code is not the moat. Three things are.",
  items: [
    {
      n: "01",
      tag: "The corpus",
      title: "A corpus nobody else has.",
      text: "Verified clinical records from partner labs, every case that comes through the referral network, and every correction a doctor makes: labelled, patient-level data that cannot be scraped from the internet or bought from a vendor.",
    },
    {
      n: "02",
      tag: "Ground truth",
      title: "Compounding ground truth.",
      text: "Every answer a doctor confirms becomes ground truth. Each release retrains on the best open base model, so Prognova gains from base-model progress instead of competing with it.",
    },
    {
      n: "03",
      tag: "Trust",
      title: "Trust that ships inside devices.",
      text: "Doctors accept AI they can check. Only a model that refuses to guess is safe to run inside an instrument or a care robot.",
    },
  ],
  closing: "Each of these is work a competitor must repeat, hospital by hospital.",
}

export const plan = {
  title: "Eighteen months, three gates.",
  text: "From reading the record to reasoning on it. Each phase ends on a gate.",
  phases: [
    {
      phase: "Phase 1",
      months: "Months 0–6",
      title: "Prove reading",
      milestones: ["Benchmark imaging, prescriptions and notes.", "Build a non-Indian test set."],
      gate: "Reading accuracy with confidence intervals; first hospital records in the corpus.",
    },
    {
      phase: "Phase 2",
      months: "Months 6–12",
      title: "Patient record",
      milestones: [
        "Every report type in one longitudinal record.",
        "Pilots in partner hospitals.",
        "First instrument integration.",
      ],
      gate: "Doctors use it weekly in a pilot hospital.",
    },
    {
      phase: "Phase 3",
      months: "Months 12–18",
      title: "Clinical reasoning",
      milestones: ["Doctor-in-the-loop reasoning.", "Clinician-led validation.", "First paid contracts.", "First edge model."],
      gate: "Paid pilot converted; Series A metrics.",
    },
  ],
}

export const risks = {
  titleA: "What could kill us,",
  titleB: "and what we do about it.",
  items: [
    {
      risk: "Clinical error.",
      text: "A wrong answer in front of a doctor can harm a patient.",
      response:
        "Every answer cites the line it came from and a doctor signs off. Reasoning stays off until it is validated, and each report type passes its own release gate.",
    },
    {
      risk: "Small evidence base.",
      text: "The lab-report comparison rests on 60 held-out pages. Counts are small, and there are no confidence intervals yet.",
      response:
        "The first phase of the plan, Prove reading (months 0–6), exists to fix this. Confidence intervals come with the next release.",
    },
    {
      risk: "Data access.",
      text: "Today's corpus is lab data. The full patient record sits inside hospitals and does not leave them.",
      response:
        "Growing the corpus to full hospital records is the first priority, and the verified doctor-feedback loop is the durable defence.",
    },
    {
      risk: "Base-model dependence.",
      text: "Prognova fine-tunes Google's MedGemma, so the base model's licence is not ours to set.",
      response: "A licence change would cost a retrain on another open base model, which our pipeline is built to do.",
    },
    {
      risk: "Regulation.",
      text: "Prognova has no regulatory clearance. Classification as software as a medical device is likely once reasoning ships.",
      response:
        "Cited evidence and doctor sign-off are designed to keep Prognova an assistive, decision-support tool under India's current rules. The classification work is budgeted.",
    },
  ],
}

export const closing = {
  title: ["Clinical AI will be judged", "on what it can prove,", "not what it can say."],
  raising: "We are raising.",
  contactLabel: "Contact",
}
