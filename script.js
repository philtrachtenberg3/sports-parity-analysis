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
      tile.title = `${year}: ${team}`;
      tile.innerHTML = `${team.length>10? team.slice(0,3).toUpperCase() : team.split(' ').map(w=>w[0]).join('').toUpperCase()}<span class="yr">${String(year).slice(2)}</span>`;
      tilesEl.appendChild(tile);
    });
    const topTeam = [...colorMap.keys()].map(name=>({name,count:l.champs.filter(c=>c[1]===name).length})).sort((a,b)=>b.count-a.count)[0];
    card.querySelector('.mosaic-foot').textContent = `Most titles: ${topTeam.name} (${topTeam.count}). ${new Set(l.champs.map(c=>c[1])).size} teams won at least once.`;
    mosaicGrid.appendChild(card);
  });
});
