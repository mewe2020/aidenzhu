/* ==========================================================================
   main.js — renders content.js and runs the interactions.
   ========================================================================== */
(() => {
  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Artifact renderer ---------- */
  const MARKS = {
    circle: `<circle cx="50" cy="50" r="44"/>`,
    square: `<rect x="10" y="10" width="80" height="80" rx="18"/>`,
    arrow:  `<path d="M14 72 L56 30 H34 V16 H84 V66 H70 V44 L28 86 Z"/>`,
    star:   `<path d="M50 4 L61 38 L96 38 L68 59 L79 94 L50 72 L21 94 L32 59 L4 38 L39 38 Z"/>`,
    bolt:   `<path d="M58 4 L18 56 H46 L38 96 L82 40 H54 Z"/>`,
    blob:   `<path d="M50 6c18 0 30 10 38 24s6 34-6 46-30 18-46 12S8 70 7 52 18 14 50 6Z"/>`,
  };
  const scallop = (() => {
    let d = "";
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2, r = i % 2 ? 44 : 50;
      d += `${i ? "L" : "M"}${50 + Math.cos(a) * r} ${50 + Math.sin(a) * r}`;
    }
    return d + "Z";
  })();

  // Outer .card is the container (size/shadow); inner .art holds the design, so
  // container units inside it measure against the card itself.
  const art = (a) => { const h = artInner(a); return h.includes('class="art ') ? h + "</div>" : h; };

  function artInner(a) {
    const vars = `--bg:${esc(a.bg || "#eee")};--fg:${esc(a.fg || "#1b1b1b")}`;
    switch (a.kind) {
      case "logo":
        return `<div class="card" style="${vars}"><div class="art art-logo">
          <svg viewBox="0 0 100 100" fill="currentColor">${MARKS[a.mark] || MARKS.circle}</svg>
          <div class="hl">${esc(a.text)}</div></div>`;
      case "chart": {
        const p = a.points || [1, 2, 3], min = Math.min(...p), max = Math.max(...p);
        const pts = p.map((v, i) => `${(i / (p.length - 1)) * 100},${95 - ((v - min) / (max - min || 1)) * 75}`).join(" ");
        return `<div class="card" style="${vars}"><div class="art art-chart">
          <div class="lbl">${esc(a.label)}</div><div class="hl val">${esc(a.value)}</div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,100 ${pts} 100,100" fill="currentColor" opacity=".14"/>
            <polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="3" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
          </svg></div>`;
      }
      case "receipt":
        return `<div class="card card--cut"><div class="art art-receipt"><div class="t">${esc(a.title)}</div>
          ${(a.lines || []).map(([k, v]) => `<div class="row"><span>${esc(k)}</span><span>${esc(v)}</span></div>`).join("")}
          <div class="tot"><span>${esc(a.totalLabel || "Total")}</span><span>${esc(a.total)}</span></div><div class="bar"></div></div>`;
      case "stat":
        return `<div class="card" style="${vars}"><div class="art art-stat"><div class="hl">${esc(a.big)}</div><p>${esc(a.small)}</p></div>`;
      case "paper":
        return `<div class="card" style="${vars}"><div class="art art-paper"><div class="tag">${esc(a.tag)}</div>
          <h5>${esc(a.title)}</h5><div class="by">${esc(a.author)}</div><i></i><i></i><i></i><i></i></div>`;
      case "badge":
        return `<div class="card" style="${vars}"><div class="art art-badge">
          <div class="medal"><svg viewBox="0 0 100 100" fill="var(--fg)"><path d="${scallop}"/></svg><span class="hl">${esc(a.top)}</span></div>
          <div class="hl ribbon">${esc(a.bottom)}</div></div>`;
      case "ticket":
        return `<div class="card card--cut" style="${vars}"><div class="art art-ticket">
          <div><div class="hl">${esc(a.title)}</div><div class="sub">${esc(a.sub)}</div></div>
          <div class="perf"></div><div class="code hl"><span>${esc(a.code)}</span><span class="bc"></span></div></div>`;
      case "banner": {
        const pic = a.shot
          ? `<div class="bn-shot"><img src="${esc(a.shot)}" alt="" draggable="false"></div>`
          : `<div class="bn-illus">${(window.ILLUS || {})[a.illus] || ""}</div>`;
        return `<div class="card" style="${vars}"><div class="art art-banner">
          <div class="bn-dots"></div>
          ${a.tag ? `<span class="bn-tag">${esc(a.tag)}</span>` : ""}
          ${pic}
          <div class="hl bn-title">${esc(a.title)}</div></div>`;
      }
      case "image":
        return `<div class="card"><div class="art art-image"><img src="${esc(a.src)}" alt="" draggable="false"></div>`;
      default:
        return `<div class="card" style="${vars}"></div>`;
    }
  }

  const words = (text, start = 0) => text.split(/\s+/).map((w, i) =>
    `<span class="word" style="--i:${start + i}">${esc(w)}</span>`).join('<span class="space"> </span>');

  /* ---------- Product mockups (for Deep Dives) ---------- */
  function mock(m, color) {
    const bar = (url) => `<div class="mock__bar"><i></i><i></i><i></i><span class="mock__url">${esc(url)}</span></div>`;
    if (m.src) return `<div class="mock mock--browser">${bar(m.url || "")}<div class="mock__screen"><img src="${esc(m.src)}" alt="" draggable="false"></div></div>`;
    switch (m.kind) {
      case "browser":
        return `<div class="mock mock--browser" style="--c:${esc(color)}">${bar(m.url)}
          <div class="mock__screen mock-site">
            <div class="ms-nav"><b class="hl">${esc(m.brand)}</b><span></span><span></span><span></span><em></em></div>
            <div class="ms-hero"><div class="hl">${esc(m.headline)}</div><i></i><i></i><span class="ms-cta">${esc(m.cta)}</span></div>
            <div class="ms-tiles">${(m.tiles || []).map((t) => `<div style="background:${esc(t)}"><span></span></div>`).join("")}</div>
          </div></div>`;
      case "dashboard": {
        const b = m.bars || [1], mx = Math.max(...b);
        return `<div class="mock mock--browser" style="--c:${esc(color)}">${bar(m.url)}
          <div class="mock__screen mock-dash">
            <aside><i class="on"></i><i></i><i></i><i></i></aside>
            <div class="md-main">
              <div class="md-kpis">${(m.kpis || []).map(([k, v]) => `<div><span>${esc(k)}</span><b class="hl">${esc(v)}</b></div>`).join("")}</div>
              <div class="md-chart">${b.map((v, n) => `<i style="height:${(v / mx) * 100}%;--n:${n}"></i>`).join("")}</div>
            </div>
          </div></div>`;
      }
      case "phone":
        return `<div class="mock mock--phone" style="--c:${esc(color)}"><div class="mp-screen">
          <div class="mp-notch"></div>
          <div class="mp-app">${esc(m.app)}</div>
          <div class="mp-bal"><span>Balance</span><b class="hl">${esc(m.balance)}</b></div>
          <svg viewBox="0 0 100 30" preserveAspectRatio="none"><polyline points="0,24 14,20 28,22 42,14 56,16 70,9 84,11 100,3" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>
          ${(m.rows || []).map(([k, v]) => `<div class="mp-row"><i></i><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join("")}
        </div></div>`;
      case "duo":                                   // two screenshots layered
        return `<div class="mock mock--duo">
          <div class="duo-back"><div class="mock mock--browser">${bar(m.backUrl || m.url)}<div class="mock__screen"><img src="${esc(m.back)}" alt="" draggable="false"></div></div></div>
          <div class="duo-front"><div class="mock mock--browser">${bar(m.url)}<div class="mock__screen"><img src="${esc(m.front)}" alt="" draggable="false"></div></div></div>
        </div>`;
      case "copybot":
        return `<div class="mock mock--browser" style="--c:${esc(color)}">${bar(m.url)}
          <div class="mock__screen cb">
            <div class="cb-feed">
              <div class="cb-head"><span class="cb-avatar">RK</span><div><b>${esc(m.who)}</b><small>STOCK Act disclosures</small></div><span class="cb-live">● Watching</span></div>
              ${(m.trades || []).map(([t, name, date]) => `<div class="cb-row"><span class="cb-tk">${esc(t)}</span><div><b>${esc(name)}</b><small>Bought · ${esc(date)}</small></div><span class="cb-ok">Copied ✓</span></div>`).join("")}
            </div>
            <div class="cb-side">
              <div class="cb-card"><small>Checks</small><b class="hl">10:00 · 2:00</b><small>Mon–Fri, ET</small></div>
              <div class="cb-card">${m.perf ? `<small>vs. S&amp;P 500</small><b class="hl">${esc(m.perf)}</b>` : `<small>Account</small><b class="hl">Paper</b>`}
                <svg viewBox="0 0 100 34" preserveAspectRatio="none"><polyline points="0,30 12,26 24,28 36,20 48,22 60,14 72,16 84,8 100,4" fill="none" stroke="currentColor" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg></div>
              <div class="cb-card cb-card--dark"><small>Rule</small><b>New buy → copy it</b></div>
            </div>
          </div></div>`;
      case "terminal": {
        // deterministic candlesticks
        let p = 50, x = 0; const candles = [];
        for (let i = 0; i < 26; i++) {
          const o = p, c = p + Math.sin(i * 1.7) * 5 + Math.cos(i * .6) * 3 + 1.1;
          const hi = Math.max(o, c) + 2 + (i % 3), lo = Math.min(o, c) - 2 - (i % 2);
          candles.push({ x: x += 7.4, o, c, hi, lo }); p = c;
        }
        const ys = candles.flatMap((k) => [k.hi, k.lo]), mn = Math.min(...ys), mx = Math.max(...ys);
        const Y = (v) => 92 - ((v - mn) / (mx - mn)) * 84;
        const svgC = candles.map((k) => `<line x1="${k.x}" x2="${k.x}" y1="${Y(k.hi)}" y2="${Y(k.lo)}" stroke="#7d84b8" stroke-width=".6"/>
          <rect x="${k.x - 2.4}" width="4.8" y="${Math.min(Y(k.o), Y(k.c))}" height="${Math.max(1.2, Math.abs(Y(k.o) - Y(k.c)))}" fill="${k.c >= k.o ? "#4dff88" : "#ff4f7b"}"/>`).join("");
        const vw = candles.map((k, i) => `${k.x},${Y((candles.slice(0, i + 1).reduce((a, q) => a + q.c, 0)) / (i + 1)) }`).join(" ");
        return `<div class="mock mock--browser mock--term" style="--c:${esc(color)}">${bar(m.url)}
          <div class="mock__screen tm">
            <div class="tm-top">${(m.tabs || []).map((t, i) => `<span class="${i ? "" : "on"}">${esc(t)}</span>`).join("")}<em>${esc(m.regime)}</em></div>
            <div class="tm-chart"><svg viewBox="0 0 200 100" preserveAspectRatio="none">${svgC}<polyline points="${vw}" fill="none" stroke="#d7ff3a" stroke-width=".9"/></svg>
              <div class="tm-strat">${esc(m.strategy)}</div></div>
            <div class="tm-side">
              <div class="tm-score"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#2a2f5a" stroke-width="4"/><circle cx="18" cy="18" r="15" fill="none" stroke="#d7ff3a" stroke-width="4" stroke-dasharray="${m.score * 0.942} 100" transform="rotate(-90 18 18)" stroke-linecap="round"/></svg><b class="hl">${esc(m.scoreText ?? m.score)}</b><small>${esc(m.scoreLabel || "Trade score")}</small></div>
              ${(m.agents || []).map(([n, s]) => `<div class="tm-agent"><i class="${esc(s)}"></i>${esc(n)}</div>`).join("")}
            </div>
          </div></div>`;
      }
      case "scene":
        return `<div class="mock mock--scene" style="--c:${esc(color)}">${(window.ILLUS || {})[m.illus] || ""}</div>`;
      case "slides":
        return `<div class="mock mock--slides" style="--c:${esc(color)}">
          <div class="sl sl--back2"></div><div class="sl sl--back"></div>
          <div class="sl sl--front"><div class="sl-tag">${esc(m.tag || "Investment thesis")}</div><div class="hl sl-title">${esc(m.title)}</div>
            <ul>${(m.bullets || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
            <div class="sl-stat hl">${esc(m.stat)}</div></div>
        </div>`;
    }
    return "";
  }

  /* ---------- Render ---------- */
  document.title = S.name;
  $("#location").textContent = S.location;
  $("#emailTop").textContent = S.email;
  $("#emailTop").href = `mailto:${S.email}`;
  const PHOTO = S.photo || S.about.photo || "";
  const silhouette = `<svg class="hero__photo-ph" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="38" r="18" fill="currentColor"/><path d="M14 96c4-22 19-33 36-33s32 11 36 33z" fill="currentColor"/></svg>`;
  $("#heroPhoto").innerHTML = silhouette + (PHOTO ? `<img src="${esc(PHOTO)}" alt="${esc(S.name)}" onerror="this.remove()">` : "");
  $("#name").innerHTML = words(S.name);
  $("#roles").innerHTML = S.roles.map((r, i) => words(r, i * 2 + 2)).join('<span class="space"> </span>');
  $$(".text-block__title, .contact__title").forEach((h) => (h.innerHTML = words(h.textContent)));

  $("#heroImages").innerHTML = S.heroCards.map((c, i) =>
    `<div class="hero__image" style="--i:${i}"><div class="sway">${art(c)}</div></div>`).join("");

  $("#track").innerHTML = S.featured.map((p, i) => `
    <div class="carousel__slide" data-i="${i}" style="--i:${i};--tint:${esc(p.art.bg || "#999")}">
      <div class="sway">${art(p.art)}</div>
      <button class="button" data-open="featured:${i}">${esc(p.label)}</button>
    </div>`).join("");

  $("#caseList").innerHTML = (S.cases || []).map((c, i) => `
    <article class="case pop" tabindex="0" role="button" aria-label="${esc(c.title)}" data-open="cases:${i}" style="--tint:${esc(c.color)}">
      <div class="case__inner"><div class="case__glow"></div>
        <header class="case__head">
          <div><h3 class="case__title">${esc(c.title)}</h3>
          <p class="case__line">${[c.org, c.year].filter(Boolean).length ? `<b>${esc([c.org, c.year].filter(Boolean).join(", "))}</b> — ` : ""}${esc(c.line)}</p>${c.link ? `<a class="case__link" href="${esc(c.link)}" target="_blank" rel="noopener">${esc(c.linkLabel || "Visit")} ↗</a>` : ""}</div>
          <span class="button button--icon case__arrow" aria-hidden="true">→</span>
        </header>
        <div class="case__stage"><div class="sway">${mock(c.mock, c.color)}</div></div>
      </div>
    </article>`).join("");

  // By the numbers
  $("#stats").innerHTML = (S.stats || []).map((s, i) => `
    <div class="stat-tile pop" style="--d:${i};--bg:${esc(s.bg)};--fg:${esc(s.fg)}">
      <div class="stat-tile__illus" aria-hidden="true">${(window.ILLUS || {})[s.illus] || ""}</div>
      <b class="stat-tile__num" data-to="${+s.v}" data-pre="${esc(s.pre || "")}" data-suf="${esc(s.suf || "")}">${esc(s.pre || "")}${(+s.v).toLocaleString()}${esc(s.suf || "")}</b>
      <span class="stat-tile__label">${esc(s.l)}</span>
    </div>`).join("");

  // Story
  if (S.story) {
    $("#storySteps").innerHTML = S.story.steps.map((st, i) => `
      <li class="story__step pop" style="--d:${i % 2};--bg:${esc(st.bg)}">
        <div class="story__dot"><span>${String(i + 1).padStart(2, "0")}</span></div>
        <div class="story__card">
          <div class="story__illus" aria-hidden="true">${(window.ILLUS || {})[st.illus] || ""}</div>
          <div><h3>${esc(st.h)}</h3><p>${esc(st.t)}</p></div>
        </div>
      </li>`).join("");
  }

  const cols = () => (innerWidth < 768 ? 2 : 3);
  $("#grid").innerHTML = S.more.map((p, i) => `
    <div class="project pop${p.stack ? " stack" : ""}" style="--tint:${esc(p.art.bg || "#999")}" tabindex="0" role="button" aria-label="${esc(p.title)}" data-open="more:${i}">
      ${p.stack && p.art2 ? `<div class="project__layer"><div class="sway">${art(p.art2)}</div></div>` : ""}
      <div class="project__layer"><div class="sway">${art(p.art)}</div></div>
      <span class="button project__label">${esc(p.title)}</span>
    </div>`).join("");
  const setGridDelays = () => $$(".project").forEach((el, i) => el.style.setProperty("--d", i % cols()));
  setGridDelays();
  addEventListener("resize", setGridDelays);

  $("#emailBig").textContent = S.email;
  $("#emailBig").href = `mailto:${S.email}`;
  $("#socials").innerHTML = S.socials.map((s) =>
    `<a class="button" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join("");

  // About
  const initials = S.name.split(" ").map((w) => w[0]).join("");
  const photo = PHOTO ? `<img src="${esc(PHOTO)}" alt="${esc(S.name)}" onerror="this.replaceWith(document.createTextNode('${initials}'))">` : initials;
  $("#avatar").innerHTML = photo;
  $("#aboutPhoto").innerHTML = photo;
  $("#aboutName").textContent = S.name;
  $("#aboutIntro").textContent = S.about.intro;
  $("#aboutBody").innerHTML = S.about.body.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#aboutFacts").innerHTML = S.about.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");

  /* ---------- Smooth momentum scrolling (like Perry's Locomotive Scroll) ---------- */
  if (window.Lenis) {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
    $$("dialog").forEach((d) => {
      new MutationObserver(() => (d.open ? lenis.stop() : lenis.start())).observe(d, { attributes: true, attributeFilter: ["open"] });
    });
  }
  // Scroll pop-ups directly with the wheel/trackpad so the page's smooth scroll can't swallow it
  $$("dialog").forEach((d) => d.addEventListener("wheel", (e) => {
    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * d.clientHeight : e.deltaY;
    d.scrollTop += dy;
    e.preventDefault();
    e.stopPropagation();
  }, { passive: false }));

  /* ---------- Scroll pop-ins ---------- */
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.25, rootMargin: "0px 0px -5% 0px" });
  $$(".pop-words, .pop, .carousel").forEach((el) => io.observe(el));

  /* ---------- Count-up numbers ---------- */
  const countIO = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    countIO.unobserve(e.target);
    const el = e.target, to = +el.dataset.to, pre = el.dataset.pre, suf = el.dataset.suf, t0 = performance.now(), dur = 1600;
    (function tick(now) {
      const k = Math.min(1, (now - t0) / dur), eased = 1 - Math.pow(1 - k, 4);
      el.textContent = pre + Math.round(to * eased).toLocaleString() + suf;
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }), { threshold: 0.6 });
  $$(".stat-tile__num").forEach((el) => { el.textContent = el.dataset.pre + "0" + el.dataset.suf; countIO.observe(el); });

  /* ---------- Story line fills as you scroll ---------- */
  const storyEl = $("#storySteps");
  if (storyEl) {
    const fill = () => {
      const r = storyEl.getBoundingClientRect();
      const k = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
      storyEl.style.setProperty("--fill", k.toFixed(3));
      $$(".story__step", storyEl).forEach((li) => li.classList.toggle("lit", li.getBoundingClientRect().top < innerHeight * 0.6));
      requestAnimationFrame(fill);
    };
    requestAnimationFrame(fill);
  }

  requestAnimationFrame(() => setTimeout(() => $("#hero").classList.add("mounted"), 60));

  /* ---------- Sway: the same physics spencergabor.work uses for its hero cards ----------
     Each card has two motions layered together:
       1. a "push" velocity, fed by how fast the cursor moves near it, decaying ×0.9 per frame
       2. a spring (stiffness .05, damping .8) that always pulls the card back home
     Push strength falls off with distance as (1 − d)^6, where d is measured in screen units
     (the full viewport width = 2), so cards near the cursor get shoved hard and far ones barely move.
     The card tilts with the spring's velocity (CSS: rotate −velocity × .25deg). */
  const spring = () => ({ cur: { x: 0, y: 0 }, target: { x: 0, y: 0 }, vel: { x: 0, y: 0 } });
  const stepSpring = (sp, dt, stiffness = 0.05, damping = 0.8) => {
    for (const k of ["x", "y"]) {
      sp.vel[k] = sp.vel[k] * damping + (sp.target[k] - sp.cur[k]) * stiffness * dt;
      sp.cur[k] += sp.vel[k];
    }
  };

  const sways = $$(".sway").map((el) => {
    const hero = !!el.closest(".hero");
    const sp = spring();
    if (hero) {                                   // like Spencer: start scattered, then spring together
      sp.cur.x = Math.random() * 200 - 100;
      sp.cur.y = Math.random() * 200 - 100;
    }
    return { el, host: el.parentElement, sp, push: { x: 0, y: 0 }, cx: 0, cy: 0, on: false, gain: hero ? 0.4 : 0.3 };
  });
  const swayIO = new IntersectionObserver((es) => es.forEach((e) => {
    const s = sways.find((x) => x.host === e.target); if (s) s.on = e.isIntersecting;
  }));
  sways.forEach((s) => swayIO.observe(s.host));

  // cursor position + movement since the last frame
  let px = -9999, py = -9999, mx = 0, my = 0;
  addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    if (px > -9999) { mx += e.clientX - px; my += e.clientY - py; }
    px = e.clientX; py = e.clientY;
  }, { passive: true });
  document.addEventListener("pointerleave", () => { px = py = -9999; mx = my = 0; });

  let swayT = performance.now();
  function swayLoop(now) {
    const dt = Math.min(2, (now - swayT) / 16.667); swayT = now;
    const live = sways.filter((s) => s.on || Math.abs(s.sp.cur.x) + Math.abs(s.sp.cur.y) > 0.05);
    // read all positions first (no layout thrash)…
    for (const s of live) {
      const r = s.host.getBoundingClientRect();
      s.cx = r.left + r.width / 2; s.cy = r.top + r.height / 2;
    }
    // …then simulate and write
    for (const s of live) {
      s.push.x *= 0.9; s.push.y *= 0.9;
      s.sp.cur.x += s.push.x; s.sp.cur.y += s.push.y;
      stepSpring(s.sp, dt);
      if (px > -9999) {
        const dx = (px - s.cx) / innerWidth * 2, dy = (py - s.cy) / innerHeight * 2;
        const d = Math.sqrt(dx * dx + dy * dy);
        const k = d < 1 ? Math.pow(1 - d, 6) * s.gain : 0;
        s.push.x += mx * k; s.push.y += my * k;
      }
      s.el.style.setProperty("--ox", s.sp.cur.x.toFixed(2));
      s.el.style.setProperty("--oy", s.sp.cur.y.toFixed(2));
      s.el.style.setProperty("--v", (s.sp.vel.x - s.sp.vel.y).toFixed(2));
    }
    mx = my = 0;                                  // movement is consumed once per frame
    requestAnimationFrame(swayLoop);
  }
  {
    // release the hero cards from their scattered start, just like the reference (100ms after mount)
    setTimeout(() => sways.forEach((s) => { s.sp.target.x = 0; s.sp.target.y = 0; }), 100);
    requestAnimationFrame(swayLoop);
  }

  /* ---------- Curved carousel ---------- */
  const carousel = $("#carousel");
  const slides = $$(".carousel__slide");
  const N = slides.length;
  let offset = 0, target = 0, vel = 0, dragging = false, moved = 0, startX = 0, startOffset = 0, lastPX = 0, lastT = 0;
  let pointerBias = 0, pointerBiasT = 0;
  const spacing = () => slides[0].offsetWidth + Math.min(80, innerWidth * 0.08);

  function layoutCarousel() {
    const sp = spacing(), total = sp * N;
    slides.forEach((s, i) => {
      let x = i * sp - (offset + pointerBias);
      x = ((x % total) + total * 1.5) % total - total / 2;      // wrap infinitely
      s.style.transform = `translateX(${x}px) translateY(${(x * x) / 5000}px) rotate(${x * 0.014}deg)`;   // slides ride a gentle arc
      s.querySelector(".button").style.opacity = Math.max(0, Math.cos(Math.min(Math.abs(x), 600) * Math.PI / 1200));
      s.style.zIndex = 100 - Math.round(Math.abs(x) / 10);
    });
  }

  function carouselLoop() {
    if (!dragging) {
      target += vel; vel *= 0.92;
      if (Math.abs(vel) < 0.5) { const sp = spacing(); target += (Math.round(target / sp) * sp - target) * 0.12; }
      offset += (target - offset) * 0.18;
    }
    pointerBias += (pointerBiasT - pointerBias) * 0.06;
    layoutCarousel();
    requestAnimationFrame(carouselLoop);
  }
  carouselLoop();

  carousel.addEventListener("pointerdown", (e) => {
    dragging = true; moved = 0; startX = lastPX = e.clientX; startOffset = offset; vel = 0; lastT = performance.now();
    carousel.setPointerCapture(e.pointerId);
  });
  carousel.addEventListener("pointermove", (e) => {
    const r = carousel.getBoundingClientRect();
    pointerBiasT = ((e.clientX - r.left) / r.width - 0.5) * 50;   // subtle follow, like the reference
    if (!dragging) return;
    moved = Math.max(moved, Math.abs(e.clientX - startX));
    offset = target = startOffset - (e.clientX - startX);
    const now = performance.now();
    vel = -(e.clientX - lastPX) / Math.max(1, now - lastT) * 16;
    lastPX = e.clientX; lastT = now;
  });
  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    if (moved < 6) {
      // treat as a click: open the slide under the pointer
      const el = document.elementFromPoint(e.clientX, e.clientY)?.closest(".carousel__slide");
      if (el) openProject("featured", +el.dataset.i);
    }
  };
  carousel.addEventListener("pointerup", endDrag);
  carousel.addEventListener("pointercancel", () => (dragging = false));
  carousel.addEventListener("pointerleave", () => (pointerBiasT = 0));
  carousel.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); target += e.deltaX; vel = 0; }
  }, { passive: false });
  $$(".carousel__slide .button").forEach((b) => b.addEventListener("keydown", (e) => {
    if (e.key === "Enter") openProject("featured", +b.dataset.open.split(":")[1]);
  }));
  addEventListener("keydown", (e) => {
    const r = carousel.getBoundingClientRect();
    if (r.top > innerHeight || r.bottom < 0 || document.querySelector("dialog[open]")) return;
    if (e.key === "ArrowRight") { target += spacing(); vel = 0; }
    if (e.key === "ArrowLeft") { target -= spacing(); vel = 0; }
  });

  /* ---------- Modals ---------- */
  const modal = $("#modal");
  function openProject(group, i) {
    const p = S[group][i];
    $("#modalArt").innerHTML = p.mock ? mock(p.mock, p.color) : art(p.art);
    $("#modalArt").classList.toggle("is-mock", !!p.mock);
    $("#modalMeta").textContent = [p.role, p.years].filter(Boolean).join(" · ");
    $("#modalTitle").textContent = p.label || p.title;
    $("#modalSummary").textContent = p.summary || "";
    $("#modalMetrics").innerHTML = (p.metrics || []).map((m) => `<div class="metric"><b>${esc(m.v)}</b><span>${esc(m.l)}</span></div>`).join("");
    $("#modalMetrics").hidden = !(p.metrics || []).length;
    $("#modalBody").innerHTML = (p.body || []).map((t) => `<p>${esc(t)}</p>`).join("");
    $("#modalLink").hidden = !p.link;
    if (p.link) { $("#modalLink").href = p.link; $("#modalLink").textContent = (p.linkLabel || "Visit") + " ↗"; }
    modal.showModal();
  }
  $$(".project, .case").forEach((el) => {
    const [g, i] = el.dataset.open.split(":");
    el.addEventListener("click", (e) => { if (!e.target.closest("a")) openProject(g, +i); });
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProject(g, +i); } });
  });
  $("#modalClose").addEventListener("click", () => modal.close());
  $("#aboutBtn").addEventListener("click", () => $("#about").showModal());
  $$("[data-close]").forEach((b) => b.addEventListener("click", () => b.closest("dialog").close()));
  $$("dialog").forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) d.close(); }));

  /* ---------- Copy email ---------- */
  $("#emailBig").addEventListener("click", async (e) => {
    try {
      await navigator.clipboard.writeText(S.email);
      e.preventDefault();
      $("#copied").textContent = "Copied to clipboard";
      setTimeout(() => ($("#copied").textContent = ""), 2000);
    } catch { /* falls back to mailto */ }
  });

  /* ---------- Color picker ---------- */
  const THEMES = [
    { name: "White", bg: "#ffffff", fg: "#2c2c2c", sec: "#d2d2d2", card: "#ffffff" },
    { name: "Cream", bg: "#f5eee2", fg: "#2c2620", sec: "#dccdb4", card: "#fffaf2" },
    { name: "Mint",  bg: "#dff4e8", fg: "#123a2a", sec: "#a8d9bf", card: "#f3fff8" },
    { name: "Sky",   bg: "#dde8ff", fg: "#15204a", sec: "#aabdf0", card: "#f4f7ff" },
    { name: "Blush", bg: "#ffe2ea", fg: "#3e1422", sec: "#f2b1c4", card: "#fff5f8" },
    { name: "Ink",   bg: "#1b1b1d", fg: "#f2f2f2", sec: "#47474c", card: "#2a2a2e" },
  ];
  const root = document.documentElement;
  const picker = $("#picker"), toggle = $("#pickerToggle");
  $("#swatches").innerHTML = THEMES.map((t, i) => {
    const a = Math.PI + (i / (THEMES.length - 1)) * (Math.PI / 2);   // arc from left (180°) to up (270°)
    const R = 5.2;
    return `<button class="swatch" style="--sw:${t.bg};--i:${i};--x:${(Math.cos(a) * R).toFixed(2)}rem;--y:${(Math.sin(a) * R).toFixed(2)}rem" data-t="${i}" aria-label="${t.name} theme" aria-pressed="false"></button>`;
  }).join("");
  function applyTheme(i) {
    const t = THEMES[i];
    root.style.setProperty("--color-primary", t.bg);
    root.style.setProperty("--color-onPrimary", t.fg);
    root.style.setProperty("--color-secondary", t.sec);
    root.style.setProperty("--color-card", t.card);
    $$(".swatch").forEach((s) => s.setAttribute("aria-pressed", +s.dataset.t === i));
    try { localStorage.setItem("theme", i); } catch {}
  }
  let savedTheme = 0;
  try { savedTheme = +(localStorage.getItem("theme") || 0); } catch {}
  applyTheme(THEMES[savedTheme] ? savedTheme : 0);
  toggle.addEventListener("click", () => {
    const open = picker.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $("#swatches").addEventListener("click", (e) => {
    const s = e.target.closest(".swatch"); if (s) applyTheme(+s.dataset.t);
  });
  document.addEventListener("click", (e) => { if (!picker.contains(e.target)) picker.classList.remove("open"); });
})();
