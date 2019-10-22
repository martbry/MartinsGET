// JavaScript source code

class Game {
    constructor(navn, storrelse, losning) {
        this.navn = navn;
        this.storrelse = storrelse;
        this.losning = losning;

        this.kolonnehint = [];
    }

    lagLevel(table) {
        var table = document.getElementById("rutenett");
        for (var i = 0; i < this.storrelse + 1; i++) {
            var row = document.createElement("tr");
            for (var j = 0; j < this.storrelse + 1; j++) {
                var col = document.createElement("td");
                if (i == 0 & j == 0) {
                    col.classList.add("hjorne");
                }
                if (i == 0) {
                    col.classList.add("rammetopp");
                    row.appendChild(col);
                } else if (j == 0) {
                    col.classList.add("rammevenstre");
                } else {
                    col.classList.add("ruter")
                    col.addEventListener("click", skraver);
                }

                col.id = "" + (i - 1) + (j - 1);
                col.farget = "false";
                row.appendChild(col);
            }
            table.appendChild(row);
        }
    }


    kolonneHint() {
        //console.log(this.losning);
        let kolonnetall = [];
        let streak = 0;

        let sist = null;

        let tall = [];

        for (let kolonne = 0; kolonne < this.storrelse; kolonne++) {
            tall = [];
            streak = 0;
            sist = null;
            for (let rute = 0; rute < this.losning.length; rute++) {
                if (this.losning[rute].charAt(1) == kolonne) {
                    tall.push(this.losning[rute].charAt(0));
                }
            }

            console.log('TALL: ',kolonne, ' ', tall);

            if (tall.length == 0) {
                kolonnetall.push(0);
                continue;
            }

            for (let hint = 0; hint < tall.length; hint++) {
                //console.log('65');
                if (hint == sist + 1) {
                    //console.log('67');
                    streak++;
                    sist = hint;
                    if (hint == tall.length - 1) {
                        kolonnetall.push(streak);
                    }
                } else if (hint != sist + 1) {
                    //console.log('71');
                    if (sist != null) {
                        //console.log('73');
                        kolonnetall.push(sist);
                        sist = null;
                        continue;
                    }
                    sist = hint;
                } else {
                    //console.log('80');
                    if (streak != 0) {
                        //console.log('82');
                        kolonnetall.push(streak);
                        streak = 0;
                    }
                }
            }
        }

        //console.log(tall);
        console.log(kolonnetall);
    }


    sjekkLosning() {
        spillerslosning.sort();

        if (spillerslosning.length != this.losning.length) {
            return false;
        }
        for (let i = 0; i < spillerslosning.length; i++) {
            if (spillerslosning[i] != this.losning[i]) {
                return false;
            }
        }
        return true;
    }

}