const db = require('../../config/mysql2/db');
const uzytkownikChorobaSchema = require("../../model/joi/UserDisease");

exports.getUserDisease = () => {
    console.log("repository");
    const query = `SELECT  uc._idUzytkownikChoroba , uc.dataWystawienia, uc.opisObjawow, uc.zwolnienieDo, uc.cenaWizyty,
    c._idChoroba, c.nazwa, c.opis, c.zakazna,
    u._idUzytkownik , u.imie, u.nazwisko, u.dataUrodzenia, u.email, u.miejsceZamieszkania, u.telefon, u.pesel
    FROM UzytkownikChoroba uc
    LEFT JOIN Choroba c on  uc._idChoroba= c._idChoroba
    LEFT JOIN Uzytkownik u on  uc._idUzytkownik= u._idUzytkownik`
    return db.promise().query(query)
        .then((results,fields) =>{
        const uzytkownikchoroby =[];
        for (let i =0 ; i< results[0].length; i++){
            const row = results[0][i];
            const uzytkownikchoroba = {
                    _idUzytkownikChoroba: row._idUzytkownikChoroba,
                    _idChoroba:row._idChoroba,
                    _idUzytkownik : row._idUzytkownik,
                    dataWystawienia: row.dataWystawienia,
                    opisObjawow: row.opisObjawow,
                    zwolnienieDo: row.zwolnienieDo,
                    cenaWizyty : row.cenaWizyty,
                    uzytkownik: {
                        _idUzytkownik: row._idUzytkownik,
                        imie: row.imie,
                        nazwisko:row.nazwisko,
                        dataUrodzenia:row.dataUrodzenia,
                        email: row.email,
                        miejsceZamieszkania : row.miejsceZamieszkania,
                        telefon: row.telefon,
                        pesel: row.pesel
                    },
                    choroba: {
                        _idChoroba: row._idChoroba,
                        nazwa: row.nazwa,
                        opis:row.opis,
                        zakazna:row.zakazna
                    }
                };
                uzytkownikchoroby.push(uzytkownikchoroba);
            }
            console.log(uzytkownikchoroby);
        return uzytkownikchoroby;
    }).catch(err =>{
        console.log(err);
    });
};

exports.getUserDiseaseId = (idUzytkownikChoroba) => {
    console.log("***")
    console.log(idUzytkownikChoroba);
    const query = `SELECT uc._idUzytkownikChoroba , uc.dataWystawienia, uc.opisObjawow, uc.zwolnienieDo, uc.cenaWizyty,
    c._idChoroba, c.nazwa, c.opis, c.zakazna,
    u._idUzytkownik , u.imie, u.nazwisko, u.dataUrodzenia, u.email, u.miejsceZamieszkania, u.telefon, u.pesel 
    FROM UzytkownikChoroba uc
     LEFT JOIN Choroba c on uc._idChoroba= c._idChoroba
      LEFT JOIN Uzytkownik u on uc._idUzytkownik= u._idUzytkownik
       WHERE uc._idUzytkownikChoroba=?`
    return db.promise().query(query, [idUzytkownikChoroba])
        .then((results,fields) =>{
        const row = results[0][0];
            console.log(row+"zero");
        if(!row){
            return {};
        }
        const uzytkownikchoroba = {
                    _idUzytkownikChoroba: parseInt(idUzytkownikChoroba),
                    dataWystawienia:  new Date(row.dataWystawienia.getTime() - (row.dataWystawienia .getTimezoneOffset() * 60000 )).toISOString().split("T")[0],
                    opisObjawow: row.opisObjawow,
                    _idUzytkownik : row._idUzytkownik,
                    _idChoroba:row._idChoroba,
                    zwolnienieDo:  row.zwolnienieDo ? new Date(row.zwolnienieDo.getTime() - (row.zwolnienieDo .getTimezoneOffset() * 60000 )).toISOString().split("T")[0] : null,
                    cenaWizyty : row.cenaWizyty,
                    uzytkownik: {
                        _idUzytkownik: row._idUzytkownik,
                        imie: row.imie,
                        nazwisko:row.nazwisko,
                        dataUrodzenia:row.dataUrodzenia,
                        email: row.email,
                        miejsceZamieszkania : row.miejsceZamieszkania,
                        telefon: row.telefon,
                        pesel: row.pesel
                    },
                    choroba: {
                        _idChoroba: row._idChoroba,
                        nazwa: row.nazwa,
                        opis:row.opis,
                        zakazna:row.zakazna
                    }
                };
            console.log("repository");
            console.log(uzytkownikchoroba);
            return uzytkownikchoroba;
        }).catch(err =>{
            console.log(err);
            throw err;
        });
};
exports.getUserDiseaseSingle = (idUzytkownikChoroba) => {
    console.log("***")
    console.log(idUzytkownikChoroba);
    const query = `SELECT uc._idUzytkownikChoroba , uc.dataWystawienia, uc.opisObjawow, uc.zwolnienieDo, uc.cenaWizyty,
    c._idChoroba, c.nazwa, c.opis, c.zakazna,
    u._idUzytkownik , u.imie, u.nazwisko, u.dataUrodzenia, u.email, u.miejsceZamieszkania, u.telefon, u.pesel 
    FROM UzytkownikChoroba uc
     LEFT JOIN Choroba c on uc._idChoroba= c._idChoroba
      LEFT JOIN Uzytkownik u on uc._idUzytkownik= u._idUzytkownik
       WHERE u._idUzytkownik=?`
    return db.promise().query(query, [idUzytkownikChoroba])
        .then((results,fields) =>{
            const uzytkownikchoroby =[];
            for (let i =0 ; i< results[0].length; i++){
                const row = results[0][i];
                const uzytkownikchoroba = {
                    _idUzytkownikChoroba: row._idUzytkownikChoroba,
                    _idChoroba:row._idChoroba,
                    _idUzytkownik : row._idUzytkownik,
                    dataWystawienia: row.dataWystawienia,
                    opisObjawow: row.opisObjawow,
                    zwolnienieDo: row.zwolnienieDo,
                    cenaWizyty : row.cenaWizyty,
                    uzytkownik: {
                        _idUzytkownik: row._idUzytkownik,
                        imie: row.imie,
                        nazwisko:row.nazwisko,
                        dataUrodzenia:row.dataUrodzenia,
                        email: row.email,
                        miejsceZamieszkania : row.miejsceZamieszkania,
                        telefon: row.telefon,
                        pesel: row.pesel
                    },
                    choroba: {
                        _idChoroba: row._idChoroba,
                        nazwa: row.nazwa,
                        opis:row.opis,
                        zakazna:row.zakazna
                    }
                };
                uzytkownikchoroby.push(uzytkownikchoroba);
            }
            console.log(uzytkownikchoroby);
            return uzytkownikchoroby;
        }).catch(err =>{
            console.log(err);
        });
};
exports.createUserDisease = (data) => {
    const vRes = uzytkownikChorobaSchema.validate(data, {abortEarly:false} );
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    const _idUzytkownik= data._idUzytkownik;
    const _idChoroba =data._idChoroba;
    const objawy = data.opisObjawow;
    const dataWystawienia= data.dataWystawienia;
    data.zwolnienieDo = data.zwolnienieDo ? data.zwolnienieDo : null;
    const zwolnienieDo =data.zwolnienieDo;
    const cenaWizyty =data.cenaWizyty;
    console.log(_idUzytkownik);
    const sql = 'INSERT INTO UzytkownikChoroba (dataWystawienia, opisObjawow, zwolnienieDo, cenaWizyty, _idChoroba, _idUzytkownik ) VALUES (?,?,?,?,?,?)';
    return db.promise().execute(sql, [dataWystawienia, objawy, zwolnienieDo, cenaWizyty, _idChoroba, _idUzytkownik]);
};

exports.updateUserDisease = (idUzytkownikChoroba, userData) => {
    console.log("userData");
    console.log(userData);
    console.log(idUzytkownikChoroba)
    const vRes = uzytkownikChorobaSchema.validate(userData, {abortEarly:false} );
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    const _idUzytkownikChoroba = userData._idUzytkownikChoroba ?  userData._idUzytkownikChoroba : idUzytkownikChoroba;
    const iduzytkownik= userData._idUzytkownik;
    const idchoroba= userData._idChoroba;
    const dataWystawienia = userData.dataWystawienia;
    const opisObjawow= userData.opisObjawow;
    userData.zwolnienieDo = userData.zwolnienieDo ? userData.zwolnienieDo : null;
    const zwolnienieDo =userData.zwolnienieDo;
    const cenaWizyty = userData.cenaWizyty;
    const sql = `UPDATE UzytkownikChoroba SET _idChoroba=?, _idUzytkownik=?, dataWystawienia=?, opisObjawow=?, zwolnienieDo=?, cenaWizyty=? where _idUzytkownikChoroba=?`;
    return db.promise().execute(sql, [idchoroba, iduzytkownik, dataWystawienia, opisObjawow, zwolnienieDo, cenaWizyty, idUzytkownikChoroba]);
};

exports.deleteUserDisease = (idUzytkownikChoroba) => {
    const sql= 'DELETE FROM Recepta where _idUzytkownikChoroba=? '
    const sql1 = 'DELETE FROM UzytkownikChoroba where _idUzytkownikChoroba=?'
    return db.promise().execute(sql, [idUzytkownikChoroba]).then(() => {
        return db.promise().execute(sql1,[idUzytkownikChoroba])
    });
};
exports.deleteManyUserDisease = (idUzytkownicyChoroby) => {

    const sql1 = 'DELETE FROM UzytkownikChoroba where _idUzytkownikChoroba IN (?)'
    return db.promise().execute(sql1, [idUzytkownicyChoroby]);
};
