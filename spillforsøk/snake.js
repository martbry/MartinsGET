// JavaScript source code

var canv = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var slange = [50, 500, 50, 50]


var stopp =
    setInterval(function tegn(){
        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.strokeRect(50, 50, 700, 500);
        ctx.strokeRect(slange[0], slange[1], slange[2], slange[3]);
        update();
    }, 200);

//function tegn() {
//    console.log("yy");
//    ctx.strokeRect(slange[0], slange[1], slange[2], slange[3]);
//    update();
//}

function update(retning) {
    if (slange[0] < canv.width - 50) {
        slange[0] += 50;
        return;
    } else {
        console.log("hallo");
        clearInterval(stopp);
    }
    
    
}

//tegn();
//start();
