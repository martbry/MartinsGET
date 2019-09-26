                            // JavaScript source code

                            //forrigeMeny er, n�r siden lastes, en tom variabel. N�r siden er i bruk holder den p� den forrige undermenyen som var �pen

var forrigeMeny;
var forrigeHovedmeny;

                            //Hovedmenyen en evenListener som kaller p� visUndermeny() n�r musen hovres over en av lenkene.
                            //Eventlisteneren sender det elementet som trigget mouseover som f�rste argument.

document.getElementById("hovedmeny").addEventListener("mouseover", visUndermeny);
document.getElementsByClassName("undermeny")[1].addEventListener("mouseover", hoverhoved);
document.getElementsByClassName("undermeny")[2].addEventListener("mouseover", hoverhoved);
document.getElementsByClassName("undermeny")[3].addEventListener("mouseover", hoverhoved);
document.getElementsByClassName("undermeny")[4].addEventListener("mouseover", hoverhoved);


                                 //visUndermeny(par1) tar i mot elementet som trigger mouseover fra EventListerene over

function visUndermeny(par1) {

                                 //Denne if-setningen sjekke f�rst om forrigeMeny allerede holder p� en tidligere meny og skjuler den dersom den gj�r det

    if (forrigeMeny != undefined) {
        forrigeMeny.style.display = "none";
    }

                                //Denne if-setningen passer p� at dersom man hovrer musa over en del av navbaren (hovedmenyen)
                                //helt p� toppen av siden som ikke har noen lenker, s� stopper koden her(etter den har skjult forrige meny)
    

    if (par1.target.id == "hovedmeny") {
        return;
    }

                                //id blir tilordnet samme verdi som IDen til lenken som trigger undermenyen. Det er denne som brukes til � passe p� at det er den rette undermenyen som blir vist
                                //sistetegn settes til � v�re siste tegnet i den ovennevnte IDen.

    var id = par1.target.id;
    var sisteTegn = id.charAt(id.length - 1);

                                //Denne if-blokka er dels hardkodet. Hvis sistetegn er lik "e" (alts� siste tegnet i IDen til elementet som trigget denne funksjonen), s� vet jeg at det er
                                //elementet med ID "forside". Da skal undermeny "u1" vises. Og forrigeMeny tilordnes den undermenyen.

                                //I alle andre tilfeller tar jeg siste tegn i IDen (som alltid er et tall (test1, test2 osv.)) og viser undermenyen med id som starter p� "u" (for undermeny) og slutter p� dette tallet pluss 1
                                //slik at test1 �pner u2, test2 �pner u3 osv. forrigemeny tilordnes s� denne undermenyen.

    if (sisteTegn == "e") {
        return;
        document.getElementById("u1").style.display = "block";
        forrigeMeny = document.getElementById("u1");
    } else {
        var sisteitall = parseInt(sisteTegn);
        sisteitall += 1;
        var undermenyid = "u" + sisteitall;
        document.getElementById(undermenyid).style.display = "block";
        forrigeMeny = document.getElementById(undermenyid);
        forrigeHovedmeny = id;
        //hoverhoved();

    }

}

                            //Denne funksjonen tar inn et HTML-element og skjuler det. Den blir kalt p� av undermenyene dersom man trigger eventet ounmouseleave

function skjul(par1) {
    //document.getElementById(forrigeHovedmeny).style.color = "lightblue";
    par1.style.display = "none";
    document.getElementById(forrigeHovedmeny).style.color = "lightblue";
    document.getElementById(forrigeHovedmeny).style.backgroundColor = "darkslategray";
}


function hoverhoved(par1) {
    document.getElementById(forrigeHovedmeny).style.color = "black";
    document.getElementById(forrigeHovedmeny).style.backgroundColor = "cadetblue";
}