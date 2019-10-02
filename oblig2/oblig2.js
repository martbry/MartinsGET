// JavaScript source code

let numbers = [7, 3, 1, 5, 8];
var svgTag = document.getElementById('chart');
showChart();

var markert;
var valgtstolpe = document.getElementById("valgt");

function showChart() {
    let svgInnerHtml = '';
    for (let i = 0; i < numbers.length; i++) {
        svgInnerHtml += createBar(numbers[i], i + 1);
    }
    svgTag.innerHTML = svgInnerHtml;
}

function createBar(number, barNo) {
    const width = 8;
    const spacing = 2;
    let x = (barNo - 1) * (width + spacing);
    let height = number * 10;
    let y = 60 - height;
    let color = calcColor(1, 10, barNo);
    //let stolpenummer = number + 1;
    return `<rect width="${width}" height="${height}"
                            x="${x}" y="${y}" fill="${color}" id="${barNo}" onclick="marker(this);"></rect>`;
}

function calcColor(min, max, val) {
    var minHue = 240, maxHue = 0;
    var curPercent = (val - min) / (max - min);
    var colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
    return colString;
}

function marker(par1) {

    //console.log(par1.style.stroke);
    //console.log(document.getElementById("chart").childNodes[0]);

    if (markert == par1) {
        rammeSwitch(par1);
        markert = undefined;
        valgtstolpe.innerHTML = "<i>ingen</i>"
        return;
        //markert.style.stroke = "none";
        //markert = undefined;
        //valgtstolpe.innerHTML = "<i>ingen<i>";
        return;
    } else if (markert != undefined) {
        rammeSwitch(markert);
        rammeSwitch(par1);
        markert = par1;
        valgtstolpe.innerHTML = par1.id;
        return;
    }

    markert = par1;
    rammeSwitch(par1, "bytt");
    valgtstolpe.innerHTML = par1.id;
    //par1.style.stroke = "1px";
    //par1.style.stroke = "black";
    //par1.style.stroke = "solid";

}

function rammeSwitch(stolpe) {
    if (stolpe.style.stroke == "black") {
        stolpe.style.stroke = "none";
        return;
    } else {
        stolpe.style.stroke = "solid";
        stolpe.style.stroke = "black";
        stolpe.style.stroke = "1px";
        return;
    }
}

function buttonSwitch(tekst) {
    if (tekst == "av") {
        document.getElementById("knapp1").disabled = false;
        document.getElementById("knapp2").disabled = false;
    } else {
        document.getElementById("knapp1").disabled = true;
        document.getElementById("knapp2").disabled = true;
    }
    
}

//TODO
//leggTil();
//fjern();
//Fjern må endre IDene i en loop og endre plasseringene