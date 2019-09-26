// JavaScript source code

//forrigeMeny er, når siden lastes, en tom variabel. Når siden er i bruk holder den på den forrige undermenyen som var åpen

var forrigeMeny;

//Alle hovedmenytaggene har en evenListener som kaller på visUndermeny() når musen hovres over en av lenkene. Eventlisteneren sender det elementet som trigget mouseover som første argument.

document.getElementById("forside").addEventListener("mouseover", visUndermeny);
document.getElementById("test1").addEventListener("mouseover", visUndermeny);
document.getElementById("test2").addEventListener("mouseover", visUndermeny);
document.getElementById("test3").addEventListener("mouseover", visUndermeny);
document.getElementById("test4").addEventListener("mouseover", visUndermeny);
document.getElementById("hovedmeny").addEventListener("mouseover", visUndermeny);


//visUndermeny(par1) tar i mot elementet som trigger mouseover fra EventListerene over

function visUndermeny(par1) {

    //Denne if-setningen sjekke først om forrigeMeny allerede holder på en tidligere meny og skjuler den dersom den gjør det

    if (forrigeMeny != undefined) {
        forrigeMeny.style.display = "none";
    }

    //Denne if-setningen passer på at dersom man hovrer musa over en del av navbaren (hovedmenyen)
    //helt på toppen av siden som ikke har noen lenker, så stopper koden her(etter den har skjult forrige meny)

    if (par1.target.id == "hovedmeny") {
        return;
    }

    //id blir tilordnet samme verdi som IDen til lenken som trigger undermenyen. Det er denne som brukes til å passe på at det er den rette undermenyen som blir vist
    //sistetegn settes til å være siste tegnet i den ovennevnte IDen.

    var id = par1.target.id;
    var sisteTegn = id.charAt(id.length - 1);

    //Denne if-blokka er dels hardkodet. Hvis sistetegn er lik "e" (altså siste tegnet i IDen til elementet som trigget denne funksjonen), så vet jeg at det er
    //elementet med ID "forside". Da skal undermeny "u1" vises. Og forrigeMeny tilordnes den undermenyen.

    //I alle andre tilfeller tar jeg siste tegn i IDen (som alltid er et tall (test1, test2 osv.)) og viser undermenyen med id som starter på "u" (for undermeny) og slutter på dette tallet pluss 1
    //slik at test1 åpner u2, test2 åpner u3 osv. forrigemeny tilordnes så denne undermenyen.

    if (sisteTegn == "e") {
        document.getElementById("u1").style.display = "block";
        forrigeMeny = document.getElementById("u1");
    } else {
        var sisteitall = parseInt(sisteTegn);
        sisteitall += 1;
        var undermenyid = "u" + sisteitall;
        document.getElementById(undermenyid).style.display = "block";
        forrigeMeny = document.getElementById(undermenyid);

    }

}

//function skjul(par1) {
//    par1.style.display = "none";
//}