/* ---------- RENDERING ----------
 * Chart.js setup and mosaic-grid rendering. Reads the `leagues` dataset
 * defined in data.js — this file has no numbers of its own.
 */
const US = '#2dd4bf';
const EU = '#f0b429';

const chartDefaults = {
  color: '#8a99ab',
  font: { family: 'Inter', size: 12 }
};
Chart.defaults.color = chartDefaults.color;
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.borderColor = '#232e3d';

// Defensive wrapper: if any single chart/section fails, show a visible message
// in that specific holder instead of silently leaving it blank or killing
// the rest of the script.
function renderSafely(label, holderId, fn){
  try{
    fn();
  }catch(err){
    console.error(`[${label}] failed:`, err);
    const el = document.getElementById(holderId);
    if(el){
      el.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#5f6f82;font-size:13px;text-align:center;padding:20px;">Chart failed to render (${label}). Check the browser console for details.</div>`;
    }
  }
}

// ---------- DIVERSITY BAR CHART ----------
renderSafely('diversity chart', 'diversityChart', () => {
  const diversitySorted = [...leagues].sort((a,b)=>b.distinct-a.distinct);
  new Chart(document.getElementById('diversityChart'), {
    type:'bar',
    data:{
      labels: diversitySorted.map(l=>l.name),
      datasets:[{
        label:'Distinct champions (of 16)',
        data: diversitySorted.map(l=>l.distinct),
        backgroundColor: diversitySorted.map(l=> l.region==='us' ? US : EU),
        borderRadius:6,
        maxBarThickness:52
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false},
        tooltip:{ callbacks:{ label:(c)=> `${c.raw} of 16 seasons had a different champion` } }
      },
      scales:{
        y:{ beginAtZero:true, max:16, grid:{color:'#1a2330'}, ticks:{stepSize:2} },
        x:{ grid:{display:false} }
      }
    }
  });
});

// ---------- HHI CHART ----------
renderSafely('HHI chart', 'hhiChart', () => {
  const hhiSorted = [...leagues].sort((a,b)=>a.hhi-b.hhi);
  new Chart(document.getElementById('hhiChart'), {
    type:'bar',
    data:{
      labels: hhiSorted.map(l=>l.name),
      datasets:[{
        label:'Championship HHI',
        data: hhiSorted.map(l=>l.hhi),
        backgroundColor: hhiSorted.map(l=> l.region==='us' ? US : EU),
        borderRadius:6,
        maxBarThickness:52
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false},
        tooltip:{ callbacks:{ label:(c)=> `HHI ${c.raw.toLocaleString()}` } }
      },
      scales:{
        y:{ beginAtZero:true, grid:{color:'#1a2330'} },
        x:{ grid:{display:false} }
      }
    }
  });
});

// ---------- SCATTER: SPEND SPREAD VS HHI ----------
renderSafely('spend-vs-parity scatter chart', 'scatterChart', () => {
  new Chart(document.getElementById('scatterChart'), {
    type:'scatter',
    data:{
      datasets:[
        {
          label:'US capped leagues',
          data: leagues.filter(l=>l.region==='us').map(l=>({x:l.spread, y:l.hhi, name:l.name})),
          backgroundColor: US,
          pointRadius:9, pointHoverRadius:11
        },
        {
          label:'European football leagues',
          data: leagues.filter(l=>l.region==='eu').map(l=>({x:l.spread, y:l.hhi, name:l.name})),
          backgroundColor: EU,
          pointRadius:9, pointHoverRadius:11
        }
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{ position:'top', align:'end', labels:{boxWidth:10, boxHeight:10, usePointStyle:true} },
        tooltip:{ callbacks:{ label:(c)=> `${c.raw.name}: ${c.raw.x}x spread, HHI ${c.raw.y.toLocaleString()}` } }
      },
      scales:{
        x:{
          type:'logarithmic',
          title:{display:true, text:'Spend spread (top ÷ bottom, log scale)', color:'#8a99ab'},
          grid:{color:'#1a2330'},
          min:0.9, max:15
        },
        y:{
          title:{display:true, text:'Championship HHI', color:'#8a99ab'},
          grid:{color:'#1a2330'},
          beginAtZero:false, min:800, max:7500
        }
      }
    }
  });
});

// ---------- MOSAICS ----------
const palette = ['#2dd4bf','#f0b429','#ef5b5b','#7c8cff','#4ade80','#c084fc','#fb923c','#60a5fa','#f472b6','#a3e635','#5eead4'];

function colorFor(map, name){
  if(!map.has(name)){
    map.set(name, palette[map.size % palette.length]);
  }
  return map.get(name);
}

// ESPN team logos: US leagues use ESPN's CDN slug convention. European clubs
// use their Wikipedia crest SVG directly since ESPN doesn't host those.
// https://a.espncdn.com/i/teamlogos/{league}/500/{slug}.png
const teamLogos = {
  nfl: {
    Saints:'no', Packers:'gb', Giants:'nyg', Ravens:'bal', Seahawks:'sea',
    Patriots:'ne', Broncos:'den', Eagles:'phi', Chiefs:'kc', Buccaneers:'tb', Rams:'lar'
  },
  nba: {
    Lakers:'lal', Mavericks:'dal', Heat:'mia', Spurs:'sa', Warriors:'gs',
    Cavaliers:'cle', Raptors:'tor', Bucks:'mil', Nuggets:'den', Celtics:'bos', Thunder:'okc'
  },
  mlb: {
    Giants:'sf', Cardinals:'stl', 'Red Sox':'bos', Royals:'kc', Cubs:'chc',
    Astros:'hou', Nationals:'wsh', Dodgers:'lad', Braves:'atl', Rangers:'tex'
  },
  nhl: {
    Blackhawks:'chi', Bruins:'bos', Kings:'la', Penguins:'pit', Capitals:'wsh',
    Blues:'stl', Lightning:'tb', Avalanche:'col', 'Golden Knights':'vgk', Panthers:'fla'
  },
  epl: {
    Chelsea:'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
    'Man United':'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    'Man City':'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    Leicester:'https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg',
    Liverpool:'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg'
  },
  bund: {
    Bayern:'https://upload.wikimedia.org/wikipedia/commons/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg',
    Dortmund:'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
    Leverkusen:'https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg'
  },
  liga: {
    Barcelona:'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    'Real Madrid':'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    Atletico:'https://upload.wikimedia.org/wikipedia/en/f/f9/Atletico_Madrid_Logo_2024.svg'
  },
  seriea: {
    Inter:'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
    'AC Milan':'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
    Juventus:'https://upload.wikimedia.org/wikipedia/commons/e/ed/Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg',
    Napoli:'https://upload.wikimedia.org/wikipedia/commons/4/4d/SSC_Napoli_2025_%28white_and_azure%29.svg'
  },
  ligue1: {
    Marseille:'https://upload.wikimedia.org/wikipedia/commons/4/4f/Olympique_de_Marseille_2026_logo.svg',
    Lille:'https://upload.wikimedia.org/wikipedia/en/3/3f/Lille_OSC_2018_logo.svg',
    Montpellier:'https://upload.wikimedia.org/wikipedia/en/a/a8/Montpellier_HSC_logo.svg',
    PSG:'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    Monaco:'https://upload.wikimedia.org/wikipedia/en/c/cf/LogoASMonacoFC2021.svg'
  }
};

function logoUrlFor(leagueId, team){
  const slug = teamLogos[leagueId] && teamLogos[leagueId][team];
  if(!slug) return null;
  return slug.startsWith('http') ? slug : `https://a.espncdn.com/i/teamlogos/${leagueId}/500/${slug}.png`;
}

// Single shared custom tooltip, positioned per-tile on hover so it can
// replace the plain browser title tooltip with something theme-matched.
const mosaicTooltip = document.createElement('div');
mosaicTooltip.className = 'mosaic-tooltip';
document.body.appendChild(mosaicTooltip);

function showMosaicTooltip(target, text){
  mosaicTooltip.textContent = text;
  mosaicTooltip.classList.add('visible');
  const rect = target.getBoundingClientRect();
  const tRect = mosaicTooltip.getBoundingClientRect();
  let left = rect.left + rect.width / 2 - tRect.width / 2;
  left = Math.max(6, Math.min(left, window.innerWidth - tRect.width - 6));
  let top = rect.top - tRect.height - 8;
  if(top < 6) top = rect.bottom + 8;
  mosaicTooltip.style.left = `${left}px`;
  mosaicTooltip.style.top = `${top}px`;
}

function hideMosaicTooltip(){
  mosaicTooltip.classList.remove('visible');
}

renderSafely('title mosaics', 'mosaicGrid', () => {
  const mosaicGrid = document.getElementById('mosaicGrid');
  leagues.forEach(l=>{
    const colorMap = new Map();
    const card = document.createElement('div');
    card.className = 'mosaic-card';
    card.innerHTML = `
      <div class="mosaic-card-head">
        <h3>${l.name}</h3>
        <div class="mosaic-metrics">${l.distinct}/16 champs · HHI ${l.hhi.toLocaleString()}</div>
      </div>
      <div class="mosaic-tiles"></div>
      <div class="mosaic-foot"></div>
    `;
    const tilesEl = card.querySelector('.mosaic-tiles');
    l.champs.forEach(([year, team])=>{
      const c = colorFor(colorMap, team);
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.style.background = c;

      const logoUrl = logoUrlFor(l.id, team);

      const initials = document.createElement('span');
      initials.className = 'tile-initials';
      initials.textContent = team.length>10? team.slice(0,3).toUpperCase() : team.split(' ').map(w=>w[0]).join('').toUpperCase();
      if(logoUrl) initials.style.display = 'none';
      tile.appendChild(initials);

      if(logoUrl){
        const img = document.createElement('img');
        img.className = 'tile-logo';
        img.alt = '';
        img.loading = 'lazy';
        img.onerror = () => { img.remove(); initials.style.display = ''; };
        img.src = logoUrl;
        tile.appendChild(img);
      }

      const yr = document.createElement('span');
      yr.className = 'yr';
      yr.textContent = String(year).slice(2);
      tile.appendChild(yr);

      const tooltipText = `${year}: ${team}`;
      tile.addEventListener('mouseenter', () => showMosaicTooltip(tile, tooltipText));
      tile.addEventListener('mouseleave', hideMosaicTooltip);

      tilesEl.appendChild(tile);
    });
    const topTeam = [...colorMap.keys()].map(name=>({name,count:l.champs.filter(c=>c[1]===name).length})).sort((a,b)=>b.count-a.count)[0];
    card.querySelector('.mosaic-foot').textContent = `Most titles: ${topTeam.name} (${topTeam.count}). ${new Set(l.champs.map(c=>c[1])).size} teams won at least once.`;
    mosaicGrid.appendChild(card);
  });
});
