

const db = require('../../config/mysql2/db');
const authUtil = require("../../util/authUtils");
const LekarstwoSchema = require("../../model/joi/Medicine");



exports.getMedicine = () => {
    return db.promise().query('SELECT * FROM Lekarstwo')
        .then((results,fields) =>{
            console.log(results[0]);
            /*for( let user of results[0]){
                user.dataUrodzenia =(new Date(user.dataUrodzenia .getTime() - (user.dataUrodzenia .getTimezoneOffset() * 60000 )).toISOString().split("T")[0])}*/
            return  results[0];
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getMedicineId = (idLekarstwo) => {
    const query = `SELECT  l._idLekarstwa , l.nazwa, l.cena, l.opisLekarstwa,
    uc._idUzytkownikChoroba , uc.dataWystawienia, uc.opisObjawow, uc.zwolnienieDo, uc.cenaWizyty, 
    c.opisRecepty, c.dataWaznosci, c._idRecepta
    FROM Lekarstwo l
    LEFT JOIN Recepta c on  c._idLekarstwa= l._idLekarstwa
    LEFT JOIN UzytkownikChoroba  uc on  uc._idUzytkownikChoroba= c._idUzytkownikChoroba
    WHERE l._idLekarstwa=?`
    return db.promise().query(query, [idLekarstwo]).then((results,fields) =>{
        const firstRow = results[0][0];
        if(!firstRow){
            return {};
        }
        const lekarstwo ={
            _idLekarstwa: parseInt(idLekarstwo),
            nazwa: firstRow.nazwa,
            cena:firstRow.cena,
            opisLekarstwa:firstRow.opisLekarstwa,
            recepta:[]
        }
        for (let i =0 ; i< results[0].length; i++){
            const row = results[0][i];
            if(row._idUzytkownikChoroba){
                const receptalekarstwa = {
                    _idRecepta: row._idRecepta,
                    opisRecepty : row.opisRecepty,
                    dataWaznosci: row.dataWaznosci,
                    uzytkownikchoroba: {
                        _idUzytkownikChoroba: row._idUzytkownikChoroba,
                        opisObjawow: row.opisObjawow,
                        dataWystawienia: row.dataWystawienia,
                        zwolnienieDo: row.zwolnienieDo,
                        cenaWizyty: row.cenaWizyty,
                    }
                };
                lekarstwo.recepta.push(receptalekarstwa);
            }
        }
        return lekarstwo;
    }).catch(err =>{
        console.log(err);
        throw err;
    });

}
exports.createMedicine = (newMedicineData) => {
    const med = {
        nazwa: newMedicineData.nazwa,
        cena:newMedicineData.cena,
        opisLekarstwa:newMedicineData.opisLekarstwa
    }
            const vRes = LekarstwoSchema.validate(med, {abortEarly:false} );
            if(vRes.error){
                return Promise.reject(vRes.error);
            }
            const sql = 'INSERT INTO Lekarstwo(nazwa,cena,opisLekarstwa) VALUES (?,?,?)'
            return db.promise().execute(sql, [med.nazwa,med.cena,med.opisLekarstwa]);

};
exports.updateMedicine=(idLekarstwo, newMedicineData)=> {
    const med = {
        nazwa: newMedicineData.nazwa,
        cena:newMedicineData.cena,
        opisLekarstwa:newMedicineData.opisLekarstwa
    }
    const vRes = LekarstwoSchema.validate(med, {abortEarly:false} );
    if(vRes.error){
        console.log(vRes.error);
        return Promise.reject(vRes.error);
    }
            const sql = `Update Lekarstwo set nazwa =?,cena=?,opisLekarstwa=? where _idLekarstwa=?`;
            return db.promise().execute(sql, [med.nazwa,med.cena,med.opisLekarstwa, idLekarstwo]);
}
exports.deleteMedicine = (idLekarstwa) => {
    const sql1 = 'DELETE FROM Recepta where _idLekarstwa=?'
    const sql2 = 'DELETE FROM Lekarstwo where _idLekarstwa=?'
    return db.promise().execute(sql1, [idLekarstwa]).then(() => {
        return db.promise().execute(sql2,[idLekarstwa])
    });
};
