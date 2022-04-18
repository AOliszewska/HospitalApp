export const patientList = [
    {
        "idUzytkownik": 1,
        "imie": "Jan",
        "nazwisko": "Ogórek",
        "dataUrodzenia": "2001-01-01T00:00:00.000Z",
        "email": "janogórek@gmail.com",
        "miejsceZamieszkania": "Ogórkowa 12",
        "telefon": "553525252",
        "pesel": "21425252525",
        "idRola": "2",
    },
    {
        "idUzytkownik": 2,
        "imie": "Beata",
        "nazwisko": "Brokuł",
        "dataUrodzenia": "2002-01-01T00:00:00.000Z",
        "email": "beatabrokuł@gmail.com",
        "miejsceZamieszkania": "Brokułowa 12",
        "telefon": "553151252",
        "pesel": "21421511525",
        "idRola": "2",
    },
    {
        "idUzytkownik": 3,
        "imie": "Ignacy",
        "nazwisko": "Marchewka",
        "dataUrodzenia": "2003-01-01T00:00:00.000Z",
        "email": "ignacymarchewka@gmail.com",
        "miejsceZamieszkania": "Marchewkowa 12",
        "telefon": "553514142",
        "pesel": "2142525251414",
        "idRola": "2",
    },
]

export const patientDetailsList = [
    {
        "idUzytkownik": 1,
        "imie": "Jan",
        "nazwisko": "Ogórek",
        "dataUrodzenia": "2001-01-01T00:00:00.000Z",
        "email": "janogórek@gmail.com",
        "miejsceZamieszkania": "Ogórkowa 12",
        "telefon": "553525252",
        "pesel": "21425252525",
        "idRola": "2",
        "uzytkownikchoroba": [
            {
                "idUzytkownikChoroba": 1,
                "idChoroba": "1",
                "idUzytkownik": "1",
                "dataWystawienia": "2008-12-21T00:00:00.000Z",
                "opisObjawow": "bla bla bla",
                "zwolnienieDo":"2009-01-01T00:00:00.000Z" ,
                "cenaWizyty": "100",
                "Choroba": {
                    "idChoroba": 1,
                    "nazwa": "Covid",
                    "opis": "bla blabla",
                    "zakazna": false,
                }
            },
            {
                "idUzytkownikChoroba": 3,
                "idChoroba": "2",
                "idUzytkownik": "1",
                "dataWystawienia": "2007-11-21T00:00:00.000Z",
                "opisObjawow": "bla bla bla",
                "zwolnienieDo":"2009-01-01T00:00:00.000Z" ,
                "cenaWizyty": "100",
                "Choroba": {
                    "idChoroba": 1,
                    "nazwa": "Przeziębienie",
                    "opis": "gorączka",
                    "zakazna": true
                }
            }
        ]
    },
    {
        "idUzytkownik": 2,
        "imie": "Beata",
        "nazwisko": "Brokuł",
        "dataUrodzenia": "2002-01-01T00:00:00.000Z",
        "email": "beatabrokuł@gmail.com",
        "miejsceZamieszkania": "Brokułowa 12",
        "telefon": "553151252",
        "pesel": "21421511525",
        "idRola": "2",
        "uzytkownikchoroba": [
            {
                "idUzytkownikChoroba": 2,
                "idChoroba": "1",
                "idUzytkownik": "2",
                "dataWystawienia": "2008-12-21T00:00:00.000Z",
                "opisObjawow": "bla bla bla",
                "zwolnienieDo":"2009-01-01T00:00:00.000Z" ,
                "cenaWizyty": "100",
                "Choroba": {
                    "idChoroba": 1,
                    "nazwa": "Covid",
                    "opis": "bla bla bla",
                    "zakazna": false,
                }
            }
        ]
    },
    {
        "idUzytkownik": 3,
        "imie": "Ignacy",
        "nazwisko": "Marchewka",
        "dataUrodzenia": "2003-01-01T00:00:00.000Z",
        "email": "ignacymarchewka@gmail.com",
        "miejsceZamieszkania": "Marchewkowa 12",
        "telefon": "553514142",
        "pesel": "2142525251414",
        "idRola": "2",
        "uzytkownikchoroba": []
    }
]