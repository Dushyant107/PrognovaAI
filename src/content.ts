export type StageId = "reports" | "call" | "stay" | "visa" | "treatment" | "home"
export type StageState = "empty" | "planned" | "requested" | "confirmed"
export type RailState = Record<StageId, StageState>

export const stageOrder: StageId[] = ["reports", "call", "stay", "visa", "treatment", "home"]

export const emptyRail: RailState = {
  reports: "empty",
  call: "empty",
  stay: "empty",
  visa: "empty",
  treatment: "empty",
  home: "empty",
}

export const stages: {
  id: StageId
  short: string
  title: string
  text: string
  loop: string
  artefact: Artefact
}[] = [
  {
    id: "reports",
    short: "Reports",
    title: "Share your reports",
    text: "Upload what you already have. The assistant lists what is missing and what a hospital will ask for next.",
    loop: "A coordinator reviews every upload",
    artefact: {
      kind: "list",
      title: "Your reports",
      rows: [
        ["Knee X-ray, both sides", "received"],
        ["MRI report, March", "received"],
        ["Blood panel", "missing"],
        ["GP referral letter", "optional"],
      ],
    },
  },
  {
    id: "call",
    short: "Call",
    title: "Book a free call",
    text: "The assistant finds a slot with a coordinator and sends a short agenda built from your questions.",
    loop: "Coordinator takes the call",
    artefact: {
      kind: "slot",
      title: "Planning call",
      rows: [
        ["Thursday 14 November", "10:30 GMT"],
        ["With", "Priya, coordinator"],
        ["Cost", "£0"],
      ],
    },
  },
  {
    id: "stay",
    short: "Stay",
    title: "Choose your stay",
    text: "Three stays near your hospital, side by side, with a companion room and airport transfers if you want them.",
    loop: "Supplier confirms the room",
    artefact: {
      kind: "stays",
      title: "Stays near Apollo, Chennai",
      rows: [
        ["Serviced apartment, 1.2 km", "£38 a night"],
        ["Hotel with lift and ramp, 0.8 km", "£52 a night"],
        ["Recovery guesthouse, 2 km", "£29 a night"],
      ],
    },
  },
  {
    id: "visa",
    short: "Visa letter",
    title: "Your visa letter",
    text: "Once the hospital accepts your case, the assistant requests its invitation letter and tracks it until it is in your workspace.",
    loop: "The hospital issues the letter",
    artefact: {
      kind: "status",
      title: "Visa invitation letter",
      rows: [
        ["Case accepted by hospital", "confirmed"],
        ["Letter requested", "requested"],
        ["Letter in your workspace", "planned"],
      ],
    },
  },
  {
    id: "treatment",
    short: "Treatment",
    title: "During your stay",
    text: "Appointments, transfers and coordinator notes in one place, updated as the hospital updates them.",
    loop: "Your doctor makes every clinical decision",
    artefact: {
      kind: "list",
      title: "This week",
      rows: [
        ["Pre-op assessment", "Mon 09:00"],
        ["Surgery", "Wed 07:30"],
        ["Physio, first session", "Fri 11:00"],
        ["Transfer to hotel", "Fri 16:00"],
      ],
    },
  },
  {
    id: "home",
    short: "Home",
    title: "Back home",
    text: "Discharge papers, return flights and the follow-up tasks from your provider stay in reach after you land.",
    loop: "Coordinator checks in at two weeks",
    artefact: {
      kind: "list",
      title: "Follow-up",
      rows: [
        ["Discharge summary", "saved"],
        ["Physio plan, 6 weeks", "saved"],
        ["Review call with surgeon", "planned"],
      ],
    },
  },
]

export type Artefact = {
  kind: "list" | "slot" | "stays" | "status" | "price"
  title: string
  rows: [string, string][]
}

export type Country = "UK" | "US" | "UAE"

export const countries: Record<Country, { label: string; currency: string; home: string }> = {
  UK: { label: "United Kingdom", currency: "GBP", home: "UK price" },
  US: { label: "United States", currency: "USD", home: "US price" },
  UAE: { label: "United Arab Emirates", currency: "AED", home: "UAE price" },
}

export const prices: { treatment: string; home: Record<Country, number>; india: Record<Country, number> }[] = [
  { treatment: "Hip replacement (one side)", home: { UK: 17000, US: 40000, UAE: 95000 }, india: { UK: 5000, US: 6500, UAE: 23500 } },
  { treatment: "Knee replacement (one side)", home: { UK: 16000, US: 35000, UAE: 88000 }, india: { UK: 5000, US: 6500, UAE: 23500 } },
  { treatment: "3 dental implants with crowns", home: { UK: 9000, US: 12000, UAE: 30000 }, india: { UK: 3000, US: 3900, UAE: 14000 } },
  { treatment: "IVF cycle with donor eggs", home: { UK: 9000, US: 25000, UAE: 45000 }, india: { UK: 4500, US: 5800, UAE: 21000 } },
  { treatment: "Full-body health check", home: { UK: 8000, US: 5000, UAE: 12000 }, india: { UK: 2000, US: 2600, UAE: 9400 } },
]

export function formatMoney(value: number, country: Country) {
  const { currency } = countries[country]
  return new Intl.NumberFormat(country === "US" ? "en-US" : "en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export const treatments = [
  {
    title: "IVF and fertility",
    text: "Treatment cycles, tests and how long to stay.",
    question: "Have you had a cycle before, and do you have your hormone results to hand?",
  },
  {
    title: "Cancer care",
    text: "Second opinions, surgery and treatment plans.",
    question: "Do you have a current staging report, or should we start with a second opinion?",
  },
  {
    title: "Dental care",
    text: "Implants, crowns and how many visits you need.",
    question: "How many teeth are involved, and can you stay for two visits a few months apart?",
  },
  {
    title: "Orthopaedics",
    text: "Hip and knee replacement and the recovery after.",
    question: "Which joint, and roughly when could you travel for about three weeks?",
  },
]

export const faqs = [
  {
    q: "Is the assistant a doctor?",
    a: "No. It plans the practical side of your trip: options, prices, stays, transfers and paperwork. Every clinical decision is made by the treating doctor, and the assistant will say so if you ask it a medical question.",
  },
  {
    q: "What is the free planning call?",
    a: "A call with a coordinator to work through dates, accommodation and transfers. There is no charge and no commitment. The assistant prepares an agenda from what you have told it.",
  },
  {
    q: "Are these prices final treatment quotes?",
    a: "No. They are starting prices from partner hospitals. The final cost depends on the treatment plan your doctor agrees with you, and you see it before you book anything.",
  },
  {
    q: "Can I book my own flights or accommodation?",
    a: "Yes. Every service is optional. Keep only what you want the assistant and coordinator to arrange.",
  },
  {
    q: "What happens to my reports?",
    a: "They stay in your private workspace. A coordinator reviews them, and nothing is shared with a hospital until you say so.",
  },
  {
    q: "What does planned, requested and confirmed mean?",
    a: "Planned is something in your plan that nobody has booked yet. Requested means a supplier or hospital has been asked. Confirmed means they have said yes and you have it in writing.",
  },
]

export type Turn = {
  role: "you" | "assistant"
  text: string
  artefact?: Artefact
  rail?: Partial<RailState>
  handoff?: boolean
}

export const demoScript: Turn[] = [
  {
    role: "you",
    text: "I need a knee replacement. I'm in Leeds and could travel in late January.",
  },
  {
    role: "assistant",
    text: "Thanks. Here is a first look. Knee replacement in India starts from £5,000 at Prognova partner hospitals, against a typical £16,000 self-pay price in the UK. Late January works for a three-week stay. If you share your X-ray and MRI report, I can ask a hospital to review your case.",
    artefact: {
      kind: "price",
      title: "Knee replacement (one side)",
      rows: [
        ["UK self-pay", "£16,000"],
        ["India with Prognova", "from £5,000"],
      ],
    },
    rail: { reports: "planned" },
  },
  {
    role: "you",
    text: "Where would I stay? My wife is coming with me.",
  },
  {
    role: "assistant",
    text: "Here are three stays within two kilometres of the hospital, all with a second bed and step-free access. I have added airport transfers for both of you. A coordinator confirms availability before anything is booked.",
    artefact: {
      kind: "stays",
      title: "Stays near the hospital",
      rows: [
        ["Serviced apartment, 1.2 km", "£38 a night"],
        ["Hotel with lift and ramp, 0.8 km", "£52 a night"],
        ["Recovery guesthouse, 2 km", "£29 a night"],
      ],
    },
    rail: { stay: "planned" },
  },
  {
    role: "you",
    text: "Do I need a visa?",
  },
  {
    role: "assistant",
    text: "Yes, a medical visa. Once the hospital accepts your case, I ask it for an invitation letter and keep it in your workspace. You apply for the visa yourself with that letter. I have marked it as requested so you can see where it is.",
    artefact: {
      kind: "status",
      title: "Visa invitation letter",
      rows: [
        ["Case accepted by hospital", "planned"],
        ["Letter requested", "requested"],
      ],
    },
    rail: { visa: "requested" },
  },
  {
    role: "you",
    text: "Is this the right operation for me?",
  },
  {
    role: "assistant",
    text: "That is a question for your doctor, not for me. I can set up a free call with a coordinator who will arrange a conversation with an orthopaedic surgeon. I have held a slot for Thursday.",
    artefact: {
      kind: "slot",
      title: "Planning call",
      rows: [
        ["Thursday 14 November", "10:30 GMT"],
        ["With", "Priya, coordinator"],
        ["Cost", "£0"],
      ],
    },
    rail: { call: "confirmed" },
    handoff: true,
  },
]

export type Intent = {
  match: RegExp
  reply: Turn
}

export const intents: Intent[] = [
  {
    match: /should i|is it safe|which treatment|right for me|do i need surgery|diagnos/i,
    reply: {
      role: "assistant",
      text: "That is a clinical question, so it is for your doctor. I can arrange a conversation with a specialist through a coordinator on the free call.",
      rail: { call: "planned" },
      handoff: true,
    },
  },
  {
    match: /visa|letter|invitation/i,
    reply: {
      role: "assistant",
      text: "You will need a medical visa. Once a hospital accepts your case, I request its invitation letter and keep it in your workspace. You apply with that letter.",
      artefact: {
        kind: "status",
        title: "Visa invitation letter",
        rows: [
          ["Case accepted by hospital", "planned"],
          ["Letter requested", "planned"],
        ],
      },
      rail: { visa: "planned" },
    },
  },
  {
    match: /hotel|stay|apartment|accommodation|room|where would i|where do i/i,
    reply: {
      role: "assistant",
      text: "I shortlist stays close to the hospital with step-free access and a second bed if someone is coming with you. A coordinator confirms the room before you pay.",
      artefact: {
        kind: "stays",
        title: "Stays near the hospital",
        rows: [
          ["Serviced apartment, 1.2 km", "£38 a night"],
          ["Hotel with lift and ramp, 0.8 km", "£52 a night"],
          ["Recovery guesthouse, 2 km", "£29 a night"],
        ],
      },
      rail: { stay: "planned" },
    },
  },
  {
    match: /interpret|language|translat|speak/i,
    reply: {
      role: "assistant",
      text: "An interpreter can join your appointments and calls. Tell me the language and I will add it to the plan; a coordinator confirms who it will be.",
      rail: { treatment: "planned" },
    },
  },
  {
    match: /transfer|airport|pick ?up|taxi|drive/i,
    reply: {
      role: "assistant",
      text: "Someone meets you at the airport, and rides between hotel, clinic and airport are arranged around your appointments. They are optional and listed apart from treatment costs.",
      rail: { stay: "planned" },
    },
  },
  {
    match: /follow.?up|after|home|discharge|recover/i,
    reply: {
      role: "assistant",
      text: "Discharge papers, your physio plan and any review calls stay in your workspace after you fly home. A coordinator checks in at two weeks.",
      rail: { home: "planned" },
    },
  },
  {
    match: /price|cost|how much|cheap|expensive|pay|£|\$/i,
    reply: {
      role: "assistant",
      text: "Treatment costs and travel costs are listed apart. Prognova prices are starting prices; the final cost depends on the plan your doctor agrees with you. The table lower on this page compares typical home prices with India.",
      artefact: {
        kind: "price",
        title: "Knee replacement (one side)",
        rows: [
          ["UK self-pay", "£16,000"],
          ["India with Prognova", "from £5,000"],
        ],
      },
    },
  },
  {
    match: /report|x-?ray|mri|scan|upload|document/i,
    reply: {
      role: "assistant",
      text: "Upload whatever you have to your private workspace. I list what is missing, and a coordinator reviews it before anything is sent to a hospital.",
      rail: { reports: "planned" },
    },
  },
  {
    match: /call|talk|speak to someone|coordinator|human/i,
    reply: {
      role: "assistant",
      text: "The first planning call is free. I can hold a slot with a coordinator and send over an agenda built from what you have told me.",
      rail: { call: "planned" },
    },
  },
  {
    match: /knee|hip|ortho|joint/i,
    reply: {
      role: "assistant",
      text: "Hip and knee replacements are the most common trips we plan. Expect about three weeks in India including early physio. Which joint, and roughly when could you travel?",
      rail: { reports: "planned" },
    },
  },
  {
    match: /ivf|fertility|egg|embryo/i,
    reply: {
      role: "assistant",
      text: "IVF trips usually mean two visits or one longer stay. If you have hormone results from a previous cycle, upload them and a coordinator will ask a clinic how long you would need to stay.",
      rail: { reports: "planned" },
    },
  },
  {
    match: /dental|tooth|teeth|implant|crown/i,
    reply: {
      role: "assistant",
      text: "Implants usually take two visits a few months apart. Tell me how many teeth are involved and I will plan both trips side by side.",
      rail: { reports: "planned" },
    },
  },
  {
    match: /cancer|oncolog|tumou?r|chemo/i,
    reply: {
      role: "assistant",
      text: "Many people start with a second opinion from an oncologist before deciding to travel. Upload your current staging report and a coordinator will arrange that conversation.",
      rail: { reports: "planned" },
    },
  },
]

export const fallbackReply: Turn = {
  role: "assistant",
  text: "I can plan stays, transfers, prices and visa letters. For that one, a coordinator will reply on the free planning call.",
  rail: { call: "planned" },
  handoff: true,
}
