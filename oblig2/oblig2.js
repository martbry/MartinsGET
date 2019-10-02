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

    console.log(document.getElementById("chart").childNodes[0]);

    if (markert == par1) {
        markert.style.stroke = "none";
        markert = undefined;
        valgtstolpe.innerHTML = "<i>ingen<i>";
        return;
    } else if (markert != undefined){
        markert.style.stroke = "none";
    }
    
    markert = par1;
    valgtstolpe.innerHTML = par1.id;
    
    
}