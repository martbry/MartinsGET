// JavaScript source code

class Game {
    constructor(navn, storrelselosning) {
        this.navn = navn;
        this.storrelse = storrelselosning[0];
        this.losning = storrelselosning[1];
        this.kolonnehint = [];
        this.radhint = [];
        this.koordinatskille = ".";

        this.losning = this.losning.map(a => a.split('.').map(n => +n + 100000).join('.')).sort()
            .map(a => a.split('.').map(n => +n - 100000).join('.'));

        this.lagLevel();

        this.hoveredkolonne;
        this.hoveredrad;
        this.mousehold = false;
        this.button;
    }

    lagLevel() {
        var table = document.getElementById("rutenett");
        for (var rad = 0; rad < this.storrelse + 1; rad++) {
            var row = document.createElement("tr");
            for (var kolonne = 0; kolonne < this.storrelse + 1; kolonne++) {
                var col = document.createElement("td");
                if (rad == 0 && kolonne == 0) {
                    col.innerHTML = `${this.storrelse}*${this.storrelse} <br /> ${this.navn}`;
                }
                if (rad % 5 == 0) {
                    col.classList.add("borderbot");
                }
                if (kolonne % 5 == 0) {
                    col.classList.add("borderright");
                }
                if (rad == 0) {
                    col.classList.add("rammetopp");
                    row.appendChild(col);
                } else if (kolonne == 0) {
                    col.classList.add("rammevenstre");
                } else {
                    col.classList.add("ruter");
                    //col.addEventListener("click", farg);
                    //col.addEventListener("click", this.farg);
                    col.addEventListener("contextmenu", this.utelukk);
                    col.addEventListener("mouseout", this.unhover);
                    col.addEventListener("mouseover", this.hover);
                    col.addEventListener("mousedown", this.mouseHold);
                    col.addEventListener("mouseup", this.stopMouseHold);
                }

                col.id = "" + (rad - 1) + this.koordinatskille + (kolonne - 1);
                col.farget = false;
                col.utelukket = false;
                row.appendChild(col);
            }
            table.appendChild(row);
        }

        if (this.losning.length >= 1) {
            this.kolonneHint();
            this.radHint();
        }

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

                let koordinat = this.losning[rute];
                let index = koordinat.indexOf(this.koordinatskille);
                let partone = koordinat.slice(0, index);
                let parttwo = koordinat.slice(index + 1, koordinat.length);

                if (parttwo == kolonne) {
                    tall.push(partone);
                }
            }

            if (tall.length == 0) {
                kolonnetall.push([0]);
                continue;
            }

            //tall.sort();
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
                document.getElementById('-1' + this.koordinatskille + i).innerHTML += `<span onclick="spill.graaHint(this)"> ${this.kolonnehint[i][x]} </span><br />`;
            }
        }
    }


    radHint() {
        let radtall = [];
        let temprad = [];
        let streak = 1;

        let sist = null;

        let tall = [];

        for (let rad = 0; rad < this.storrelse; rad++) {
            tall = [];
            streak = 1;
            sist = null;
            for (let rute = 0; rute < this.losning.length; rute++) {
                let koordinat = this.losning[rute];
                let index = koordinat.indexOf(this.koordinatskille);
                let partone = koordinat.slice(0, index);
                let parttwo = koordinat.slice(index + 1, koordinat.length);
                if (partone == rad) {
                    tall.push(parttwo);
                }
            }


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
                document.getElementById(i + this.koordinatskille + '-1').innerHTML += `<span onclick="spill.graaHint(this)">  ${this.radhint[i][x]}  </span>`;
            }
        }
    }

    farg(rute) {

        if (solved == true || rute.utelukket == true) {
            return;
        }

        if (arguments.length == 2) {
            if (rute.farget == true) {
                return;
            }
        }

        rute.farget == false ? rute.farget = true : rute.farget = false;
        show();
    }

    utelukk(rute) {
        if (solved == true || rute.farget == true) {
            return;
        }

        if (arguments.length == 2) {
            if (rute.utelukket == true) {
                return;
            }
        }

        rute.utelukket == false ? rute.utelukket = true : rute.utelukket = false;
        show();
    }

    sjekkLosning() {
        spillerslosning = spillerslosning.map(a => a.split('.').map(n => +n + 100000).join('.')).sort()
            .map(a => a.split('.').map(n => +n - 100000).join('.'));

        this.losning = this.losning.map(a => a.split('.').map(n => +n + 100000).join('.')).sort()
            .map(a => a.split('.').map(n => +n - 100000).join('.'));
        //spillerslosning.sort();
        //this.losning.sort();


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

    mouseHold(mouseevent) {
        //this er ruta inni her
        spill.button = mouseevent.button;
        spill.mousehold = true;

        if (spill.button == 0) {
            spill.farg(this);
        } else if (spill.button == 2) {
            spill.utelukk(this);
        }
    }

    stopMouseHold() {
        spill.mousehold = false;
    }

    hover(rute) {
        //this er denne ruta inni her//
        
        if (spill.mousehold == true) {
            if (spill.button == 0) {
                spill.farg(this, "dra");
            } else if (spill.button == 2) {
                spill.utelukk(this, "dra");
            }
        }
        let index = this.id.indexOf(spill.koordinatskille);

        //let partone = this.id.slice
        let partone = this.id.slice(0, index);
        let parttwo = this.id.slice(index + 1, this.id.length);

        //hoverID: (-1, parttwo) og (partone, -1);
        let hoveredk = document.getElementById("" + -1 + spill.koordinatskille + parttwo);
        hoveredk.style.backgroundColor = "rgba(119, 136, 153, 0.3)";
        spill.hoveredkolonne = hoveredk;

        let hoveredr = document.getElementById("" + partone + spill.koordinatskille + -1);
        hoveredr.style.backgroundColor = "rgba(119, 136, 153, 0.3)";
        spill.hoveredrad = hoveredr;
    }


    unhover(rute) {
        //hoverkolonne blir deklarert i hover()
        spill.hoveredkolonne.style.backgroundColor = "lightslategrey";
        spill.hoveredrad.style.backgroundColor = "lightslategrey";
    }

    graaHint(tall) {
        tall.style.color == "darkgrey" ? tall.style.color = "black" : tall.style.color = "darkgrey";
    }

}