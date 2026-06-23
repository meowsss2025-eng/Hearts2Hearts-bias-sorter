const members = [
{
    name:"Jiwoo",
 img:"https://imgur.com/gallery/jiwoo-lemon-tang-HDhBWxY"
},
{
    name:"Carmen",
    img:"https://imgur.com/gallery/carmen-lemon-tang-S30ZwzU"
},
{
    name:"Yuha",
    img:"https://imgur.com/gallery/yuha-lemon-tang-w3QrtG2"
},
{
    name:"Stella",
    img:"https://imgur.com/gallery/stella-lemon-tang-Plm2wuN"
},
{
    name:"Juun",
    img:"https://imgur.com/gallery/juun-lemon-tang-WmEdQOF"
},
{
    name:"A-na",
    img:"https://imgur.com/gallery/na-lemon-tang-px6CdcZ"
},
{
    name:"Ian",
    img:"https://imgur.com/gallery/ian-lemon-tang-BhpGctO"
},
{
    name:"Ye-on",
    img:"https://imgur.com/gallery/ye-on-lemon-tang-GqLASIp"
}
];

let scores = {};
members.forEach(member => scores[member.name] = 0);

let matchups = [];

for(let i = 0; i < members.length; i++){
    for(let j = i + 1; j < members.length; j++){
        matchups.push([members[i], members[j]]);
    }
}

matchups.sort(() => Math.random() - 0.5);

let current = 0;

function loadMatch(){

    if(current >= matchups.length){
        showResults();
        return;
    }

    const left = matchups[current][0];
    const right = matchups[current][1];

    document.getElementById("leftImg").src = left.img;
    document.getElementById("leftName").textContent = left.name;

    document.getElementById("rightImg").src = right.img;
    document.getElementById("rightName").textContent = right.name;

    document.getElementById("progress").textContent =
        `Match ${current + 1} of ${matchups.length}`;
}

function pick(side){

    const left = matchups[current][0];
    const right = matchups[current][1];

    if(side === "left"){
        scores[left.name]++;
    }else{
        scores[right.name]++;
    }

    current++;
    loadMatch();
}

function showResults(){

    document.getElementById("sorter").style.display = "none";
    document.getElementById("progress").style.display = "none";

    const ranking = Object.entries(scores)
        .sort((a,b) => b[1] - a[1]);

    let html = "<h2>🏆 Final Ranking</h2>";

    ranking.forEach((member,index)=>{

        let medal = "";

        if(index === 0) medal = "🥇";
        if(index === 1) medal = "🥈";
        if(index === 2) medal = "🥉";

        html += `
        <div class="result">
            <h3>${medal} #${index+1} ${member[0]}</h3>
        </div>
        `;
    });

    document.getElementById("results").innerHTML = html;
}

loadMatch();