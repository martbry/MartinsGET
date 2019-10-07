// JavaScript source code

var canv = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var slange = [50, 500, 50, 50]
var piltast = "hoyre";

var stopp =
    setInterval(function tegn() {
        update();
        console.log(slange[0]);
        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.strokeRect(50, 50, 700, 500);
        ctx.strokeRect(slange[0], slange[1], slange[2], slange[3]);

    }, 200);


function update() {
    if (utenfor()) {
        console.log("stopp");
        gameOver();
    } else {
        retning(piltast);
    }
}

function endrePiltast(trykket) {
    if (trykket.keyCode == 37) {
        piltast = "venstre";
    } else if (trykket.keyCode == 38) {
        piltast = "opp";
    } else if (trykket.keyCode == 39) {
        piltast = "hoyre";
    } else if (trykket.keyCode == 40) {
        piltast = "ned";
    }
}

function utenfor() {
    if (slange[0] > canv.width - 100 || slange[0] < 50 || slange[1] > canvas.height - 100 || slange[1] < 50) {
        return true;
    } else {
        return false;
    }
}

function retning(vei) {
    if (vei == "hoyre") {
        slange[0] += 50;
        return;
    } else if (vei == "venstre") {
        slange[0] -= 50;
    } else if (vei == "ned") {
        slange[1] += 50;
    } else if (vei == "opp") {
        slange[1] -= 50;
    }
}

function gameOver() {
    canv.style.borderColor = "red";
    canv.style.borderWidth = "thick";
    clearInterval(stopp);
}


    document.addEventListener("keydown", endrePiltast);

//tegn();
//start();