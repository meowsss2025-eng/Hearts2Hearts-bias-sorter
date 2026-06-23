const members = [
{
    name:"Jiwoo",
 img:"https://drive.google.com/file/d/1IDd3jpJsbaIVs0i2UJCChFLyNQsOKgLL/view?usp=drivesdk"
},
{
    name:"Carmen",
    img:"https://drive.google.com/file/d/1dCdwHC_sGf9HWCCHFuD11Oik-6K1U6_g/view?usp=drivesdk"
},
{
    name:"Yuha",
    img:"https://drive.google.com/file/d/1zf4jJhN8wZVhqaFw0SzcGikAQMsbej_d/view?usp=drivesdk"
},
{
    name:"Stella",
    img:"https://drive.google.com/file/d/128HKaKHdOObi5sSZk9tXUTpAzgwzuY42/view?usp=drivesdk"
},
{
    name:"Juun",
    img:"https://drive.google.com/file/d/1h7XWMo56wxu1oD3SeoRNmML-zxaX-eUS/view?usp=drivesdk"
},
{
    name:"A-na",
    img:"https://drive.google.com/file/d/1IguHeqJgza76jiLli6q6a0pOuKJuUuuO/view?usp=drivesdk"
},
{
    name:"Ian",
    img:"https://drive.google.com/file/d/1nVXzZnelQA9zm9cpdXbt1rYcsR0eDKxO/view?usp=drivesdk"
},
{
    name:"Ye-on",
    img:"https://drive.google.com/file/d/1ck98-ZnjA-nI8PrClovh2Dk0dWT_3Edj/view?usp=drivesdk"
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