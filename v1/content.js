/* ==========================================================================
   CONTENT — edit everything about you here. No other file needs to change.
   Anything marked [EDIT] is placeholder text.
   ========================================================================== */

window.SITE = {
  name: { first: "Aiden", last: "Zhu" },
  initials: "AZ",
  email: "you@example.com",                     // [EDIT]
  location: "Your City, ST",                    // [EDIT]
  timezone: "America/New_York",                 // [EDIT] IANA name, drives the live clock
  classOf: "2027",                              // [EDIT]

  // The big hero sentence. The word in {curly braces} cycles through `roles`.
  heroLine: "Hi, I'm Aiden — a {role} who likes building things that make people go “wait, how?”",
  roles: ["builder", "student", "tinkerer", "problem-solver", "storyteller"],   // [EDIT]

  // Curved “hello” ribbon
  hellos: ["hello", "你好", "hola", "bonjour", "こんにちは", "ciao", "안녕", "hallo", "olá", "привет", "salaam", "namaste"],

  // About — revealed word by word on scroll. Wrap words in *asterisks* to accent them.
  about:
    "I'm a high-school senior who can't leave a problem alone. I spend my time *building robots*, " +
    "*writing code* that solves small annoying problems, and figuring out how things work by taking them apart. " +
    "I care about *making things that are useful to real people* — and I'm happiest when a project " +
    "drags me into a subject I knew nothing about a week ago.",           // [EDIT]

  stats: [                                                               // [EDIT]
    { value: 4,   suffix: "",  label: "years of robotics" },
    { value: 12,  suffix: "+", label: "projects shipped" },
    { value: 300, suffix: "+", label: "volunteer hours" },
  ],

  // Selected work — the big hover list. `color` tints the hover preview card.
  // Optional: image: "assets/my-project.jpg" to show a real screenshot/photo instead.
  projects: [                                                            // [EDIT]
    {
      title: "Project One",
      tag: "Engineering",
      year: "2026",
      color: "#ff5b1f",
      summary: "One-sentence hook: what it is and why it matters.",
      details: "Two to four sentences on the problem, what you actually did, what was hard, and what happened. Numbers help — users, hours, results.",
      link: "",
    },
    {
      title: "Project Two",
      tag: "Research",
      year: "2025",
      color: "#2f4bff",
      summary: "One-sentence hook: what it is and why it matters.",
      details: "Describe your role, the process, and the outcome. Admissions readers love seeing initiative and what you learned.",
      link: "",
    },
    {
      title: "Project Three",
      tag: "Community",
      year: "2025",
      color: "#14a37f",
      summary: "One-sentence hook: what it is and why it matters.",
      details: "Something you started or led. Who did it help? How many people? What would you do differently?",
      link: "",
    },
    {
      title: "Project Four",
      tag: "Creative",
      year: "2024",
      color: "#c13cff",
      summary: "One-sentence hook: what it is and why it matters.",
      details: "A creative or personal project — art, music, film, writing. This is where personality shows.",
      link: "",
    },
  ],

  // The record — mirrors your Common App activities list.
  // category must be one of: Academics, Leadership, Service, Arts, Athletics, Work
  timeline: [                                                            // [EDIT]
    { years: "2023 — Now", title: "Robotics Team · Captain",       category: "Leadership", text: "Led a 20-person team; designed drivetrain; regional finalist." },
    { years: "2024 — Now", title: "Founder, Coding Club",          category: "Leadership", text: "Started a weekly club teaching Python to 40+ underclassmen." },
    { years: "2025",       title: "Summer Research Program",       category: "Academics",  text: "Worked with a university lab on a data-analysis project." },
    { years: "2022 — Now", title: "Library Tutor",                 category: "Service",    text: "Tutored middle schoolers in math, ~3 hrs/week." },
    { years: "2021 — Now", title: "Varsity Cross Country",         category: "Athletics",  text: "Four-year runner; team captain senior year." },
    { years: "2024 — Now", title: "Part-time Job",                 category: "Work",       text: "Customer-facing role, 10 hrs/week during the school year." },
    { years: "2020 — Now", title: "Piano",                         category: "Arts",       text: "Self-taught to grade 8; play at local senior center monthly." },
  ],

  // Scrolling marquee of honors
  awards: [                                                              // [EDIT]
    "National Merit Semifinalist",
    "AP Scholar with Distinction",
    "Regional Robotics Finalist",
    "State Science Fair — 2nd Place",
    "USACO Silver",
    "President's Volunteer Service Award",
  ],

  // Draggable sticker wall — little things that make you, you.
  // `emoji` is the sticker face; `label` sits under it.
  stickers: [                                                            // [EDIT]
    { emoji: "🍜", label: "ranks every ramen spot in town" },
    { emoji: "📷", label: "film photography" },
    { emoji: "🎹", label: "plays piano at 1am" },
    { emoji: "🧩", label: "speed-cubes (PB 14.2s)" },
    { emoji: "🏃", label: "long runs = thinking time" },
    { emoji: "🛠️", label: "fixes broken things" },
  ],

  currently: [                                                           // [EDIT]
    { k: "Reading",   v: "A book you're into" },
    { k: "Listening", v: "An album on repeat" },
    { k: "Learning",  v: "Something new" },
    { k: "Building",  v: "This website :)" },
  ],

  socials: [                                                             // [EDIT] remove any you don't use
    { label: "GitHub",   url: "https://github.com/" },
    { label: "LinkedIn", url: "https://linkedin.com/" },
    { label: "Resume",   url: "#" },
  ],

  version: "1.0.0",
};
