const members = [
{
    name:"Jiwoo",
 img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097567118786702/weverse_20260611_111551_2188792058.jpg?ex=6a38ae08&is=6a375c88&hm=160135b22a5f62f10f5777c3965fe37464b17896f2c5b846fac3d4923908a881&"
},
{
    name:"Carmen",
    img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097568029081730/weverse_20260611_111642_442792395.jpg?ex=6a38ae09&is=6a375c89&hm=22a9475ac316202354d769cdd683d5310ec2a72e518358b41c17c3e164f50ac2&"
},
{
    name:"Yuha",
    img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097567676633260/weverse_20260611_111606_1491031536.jpg?ex=6a38ae09&is=6a375c89&hm=aa36fa7901169d27bb9b268d240a054fb7d3206b9c73a4c804b15021d12201a0&"
},
{
    name:"Stella",
    img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097568377077812/weverse_20260611_111656_4190740151.jpg?ex=6a38ae09&is=6a375c89&hm=fb96d7ae0a4bbf21da1b63c695ccfaeb3c1ebc68229d0fc764e43040d881569d&"
},
{
    name:"Juun",
    img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097566326067362/weverse_20260611_110859_1203436051.jpg?ex=6a38ae08&is=6a375c88&hm=5a7e24f0b64b6d9ace32b41155a0c4c650d4d127ddd82a8fb8190a79bd2bbd7c&"
},
{
    name:"A-na",
    img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097565546053833/weverse_20260611_110841_1418672623.jpg?ex=6a38ae08&is=6a375c88&hm=9702246f9965b291d7787a2ed7816a5bae4e6f037df6453c3255423776e97276&"
},
{
    name:"Ian",
    img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097565898244116/weverse_20260611_110522_1793089977.jpg?ex=6a38ae08&is=6a375c88&hm=b3cdc0bd9319ab6f807602ec8d0a3706b20ee52087b88496f19aa723858810b4&"
},
{
    name:"Ye-on",
    img:"https://cdn.discordapp.com/attachments/1403193467253035219/1518097566712070224/weverse_20260611_111534_4217788677.jpg?ex=6a38ae08&is=6a375c88&hm=281042ebb710ccff325651eccfeebec077098f471a59298447f4a775e0fc0fe6&"
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