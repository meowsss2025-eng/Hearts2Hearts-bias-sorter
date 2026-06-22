const members = [
  { name:"Jiwoo",  img:"https://cdn.discordapp.com/attachments/1420684325803921428/1518490310085312625/weverse_20260611_111551_2188792058.jpg?ex=6a3a1bce&is=6a38ca4e&hm=40bea396458ad21e3b7e9e97788fc3333cdd00203f735863e0c8908b1ef49a4d&" },
  { name:"Carmen", img:"https://cdn.discordapp.com/attachments/1420684325803921428/1518490310899142787/weverse_20260611_111642_442792395.jpg?ex=6a3a1bce&is=6a38ca4e&hm=47d6fdb181f29d6e49674bcee6b0eed4891318789dbc8a0a36a5a336837474c2&" },
  { name:"Yuha",   img:"https://cdn.discordapp.com/attachments/1420684325803921428/1518490310542360656/weverse_20260611_111606_1491031536.jpg?ex=6a3a1bce&is=6a38ca4e&hm=22217dc3c18edb20bb77a757d92cd775fa96225e238442a17dd882c52b1c7713&" },
  { name:"Stella", img:"https://cdn.discordapp.com/attachments/1420684325803921428/1518490311272300624/weverse_20260611_111656_4190740151.jpg?ex=6a3a1bce&is=6a38ca4e&hm=12194d1c2cab9031b3eedaf0b8baf927dba1030622ba3ba841f3a697ee5e7d2c&" },
  { name:"Juun",   img:"https://cdn.discordapp.com/attachments/1420684325803921428/1518490309388927101/weverse_20260611_110900_1018410289.jpg?ex=6a3a1bcd&is=6a38ca4d&hm=7634306795d07d4dd8f02a751e5758e7a43da5b7b6d08bc36a2871ec3918dab6&" },
  { name:"A-na",   img:"https://cdn.discordapp.com/attachments/1420684325803921428/1518490309032542339/weverse_20260611_110841_1418672623.jpg?ex=6a3a1bcd&is=6a38ca4d&hm=d24f2b3980d968392651a3c2bedf32a7c46b5650f5707924b2a1e7c272021031&" },
  { name:"Ian",    img:"https://cdn.discordapp.com/attachments/1420684325803921428/1518490308625829889/weverse_20260611_110522_1793089977.jpg?ex=6a3a1bcd&is=6a38ca4d&hm=abbbba86b92e1d23f19eb503cc7e1847abdb310a8c3446953d13e8d67d851451&" },
  { name:"Ye-on",  img:"https://cdn.discordapp.com/attachments/1420684325803921428/1518490309737320499/weverse_20260611_111534_4217788677.jpg?ex=6a3a1bce&is=6a38ca4e&hm=d7f1bde3d6ddbf18f94dc82228af086188b3bc21bebc81bef0da343a868dc53b&" }
];

let scores = {};
members.forEach(m => scores[m.name] = 0);

let matchups = [];
for (let i = 0; i < members.length; i++)
  for (let j = i + 1; j < members.length; j++)
    matchups.push([members[i], members[j]]);
matchups.sort(() => Math.random() - 0.5);

let current = 0;

function loadMatch() {
  if (current >= matchups.length) { showResults(); return; }
  const left = matchups[current][0];
  const right = matchups[current][1];
  document.getElementById("leftImg").src = left.img;
  document.getElementById("leftName").textContent = left.name;
  document.getElementById("rightImg").src = right.img;
  document.getElementById("rightName").textContent = right.name;
  const pct = Math.round((current / matchups.length) * 100);
  document.getElementById("progress").innerHTML = `Match ${current + 1} of ${matchups.length} &nbsp;&middot;&nbsp; ${pct}% SORTED`;
}

function pick(side) {
  const left = matchups[current][0];
  const right = matchups[current][1];
  if (side === "left") scores[left.name]++;
  else scores[right.name]++;
  current++;
  loadMatch();
}

function showResults() {
  document.getElementById("sorter").style.display = "none";
  document.getElementById("progress-wrap").style.display = "none";
  document.getElementById("subtitle").style.display = "none";
  const ranking = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  let html = "<h2>🏆 Your Bias Ranking</h2>";
  ranking.forEach(([name], index) => {
    const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`;
    html += `<div class="result">${medal} ${name}</div>`;
  });
  document.getElementById("results").innerHTML = html;
}

loadMatch();
