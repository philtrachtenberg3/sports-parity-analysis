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

## My Analysis
This was based on my hypothesis that US sports (NFL, NBA, MLB, NHL) have significantly more parity (ex. more teams with a chance to win) than European soccer leagues because of the salary cap and wealth distribution model. The lower the disparity in financial spending between the top and bottom teams, the more likely you'll have an even league. On top of that, in the US sports you'll regularly see teams from Tampa Bay, Kansas City, Pittsburgh, Milwaukee, Detroit in the playoffs and with a chance to win (in lieu of teams from New York, LA, Chicago). Whereas in Europe, it's only PSG, Bayern, Madrid/Barca, etc... who can win.

From the analysis, which was completed by Claude AI, it's pretty jarring the difference between the US and European sports leagues. Over the past 16 seasons (2010-2025), the US leagues have had an average of 10.5 different champions and the European soccer leagues have had an average of 4. 

And it's pretty jarring how the financial models shape the parity in these leagues. The US leagues all either have a hard cap or some sort of penalty for spending over a certain amount. The NFL has almost perfect spending parity with the hard cap, and they also split TV revenue almost evenly. And in the NFL, you see both (1) the most league parity with the lowest Herfindahl-Hirschman Index (which I'll talk about later), and (2) the best opportunity for small market teams like Kansas City, Tampa Bay, New Orleans, Green Bay, etc... to win. You do see big market teams like Philadelphia, LA, and New England also winning, but they tend to have some competitive edge rather than outspending the rest of the league combined. The NHL also has small market teams winning in lieu of the New York's/LA's/Chicago's, with the last 7 championships won by smaller market teams.

The NFL/NHL/NBA all have been 1x-1.6x spread in spend between the highest and lowest spending teams. The closest we have in the US to European soccer is the MLB with a spread of 4.4x between top and bottom in 2025. Not coincidentally, the MLB doesn't have a salary cap (they have a luxury tax), so the wealthiest owners in New York and LA can spend significantly more than an Oakland (/Las Vegas), for example. You still see small market teams in the MLB with lots of success, but it's harder to sustain it when LA and NY are spending $350M while Oakland spends $75M. The small market owners who don't spend aren't off the hook - you see very stingy owners in places like Pittsburgh, Cincinnati, and even Chicago, but there's also a reason why the Yankees, Red Sox, and Dodgers are World Series favorites most years. Recently the Dodgers have really been taking advantage of the lack of a salary cap, and with the Tarik Skubal signing, their 5 starters might as well be an All Star team's starting rotation. 

There's a pretty stark jump when you get to the European soccer leagues. The Premier League is the closest to the US leagues when it comes to parity and spread between top-and-bottom spend. Man City has consistently spent the most since becoming owned by a Saudi royal, and they've won half of the past 16 Premier League titles. The other winners - Chelsea, Liverpool, Man United - are also among the top spending teams every year. Then there was the one wild year that Leicester City won, but that was one of the most improbable wins ever. They have less than a 6x spread between highest and lowest spenders (which is honestly surprising that it's so low), but even still there is little parity - only 5 different champions in the last 16 years. They also partly share TV revenue rights, which is something to note.

In the other leagues, there is almost total domination by a few teams - the highest spenders. Serie A has Juve, Inter, and AC Milan, with Napoli winning 2 of the last 3. But Juve won 9 titles in a row in this span. The Bundesliga and La Liga have a 10x+ spend gap between their highest and lowest spenders (La Liga is dominated by Barca and Madrid, with Atleti thrown in the mix sometimes, and Bayern has dominated the Bundesliga for the past 2 decades). Then Ligue 1 in France is almost a joke, with PSG probably outspending the entire rest of the league. It's more recent that they've completely dominated, but it's hard to imagine them losing another title race. They could spend 150M EUR on a player who completely busts and not miss a step.

The obvious point of note here is that none of the European soccer leagues have salary caps - I know there are penalties for spending in certain ways, but it doesn't seem to deter teams at all.

## Future Updates
- Further define HHI
- Research the financial models further of each sport
- Incorporate the fact that, for example, in baseball, they structure salaries creatively so as to pay as little as possible now but with massive payouts later. For now, the opening-day payroll makes sense.

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