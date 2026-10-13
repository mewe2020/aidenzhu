/* ==========================================================================
   main.js — renders content.js into the page and wires up interactions.
   ========================================================================== */
(() => {
  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch {}
  root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  $("#themeToggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
    window.dispatchEvent(new CustomEvent("themechange"));
  });

  /* ---------- Render content ---------- */
  document.title = `${S.name.first} ${S.name.last}`;
  $("#brandMark").textContent = S.initials;
  $("#firstName").textContent = S.name.first;
  $("#lastName").textContent = S.name.last;
  $("#classTag").textContent = `Class of ${S.classOf}`;
  $("#locationTag").textContent = S.location;
  $("#version").textContent = `v${S.version} © ${new Date().getFullYear()}`;
  $(".loader__name").textContent = `${S.name.first} ${S.name.last} — portfolio`.toLowerCase();

  const socialHTML = S.socials.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join("");
  $("#socialsTop").innerHTML = socialHTML;
  $("#socialsBottom").innerHTML = socialHTML;

  // Hero sentence with cycling role
  const [pre, post] = S.heroLine.split("{role}");
  $("#heroLine").innerHTML = `${esc(pre)}<span class="role" id="role"></span>${esc(post ?? "")}`;
  let roleI = 0;
  const setRole = () => {
    $("#role").innerHTML = [...S.roles[roleI]].map((ch, i) =>
      `<span style="animation-delay:${i * 30}ms">${ch === " " ? "&nbsp;" : esc(ch)}</span>`).join("");
    roleI = (roleI + 1) % S.roles.length;
  };
  setRole();
  if (!reduced) setInterval(setRole, 2400);

  // Hello arc
  const hello = [...S.hellos, ...S.hellos, ...S.hellos];
  $("#helloPath").innerHTML = hello.map((h, i) =>
    `<tspan class="${i % 2 ? "alt" : ""}">${esc(h)}</tspan><tspan> · </tspan>`).join("");

  // About (word-by-word)
  $("#aboutText").innerHTML = S.about.split(/(\*[^*]+\*)/).flatMap((chunk) => {
    const em = chunk.startsWith("*");
    return chunk.replace(/\*/g, "").split(/\s+/).filter(Boolean)
      .map((w) => `<span class="w${em ? " em" : ""}">${esc(w)}</span>`);
  }).join(" ");

  $("#stats").innerHTML = S.stats.map((s) => `
    <div class="stat reveal">
      <div class="stat__num"><span data-count="${s.value}">0</span>${esc(s.suffix)}</div>
      <div class="stat__label mono">${esc(s.label)}</div>
    </div>`).join("");

  // Work
  const art = (p, text) => p.image
    ? `<div class="art" style="background:${p.color}"><img src="${esc(p.image)}" alt=""></div>`
    : `<div class="art" style="background:${p.color}"><span>${esc(text)}</span></div>`;

  $("#workList").innerHTML = S.projects.map((p, i) => `
    <li class="work__item reveal" tabindex="0" data-i="${i}" data-cursor="view">
      <span class="work__idx mono">${String(i + 1).padStart(2, "0")}</span>
      <span class="work__title">${esc(p.title)}</span>
      <span class="work__tag mono">${esc(p.tag)}</span>
      <span class="work__year mono">${esc(p.year)}</span>
    </li>`).join("");

  // Marquee (duplicated for seamless loop)
  const mItems = S.awards.map((a) => `<span>${esc(a)}</span><span class="star">✺</span>`).join("");
  $("#marquee").innerHTML = `<div class="marquee__item">${mItems}</div><div class="marquee__item" aria-hidden="true">${mItems}</div>`;

  // Timeline + filters
  const cats = ["All", ...new Set(S.timeline.map((t) => t.category))];
  $("#filters").innerHTML = cats.map((c, i) =>
    `<button class="chip" role="tab" aria-selected="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  $("#timeline").innerHTML = S.timeline.map((t) => `
    <li class="tl reveal" data-cat="${esc(t.category)}">
      <div class="tl__years mono">${esc(t.years)}</div>
      <div class="tl__body">
        <h3 class="tl__title">${esc(t.title)}<span class="tl__cat mono">${esc(t.category)}</span></h3>
        <p class="tl__text">${esc(t.text)}</p>
      </div>
    </li>`).join("");
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    $$(".chip").forEach((c) => c.setAttribute("aria-selected", c === b));
    $$(".tl").forEach((li) => li.classList.toggle("hide", b.dataset.cat !== "All" && li.dataset.cat !== b.dataset.cat));
  });

  // Stickers + currently
  $("#stickers").insertAdjacentHTML("afterbegin", S.stickers.map((s) => `
    <div class="sticker"><span class="sticker__emoji">${esc(s.emoji)}</span><span class="sticker__label">${esc(s.label)}</span></div>`).join(""));
  $("#currently").innerHTML = S.currently.map((c) => `<dt>${esc(c.k)}</dt><dd>${esc(c.v)}</dd>`).join("");

  // Contact
  $("#mailText").textContent = S.email;
  $("#mailBig").href = `mailto:${S.email}`;
  $("#mailBig").addEventListener("click", async (e) => {
    try {
      await navigator.clipboard.writeText(S.email);
      e.preventDefault();
      $("#copied").textContent = "Copied to clipboard ✓";
      setTimeout(() => ($("#copied").textContent = ""), 2200);
    } catch { /* fall through to mailto */ }
  });

  /* ---------- Loader ---------- */
  document.body.classList.add("is-loading");
  const num = $("#loaderNum");
  const start = performance.now();
  const DUR = reduced ? 200 : 1600;
  (function tick(now) {
    const t = Math.min(1, (now - start) / DUR);
    num.textContent = Math.round((1 - Math.pow(1 - t, 3)) * 100);
    if (t < 1) return requestAnimationFrame(tick);
    setTimeout(() => {
      $("#loader").classList.add("is-done");
      document.body.classList.remove("is-loading");
      window.dispatchEvent(new CustomEvent("siteready"));
    }, 200);
  })(start);

  // If the 3D module can't load (offline, no WebGL), show the CSS blob fallback
  setTimeout(() => { if (!window.__heroReady) root.classList.add("no-webgl"); }, 5000);

  /* ---------- Live clock ---------- */
  const city = S.location.split(",")[0];
  $("#clockCity").textContent = city;
  const fmt = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZone: S.timezone, timeZoneName: "short" });
  const clock = () => {
    const s = fmt.format(new Date());
    $("#clock").textContent = s;
    $("#clock2").textContent = s;
  };
  clock(); setInterval(clock, 1000);

  /* ---------- Scroll-driven bits ---------- */
  const words = $$("#aboutText .w");
  const aboutEl = $("#aboutText");
  const helloPath = $("#helloPath");
  const helloSec = $(".hello");
  const navLinks = $$(".pill__nav a");
  const sections = navLinks.map((a) => $(a.getAttribute("href")));

  const onScroll = () => {
    const vh = innerHeight;
    // about: light up words as the paragraph moves through the viewport
    const r = aboutEl.getBoundingClientRect();
    const p = reduced ? 1 : Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
    const n = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle("on", i < n));

    // hello arc: slide text along the curve
    const hr = helloSec.getBoundingClientRect();
    const hp = (vh - hr.top) / (vh + hr.height);
    helloPath.setAttribute("startOffset", `${-hp * 60}%`);

    // active nav
    let active = -1;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < vh * 0.4) active = i; });
    navLinks.forEach((a, i) => a.classList.toggle("is-active", i === active));
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  // Reveal-on-enter + stat counters
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    const c = e.target.querySelector("[data-count]");
    if (c) countUp(c);
    io.unobserve(e.target);
  }), { threshold: 0.15 });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });

  function countUp(el) {
    const target = +el.dataset.count, t0 = performance.now(), d = reduced ? 1 : 1400;
    (function f(now) {
      const t = Math.min(1, (now - t0) / d);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 4)));
      if (t < 1) requestAnimationFrame(f);
    })(t0);
  }

  /* ---------- Work: hover preview + modal ---------- */
  const preview = $("#workPreview"), previewInner = $("#workPreviewInner");
  let px = 0, py = 0, tx = 0, ty = 0;
  $$(".work__item").forEach((li) => {
    const p = S.projects[li.dataset.i];
    li.addEventListener("mouseenter", () => { previewInner.innerHTML = art(p, p.summary); preview.classList.add("on"); });
    li.addEventListener("mouseleave", () => preview.classList.remove("on"));
    li.addEventListener("click", () => openModal(p));
    li.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(p); } });
  });

  const modal = $("#modal");
  function openModal(p) {
    $("#modalArt").innerHTML = art(p, p.title);
    $("#modalMeta").textContent = `${p.tag} · ${p.year}`;
    $("#modalTitle").textContent = p.title;
    $("#modalSummary").textContent = p.summary;
    $("#modalDetails").textContent = p.details;
    const link = $("#modalLink");
    link.hidden = !p.link;
    if (p.link) link.href = p.link;
    modal.showModal();
  }
  $("#modalClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

  /* ---------- Draggable stickers ---------- */
  const board = $("#stickers");
  const stickers = $$(".sticker", board);
  const scatter = () => {
    const W = board.clientWidth, H = board.clientHeight;
    stickers.forEach((s, i) => {
      const cols = W < 500 ? 2 : 3;
      const cw = W / cols, rh = (H - 40) / Math.ceil(stickers.length / cols);
      const x = (i % cols) * cw + (cw - s.offsetWidth) / 2 + (Math.random() - 0.5) * 30;
      const y = Math.floor(i / cols) * rh + (rh - s.offsetHeight) / 2 + (Math.random() - 0.5) * 20;
      s.style.left = `${Math.max(8, Math.min(W - s.offsetWidth - 8, x))}px`;
      s.style.top = `${Math.max(8, Math.min(H - s.offsetHeight - 8, y))}px`;
      s.style.rotate = `${(Math.random() - 0.5) * 16}deg`;
    });
  };
  scatter();
  addEventListener("siteready", scatter);
  let lastW = board.clientWidth;
  addEventListener("resize", () => { if (board.clientWidth !== lastW) { lastW = board.clientWidth; scatter(); } });
  let z = 10;
  stickers.forEach((s) => {
    s.addEventListener("pointerdown", (e) => {
      s.setPointerCapture(e.pointerId);
      s.classList.add("drag"); s.style.zIndex = ++z;
      const ox = e.clientX - s.offsetLeft, oy = e.clientY - s.offsetTop;
      const move = (ev) => {
        const W = board.clientWidth - s.offsetWidth, H = board.clientHeight - s.offsetHeight;
        s.style.left = `${Math.max(0, Math.min(W, ev.clientX - ox))}px`;
        s.style.top = `${Math.max(0, Math.min(H, ev.clientY - oy))}px`;
        s.style.rotate = `${Math.max(-20, Math.min(20, ev.movementX * 1.5))}deg`;
      };
      const up = () => {
        s.classList.remove("drag");
        s.style.rotate = `${(Math.random() - 0.5) * 12}deg`;
        s.removeEventListener("pointermove", move);
        s.removeEventListener("pointerup", up);
      };
      s.addEventListener("pointermove", move);
      s.addEventListener("pointerup", up);
    });
  });

  /* ---------- Cursor, magnetic buttons, tilt ---------- */
  if (finePointer && !reduced) {
    const cur = $("#cursor"), label = $("#cursorLabel");
    let cx = innerWidth / 2, cy = innerHeight / 2, mx = cx, my = cy;
    addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; tx = mx; ty = my; });
    (function loop() {
      cx += (mx - cx) * 0.22; cy += (my - cy) * 0.22;
      cur.style.transform = `translate(${cx}px, ${cy}px)`;
      px += (tx - px) * 0.12; py += (ty - py) * 0.12;
      preview.style.transform = `translate(${px}px, ${py}px) rotate(${Math.max(-15, Math.min(15, (tx - px) * 0.05))}deg)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("a, button, .sticker, [data-cursor]");
      const lbl = t?.dataset.cursor;
      cur.classList.toggle("is-hover", !!t && !lbl);
      cur.classList.toggle("is-label", !!lbl);
      label.textContent = lbl || "";
    });

    $$(".magnetic").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });

    const portrait = $("#portrait");
    portrait.addEventListener("pointermove", (e) => {
      const r = portrait.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      portrait.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
    });
    portrait.addEventListener("pointerleave", () => (portrait.style.transform = ""));
  }
})();
