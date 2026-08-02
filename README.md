# The Parity Ledger

A data analysis of competitive balance across major sports leagues — the NFL,
NBA, MLB, and NHL versus Europe's top 5 football leagues (Premier League,
La Liga, Bundesliga, Serie A, Ligue 1) — examining how salary caps, luxury
taxes, and revenue sharing shape who actually wins.

**[Live site →](your-github-pages-url-here)** (not ready yet)

## What it covers

Champions for all nine leagues across 16 seasons (2010–2025), each league's
financial structure (hard cap, soft cap, or no cap), team spend spreads, and
championship concentration measured via the Herfindahl-Hirschman Index (HHI) —
the same metric economists use to flag market monopolies, applied here to
trophies.

Capped, revenue-shared US leagues average 10–11 distinct champions out of 16
seasons. Europe's top 5 football leagues average 4.

## Data & methodology

Champion records and financial figures verified against league sources and
current reporting as of August 2026. Full methodology and caveats are in the
site itself — see the "Methodology & Caveats" section.

## Stack

Plain HTML/CSS/JS, Chart.js (bundled locally, no CDN dependency), data kept
in a separate `data.js` for easy verification against sources. Visual design
explored with Google Stitch, hand-implemented into the existing CSS system.

## Running locally

Just open `index.html` in a browser — no build step, no dependencies to
install.