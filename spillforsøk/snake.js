// JavaScript source code

//TODO: Øke hastigheten?
//Mulighet for å "gå gjennom" vegger?

var canv = document.getElementById("canvas");
var ctx = canv.getContext("2d");
var slangestorrelse;
var lengde;
var slange;
var slangevarsist;
var piltast;
var nesteretning;
var intervalltid;
var ferdig;
var spillstartet;
var timeAlive;
var eple;
var startknapp = document.getElementById("start");
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
    if (slange[0][0] == eple[0]-10 && slange[0][1] == eple[1]-10) {
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
    var breddeplassering = Math.round(Math.floor((Math.random() * 650) + 75)/50)*50;
    var hoydeplassering = Math.round(Math.floor((Math.random() * 450) + 75) / 50)* 50;


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
    spillstartet = false;
    ctx.font = "60px Arial";
    ctx.fillStyle = "red";

    ctx.fillRect(slange[0][0], slange[0][1], slange[0][2], slange[0][3]);

    ctx.fillText("Game over!", 200, 300);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Du spiste " + (lengde-1) + " epler!" , 200, 400);
    canv.style.borderColor = "red";
    canv.style.borderWidth = "thick";
    startknapp.disabled = false;
}

function vunnet() {
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

function enterForStart(knappTrykt) {
    if (spillstartet == true) {
        return;
    }
    if (knappTrykt.keyCode == 13 || knappTrykt.keyCode == 32) {
        begin();
    }
}

//console.log(document.getElementById("start"));
document.addEventListener("keydown", enterForStart);
document.addEventListener("keydown", endrePiltast);