// JavaScript source code

class Game {
    constructor(navn, storrelselosning) {
        //console.log(storrelselosning[1]);
        this.navn = navn;
        this.storrelse = storrelselosning[0];
        this.losning = storrelselosning[1];

        this.kolonnehint = [];
        this.radhint = [];

        //losning.sort();

        this.koordinatskille = ".";

        this.losning = this.losning.map(a => a.split('.').map(n => +n + 100000).join('.')).sort()
            .map(a => a.split('.').map(n => +n - 100000).join('.'));
    }

    lagLevel(table) {
        var table = document.getElementById("rutenett");
        for (var rad = 0; rad < this.storrelse + 1; rad++) {
            var row = document.createElement("tr");
            for (var kolonne = 0; kolonne < this.storrelse + 1; kolonne++) {
                var col = document.createElement("td");
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
                    col.classList.add("ruter")
                    col.addEventListener("click", farg);
                    col.addEventListener("contextmenu", utelukk);
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
                document.getElementById('-1' + this.koordinatskille + i).innerHTML += `<span onclick="graaHint(this)"> ${this.kolonnehint[i][x]} </span><br />`;
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
                //console.log('cord', koordinat);
                let index = koordinat.indexOf(this.koordinatskille);
                let partone = koordinat.slice(0, index);
                //console.log(partone);
                let parttwo = koordinat.slice(index + 1, koordinat.length);
                //console.log(parttwo);
                if (partone == rad) {
                    tall.push(parttwo);
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
                document.getElementById(i + this.koordinatskille + '-1').innerHTML += `<span onclick="graaHint(this)">  ${this.radhint[i][x]}  </span>`;
            }
        }
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

}