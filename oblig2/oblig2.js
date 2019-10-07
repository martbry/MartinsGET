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
    let y = 80 - height;
    let color = calcColor(1, 10, barNo);
    return `<rect width="${width}" height="${height}"
                            x="${x}" y="${y}" fill="${color}" id="${barNo}" onclick="marker(this);"></rect>`;
}

function calcColor(min, max, val) {
    var minHue = 240, maxHue = 0;
    var curPercent = (val - min) / (max - min);
    var colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
    return colString;
}

function leggTilStolpe() { //Legger til stolpe med høyde fra inputen

    var inputtall = document.getElementById("input").value;
    var antallstolper = parseInt(document.getElementById("chart").childNodes.length) + 1;

    if (inputtall < 1 || inputtall > 10) {
        document.getElementById("feilmelding").style.display = "block";
        return;
    }

    document.getElementById("feilmelding").style.display = "none";

    if (markert != undefined) {
        rammeSwitch(markert);
        markert = undefined;
        valgtstolpe.innerHTML = "<i>ingen</i>"
        buttonSwitch("av");
    }

    svgTag.innerHTML += createBar(inputtall, antallstolper);

}

function fjernStolpe() {
    document.getElementById("feilmelding").style.display = "none";
    svgTag.removeChild(markert);
    markert = undefined;
    valgtstolpe.innerHTML = "<i>ingen</i>"
    buttonSwitch("av");
    for (i = 0; i < document.getElementById("chart").childNodes.length; i++) {
        document.getElementById("chart").childNodes[i].id = i + 1;
        document.getElementById("chart").childNodes[i].setAttribute("x", i * 10);
    }
}

function endreStolpe() {
    var inputtall = document.getElementById("input").value;

    if (inputtall < 1 || inputtall > 10) {
        document.getElementById("feilmelding").style.display = "block";
        return;
    }

    document.getElementById("feilmelding").style.display = "none";

    markert.setAttribute("height", inputtall * 10);
    markert.setAttribute("y", 80 - (inputtall * 10));

}

function marker(par1) {
    document.getElementById("feilmelding").style.display = "none";
    if (markert == par1) { //hvis du trykker på den samme igjen (deselect)
        rammeSwitch(par1);
        markert = undefined;
        valgtstolpe.innerHTML = "<i>ingen</i>"
        buttonSwitch("av");
        return;

    } else if (markert != undefined) { //Når det ikke er første markering av stolpe, og det heller ikke er den samme som sist:
        console.log("wut");
        rammeSwitch(markert);
        rammeSwitch(par1);
        markert = par1;
        valgtstolpe.innerHTML = par1.id + "<br/>H&oslashyde: " + (parseInt(par1.getAttribute("height") / 10));
        buttonSwitch();
        return;
    }
    //den første du trykker på

    markert = par1;
    rammeSwitch(par1);
    valgtstolpe.innerHTML = par1.id + "<br/>H&oslashyde: " + (parseInt(par1.getAttribute("height")/10));
    buttonSwitch();
}

function rammeSwitch(stolpe) { //Setter ramme av eller på (avhengig av om stolpen har ramme fra før, eller ikke).
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

function buttonSwitch(tekst) { //Deaktiverer knappene hvis "av" er sendt med som argument. Aktiverer ellers.
    if (tekst == "av") {
        document.getElementById("knapp1").disabled = true;
        document.getElementById("knapp2").disabled = true;
    } else {
        document.getElementById("knapp1").disabled = false;
        document.getElementById("knapp2").disabled = false;
    }
}