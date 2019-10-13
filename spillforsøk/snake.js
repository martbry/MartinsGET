// JavaScript source code

//TODO: Øke hastigheten?
//Mulighet for å "gå gjennom" vegger?
//High score må bli topp 10

var canv = document.getElementById("canvas");
var ctx = canv.getContext("2d");
var startknapp = document.getElementById("start");
var poengliste = document.getElementById("poengliste");
var navninput = document.getElementById("input");
var bekreftknapp = document.getElementById("bekreft");
var slangestorrelse;
var lengde = 1;
var slange;
var slangevarsist;
var piltast;
var nesteretning;
var intervalltid;
var ferdig;
var spillstartet;
var timeAlive;
var eple;

//var poeng = document.getElementById("poeng").innerHTML;


function reset() {
    slangestorrelse = 50;
    lengde = 1;
    slange = [[50, 500, slangestorrelse, slangestorrelse]];
    slangevarsist = [];
    piltast = "hoyre";
    nesteretning = "hoyre";
    intervalltid = 150;
    ferdig = false;
    spillstartet = false;
    timeAlive = 0;
    eple = [];
    navninput.style.display = "none";
    bekreftknapp.style.display = "none";
    canv.style.borderColor = "black";
    canv.style.borderWidth = "initial";

}

//var stopp =
function begin() {
    startknapp.disabled = true;
    reset();
    genererMat();
    spillstartet = true;
    var stopp = setInterval(function tegn() {
        update();
        ctx.clearRect(0, 0, canv.width, canv.height);
        tegnSlange();
        tegnBrettramme();
        if (ferdig == true) {
            clearInterval(stopp);
            gameOver();
        }
    }, intervalltid);
}




function update() {
    if (utenfor()) {
        ferdig = true;
    } else {
        if (lovligRetning()) {
            piltast = nesteretning;
        }
        oppdaterSlangeVarSist();
        retning(piltast);
    }
}

function endrePiltast(trykket) {
    if (trykket.keyCode == 37) {
        nesteretning = "venstre";
    } else if (trykket.keyCode == 38) {
        nesteretning = "opp";
    } else if (trykket.keyCode == 39) {
        nesteretning = "hoyre";
    } else if (trykket.keyCode == 40) {
        nesteretning = "ned";
    }
}

function lovligRetning() {
    if (nesteretning == "venstre") {
        if (piltast == "hoyre") {
            return false;
        }
        piltast = "venstre";
    }

    if (nesteretning == "opp") {
        if (piltast == "ned") {
            return false;
        }
        piltast = "opp";
    }

    if (nesteretning == "hoyre") {
        if (piltast == "venstre") {
            return false;
        }
        piltast = "hoyre";
    }

    if (nesteretning == "ned") {
        if (piltast == "opp") {
            return false;
        }
    }

    return true;
}

function oppdaterSlangeVarSist() {
    var slangekopi = JSON.stringify(slange[0]);
    slangevarsist.unshift(JSON.parse(slangekopi));
    slangevarsist.length = lengde;
}

function utenfor() {
    if (slange[0][0] > canv.width - 100 || slange[0][0] < 50 || slange[0][1] > canvas.height - 100 || slange[0][1] < 50) {
        return true;
    } else {
        return false;
    }
}

function retning(vei) {
    if (vei == "hoyre") {
        slange[0][0] += 50;
        return;
    } else if (vei == "venstre") {
        slange[0][0] -= 50;
    } else if (vei == "ned") {
        slange[0][1] += 50;
    } else if (vei == "opp") {
        slange[0][1] -= 50;
    }
}

function tegnSlange() {
    ctx.fillStyle = "red";
    ctx.fillRect(eple[0], eple[1], eple[2], eple[3]);

    ctx.fillStyle = "black";
    ctx.fillRect(slange[0][0], slange[0][1], slange[0][2], slange[0][3]);
    if (slange[0][0] == eple[0] - 10 && slange[0][1] == eple[1] - 10) {
        lengde += 1;
        if (lengde == 140) {
            vunnet();
        }
        genererMat();
    }

    ctx.fillStyle = "grey";
    if (lengde > 1) {
        for (i = 0; i < lengde - 1; i++) {
            ctx.strokeRect(slangevarsist[i][0], slangevarsist[i][1], slangestorrelse, slangestorrelse);
            if (slange[0][0] == slangevarsist[i][0] && slange[0][1] == slangevarsist[i][1]) {
                ferdig = true;
            }
        }
    }
}

function tegnBrettramme() {
    ctx.strokeRect(50, 50, 700, 500);
}

function genererMat() {
    var breddeplassering = Math.round(Math.floor((Math.random() * 650) + 75) / 50) * 50;
    var hoydeplassering = Math.round(Math.floor((Math.random() * 450) + 75) / 50) * 50;


    if (lengde > 1) {
        for (i = 0; i < lengde - 1; i++) {
            if ((breddeplassering == slangevarsist[i][0] && hoydeplassering == slangevarsist[i][1]) || (breddeplassering == slange[0][0] && hoydeplassering == slange[0][1])) {
                genererMat();
                return;
            }
        }
    }

    eple = [breddeplassering + 10, hoydeplassering + 10, 30, 30];
}

function gameOver() {
    navninput.style.display = "initial";
    bekreftknapp.style.display = "initial";
    spillstartet = false;
    ctx.font = "60px Arial";
    ctx.fillStyle = "red";

    ctx.fillRect(slange[0][0], slange[0][1], slange[0][2], slange[0][3]);

    ctx.fillText("Game over!", 200, 300);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Du spiste " + (lengde - 1) + " epler!", 200, 400);
    canv.style.borderColor = "red";
    canv.style.borderWidth = "thick";
    startknapp.disabled = false;
}

function vunnet() {
    navninput.style.display = "initial";
    bekreftknapp.style.display = "initial";
    spillstartet = false;
    ctx.font = "60px Arial";
    ctx.fillStyle = "green";
    ctx.fillRect(slange[0][0], slange[0][1], slange[0][2], slange[0][3]);

    ctx.fillText("Du vant!", 200, 300);
    ctx.font = "20px Arial";
    ctx.fillText("Du spiste " + (lengde - 1) + " epler!", 200, 400);
    canv.style.borderColor = "green";
    startknapp.disabled = false;

}

function rightCTRLStart(knappTrykt) {
    if (spillstartet == true) {
        return;
    }
    if (knappTrykt.keyCode == 17 && knappTrykt.location == 2) {
        begin();
    }
}

function skrivPoeng() {
    //localStorage.clear();
    var topp10 = [];
    var teller = 0;

    document.getElementById("input").style.display = "none";
    document.getElementById("bekreft").style.display = "none";

    //første gang man spiller:
    if (localStorage.getItem("highscore0") == undefined && arguments.length == 1) {
        return;
    }

    //spilt før:
    for (i = 0; i < 10; i++) {
        if (localStorage.getItem("highscore" + i) != undefined) {

            let score = JSON.parse(localStorage.getItem("highscore" + i));
            var obj = { "navn": score.navn, "poeng": parseInt(score.poeng) };
            //var objkopi = JSON.stringify(obj);
            //topp10.push(JSON.parse(objkopi));
            topp10.push(obj);
            teller++;
            //console.log(topp10[i].navn + " " + topp10[i].poeng);
        }
    }

    if (lengde - 1 > 0) {
        var dennerunda = { "navn": navninput.value, "poeng": (lengde - 1) };
        topp10.push(dennerunda);
    }
    

    topp10.sort((a, b) => {
        if (a.poeng > b.poeng) {
            return -1;
        } else {
            return 1;
        }
    })

    topp10.length = 10;

    document.getElementById("hoyestepoengsum").innerHTML = "";

    for (i = 0; i < topp10.length; i++) {
        
        localStorage.setItem("highscore" + i, JSON.stringify(topp10[i]));
        document.getElementById("hoyestepoengsum").innerHTML += topp10[i].navn + ": " + topp10[i].poeng + "</br>";
    }
}


//console.log(document.getElementById("start"));
document.addEventListener("keydown", rightCTRLStart);
document.addEventListener("keydown", endrePiltast);