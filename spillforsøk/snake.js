// JavaScript source code

var canv = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var slange = [50, 500, 50, 50]
var piltast = "hoyre";

var stopp =
        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.strokeRect(50, 50, 700, 500);
        ctx.strokeRect(slange[0], slange[1], slange[2], slange[3]);
        update(piltast);
    }, 200);

//function tegn() {
//    console.log("yy");
//    ctx.strokeRect(slange[0], slange[1], slange[2], slange[3]);
//    update();
//}

function update(retning) {
    if (retning == "hoyre" && slange[0] < canv.width - 50) {
        slange[0] += 50;
        return;
    } else if (retning == "venstre" && slange[0] >= 50) {
        slange[0] -= 50;
    } else if (retning == "ned" && slange[1] < canvas.height - 50) {
        slange[1] += 50;
    } else if (retning == "opp" && slange[1] >= 50) {
        slange[1] -= 50;
    } else {
        console.log("hallo");
        clearInterval(stopp);
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

document.addEventListener("keydown", endrePiltast);

//tegn();
//start();