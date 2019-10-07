// JavaScript source code

var canv = document.getElementById("canvas");
var ctx = canv.getContext("2d");
var slange = [[50, 500, 50, 50]];
var piltast = "hoyre";
var nesteretning = "hoyre";
var intervalltid = 200;
var ferdig = false;
var timeAlive = 0;

var stopp =
    setInterval(function tegn() {
        update();
        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.strokeRect(50, 50, 700, 500);
        ctx.strokeRect(slange[0][0], slange[0][1], slange[0][2], slange[0][3]);
        if (ferdig == true) {
            gameOver();
        }
    }, intervalltid);


function update() {
    timeAlive += 1;
    if (utenfor()) {
        //gameOver();
        ferdig = true;
    } else {
        if (lovligRetning()) {
            piltast = nesteretning;
        }
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

function gameOver() {
    clearInterval(stopp);
    ctx.font = "60px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game over!", 200, 300);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Circles lived: " + timeAlive, 200, 400);
    canv.style.borderColor = "red";
    canv.style.borderWidth = "thick";

    
}


document.addEventListener("keydown", endrePiltast);

//tegn();
//start();