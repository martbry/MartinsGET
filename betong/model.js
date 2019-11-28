let model = {
    tilbyder: [
        {
            bedrift: "Betongsentrum AS",
            kontaktperson: "Jim Hansen",
            adresse: "Hvittingfossveien 254, 3089 Holmestrand",
            tlf: "923 78 455",
            ansatte: "4",
            hjemmeside: "www.betongsentrum.no",
            orgnr: "921743432",
            faktadr: "Hvittingfossveien 254, 3089 Holmestrand",
            tjenester: {
                snorydding: [true, 'spade', 'snofreser', 'traktor'],
                betong: [true, 'forskaling', 'gulvstoping'],
            }
        }
    ],


    aktivejobber: [
        {
            tilbyder: "Betongsentrum AS",
            omrode: "Vestfold",
            type: "Betongoppdrag"
        }
    ],


    historikk: [
        {
            bedrift: "Betongsentrum AS",
            jobber: [
                {
                    dato: "16.08.2019",
                    status: "Fullført",
                    tittel: "Gulvstøping Garasje",
                    beskrivelse: "*Beskrivelse av jobb*"
                }
            ]
        },

        {
            bedrift: "Kjetils Betong AS",
            jobber: [
                {
                    dato: "23.06.2019",
                    status: "Fullført",
                    tittel: "Forskaling til støp i Hof",
                    beskrivelse: "*Beskrivelse av jobb*"
                }
            ]
        }
    ],


    sendtetilbud: [

    ],


    rangering: [
        {
            bedrift: "Betongsentrum AS",
            stjerner: 4,
            vurderinger: 1
        },

        {
            bedrift: "Kjetils Betong AS",
            stjerner: 2,
            vurderinger: 1
        }
    ],


    kunde: [
        {
            navn: "Martin Brygmann",
            adresse: "Ryghs vei 23, 0785 Oslo",
            tlf: "986 62 319"
        },

        {
            navn: "Pia Amundsen",
            adresse: "Skipperløkka 5, 3260 Larvik",
            tlf: "900 70 967"
        }
    ]

}