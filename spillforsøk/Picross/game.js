// JavaScript source code

class Game {
    constructor(navn, storrelse, losning) {
        this.navn = navn;
        this.storrelse = storrelse;
        this.losning = losning;

        this.kolonnehint = [];
        this.radhint = [];

        losning.sort();
        this.losning.sort();
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
                    col.addEventListener("contextmenu", utelukk);
                }

                col.id = "" + (i - 1) + (j - 1);
                col.farget = "false";
                row.appendChild(col);
            }
            table.appendChild(row);
        }
        this.kolonneHint();
        this.radHint();
    }


    kolonneHint() {
        let kolonnetall = [];
        let tempkolonne = [];
        let streak = 1;

        let sist = null;

        let tall = [];

        for (let kolonne = 0; kolonne < this.storrelse; kolonne++) {
            tall = [];
            streak = 1;
            sist = null;
            for (let rute = 0; rute < this.losning.length; rute++) {
                if (this.losning[rute].charAt(1) == kolonne) {
                    tall.push(this.losning[rute].charAt(0));
                }
            }

            //console.log('TALL: ',kolonne, ' ', tall);

            if (tall.length == 0) {
                kolonnetall.push([0]);
                continue;
            }

            tall.sort();
            for (let hint = 0; hint < tall.length; hint++) {
                if (sist != null && tall[hint] == parseInt(sist) + 1) {
                    streak++;
                    sist = tall[hint];
                    if (hint == tall.length - 1) {
                        tempkolonne.push(streak);
                        kolonnetall[kolonne] = tempkolonne;
                        tempkolonne = [];
                    }
                } else if (sist == null || tall[hint] != parseInt(sist) + 1) {
                    if (streak != 1) {
                        tempkolonne.push(streak);
                        streak = 1;
                        sist = null;
                    }
                    if (hint == tall.length - 1) {
                        tempkolonne.push(1);
                        if (sist != null) {
                            tempkolonne.push(1);
                        }
                        kolonnetall[kolonne] = tempkolonne;
                        tempkolonne = [];
                        continue;
                    }
                    if (sist != null) {
                        streak != 1 ? tempkolonne.push(streak) : tempkolonne.push(1);
                        streak = 1
                        sist = tall[hint];
                        continue;
                    }
                    sist = tall[hint];
                } else {
                    if (streak != 1) {
                        tempkolonne.push(streak);
                        streak = 1;
                    }
                }
            }
        }
        this.kolonnehint = kolonnetall;
        this.skrivKolonneHint();
    }


    skrivKolonneHint() {
        for (let i = 0; i < this.storrelse; i++) {
            for (let x = 0; x < this.kolonnehint[i].length; x++) {
                document.getElementById('-1' + i).innerHTML += this.kolonnehint[i][x] + '<br />';
            }
        }
    }


    radHint() {
        let radtall = [];
        let temprad= [];
        let streak = 1;

        let sist = null;

        let tall = [];

        for (let rad = 0; rad < this.storrelse; rad++) {
            tall = [];
            streak = 1;
            sist = null;
            for (let rute = 0; rute < this.losning.length; rute++) {
                if (this.losning[rute].charAt(0) == rad) {
                    tall.push(this.losning[rute].charAt(1));
                }
            }

            //console.log('TALL: ',kolonne, ' ', tall);

            if (tall.length == 0) {
                radtall.push([0]);
                continue;
            }

            for (let hint = 0; hint < tall.length; hint++) {
                if (sist != null && tall[hint] == parseInt(sist) + 1) {
                    streak++;
                    sist = tall[hint];
                    if (hint == tall.length - 1) {
                        temprad.push(streak);
                        radtall[rad] = temprad;
                        temprad = [];
                    }
                } else if (sist == null || tall[hint] != parseInt(sist) + 1) {
                    if (streak != 1) {
                            temprad.push(streak);
                            streak = 1;
                            sist = null;
                        }
                    if (hint == tall.length - 1) {
                        temprad.push(1);
                        if (sist != null) {
                            temprad.push(1);
                        }
                        radtall[rad] = temprad;
                        temprad = [];
                        continue;
                    }
                    if (sist != null) {
                        streak != 1 ? temprad.push(streak) : temprad.push(1);
                        streak = 1
                        sist = tall[hint];
                        continue;
                    }
                    sist = tall[hint];
                } else {
                    if (streak != 1) {
                        temprad.push(streak);
                        streak = 1;
                    }
                }
            }
        }
        this.radhint = radtall;
        this.skrivRadHint();
    }

    skrivRadHint() {
        for (let i = 0; i < this.storrelse; i++) {
            for (let x = 0; x < this.radhint[i].length; x++) {
                document.getElementById(i + '-1').innerHTML += this.radhint[i][x] + ' ';
            }
        }
    }


    sjekkLosning() {
        spillerslosning.sort();
        this.losning.sort();

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