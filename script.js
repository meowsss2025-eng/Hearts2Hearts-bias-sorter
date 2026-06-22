const members = [
  { name:"Jiwoo",  img:"./Jiwoo.jpg" },
  { name:"Carmen", img:"./Carmen.jpg" },
  { name:"Yuha",   img:"./Yuha.jpg" },
  { name:"Stella", img:"./Stella.jpg" },
  { name:"Juun",   img:"./Juun.jpg" },
  { name:"A-na",   img:"./A-na.jpg" },
  { name:"Ian",    img:"./Ian.jpg" },
  { name:"Ye-on",  img:"./Ye-on.jpg" }
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
    html += `<div class=\"result\">${medal} ${name}</div>`;
  });
  document.getElementById("results").innerHTML = html;
}

loadMatch();
