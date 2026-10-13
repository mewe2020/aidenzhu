/* ==========================================================================
   CONTENT — everything about you lives here.
   Lines marked [CHECK] are things I inferred from your files. Confirm or fix them.

   Most cards use a "banner": an illustration + tag + title.
     banner   { kind: "banner", illus: "<name from illustrations.js>", bg, fg, tag, title }
     banner   { kind: "banner", shot: "assets/screenshot.jpg", bg, fg, tag, title }   ← screenshot version
   Other card kinds still work too:
     logo / chart / receipt / stat / paper / badge / ticket / image
   ========================================================================== */

// Shared banners (used in more than one place)
const B = {
  paintball: { kind: "banner", illus: "paintball", bg: "#ff5a1f", fg: "#fff7e8", tag: "$35K+ Revenue",      title: "Sporting Goods Business" },
  watts:     { kind: "banner", illus: "wattsowed", bg: "#ffd23f", fg: "#1b1b1b", tag: "Research Project",   title: "WattsOwed" },
  amazon:    { kind: "banner", illus: "amazon",    bg: "#1d2b3a", fg: "#ffffff", tag: "1,000+ Units Sold",  title: "Amazon Store" },
  quant:     { kind: "banner", illus: "quantbot",  bg: "#1f3dff", fg: "#ffffff", tag: "Trading Algorithms", title: "Quant Bot" },
  finplan:   { kind: "banner", illus: "portfolio", bg: "#0fb39a", fg: "#ffffff", tag: "Internship",         title: "Financial Planner" },
  meals:     { kind: "banner", illus: "meals",     bg: "#14a37f", fg: "#ffffff", tag: "200+ meals",         title: "Shelter Meals" },
  redtide:   { kind: "banner", illus: "redtide",   bg: "#0f2a4a", fg: "#ffffff", tag: "Conrad Innovator",   title: "Red Tide" },
  bots:      { kind: "banner", illus: "bots",      bg: "#111111", fg: "#4dff88", tag: "3 bots",             title: "Trading Bots" },
};

// Longer write-ups for the two bots (shown in their pop-ups)
const QUANT_BODY = [
  "The bot tracks 16 major tech stocks, including Nvidia and Tesla, checking each one every minute while the market is open. But before looking at individual stocks, it first tries to understand what's happening in the broader market. It checks the VIX, which measures how nervous investors are, and compares how many stocks are rising versus falling. Based on that information, it identifies one of ten market conditions, ranging from a strong uptrend to a more unpredictable day.",
  "Once it understands the market, the bot runs seven different trading strategies on each stock. For example, one looks for stocks breaking above their highest price in the first 15 minutes of trading, while another looks for stocks that have fallen unusually far and might be due for a rebound. Whenever a strategy finds a possible trade, the bot gives it a score from 0 to 100.",
  "I spent most of my time working on that scoring system. The actual chart pattern makes up 30% of the score, while the overall market conditions account for another 20%. The remaining points depend on factors like trading volume and recent news. I wanted the bot to recognize that even if a stock looks promising on its own, it might not be a great trade if the rest of the market is struggling.",
  "I also built in rules to keep it from taking unnecessary risks. If a trade scores 85 or higher, the bot can execute it automatically. If it scores between 70 and 85, it sends me an alert so I can decide whether to take it. Each trade can risk no more than 1% of the account, and the bot can only hold three stocks at a time. If the account loses 2% in a single day, it stops trading until the next morning. Every trade also has a stop loss and profit target set before it begins.",
  "I've been paper trading with it for about five months now, and so far, its performance has ranged from matching the S&P 500 to beating it by around 1%. It's not a huge difference, and five months isn't enough to know how well it'll perform over time, but I've enjoyed seeing how the decisions I make in the code affect its results. I'm still experimenting with the scoring system and making changes as I figure out what works and what doesn't.",
];

const COPY_BODY = [
  "Members of Congress have to publicly report their stock trades within 45 days. I wanted to know if a regular investor could just copy those trades and do well. I picked Rep. Ro Khanna because he reports a lot of trades, so the bot would always have something to follow.",
  "Twice every market day, at 10 AM and 2 PM, the bot checks a public site that lists his disclosures. When it finds a new buy, it buys 5 shares of the same stock in my paper account. When he sells, it sells the whole position. It keeps a list of every trade it has already copied so it never buys the same thing twice.",
  "The biggest thing I had to think about was the delay. By the time a trade becomes public it can be weeks old, so the bot is always a step behind him. I also chose to buy the same 5 shares every time instead of matching his dollar amounts. That keeps things simple, but it means his big and small trades count the same.",
  "Since it started copying his trades in May 2026, it has performed about on par with the S&P 500.",
];

window.SITE = {
  name: "Aiden Zhu",
  location: "Virginia Beach, Virginia",
  email: "aidenzhu29@gmail.com",
  photo: "assets/me.jpg",
  roles: ["Student,", "Entrepreneur &", "Developer"],

  // The four cards at the top (the last one sits on top, fully visible)
  heroCards: [B.watts, B.quant, B.amazon, B.paintball],

  /* ------------------------------------------------------------------------
     FEATURED WORK — the curved carousel
     ------------------------------------------------------------------------ */
  featured: [
    {
      label: "Sporting Goods Business", art: B.paintball,
      role: "Founder", years: "2023 to Present",
      summary: "I started customizing sporting goods in my free time and eventually turned it into a business that brought in over $35,000 in revenue. I managed everything from finding suppliers to fulfilling orders, learning a lot along the way.",
      body: [],
      metrics: [{ v: "$35K+", l: "in revenue" }],
    },
    {
      label: "WattsOwed", art: B.watts,
      role: "Founder & Developer", years: "2026 to Present",
      summary: "I became interested in Virginia's growing number of AI data centers and how their electricity use could affect local residents. After spending weeks researching the issue, I built WattsOwed to share what I found and help people better understand the costs.",
      body: [],
      metrics: [],
      link: "https://www.wattsowed.com", linkLabel: "Visit WattsOwed",
    },
    {
      label: "Trading Bots", art: B.bots,
      role: "Developer", years: "2026 to Present",
      summary: "I built three automated trading bots to test different investing strategies. They run during market days using simulated money, allowing me to see how my ideas perform without risking real money.",
      body: [],
      metrics: [{ v: "3", l: "trading bots" }],
    },
    {
      label: "Amazon Store", art: B.amazon,
      role: "Founder", years: "2024 to Present",
      summary: "I started an Amazon store selling products ranging from dog toys to kitchenware. I've sold over 1,000 units and learned how to manage an online business, from finding products to handling advertising.",
      body: [],
      metrics: [{ v: "1,000+", l: "units sold" }],
      link: "https://www.amazon.com/dp/B0DMGLP88T", linkLabel: "See One of My Products",
    },
    {
      label: "Quant Trading Bot", art: B.quant,
      role: "Developer", years: "2026",
      summary: "I worked with AI and other resources to build a simple quant bot that paper trades. It scores potential trades from 0 to 100 using seven strategies. Over five months, it performed on par with the S&P 500 or beat it by up to 1%.",
      body: QUANT_BODY,
      metrics: [{ v: "Up to +1%", l: "vs. the S&P 500 over 5 months" }, { v: "7", l: "strategies" }, { v: "85+", l: "score to trade" }, { v: "1%", l: "max risk per trade" }],
    },
    {
      label: "Financial Planning App", art: B.finplan,
      role: "Intern & Developer", years: "2026 to Present",
      // [CHECK] add what the app does and what you worked on
      summary: "During my internship with Austin Frangoules, I am helping to develop a financial planning app while learning how software can help manage everyday business tasks.",
      body: [],
      metrics: [],
    },
    {
      label: "Shelter Meals", art: B.meals,
      role: "Organizer", years: "",                   // [CHECK] add years
      summary: "I used some of my business earnings to buy ingredients and helped organize volunteers to prepare over 200 meals for local shelters. Cooking has been part of my life for years, and I wanted to use something I enjoyed to help others.",
      body: [],
      metrics: [{ v: "200+", l: "meals prepared" }],
    },
    {
      label: "Red Tide Project", art: B.redtide,
      role: "Conrad Challenge Team Member", years: "",   // [CHECK] add year
      summary: "My team worked on a project using drones and AI to help detect harmful red tides before they spread. We researched how the technology could work and developed our idea for the Conrad Challenge, earning Conrad Innovator recognition.",
      body: [],
      metrics: [{ v: "Conrad", l: "Innovator" }],
    },
  ],

  /* ------------------------------------------------------------------------
     SHOWCASES — the big framed panels under Featured Work
     mock kinds: duo · copybot · scene · terminal · browser · dashboard · slides · phone
     ------------------------------------------------------------------------ */
  cases: [
    {
      title: "WattsOwed", org: "", year: "", color: "#ffb020",
      line: "Exploring how Virginia's AI data centers could affect local electricity bills.",
      mock: { kind: "duo", url: "wattsowed.com", front: "assets/wattsowed.jpg", back: "assets/wattsowed2.jpg" },
      role: "Founder & Developer", years: "2026 to Present",
      summary: "I started WattsOwed after becoming interested in how quickly AI data centers were expanding across Virginia. I wanted to understand how their growing electricity needs could affect local residents, so I spent weeks researching energy costs and state policies. I then built a website to organize my findings and make the information easier for others to understand.",
      body: [],
      metrics: [],
      link: "https://www.wattsowed.com", linkLabel: "Visit WattsOwed",
    },
    {
      title: "Amazon Store", org: "", year: "", color: "#1d2b3a",
      line: "My experience building an Amazon business and selling over 1,000 units.",
      mock: { kind: "scene", illus: "amazonScene" },
      role: "Founder", years: "2024 to Present",
      summary: "I started my Amazon store with a dog toy and later expanded into kitchen products. I learned how to research products and work with suppliers while managing the store myself. I've sold over 1,000 units and continue to explore different products and ways to improve the business.",
      body: [],
      metrics: [{ v: "1,000+", l: "units sold" }],
      link: "https://www.amazon.com/dp/B0DMGLP88T", linkLabel: "See One of My Products",
    },
    {
      title: "Sporting Goods Business", org: "", year: "", color: "#ff5a1f",
      line: "A small project that grew into a business generating over $35,000 in revenue.",
      mock: { kind: "scene", illus: "paintballScene" },
      role: "Founder", years: "2023 to Present",
      summary: "I began customizing sporting goods in my free time and selling them online. As more orders came in, I started working with suppliers and managing inventory. The business eventually generated over $35,000 in revenue. I also faced challenges with tariffs and customs, which first got me interested in how economic policies affect small businesses.",
      body: [],
      metrics: [{ v: "$35K+", l: "in revenue" }],
    },
    {
      title: "Congressional Trade Tracker", org: "", year: "", color: "#7b3cff",
      line: "A bot that copies congressional trades. Over five months it performed on par with the S&P 500.",
      mock: { kind: "copybot", url: "khanna-bot · paper account", who: "Rep. Ro Khanna", perf: "On par",
              trades: [["AMRZ", "Amrize", "May 21"], ["ALLY", "Ally Financial", "May 15"], ["CVNA", "Carvana", "May 1"], ["DXCM", "Dexcom", "May 1"], ["DHI", "D.R. Horton", "May 1"]] },   // real trades from khanna_state.json
      role: "Developer", years: "2026 to Present",
      summary: "I worked with AI and other resources to build a simple tracker that follows Rep. Ro Khanna's publicly reported stock trades and copies them in a paper trading account. I wanted to see if following congressional disclosures could keep up with the market. Over five months, it performed on par with the S&P 500.",
      body: COPY_BODY,
      metrics: [{ v: "On par", l: "with the S&P 500 over 5 months" }, { v: "2×", l: "checks daily" }, { v: "5", l: "shares per copied buy" }],
    },
    {
      title: "Quant Trading Bot", org: "", year: "", color: "#1f3dff",
      line: "A simple quant bot I built. Over five months it kept pace with the S&P 500 or beat it by up to 1%.",
      mock: { kind: "scene", illus: "quantScene" },
      role: "Developer", years: "2026",
      summary: "I worked with AI and other resources to build a simple quant bot that paper trades. It studies market data and scores potential trades from 0 to 100 using seven strategies. Over five months, it performed on par with the S&P 500 or beat it by up to 1%, which makes it one of my most successful projects.",
      body: QUANT_BODY,
      metrics: [{ v: "Up to +1%", l: "vs. the S&P 500 over 5 months" }, { v: "7", l: "strategies" }, { v: "85+", l: "score to trade" }, { v: "1%", l: "max risk per trade" }],
    },
    {
      title: "Financial Planning App", org: "", year: "", color: "#0fb39a",
      line: "A financial planning tool I am helping to develop during my real estate internship.",
      mock: { kind: "phone", app: "Financial Plan", balance: "On track",
              rows: [["Budget", "Set"], ["Savings goals", "Tracked"], ["Retirement", "Planned"]] },   // [CHECK] match the real app
      role: "Intern & Developer", years: "2026 to Present",
      // [CHECK] add what the app does and what you worked on
      summary: "During my internship with Austin Frangoules, I am helping to develop a financial planning app and gaining experience with how software can make managing finances and business operations more efficient.",
      body: [],
      metrics: [],
    },
  ],

  /* ------------------------------------------------------------------------
     MORE WORK — grid of smaller things
     ------------------------------------------------------------------------ */
  more: [
    { title: "Cooking Channel", art: { kind: "banner", illus: "cooking", bg: "#ff4f7b", fg: "#fff", tag: "TikTok", title: "Cooking Channel" },
      summary: "I shared simple and affordable recipes on TikTok, including meals I regularly cook at home.",
      body: [] },
    { title: "SAT Practice Site", art: { kind: "banner", shot: "assets/sat.jpg", bg: "#7b61ff", fg: "#fff", tag: "Study tool", title: "SAT Hard-Tier" },
      summary: "I built an SAT practice website focused on difficult questions. It tracks my mistakes so I can return to the areas I need to improve.",
      body: [] },
    { title: "ACT Practice Test", art: { kind: "banner", shot: "assets/act-sim.jpg", bg: "#0b2545", fg: "#fff", tag: "Study tool", title: "ACT Simulator" },
      summary: "I created a full ACT practice test with timed sections and estimated scores to help make studying more convenient.",
      body: [] },
    { title: "Tesla Options Bot", art: { kind: "banner", illus: "wheel", bg: "#1f3dff", fg: "#fff", tag: "Options bot", title: "The Wheel" },
      summary: "I programmed a bot that tests a rules-based Tesla options strategy using simulated trades.",
      body: [] },
    { title: "$500 Portfolio", art: { kind: "banner", illus: "portfolio", bg: "#d7ff3a", fg: "#1b1b1b", tag: "vs. S&P 500", title: "$500 Portfolio" },
      summary: "I created a simulated $500 portfolio based on Rep. Ro Khanna's disclosed stock purchases to compare its performance against the S&P 500.",
      body: [] },
    { title: "Quant Research", art: { kind: "banner", illus: "quant", bg: "#f1ebe0", fg: "#1b1b1b", tag: "Research", title: "Quant Research" },
      summary: "I researched different trading strategies and used what I found to develop and improve my own algorithms.",
      body: [] },
    { title: "Trailing Stop Bot", art: { kind: "banner", illus: "trailing", bg: "#111111", fg: "#4dff88", tag: "Tesla bot", title: "Trailing Stop" },
      summary: "I built a bot that simulates buying Tesla shares and automatically selling when the price falls below a set threshold.",
      body: [] },
    { title: "The Easy Pot", art: { kind: "banner", illus: "easypot", bg: "#ff6b35", fg: "#fff7e8", tag: "Shopify store", title: "The Easy Pot" },
      summary: "I created a Shopify store selling small electric hot pots, combining my interest in cooking with e-commerce.",
      body: [] },
    { title: "DaySync AI", art: { kind: "banner", shot: "assets/calendar.jpg", bg: "#0fb39a", fg: "#fff", tag: "Calendar app", title: "DaySync AI" },
      summary: "I built an AI scheduling tool that organizes tasks around when someone is most productive during the day.",
      body: [] },
    { title: "Market News Scanner", art: { kind: "banner", illus: "news", bg: "#e6e0d4", fg: "#1b1b1b", tag: "Automation", title: "News Scanner" },
      summary: "I developed a tool that reads financial news and summarizes the events affecting the market.",
      body: [] },
    { title: "Rooftop Rush", art: { kind: "banner", illus: "rooftop", bg: "#6c4dff", fg: "#fff", tag: "Roblox game", title: "Rooftop Rush" },
      summary: "I designed a rooftop parkour game in Roblox and learned more about game development while building it.",
      body: [] },
  ],

  // "What I've done so far" — big count-up tiles under the hero
  stats: [
    { v: 35,   pre: "$", suf: "K+", l: "Revenue from my sporting goods business", bg: "#ff5a1f", fg: "#fff7e8", illus: "paintball" },
    { v: 1000, suf: "+",            l: "Units sold through my Amazon store",      bg: "#1d2b3a", fg: "#ffffff", illus: "amazon" },
    { v: 200,  suf: "+",            l: "Meals cooked for local shelters",         bg: "#14a37f", fg: "#ffffff", illus: "meals" },
    { v: 7,                         l: "Trading strategies tested by my quant bot", bg: "#1f3dff", fg: "#ffffff", illus: "quantbot" },
  ],

  // How I got here — the short story section
  story: {
    steps: [
      { h: "Started a business",         t: "I began customizing sporting goods and selling them online. Over time, it grew into a business generating more than $35,000.", illus: "paintball", bg: "#ff5a1f" },
      { h: "Used some of what I earned", t: "I put part of my business earnings toward preparing over 200 meals for local shelters.",                                         illus: "meals",     bg: "#14a37f" },
      { h: "Explored new interests",     t: "My experience running a business made me more interested in economics, which led me to research energy costs and experiment with trading algorithms.", illus: "wattsowed", bg: "#ffd23f" },
      { h: "What's next",                t: "I hope to study economics in college and continue working on projects that interest me.",                                       illus: "quant",     bg: "#f1ebe0" },
    ],
  },

  // About panel (round button, top-right)
  about: {
    photo: "assets/me.jpg",
    intro: "I'm a high school senior from Virginia Beach who enjoys building things, playing tennis, and cooking.",
    body: [
      "I've always been interested in business and technology. I started by selling customized sporting goods online and eventually began working on websites and coding projects of my own. Most of these projects began with something I wanted to learn more about, and I enjoy being able to turn those ideas into something I can work on and improve.",
      "Outside of my projects, I spend much of my time playing tennis and cooking for my family. I also enjoy learning about economics, especially how business decisions and government policies can affect people's everyday lives. I'm hoping to study economics in college while continuing to explore my interests.",
    ],
    facts: [["Class of", "2027"], ["Based in", "Virginia Beach, VA"], ["Into", "Economics, Tennis, Cooking & Technology"]],
  },

  socials: [
    // [CHECK] add yours: { label: "LinkedIn", url: "…" }, { label: "Resume", url: "assets/resume.pdf" }
  ],
};
