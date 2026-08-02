/* ---------- DATA ----------
 * Researched dataset: champions per season, HHI concentration scores, and
 * spend-spread ratios for the NFL/NBA/MLB/NHL and Europe's top 5 football
 * leagues, 2010–2025. Verified against league sources and current reporting
 * as of August 2026 — do not edit numbers, team names, or years here without
 * checking with Phil first.
 */
const leagues = [
  {
    id:'nfl', name:'NFL', region:'us', distinct:11, hhi:1172,
    spread:1.0,
    champs:[
      [2010,'Saints'],[2011,'Packers'],[2012,'Giants'],[2013,'Ravens'],[2014,'Seahawks'],
      [2015,'Patriots'],[2016,'Broncos'],[2017,'Patriots'],[2018,'Eagles'],[2019,'Patriots'],
      [2020,'Chiefs'],[2021,'Buccaneers'],[2022,'Rams'],[2023,'Chiefs'],[2024,'Chiefs'],[2025,'Eagles']
    ]
  },
  {
    id:'nba', name:'NBA', region:'us', distinct:11, hhi:1250,
    spread:1.55,
    champs:[
      [2010,'Lakers'],[2011,'Mavericks'],[2012,'Heat'],[2013,'Heat'],[2014,'Spurs'],
      [2015,'Warriors'],[2016,'Cavaliers'],[2017,'Warriors'],[2018,'Warriors'],[2019,'Raptors'],
      [2020,'Lakers'],[2021,'Bucks'],[2022,'Warriors'],[2023,'Nuggets'],[2024,'Celtics'],[2025,'Thunder']
    ]
  },
  {
    id:'mlb', name:'MLB', region:'us', distinct:10, hhi:1250,
    spread:4.4,
    champs:[
      [2010,'Giants'],[2011,'Cardinals'],[2012,'Giants'],[2013,'Red Sox'],[2014,'Giants'],
      [2015,'Royals'],[2016,'Cubs'],[2017,'Astros'],[2018,'Red Sox'],[2019,'Nationals'],
      [2020,'Dodgers'],[2021,'Braves'],[2022,'Astros'],[2023,'Rangers'],[2024,'Dodgers'],[2025,'Dodgers']
    ]
  },
  {
    id:'nhl', name:'NHL', region:'us', distinct:10, hhi:1172,
    spread:1.35,
    champs:[
      [2010,'Blackhawks'],[2011,'Bruins'],[2012,'Kings'],[2013,'Blackhawks'],[2014,'Kings'],
      [2015,'Blackhawks'],[2016,'Penguins'],[2017,'Penguins'],[2018,'Capitals'],[2019,'Blues'],
      [2020,'Lightning'],[2021,'Lightning'],[2022,'Avalanche'],[2023,'Golden Knights'],[2024,'Panthers'],[2025,'Panthers']
    ]
  },
  {
    id:'epl', name:'Premier League', region:'eu', distinct:5, hhi:3203,
    spread:5.6,
    champs:[
      [2010,'Chelsea'],[2011,'Man United'],[2012,'Man City'],[2013,'Man United'],[2014,'Man City'],
      [2015,'Chelsea'],[2016,'Leicester'],[2017,'Chelsea'],[2018,'Man City'],[2019,'Man City'],
      [2020,'Liverpool'],[2021,'Man City'],[2022,'Man City'],[2023,'Man City'],[2024,'Man City'],[2025,'Liverpool']
    ]
  },
  {
    id:'bund', name:'Bundesliga', region:'eu', distinct:3, hhi:6797,
    spread:10,
    champs:[
      [2010,'Bayern'],[2011,'Dortmund'],[2012,'Dortmund'],[2013,'Bayern'],[2014,'Bayern'],
      [2015,'Bayern'],[2016,'Bayern'],[2017,'Bayern'],[2018,'Bayern'],[2019,'Bayern'],
      [2020,'Bayern'],[2021,'Bayern'],[2022,'Bayern'],[2023,'Bayern'],[2024,'Leverkusen'],[2025,'Bayern']
    ]
  },
  {
    id:'liga', name:'La Liga', region:'eu', distinct:3, hhi:4297,
    spread:12,
    champs:[
      [2010,'Barcelona'],[2011,'Barcelona'],[2012,'Real Madrid'],[2013,'Barcelona'],[2014,'Atletico'],
      [2015,'Barcelona'],[2016,'Barcelona'],[2017,'Real Madrid'],[2018,'Barcelona'],[2019,'Barcelona'],
      [2020,'Real Madrid'],[2021,'Atletico'],[2022,'Real Madrid'],[2023,'Barcelona'],[2024,'Real Madrid'],[2025,'Barcelona']
    ]
  },
  {
    id:'seriea', name:'Serie A', region:'eu', distinct:4, hhi:3828,
    spread:7,
    champs:[
      [2010,'Inter'],[2011,'AC Milan'],[2012,'Juventus'],[2013,'Juventus'],[2014,'Juventus'],
      [2015,'Juventus'],[2016,'Juventus'],[2017,'Juventus'],[2018,'Juventus'],[2019,'Juventus'],
      [2020,'Juventus'],[2021,'Inter'],[2022,'AC Milan'],[2023,'Napoli'],[2024,'Inter'],[2025,'Napoli']
    ]
  },
  {
    id:'ligue1', name:'Ligue 1', region:'eu', distinct:5, hhi:5000,
    spread:9,
    champs:[
      [2010,'Marseille'],[2011,'Lille'],[2012,'Montpellier'],[2013,'PSG'],[2014,'PSG'],
      [2015,'PSG'],[2016,'PSG'],[2017,'Monaco'],[2018,'PSG'],[2019,'PSG'],
      [2020,'PSG'],[2021,'Lille'],[2022,'PSG'],[2023,'PSG'],[2024,'PSG'],[2025,'PSG']
    ]
  }
];
