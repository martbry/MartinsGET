// JavaScript source code

    var teller = 0;
    var starttall = [];
    var nummer;

    document.getElementById("tellervar").innerHTML = teller;

        function start() {

            for (var rad = 0; rad < 3; rad++) {
                for (var kol = 0; kol < 3; kol++) {
                    if (rad == 1 && kol == 1) {
                        continue;
}
var success = false;
                    while (success == false) {
        success = nyttTall(rad, kol);
    }
}
}
}

        function nyttTall(rad, kol) {
        nummer = Math.floor(Math.random() * 8) + 1;
    if (starttall.includes(nummer)) {
                return false;
            } else {
        starttall.push(nummer);
    document.getElementById("" + rad + kol).innerHTML = nummer;
    return true;
}
}


        function klikk(knapp, arg1, arg2, arg3, arg4) {
        document.getElementById("ulovligtrekk").innerHTML = '';
    if (document.getElementById(arg1).innerHTML == '') {
        document.getElementById(arg1).innerHTML = knapp.innerHTML;
    knapp.innerHTML = '';
    teller++;
}

            else if (document.getElementById(arg2).innerHTML == '') {
        document.getElementById(arg2).innerHTML = knapp.innerHTML;
    knapp.innerHTML = '';
    teller++;
}

            else if (document.getElementById(arg3) != null && document.getElementById(arg3).innerHTML == '') {
        document.getElementById(arg3).innerHTML = knapp.innerHTML;
    knapp.innerHTML = '';
    teller++;
}

            else if (document.getElementById(arg4) != null && document.getElementById(arg4).innerHTML == '') {
        document.getElementById(arg4).innerHTML = knapp.innerHTML;
    knapp.innerHTML = '';
    teller++;
}

            else {
        document.getElementById("ulovligtrekk").innerHTML = 'Ulovlig trekk';
    }
    document.getElementById("tellervar").innerHTML = teller;
    sjekkOmVunnet();
}

        if (sjekkOmVunnet == true) {

    }



    function sjekkOmVunnet() {
            if (document.getElementById('00').innerHTML == 1 && document.getElementById('01').innerHTML == 2 && document.getElementById('02').innerHTML == 3
        && document.getElementById('10').innerHTML == 4 && document.getElementById('11').innerHTML == 5 && document.getElementById('12').innerHTML == 6
                && document.getElementById('20').innerHTML == 7 && document.getElementById('21').innerHTML == 8) {
        document.getElementById('vunnet').innerHTML = 'Gratulerer! Du klarte det på ' + teller + ' trekk!';
    }
}

start();