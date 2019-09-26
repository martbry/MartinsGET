// JavaScript source code

var forrigeMeny;

document.getElementById("forside").addEventListener("mouseover", visUndermeny);
document.getElementById("test1").addEventListener("mouseover", visUndermeny);
document.getElementById("test2").addEventListener("mouseover", visUndermeny);
document.getElementById("test3").addEventListener("mouseover", visUndermeny);
document.getElementById("test4").addEventListener("mouseover", visUndermeny);
document.getElementById("hovedmeny").addEventListener("mouseover", visUndermeny);


function visUndermeny(par1) {

    if (forrigeMeny != undefined) {
        forrigeMeny.style.display = "none";
    }

    if (par1.target.id == "hovedmeny") {
        return;
    }

    forrigeMeny = par1.target;

    var id = par1.target.id;
    var sisteTegn = id.charAt(id.length - 1);

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

function skjul(par1) {
    par1.style.display = "none";
}


                            //function visUndermeny(par1) {
                            //    while (par1.onmouseover || document.getElementById("undermeny").onmouseover) {
                            //        document.getElementById("undermeny").style.display = "block";
                            //    }
                            //}

                            //function skjulUndermeny() {
                            //    document.getElementById("undermeny").style.display = "none";
                            //}