const db = require('../../config/mysql2/db');
const chorobaSchema = require('../../model/joi/Disease');

exports.getDisease = () => {
    return db.promise().query('SELECT * FROM Choroba')
        .then((results,fields) => {
        console.log(results[0]);
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
};
exports.getDiseasebyId = (idChoroba) => {
    const query = `SELECT c._idChoroba , c.nazwa, c.opis, c.zakazna,
 uc._idUzytkownikChoroba , uc.dataWystawienia, uc.opisObjawow, uc.zwolnienieDo, uc.cenaWizyty,
 u._idUzytkownik , u.imie, u.nazwisko, u.dataUrodzenia, u.email, u.miejsceZamieszkania, u.telefon, u.pesel
 FROM Choroba c 
 LEFT JOIN UzytkownikChoroba uc on  uc._idChoroba= c._idChoroba
 LEFT JOIN Uzytkownik u on  uc._idUzytkownik= u._idUzytkownik
 WHERE c._idChoroba=?`
    return db.promise().query(query, [idChoroba]).then((results,fields) =>{
        const firstRow = results[0][0];
        if(!firstRow){
            return {};
        }
        const disease ={
            _idChoroba: parseInt(idChoroba),
            nazwa: firstRow.nazwa,
            opis:firstRow.opis,
            zakazna:firstRow.zakazna,
            uzytkownikchoroby: []
        }
        for (let i =0 ; i< results[0].length; i++){
            const row = results[0][i];
            if(row._idUzytkownikChoroba){
                const uzytkownikchoroba = {
                    _idUzytkownikChoroba: row._idUzytkownikChoroba,
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
                    }
                };
                disease.uzytkownikchoroby.push(uzytkownikchoroba);
            }
        }
        console.log(disease);
        return disease;
    }).catch(err =>{
       console.log(err);
       throw err;
    });
};

exports.createDisease = (diseaseData) => {
    console.log("zakazna"+diseaseData.zakazna);
    if(diseaseData.zakazna==="0" || diseaseData.zakazna===false || diseaseData.zakazna==="false"){
        diseaseData.zakazna=false;
    }else{
        diseaseData.zakazna=true;
    }
    const vRes = chorobaSchema.validate(diseaseData, {abortEarly:false} );
    if(vRes.error){
        console.log(vRes);
        return Promise.reject(vRes.error);
    }
    console.log(diseaseData);
    const nazwa= diseaseData.nazwa;
    const opis =diseaseData.opis;
    const zakazna = (diseaseData.zakazna===true ? 1 : 0 );
    console.log(zakazna);
    const sql = 'INSERT INTO Choroba (nazwa,opis, zakazna) VALUES (?,?,?)'
    return db.promise().execute(sql, [nazwa,opis,zakazna]);
};

exports.updateDisease = (diseaseId,diseaseData) => {
    if(diseaseData.zakazna==="0" || diseaseData.zakazna===false ||diseaseData.zakazna===0){
        diseaseData.zakazna=false;
    }else{
        diseaseData.zakazna=true;
    }

    const vRes = chorobaSchema.validate(diseaseData, {abortEarly:false});
    if(vRes.error){
        console.log(vRes);
        return Promise.reject(vRes.error);
    }
    const nazwa= diseaseData.nazwa;
    const opis =diseaseData.opis;
    const zakazna =(diseaseData.zakazna===true ? 1 : 0);
    const sql = `Update Choroba set nazwa=?,opis=?, zakazna=? where _idChoroba=?`;
    return db.promise().execute(sql, [nazwa,opis,zakazna, diseaseId]);

};
exports.deleteDisease = (diseaseId) => {
    console.log(diseaseId);
    const sql1 = 'DELETE FROM UzytkownikChoroba where _idChoroba=?'
    const sql2 = 'DELETE FROM Choroba where _idChoroba=?'
    return db.promise().execute(sql1, [diseaseId]).then (() => {
        return db.promise().execute(sql2,[diseaseId])
    });
};
