const members = [
  { name:"Jiwoo",  img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097567118786702/weverse_20260611_111551_2188792058.jpg?ex=6a38ae08&is=6a375c88&hm=160135b22a5f62f10f5777c3965fe37464b17896f2c5b846fac3d4923908a881&" },
  { name:"Carmen", img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097568029081730/weverse_20260611_111642_442792395.jpg?ex=6a38ae09&is=6a375c89&hm=22a9475ac316202354d769cdd683d5310ec2a72e518358b41c17c3e164f50ac2&" },
  { name:"Yuha",   img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097567676633260/weverse_20260611_111606_1491031536.jpg?ex=6a38ae09&is=6a375c89&hm=aa36fa7901169d27bb9b268d240a054fb7d3206b9c73a4c804b15021d12201a0&" },
  { name:"Stella", img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097568377077812/weverse_20260611_111656_4190740151.jpg?ex=6a38ae09&is=6a375c89&hm=fb96d7ae0a4bbf21da1b63c695ccfaeb3c1ebc68229d0fc764e43040d881569d&" },
  { name:"Juun",   img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097566326067362/weverse_20260611_110859_1203436051.jpg?ex=6a38ae08&is=6a375c88&hm=5a7e24f0b64b6d9ace32b41155a0c4c650d4d127ddd82a8fb8190a79bd2bbd7c&" },
  { name:"A-na",   img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097565546053833/weverse_20260611_110841_1418672623.jpg?ex=6a38ae08&is=6a375c88&hm=9702246f9965b291d7787a2ed7816a5bae4e6f037df6453c3255423776e97276&" },
  { name:"Ian",    img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097565898244116/weverse_20260611_110522_1793089977.jpg?ex=6a38ae08&is=6a375c88&hm=b3cdc0bd9319ab6f807602ec8d0a3706b20ee52087b88496f19aa723858810b4&" },
  { name:"Ye-on",  img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097566712070224/weverse_20260611_111534_4217788677.jpg?ex=6a38ae08&is=6a375c88&hm=281042ebb710ccff325651eccfeebec077098f471a59298447f4a775e0fc0fe6&" }
];

const i18n = {
  en: {
    subtitle: "Choose your favorite member in each battle!",
    progress: (cur, total, pct) => `Match ${cur} of ${total} &nbsp;·&nbsp; ${pct}% SORTED`,
    ranking: "🏆 Your Bias Ranking",
    notice_title: "Notice",
    close: "Close",
    lang_btn: "🌐 Language",
    notice_btn: "📢 Notice"
  },
  ko: {
    subtitle: "각 배틀에서 가장 좋아하는 멤버를 선택하세요!",
    progress: (cur, total, pct) => `${cur} / ${total} 매치 &nbsp;·&nbsp; ${pct}% 완료`,
    ranking: "🏆 당신의 최애 순위",
    notice_title: "공지",
    close: "닫기",
    lang_btn: "🌐 언어",
    notice_btn: "📢 공지"
  },
  zh: {
    subtitle: "在每场对决中选择你最喜欢的成员！",
    progress: (cur, total, pct) => `第 ${cur} / ${total} 场 &nbsp;·&nbsp; ${pct}% 完成`,
    ranking: "🏆 你的最爱排名",
    notice_title: "通知",
    close: "关闭",
    lang_btn: "🌐 语言",
    notice_btn: "📢 通知"
  },
  ja: {
    subtitle: "各バトルで一番好きなメンバーを選んでね！",
    progress: (cur, total, pct) => `${cur} / ${total} マッチ &nbsp;·&nbsp; ${pct}% 完了`,
    ranking: "🏆 あなたの推しランキング",
    notice_title: "お知らせ",
    close: "閉じる",
    lang_btn: "🌐 言語",
    notice_btn: "📢 お知らせ"
  },
  id: {
    subtitle: "Pilih anggota favoritmu di setiap pertarungan!",
    progress: (cur, total, pct) => `Pertandingan ${cur} dari ${total} &nbsp;·&nbsp; ${pct}% SELESAI`,
    ranking: "🏆 Peringkat Bias Kamu",
    notice_title: "Pengumuman",
    close: "Tutup",
    lang_btn: "🌐 Bahasa",
    notice_btn: "📢 Pengumuman"
  },
  es: {
    subtitle: "¡Elige tu miembro favorito en cada batalla!",
    progress: (cur, total, pct) => `Batalla ${cur} de ${total} &nbsp;·&nbsp; ${pct}% COMPLETADO`,
    ranking: "🏆 Tu Ranking de Bias",
    notice_title: "Aviso",
    close: "Cerrar",
    lang_btn: "🌐 Idioma",
    notice_btn: "📢 Aviso"
  }
};

let currentLang = "en";

function setLang(lang) {
  currentLang = lang;
  const t = i18n[lang];
  document.getElementById("subtitle").innerHTML = t.subtitle;
  document.querySelector("#notice-box h2").innerHTML = "📢 " + t.notice_title;
  document.getElementById("close-notice").innerHTML = "✕ " + t.close;
  const pct = Math.round((current / matchups.length) * 100);
  document.getElementById("progress").innerHTML = t.progress(current + 1, matchups.length, pct);
  document.getElementById("lang-menu").classList.remove("open");
  const resultsDiv = document.getElementById("results");
  if (resultsDiv.innerHTML !== "") showResults();
}

function toggleLangMenu() {
  document.getElementById("lang-menu").classList.toggle("open");
  document.getElementById("notice-modal").classList.remove("open");
}

function toggleNotice() {
  document.getElementById("notice-modal").classList.toggle("open");
  document.getElementById("lang-menu").classList.remove("open");
}

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
  const [left, right] = matchups[current];
  document.getElementById("leftImg").src = left.img;
  document.getElementById("leftName").textContent = left.name;
  document.getElementById("rightImg").src = right.img;
  document.getElementById("rightName").textContent = right.name;
  const pct = Math.round((current / matchups.length) * 100);
  const t = i18n[currentLang];
  document.getElementById("progress").innerHTML = t.progress(current + 1, matchups.length, pct);
}

function pick(side) {
  const [left, right] = matchups[current];
  if (side === "left") scores[left.name]++;
  else scores[right.name]++;
  current++;
  loadMatch();
}

function showResults() {
  document.getElementById("sorter").style.display = "none";
  document.getElementById("progress-wrap").style.display = "none";
  document.getElementById("subtitle").style.display = "none";
  const t = i18n[currentLang];
  const ranking = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  let html = `<h2>${t.ranking}</h2>`;
  ranking.forEach(([name], index) => {
    const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`;
    html += `<div class="result">${medal} ${name}</div>`;
  });
  document.getElementById("results").innerHTML = html;
}

loadMatch();
