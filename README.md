# artkleinart.com — Production Site

Built in Cursor. Deployed via Vercel + GitHub.
**To deploy:** push to GitHub → Vercel auto-deploys in ~30 seconds.

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero + selected work gallery |
| `game-art.html` | Game Art page — Sims 4, Horizon Worlds, Sculpts |
| `art-direction.html` | Art Direction page — NBA Clash, NFL Clash |
| `style.css` | All styles — fully mobile responsive |
| `resume.pdf` | **YOU NEED TO ADD THIS** — copy from `../Resumes/LaneC/` |
| `images/` | Empty — add downloaded images here if self-hosting |

---

## Images Needed — Action Required

All gallery images have `src=""` placeholders right now. The site structure and layout are complete; images just need to be added.

### Step 1 — Get your image URLs from Weebly
1. Log into Weebly → go to the page (e.g. `/sims4_page.html`)
2. Click on any image → Copy its file URL (right-click → "Copy image address")
3. Paste the URL into the matching `src=""` in the HTML file below

### Step 2 — Which images go where

#### `index.html` — Homepage gallery
| Slot | Description | Source Page |
|------|-------------|-------------|
| Row 1, #1 | Star Wars group (Boba Fett, Darth Maul, Aayla Secura) | `/sims4_page.html` |
| Row 1, #2 | Ornate red/gold jacket front + back | `/sims4_page.html` |
| Row 1, #3 | Roman centurion outfit set | `/sims4_page.html` |
| Row 1, #4 | Curly/textured hair sculpts | `/horizonworlds_page.html` |
| Row 1, #5 | Castle interior VR environment | `/horizonworlds_page.html` |
| Row 1, #6 | Old man face sculpt (personal ZBrush) | `/game-art.html` or `/moreexamples.html` |
| Row 2, #7 | Giannis character render | `/nbac_gallery.html` |
| Row 2, #8 | Character expression sheet | `/nbac_gallery.html` |
| Row 2, #9 | Arena game UI screen | `/nbac_gallery.html` |
| Row 2, #10 | NFL Clash marketing render / key art | `/nflc_gallery.html` |

#### `game-art.html` — many images from the same Weebly sub-pages above
#### `art-direction.html` — images from `/nbac_gallery.html` and `/nflc_gallery.html`

---

## Resume
Copy `ARTHUR KLEIN - Resume Q126c.pdf` from `../Resumes/LaneC/` into this folder and rename it `resume.pdf`.

---

## Deploying to Vercel (after Git setup)

```bash
# One-time setup
git init
git add .
git commit -m "initial production site"
# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/artkleinart.git
git push -u origin main
```

Then go to vercel.com → "New Project" → import from GitHub.
Every future `git push` deploys automatically.
