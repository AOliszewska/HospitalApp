const db = require('../../config/mysql2/db');
const uzytkownikChorobaSchema = require("../../model/joi/UserDisease");
const ReceptaSchema = require("../../model/joi/Prescription");

exports.getPerDisease = () => {
    console.log("repository");
    const query = `SELECT  uc._idUzytkownikChoroba , uc.dataWystawienia, uc.opisObjawow, uc.zwolnienieDo, uc.cenaWizyty,
    r._idRecepta, r.opisRecepty, r.dataWaznosci,
    l._idLekarstwa , l.nazwa, l.cena, l.opisLekarstwa
    FROM Recepta r
    LEFT JOIN Lekarstwo l on  r._idLekarstwa= l._idLekarstwa
    LEFT JOIN UzytkownikChoroba uc on  uc._idUzytkownikChoroba= r._idUzytkownikChoroba`
    return db.promise().query(query)
        .then((results,fields) =>{
            const recepty =[];
            for (let i =0 ; i< results[0].length; i++){
                const row = results[0][i];
                const recepta = {
                    _idRecepta: row._idRecepta,
                    _idLekarstwa: row._idLekarstwa,
                    _idUzytkownikChoroba: row._idUzytkownikChoroba,
                    opisRecepty: row.opisRecepty,
                    dataWaznosci: row.dataWaznosci,
                    uzytkownikChoroba: {
                        _idUzytkownikChoroba: row._idUzytkownikChoroba,
                        dataWystawienia: new Date(row.dataWystawienia.getTime() - (row.dataWystawienia.getTimezoneOffset() * 60000)).toISOString().split("T")[0],
                        opisObjawow: row.opisObjawow,
                        zwolnienieDo: row.zwolnienieDo ? new Date(row.zwolnienieDo.getTime() - (row.zwolnienieDo.getTimezoneOffset() * 60000)).toISOString().split("T")[0] : null,
                        cenaWizyty: row.cenaWizyty,
                    },
                    lekarstwa: {
                        _idLekarstwa: row._idLekarstwa,
                        nazwa: row.nazwa,
                        cena : row.cena,
                        opisLekarstwa: row.opisLekarstwa
                    },
                }
                recepty.push(recepta);
            }
            console.log(recepty);
            return recepty;
        }).catch(err =>{
            console.log(err);
        });
};
exports.getPerIdRecepta = (idUzytkownikChoroba) => {
    const query = `SELECT  uc._idUzytkownikChoroba , uc.dataWystawienia, uc.opisObjawow, uc.zwolnienieDo, uc.cenaWizyty,
    r._idRecepta, r.opisRecepty, r.dataWaznosci,
    l._idLekarstwa , l.nazwa, l.cena, l.opisLekarstwa,
    c.nazwa as nazwaChoroby
    FROM Recepta r
    LEFT JOIN Lekarstwo l on  r._idLekarstwa= l._idLekarstwa
    LEFT JOIN UzytkownikChoroba uc on  uc._idUzytkownikChoroba= r._idUzytkownikChoroba
    LEFT JOIN Choroba c on c._idChoroba=uc._idUzytkownikChoroba
    WHERE r._idRecepta=?`
    return db.promise().query(query, [idUzytkownikChoroba]).then((results,fields) =>{
        const row = results[0][0];
        console.log(row);
        if(!row){
            return {};
        }
            const recepta = {
                    _idRecepta: row._idRecepta,
                    _idLekarstwa: row._idLekarstwa,
                    _idUzytkownikChoroba: row._idUzytkownikChoroba,
                    opisRecepty: row.opisRecepty,
                    dataWaznosci: row.dataWaznosci,
                    uzytkownikChoroba: {
                        _idUzytkownikChoroba: row._idUzytkownikChoroba,
                        dataWystawienia: new Date(row.dataWystawienia.getTime() - (row.dataWystawienia.getTimezoneOffset() * 60000)).toISOString().split("T")[0],
                        opisObjawow: row.opisObjawow,
                        zwolnienieDo: row.zwolnienieDo ? new Date(row.zwolnienieDo.getTime() - (row.zwolnienieDo.getTimezoneOffset() * 60000)).toISOString().split("T")[0] : null,
                        cenaWizyty: row.cenaWizyty,
                        choroba:{
                            nazwa: row.nazwaChoroby
                        }
                    },
                    lekarstwa: {
                        _idLekarstwa: row._idLekarstwa,
                        nazwa: row.nazwa,
                        cena : row.cena,
                        opisLekarstwa: row.opisLekarstwa
                    },
                }
            return recepta;
        }).catch(err =>{
            console.log(err);
        });
};
exports.getPerId = (idUzytkownikChoroba) => {
    const query = `SELECT  uc._idUzytkownikChoroba , uc.dataWystawienia, uc.opisObjawow, uc.zwolnienieDo, uc.cenaWizyty,
    r._idRecepta, r.opisRecepty, r.dataWaznosci,
    l._idLekarstwa , l.nazwa, l.cena, l.opisLekarstwa
    FROM Recepta r
    LEFT JOIN Lekarstwo l on  r._idLekarstwa= l._idLekarstwa
    LEFT JOIN UzytkownikChoroba uc on  uc._idUzytkownikChoroba= r._idUzytkownikChoroba
    WHERE uc._idUzytkownikChoroba=?`
    return db.promise().query(query, [idUzytkownikChoroba])
        .then((results,fields) =>{
            const recepty =[];
            for (let i =0 ; i< results[0].length; i++){
                const row = results[0][i];
                const recepta = {
                    _idRecepta: row._idRecepta,
                    _idLekarstwa: row._idLekarstwa,
                    _idUzytkownikChoroba: row._idUzytkownikChoroba,
                    opisRecepty: row.opisRecepty,
                    dataWaznosci: row.dataWaznosci,
                    uzytkownikChoroba: {
                        _idUzytkownikChoroba: row._idUzytkownikChoroba,
                        dataWystawienia: new Date(row.dataWystawienia.getTime() - (row.dataWystawienia.getTimezoneOffset() * 60000)).toISOString().split("T")[0],
                        opisObjawow: row.opisObjawow,
                        zwolnienieDo: row.zwolnienieDo ? new Date(row.zwolnienieDo.getTime() - (row.zwolnienieDo.getTimezoneOffset() * 60000)).toISOString().split("T")[0] : null,
                        cenaWizyty: row.cenaWizyty
                    },
                    lekarstwa: {
                        _idLekarstwa: row._idLekarstwa,
                        nazwa: row.nazwa,
                        cena : row.cena,
                        opisLekarstwa: row.opisLekarstwa
                    },
                }
                recepty.push(recepta);
            }
            console.log(recepty);
            return recepty;
        }).catch(err =>{
            console.log(err);
        });
};

exports.createPre = (data) => {
    const vRes = ReceptaSchema.validate(data, {abortEarly:false} );
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    console.log(data)
    const _idLekarstwa= data._idLekarstwa;
    const _idUzytkownikChoroba =data._idUzytkownikChoroba;
    const opisRecepty = data.opisRecepty;
    const  dataWaznosci= data.dataWaznosci;
    const sql = 'INSERT INTO Recepta ( _idUzytkownikChoroba, _idLekarstwa,opisRecepty,dataWaznosci ) VALUES (?,?,?,?)';
    return db.promise().execute(sql, [ _idUzytkownikChoroba, _idLekarstwa,opisRecepty, dataWaznosci]);
};
exports.updatePreId= (_idRecepta, data) =>{
    console.log("UPDATE")
    console.log(_idRecepta)
    console.log(data)
    const vRes = ReceptaSchema.validate(data, {abortEarly:false} );
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    const _idLekarstwa= data._idLekarstwa;
    const _idUzytkownikChoroba =data._idUzytkownikChoroba;
    const opisRecepty = data.opisRecepty;
    const  dataWaznosci= data.dataWaznosci;
    const sql = `UPDATE Recepta SET _idLekarstwa=?, _idUzytkownikChoroba=?, opisRecepty=?, dataWaznosci=? where _idRecepta=?`;
    return db.promise().execute(sql, [_idLekarstwa,_idUzytkownikChoroba,  opisRecepty, dataWaznosci, _idRecepta]);
}

exports.deletepres = (idRecepta) => {
    console.log("rep"+idRecepta);
    const sql1 = 'DELETE FROM Recepta where _idRecepta=?'
    return db.promise().execute(sql1, [idRecepta]);
};

