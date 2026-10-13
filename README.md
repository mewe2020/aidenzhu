# Personal site

Plain HTML/CSS/JS — no build step. (The first draft lives in `v1/`.)

| File | What it is |
|---|---|
| `content.js` | **All your content.** Name, hero cards, featured work, more work, about. Edit anything marked `[EDIT]`. |
| `styles.css` | Look & feel. Colors/fonts are tokens at the top. |
| `main.js` | Card physics, curved carousel, scroll pop-ins, color picker, modals. |
| `index.html` | Page skeleton — rarely needs touching. |

## Showing your work
Every project is drawn as an "artifact" card (`logo`, `chart`, `receipt`, `stat`, `paper`, `badge`, `ticket`) —
see the top of `content.js`. To use a real photo or screenshot instead, drop it in `assets/` and use:

```js
art: { kind: "image", src: "assets/my-business.jpg" }
```

## Deep Dives
The big framed showcases (`cases` in `content.js`) draw a product mockup — `browser`, `dashboard`,
`phone`, or `slides`. Have a real screenshot? Use `mock: { kind: "browser", url: "mysite.com", src: "assets/site.png" }`.

## Font
The reference site uses **Futura Now Headline Condensed ExtraBold** (paid, Monotype). This site uses
**Barlow Condensed** (free) as a stand-in. If you buy a license, put the `.woff2` in `fonts/` and add the
`url(...)` line noted in the `@font-face` at the top of `styles.css`.

## Run locally
```bash
python -m http.server 5173
```

## Put it online (free)
GitHub Pages (repo → Settings → Pages) or drag-and-drop the folder into Netlify.
