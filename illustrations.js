/* ==========================================================================
   Banner illustrations — flat "sticker" style SVGs, one per project.
   Each is drawn in a 120 × 90 box. Use them in content.js with:
     art: { kind: "banner", illus: "paintball", bg: "#…", title: "…", tag: "…" }
   ========================================================================== */
(() => {
  const S = 'stroke="#1b1b1b" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
  const svg = (body) => `<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><g ${S}>${body}</g></svg>`;

  window.ILLUS = {

    // wide scene for the Amazon showcase (360 × 170)
    amazonScene: `<svg viewBox="0 0 360 170" xmlns="http://www.w3.org/2000/svg"><g ${S}>
      <path d="M0 150 H360" fill="none" stroke="#fff" stroke-opacity=".5"/>
      <rect x="14" y="116" width="34" height="34" fill="#d79a58"/><path d="M31 116 V130" fill="none" stroke="#fff" stroke-width="3"/>
      <rect x="48" y="122" width="28" height="28" fill="#c2874a"/><path d="M62 122 V134" fill="none" stroke="#fff" stroke-width="3"/>
      <rect x="26" y="86" width="30" height="30" fill="#f0c088"/><path d="M41 86 V98" fill="none" stroke="#fff" stroke-width="3"/>
      <path d="M84 120 h14 m-6 -6 l6 6 -6 6" fill="none" stroke="#fff" stroke-width="3.5"/>
      <path d="M104 150 V96 L142 72 L180 96 V150Z" fill="#e8ecf2"/>
      <rect x="122" y="112" width="40" height="38" fill="#9aa6b8"/>
      <path d="M122 120 H162 M122 128 H162 M122 136 H162 M122 144 H162" fill="none" stroke-width="1.6"/>
      <rect x="126" y="88" width="32" height="14" rx="3" fill="#ff9f1c"/>
      <text x="142" y="99" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="11" fill="#1b1b1b" stroke="none">FBA</text>
      <path d="M186 120 h14 m-6 -6 l6 6 -6 6" fill="none" stroke="#fff" stroke-width="3.5"/>
      <rect x="208" y="66" width="48" height="84" rx="8" fill="#1b1b1b"/>
      <rect x="213" y="74" width="38" height="68" rx="4" fill="#fff" stroke="none"/>
      <rect x="218" y="79" width="28" height="22" rx="2" fill="#f0c088"/>
      <path d="M220 108 l2 4 4 .6 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.6z M233 108 l2 4 4 .6 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.6z" fill="#ffd23f" stroke-width="1"/>
      <rect x="218" y="128" width="28" height="9" rx="4.5" fill="#ff9f1c" stroke-width="1.6"/>
      <path d="M262 70 l14 -8 v24 l-14 -8z" fill="#ff4f7b"/><path d="M256 72 h6 v8 h-6z" fill="#ff4f7b"/>
      <path d="M262 120 h14 m-6 -6 l6 6 -6 6" fill="none" stroke="#fff" stroke-width="3.5"/>
      <path d="M318 96 L350 108 L318 120 L286 108Z" fill="#f0c088"/>
      <path d="M286 108 L318 120 V150 L286 138Z" fill="#d79a58"/>
      <path d="M350 108 L318 120 V150 L350 138Z" fill="#c2874a"/>
      <path d="M292 128 Q302 136 312 130" fill="none" stroke-width="2.6"/><path d="M309 127 l4 2 -2 4" fill="none" stroke-width="2.6"/>
      <circle cx="320" cy="44" r="26" fill="#ffd23f"/>
      <text x="320" y="47" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="17" fill="#1b1b1b" stroke="none">1,000+</text>
      <text x="320" y="59" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="9" fill="#1b1b1b" stroke="none" letter-spacing="1">SOLD</text>
      <text x="45" y="166" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="12" fill="#fff" stroke="none" letter-spacing="1">SOURCE</text>
      <text x="142" y="166" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="12" fill="#fff" stroke="none" letter-spacing="1">STOCK</text>
      <text x="232" y="166" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="12" fill="#fff" stroke="none" letter-spacing="1">ADVERTISE</text>
      <text x="318" y="166" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="12" fill="#fff" stroke="none" letter-spacing="1">DELIVER</text>
    </g></svg>`,

    // wide scene for the quant bot showcase (360 × 170): market data → my bot → score → paper trade
    quantScene: (() => {
      const T = (x, y, s, t, fill = "#1b1b1b", anchor = "middle") =>
        `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="${s}" fill="${fill}" stroke="none" letter-spacing=".5">${t}</text>`;
      const candles = [[22, 92, 100, 86, 104], [33, 96, 88, 84, 100], [44, 88, 92, 82, 96], [55, 90, 80, 76, 94], [66, 82, 74, 70, 86], [77, 76, 68, 64, 80]]
        .map(([x, o, c, hi, lo]) => `<path d="M${x} ${hi} V${lo}" stroke="#9aa0c8" stroke-width="1.2"/>
          <rect x="${x - 3}" y="${Math.min(o, c)}" width="6" height="${Math.abs(o - c)}" fill="${c < o ? "#4dff88" : "#ff4f7b"}" stroke-width="1.2"/>`).join("");
      return `<svg viewBox="0 0 360 170" xmlns="http://www.w3.org/2000/svg"><g ${S}>
        <rect x="10" y="48" width="80" height="66" rx="6" fill="#0d0f2a"/>
        ${T(18, 61, 8, "PRICES", "#9aa0c8", "start")}
        ${candles}
        <path d="M98 81 h16 m-6 -6 l6 6 -6 6" fill="none" stroke="#fff" stroke-width="3.5"/>
        <path d="M160 46 V38" fill="none"/><circle cx="160" cy="35" r="4" fill="#ff4f7b"/>
        <rect x="120" y="66" width="8" height="20" rx="3" fill="#d7ff3a"/><rect x="192" y="66" width="8" height="20" rx="3" fill="#d7ff3a"/>
        <rect x="128" y="46" width="64" height="64" rx="10" fill="#d7ff3a"/>
        <circle cx="148" cy="68" r="4" fill="#1b1b1b"/><circle cx="172" cy="68" r="4" fill="#1b1b1b"/>
        <path d="M150 80 Q160 86 170 80" fill="none"/>
        ${T(160, 101, 9, "QUANT BOT")}
        <path d="M200 81 h16 m-6 -6 l6 6 -6 6" fill="none" stroke="#fff" stroke-width="3.5"/>
        <circle cx="250" cy="81" r="27" fill="#fff"/>
        <circle cx="250" cy="81" r="20" fill="none" stroke="#e6e6ee" stroke-width="6"/>
        <circle cx="250" cy="81" r="20" fill="none" stroke="#4dff88" stroke-width="6" stroke-dasharray="109 126" transform="rotate(-90 250 81)"/>
        ${T(250, 86, 17, "87")}${T(250, 96, 7, "/100", "#888")}
        <path d="M282 81 h14 m-6 -6 l6 6 -6 6" fill="none" stroke="#fff" stroke-width="3.5"/>
        <rect x="300" y="52" width="54" height="58" rx="6" fill="#fff"/>
        <path d="M300 66 H354" fill="none"/>
        ${T(327, 63, 8, "PAPER TRADE")}${T(327, 84, 13, "BUY")}
        <circle cx="327" cy="97" r="6.5" fill="#4dff88" stroke-width="1.6"/>
        <path d="M324 97 l2.2 2.2 4 -4.4" fill="none" stroke-width="1.8"/>
        <rect x="226" y="10" width="128" height="22" rx="11" fill="#d7ff3a"/>
        ${T(290, 25, 10, "UP TO +1% VS. THE S&amp;P 500")}
        ${T(50, 166, 12, "DATA", "#fff")}${T(160, 166, 12, "ANALYZE", "#fff")}${T(250, 166, 12, "SCORE", "#fff")}${T(327, 166, 12, "TRADE", "#fff")}
      </g></svg>`;
    })(),

    // wide scene for the paintball showcase (360 × 170)
    paintballScene: `<svg viewBox="0 0 360 170" xmlns="http://www.w3.org/2000/svg"><g ${S}>
      <path d="M0 150 H360" fill="none"/>
      <rect x="18" y="104" width="44" height="46" fill="#d79a58"/><path d="M18 104 L62 150 M62 104 L18 150" fill="none"/>
      <rect x="62" y="114" width="40" height="36" fill="#c2874a"/><path d="M62 114 L102 150 M102 114 L62 150" fill="none"/>
      <rect x="30" y="68" width="40" height="36" fill="#f0c088"/><path d="M30 68 L70 104 M70 68 L30 104" fill="none"/>
      <rect x="56" y="88" width="34" height="9" rx="3" fill="#1b1b1b" transform="rotate(-18 56 92)"/>
      <path d="M112 112 h22 m-7 -7 l7 7 -7 7" fill="none" stroke="#fff" stroke-width="4"/>
      <rect x="146" y="112" width="84" height="9" rx="2" fill="#8a5a2b"/>
      <path d="M154 121 V150 M222 121 V150" fill="none" stroke-width="4"/>
      <path fill="#2f4bff" d="M150 44c4-7 14-5 15 1 7-1 10 7 5 10 3 7-7 10-10 5-5 5-13 0-10-6-6-2-5-10 0-10z"/>
      <path fill="#4dff88" d="M214 34c3-4 9-2 9 2 4 0 4 6 1 7 1 4-4 6-7 3-3 3-8-1-6-4-4-1-3-7 3-8z"/>
      <rect x="160" y="84" width="14" height="9" rx="3" fill="#2f4bff"/>
      <rect x="172" y="80" width="40" height="14" rx="4" fill="#1b1b1b"/>
      <rect x="210" y="84" width="22" height="6" rx="2" fill="#f2f2f2"/>
      <path d="M180 94 l-4 16 h10 l4 -16z" fill="#1b1b1b"/>
      <ellipse cx="192" cy="72" rx="10" ry="8" fill="#ffd23f"/>
      <rect x="236" y="96" width="14" height="16" rx="2" fill="#ff4f7b"/><path d="M236 100 h14" fill="none"/>
      <path d="M150 104 l12 -8 4 4 -10 10z" fill="#e8e8e8"/>
      <path d="M244 112 h22 m-7 -7 l7 7 -7 7" fill="none" stroke="#fff" stroke-width="4"/>
      <path d="M306 80 L344 94 L306 108 L268 94Z" fill="#f0c088"/>
      <path d="M268 94 L306 108 V150 L268 136Z" fill="#d79a58"/>
      <path d="M344 94 L306 108 V150 L344 136Z" fill="#c2874a"/>
      <path d="M287 87 L325 101 V112" fill="none" stroke="#fff" stroke-width="4"/>
      <rect x="276" y="112" width="22" height="14" rx="2" fill="#fff" transform="skewY(20) translate(0 -101)"/>
      <circle cx="330" cy="46" r="24" fill="#ffd23f"/>
      <text x="330" y="54" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="21" fill="#1b1b1b" stroke="none">$35K</text>
      <text x="60" y="166" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="12" fill="#fff" stroke="none" letter-spacing="1">SOURCE</text>
      <text x="190" y="166" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="12" fill="#fff" stroke="none" letter-spacing="1">CUSTOMIZE</text>
      <text x="306" y="166" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="12" fill="#fff" stroke="none" letter-spacing="1">SHIP</text>
    </g></svg>`,
    paintball: svg(`
      <path fill="#2f4bff" d="M10 20c5-9 18-7 20 1 9-2 13 9 6 13 4 9-9 13-13 6-7 6-17 0-13-7-8-3-7-13 0-13z"/>
      <path fill="#ffd23f" d="M90 58c5-6 14-3 14 3 6 0 7 8 2 10 2 6-6 9-10 4-5 4-12-1-9-6-6-2-4-10 3-11z"/>
      <path fill="#4dff88" d="M96 12c3-4 9-2 9 2 4 0 4 6 1 7 1 4-4 6-7 3-3 3-8-1-6-4-4-1-3-7 3-8z"/>
      <rect x="12" y="44" width="20" height="11" rx="3" fill="#2f4bff"/>
      <rect x="30" y="40" width="50" height="17" rx="5" fill="#1b1b1b"/>
      <rect x="78" y="44" width="30" height="8" rx="3" fill="#f2f2f2"/>
      <path d="M40 57 l-5 21 h13 l5 -21z" fill="#1b1b1b"/>
      <path d="M54 57 q1 9 9 9 v-9" fill="none"/>
      <ellipse cx="52" cy="31" rx="13" ry="10" fill="#ffd23f"/>
      <rect x="47" y="38" width="10" height="4" fill="#1b1b1b"/>
      <circle cx="47" cy="29" r="2.4" fill="#fff" stroke="none"/>
      <circle cx="114" cy="48" r="4" fill="#4dff88"/>
      <path d="M100 40 h-8 M102 56 h-8" stroke="#fff"/>
    `),

    wattsowed: svg(`
      <path d="M30 12 L17 80 M30 12 L43 80 M13 28 H47 M16 46 H44 M20 64 H40 M13 28 L30 46 L47 28 M16 46 L30 64 L44 46" fill="none"/>
      <path d="M13 28 Q42 36 64 46" fill="none"/>
      <rect x="62" y="42" width="46" height="36" rx="4" fill="#fff"/>
      <rect x="62" y="42" width="46" height="9" rx="2" fill="#1b1b1b"/>
      <circle cx="70" cy="59" r="2.6" fill="#4dff88"/><circle cx="78" cy="59" r="2.6" fill="#4dff88"/><circle cx="86" cy="59" r="2.6" fill="#ff4f7b"/>
      <path d="M70 67 H100 M70 72 H100" fill="none"/>
      <path d="M68 4 L52 30 H63 L56 50 L80 20 H68 L75 4Z" fill="#ff5a1f"/>
    `),

    amazon: svg(`
      <path d="M60 20 L98 35 L60 50 L22 35Z" fill="#f0c088"/>
      <path d="M22 35 L60 50 V86 L22 71Z" fill="#d79a58"/>
      <path d="M98 35 L60 50 V86 L98 71Z" fill="#c2874a"/>
      <path d="M41 27.5 L79 42.5 V54" fill="none" stroke="#fff" stroke-width="5"/>
      <path d="M30 60 Q41 70 52 63" fill="none" stroke-width="3"/>
      <path d="M48 60 l5 3 -3 5" fill="none" stroke-width="3"/>
      <rect x="84" y="6" width="30" height="15" rx="7.5" fill="#fff"/>
      <path d="M90 13.5 h18" fill="none"/>
      <path d="M8 18 L18 14 L22 24 L12 28Z" fill="#f0c088"/>
    `),

    tradingdesk: svg(`
      <rect x="12" y="8" width="96" height="62" rx="7" fill="#0d0f2a"/>
      <rect x="52" y="70" width="16" height="9" fill="#1b1b1b"/>
      <rect x="36" y="79" width="48" height="6" rx="3" fill="#1b1b1b"/>
      <g stroke-width="1.6">
        <path d="M26 22 V54 M38 30 V58 M50 18 V48 M62 26 V52 M74 14 V42 M86 20 V46 M98 12 V36" stroke="#9aa0c8"/>
        <rect x="22" y="30" width="8" height="16" fill="#4dff88"/>
        <rect x="34" y="36" width="8" height="14" fill="#ff4f7b"/>
        <rect x="46" y="24" width="8" height="18" fill="#4dff88"/>
        <rect x="58" y="32" width="8" height="12" fill="#ff4f7b"/>
        <rect x="70" y="20" width="8" height="16" fill="#4dff88"/>
        <rect x="82" y="26" width="8" height="12" fill="#ff4f7b"/>
        <rect x="94" y="16" width="8" height="14" fill="#4dff88"/>
      </g>
      <polyline points="18,56 34,50 46,44 60,46 72,34 86,36 104,22" fill="none" stroke="#d7ff3a" stroke-width="2.6"/>
    `),

    // one robot with a price chart for a face, plus its trade score
    quantbot: svg(`
      <path d="M60 20 V12" fill="none"/><circle cx="60" cy="9" r="4" fill="#ff4f7b"/>
      <rect x="22" y="34" width="8" height="18" rx="3" fill="#d7ff3a"/><rect x="90" y="34" width="8" height="18" rx="3" fill="#d7ff3a"/>
      <rect x="30" y="20" width="60" height="50" rx="10" fill="#d7ff3a"/>
      <rect x="37" y="27" width="46" height="30" rx="4" fill="#0d0f2a"/>
      <g stroke-width="1.3">
        <path d="M44 40 V52 M53 36 V48 M62 33 V45 M71 29 V41" stroke="#9aa0c8"/>
        <rect x="42" y="42" width="4" height="7" fill="#ff4f7b"/>
        <rect x="51" y="38" width="4" height="7" fill="#4dff88"/>
        <rect x="60" y="35" width="4" height="7" fill="#4dff88"/>
        <rect x="69" y="31" width="4" height="7" fill="#4dff88"/>
      </g>
      <polyline points="40,50 50,45 60,41 70,36 80,31" fill="none" stroke="#d7ff3a" stroke-width="1.8"/>
      <path d="M50 63 h20" fill="none"/>
      <rect x="44" y="70" width="32" height="8" fill="#1b1b1b"/>
      <circle cx="99" cy="72" r="12" fill="#fff"/>
      <text x="99" y="76.5" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="12" fill="#1b1b1b" stroke="none">87</text>
    `),

    meals: svg(`
      <path d="M40 30 q-7 -6 0 -12 q7 -6 0 -12" fill="none" stroke="#fff"/>
      <path d="M60 28 q-7 -6 0 -12 q7 -6 0 -12" fill="none" stroke="#fff"/>
      <path d="M80 30 q-7 -6 0 -12 q7 -6 0 -12" fill="none" stroke="#fff"/>
      <path d="M28 46 Q34 34 44 42 Q50 32 60 41 Q68 31 76 41 Q84 33 92 46Z" fill="#ffd23f"/>
      <path d="M20 46 H100 Q98 80 60 82 Q22 80 20 46Z" fill="#fff"/>
      <path d="M30 56 Q60 62 90 56" fill="none" stroke="#14a37f"/>
      <path d="M60 64 c-6-7-14 0-7 7 l7 7 7-7 c7-7-1-14-7-7z" fill="#ff4f7b"/>
      <path d="M104 22 L94 46" stroke-width="3.5" fill="none"/>
      <ellipse cx="106" cy="18" rx="5" ry="7" fill="#e8e8e8" transform="rotate(22 106 18)"/>
    `),

    redtide: svg(`
      <path d="M60 32 L32 68 H88Z" fill="#fff" opacity=".22" stroke="none"/>
      <path d="M0 64 Q15 58 30 64 T60 64 T90 64 T120 64 V90 H0Z" fill="#2f7bff"/>
      <path d="M0 74 Q15 68 30 74 T60 74 T90 74 T120 74" fill="none" stroke="#9cc4ff"/>
      <path d="M38 68 q10-7 22 0 q10 6 22 0 q5 9-10 11 q-14 4-30 0 q-10-2-4-11z" fill="#ff4f4f"/>
      <path d="M48 26 H32 M72 26 H88 M32 26 V21 M88 26 V21" fill="none"/>
      <ellipse cx="32" cy="20" rx="11" ry="2.6" fill="#ffd23f"/>
      <ellipse cx="88" cy="20" rx="11" ry="2.6" fill="#ffd23f"/>
      <rect x="47" y="21" width="26" height="11" rx="5" fill="#fff"/>
      <circle cx="60" cy="34" r="3.4" fill="#1b1b1b"/>
      <path d="M100 8 l2 4 4 2 -4 2 -2 4 -2-4 -4-2 4-2z" fill="#fff" stroke-width="1.4"/>
    `),

    bots: svg(`
      <path d="M60 22 V11" fill="none"/>
      <circle cx="60" cy="9" r="4.5" fill="#ff4f7b"/>
      <rect x="22" y="38" width="9" height="18" rx="3.5" fill="#4dff88"/>
      <rect x="89" y="38" width="9" height="18" rx="3.5" fill="#4dff88"/>
      <rect x="30" y="22" width="60" height="50" rx="13" fill="#e8e8e8"/>
      <rect x="38" y="31" width="44" height="28" rx="7" fill="#0d0f2a"/>
      <polyline points="43,53 51,47 57,50 65,40 73,43 78,36" fill="none" stroke="#4dff88" stroke-width="2.6"/>
      <path d="M50 66 H70" fill="none"/>
      <rect x="48" y="72" width="24" height="10" rx="3" fill="#e8e8e8"/>
    `),

    cooking: svg(`
      <rect x="74" y="44" width="40" height="9" rx="4.5" fill="#1b1b1b" transform="rotate(-14 74 48)"/>
      <circle cx="50" cy="50" r="28" fill="#1b1b1b"/>
      <circle cx="50" cy="50" r="22" fill="#333" stroke="none"/>
      <path d="M36 46 q3-13 17-9 q13 0 11 13 q0 13-15 11 q-15 0-13-15z" fill="#fff"/>
      <circle cx="51" cy="50" r="6.5" fill="#ffd23f"/>
      <rect x="86" y="6" width="26" height="36" rx="6" fill="#fff"/>
      <path d="M95 17 L105 24 L95 31Z" fill="#ff4f7b"/>
      <path d="M14 16 q-4 -5 0 -10 M24 18 q-4 -5 0 -10" fill="none" stroke="#fff"/>
    `),

    wheel: svg(`
      <path d="M32 38 A29 29 0 0 1 82 24" fill="none" stroke="#fff" stroke-width="7"/>
      <path d="M78 14 L90 28 L72 30Z" fill="#fff"/>
      <path d="M88 52 A29 29 0 0 1 38 66" fill="none" stroke="#d7ff3a" stroke-width="7"/>
      <path d="M42 76 L30 62 L48 60Z" fill="#d7ff3a"/>
      <circle cx="60" cy="45" r="16" fill="#ffd23f"/>
      <text x="60" y="52" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="21" fill="#1b1b1b" stroke="none">$</text>
      <rect x="6" y="8" width="24" height="13" rx="3" fill="#fff"/><rect x="92" y="68" width="24" height="13" rx="3" fill="#fff"/>
    `),

    portfolio: svg(`
      <circle cx="44" cy="44" r="28" fill="#1b1b1b"/>
      <path d="M44 44 L44 16 A28 28 0 0 1 71 52Z" fill="#1f3dff"/>
      <path d="M44 44 L71 52 A28 28 0 0 1 28 67Z" fill="#ff5a1f"/>
      <path d="M44 44 L28 67 A28 28 0 0 1 20 30Z" fill="#fff"/>
      <ellipse cx="94" cy="76" rx="15" ry="5" fill="#ffd23f"/>
      <path d="M79 76 V68 M109 76 V68" fill="none"/>
      <ellipse cx="94" cy="68" rx="15" ry="5" fill="#ffd23f"/>
      <path d="M79 68 V60 M109 68 V60" fill="none"/>
      <ellipse cx="94" cy="60" rx="15" ry="5" fill="#ffd23f"/>
      <path d="M79 60 V52 M109 60 V52" fill="none"/>
      <ellipse cx="94" cy="52" rx="15" ry="5" fill="#ffe680"/>
    `),

    quant: svg(`
      <rect x="12" y="12" width="74" height="64" rx="5" fill="#fff"/>
      <path d="M22 24 H60 M22 31 H50" fill="none"/>
      <rect x="22" y="52" width="8" height="16" fill="#1f3dff"/>
      <rect x="34" y="44" width="8" height="24" fill="#1f3dff"/>
      <rect x="46" y="48" width="8" height="20" fill="#1f3dff"/>
      <rect x="58" y="38" width="8" height="30" fill="#ff5a1f"/>
      <path d="M92 60 L110 80" fill="none" stroke-width="8"/>
      <circle cx="80" cy="46" r="19" fill="#cfeaff" fill-opacity=".85"/>
      <path d="M70 50 L77 44 L82 47 L90 38" fill="none" stroke="#ff5a1f" stroke-width="2.6"/>
    `),

    trailing: svg(`
      <polyline points="8,72 26,60 38,64 54,42 66,47 82,26 96,32 112,12" fill="none" stroke="#4dff88" stroke-width="4.5"/>
      <polyline points="8,82 54,82 54,58 82,58 82,42 112,42" fill="none" stroke="#ff4f7b" stroke-width="3" stroke-dasharray="5 4"/>
      <circle cx="112" cy="12" r="5" fill="#4dff88"/>
      <path d="M100 52 l6 -6 6 6" fill="none" stroke="#ff4f7b"/>
    `),

    easypot: svg(`
      <path d="M44 20 q-6 -5 0 -10 q6 -5 0 -10 M60 18 q-6 -5 0 -10 q6 -5 0 -10 M76 20 q-6 -5 0 -10 q6 -5 0 -10" fill="none" stroke="#fff"/>
      <rect x="14" y="46" width="14" height="9" rx="4.5" fill="#1b1b1b"/>
      <rect x="92" y="46" width="14" height="9" rx="4.5" fill="#1b1b1b"/>
      <rect x="24" y="40" width="72" height="40" rx="12" fill="#fff"/>
      <path d="M22 40 Q60 20 98 40Z" fill="#ffd23f"/>
      <circle cx="60" cy="27" r="4.5" fill="#1b1b1b"/>
      <circle cx="60" cy="61" r="7" fill="#1f3dff"/>
      <path d="M60 61 l3 -4" fill="none" stroke="#fff" stroke-width="1.8"/>
    `),

    daysync: svg(`
      <rect x="14" y="14" width="58" height="64" rx="7" fill="#fff"/>
      <path d="M14 30 H72 V21 a7 7 0 0 0 -7 -7 H21 a7 7 0 0 0 -7 7Z" fill="#1b1b1b"/>
      <path d="M28 10 V18 M58 10 V18" fill="none" stroke-width="3.5"/>
      <path d="M24 42 l4 4 7 -8 M24 56 l4 4 7 -8" fill="none" stroke="#14a37f" stroke-width="3"/>
      <path d="M42 43 H62 M42 57 H58 M24 70 H50" fill="none"/>
      <circle cx="88" cy="58" r="22" fill="#ffd23f"/>
      <path d="M88 58 V44 M88 58 L98 63" fill="none" stroke-width="3"/>
    `),

    news: svg(`
      <rect x="18" y="10" width="84" height="64" rx="4" fill="#fff"/>
      <rect x="26" y="18" width="68" height="9" fill="#1b1b1b"/>
      <path d="M26 36 H58 M26 43 H58 M26 50 H58 M26 57 H50" fill="none" stroke-width="2"/>
      <rect x="64" y="34" width="30" height="24" fill="#eef7ef"/>
      <polyline points="66,54 74,48 80,51 92,38" fill="none" stroke="#14a37f" stroke-width="2.6"/>
      <rect x="0" y="78" width="120" height="12" fill="#1b1b1b"/>
      <path d="M8 84 H30 M40 84 H60 M70 84 H96 M104 84 H118" stroke="#4dff88" stroke-width="2"/>
    `),

    rooftop: svg(`
      <rect x="4" y="52" width="30" height="38" fill="#2a1d6e"/>
      <rect x="44" y="40" width="26" height="50" fill="#3a2a8f"/>
      <rect x="80" y="58" width="36" height="32" fill="#2a1d6e"/>
      <path d="M10 60 h6 M22 60 h6 M10 70 h6 M22 70 h6 M50 48 h5 M60 48 h5 M50 58 h5 M60 58 h5 M88 66 h6 M100 66 h6" stroke="#ffd23f" stroke-width="2.4"/>
      <circle cx="78" cy="20" r="5" fill="#fff"/>
      <path d="M77 25 L72 38 M76 29 L66 26 M76 29 L86 24 M72 38 L64 42 M72 38 L80 46" fill="none" stroke="#fff" stroke-width="3"/>
      <path d="M58 22 h-12 M56 30 h-14 M60 38 h-10" stroke="#ffd23f" stroke-width="2"/>
    `),
  };
})();
