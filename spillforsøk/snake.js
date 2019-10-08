// JavaScript source code

var canv = document.getElementById("canvas");
var ctx = canv.getContext("2d");
var slangestorrelse = 50;
var lengde = 1;
var slange = [[50, 500, slangestorrelse, slangestorrelse]];
var slangevarsist = [];
var piltast = "hoyre";
var nesteretning = "hoyre";
var intervalltid = 200;
var ferdig = false;
var timeAlive = 0;

var stopp =
    setInterval(function tegn() {
        update();
        ctx.clearRect(0, 0, canv.width, canv.height);
        tegnSlange();
        tegnBrettramme();
        //ctx.strokeRect(slange[0][0], slange[0][1], slange[0][2], slange[0][3]);
        if (ferdig == true) {
            gameOver();
        }
    }, intervalltid);


function update() {
    timeAlive += 1;
    if (utenfor()) {
        ferdig = true;
    } else {
        if (lovligRetning()) {
            piltast = nesteretning;
        }
        oppdaterSlangeVarSist();
        //console.log(slange[0][0], slange[0][1], slange[0][2], slange[0][3]);
        //console.log(slange);
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
    } else if (trykket.keyCode == 32) {
        lengde++;
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
    console.log("denne blir pushet: " + slange[0]);
    var slangekopi = JSON.stringify(slange[0]);
    slangevarsist.push(JSON.parse(slangekopi));
    document.getElementById("1").innerHTML = lengde;
    //document.getElementById("2").innerHTML = slangevarsist[slangevarsist.length - 1];
    //console.log(slangevarsist + " lengde: " + slangevarsist.length);
    //console.log("forstinyliste: " + slangevarsist[0] + " sistinyliste: " + slangevarsist[slangevarsist.length - 1]);
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
    var sisteindeks = slangevarsist.length - 1;
    ctx.fillStyle = "black";
    ctx.fillRect(slange[0][0], slange[0][1], slange[0][2], slange[0][3]);

    ctx.fillStyle = "grey";
    if (lengde > 1) {
        for (i = 0; i < lengde - 1; i++) {
            ctx.strokeRect(slangevarsist[sisteindeks - i][0], slangevarsist[sisteindeks - i][1], slangestorrelse, slangestorrelse);
            if (slange[0][0] == slangevarsist[sisteindeks - i][0] && slange[0][1] == slangevarsist[sisteindeks - i][1]) {
                ferdig = true;
            }
        }
    }
}

function tegnBrettramme() {
    ctx.strokeRect(50, 50, 700, 500);
}

function gameOver() {
    clearInterval(stopp);
    ctx.font = "60px Arial";
    ctx.fillStyle = "red";

    ctx.fillRect(slange[0][0], slange[0][1], slange[0][2], slange[0][3]);

    ctx.fillText("Game over!", 200, 300);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Cycles lived: " + timeAlive, 200, 400);
    canv.style.borderColor = "red";
    canv.style.borderWidth = "thick";
    
}


document.addEventListener("keydown", endrePiltast);

//tegn();
//start();