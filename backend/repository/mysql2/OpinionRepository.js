const db = require('../../config/mysql2/db');


exports.getUser= (Uzytkownik) => {
    console.log("getUser")
    console.log(Uzytkownik);
    const query = `SELECT  u._idUzytkownik, u.imie, u.nazwisko, u._idRola, u.telefon, u.email
    FROM Uzytkownik u
    WHERE u._idRola=3 AND u._idUzytkownik!=?`
    return db.promise().query(query,[Uzytkownik])
        .then((results,fields) =>{
            const lekarze =[];
            for (let i =0 ; i< results[0].length; i++){
                const firstRow = results[0][i];
                const uzytkownik = {
                    idUzytkownik: firstRow._idUzytkownik,
                    imie: firstRow.imie,
                    nazwisko:firstRow.nazwisko,
                    email:firstRow.email,
                    telefon:firstRow.telefon,
                    _idRola:firstRow._idRola,
                }
                lekarze.push(uzytkownik);
            }
            return lekarze;
        }).catch(err =>{
            console.log(err);
        });
};
exports.getOpinionId = (idOpinion) => {
    const query = `SELECT o._idOpinia, o._idUzytkownik, o._idUzytkownik2, o.Opinia
    FROM Opinie o
    WHERE o._idOpinia=?`
    return db.promise().query(query, [idOpinion]).then((results,fields) =>{
        const firstRow = results[0][0];
        if(!firstRow){
            return {};
        }
        const opinia ={
            _idOpinion :firstRow._idOpinia,
            _idUzytkownik: firstRow._idUzytkownik,
            _idUzytkownik2: firstRow._idUzytkownik2,
            Opinia: firstRow.Opinia
        }
        return opinia;
    }).catch(err =>{
        console.log(err);
        throw err;
    });
};
exports.getUserOpinia = (idUzytkownik) => {
    const query = `SELECT u._idUzytkownik, u.imie, u.nazwisko, u.email, u._idRola, o._idOpinia, o.Opinia, o._idUzytkownik2, u1.email AS email1, u1._idUzytkownik as Uzytkownik2
    FROM Uzytkownik u INNER JOIN Opinie o on u._idUzytkownik = o._idUzytkownik JOIN Uzytkownik u1 on u1._idUzytkownik= o._idUzytkownik2 WHERE u._idUzytkownik=?`
    return db.promise().query(query, [idUzytkownik]).then((results,fields) =>{
        const opinie =[];
        for (let i =0 ; i< results[0].length; i++) {
            const row = results[0][i];
            const opinia = {
                _idOpinia: row._idOpinia,
                _idUzytkownik: row._idUzytkownik,
                imie: row.imie,
                nazwisko: row.nazwisko,
                email: row.email,
                _idUzytkownik1: row.Uzytkownik2,
                email1: row.email1,
                Opinia: row.Opinia,

            }
            console.log(opinie)
            opinie.push(opinia);
        }
        return opinie;
    }).catch(err =>{
        console.log(err);
    });
};
exports.getListId = () => {
    const query = `SELECT  u._idUzytkownik , u.imie, u.nazwisko, u.dataUrodzenia, u.email, u.miejsceZamieszkania, u.telefon, u.pesel,u.haslo, u._idRola
    FROM Uzytkownik u
    WHERE u._idRola=3`
    return db.promise().query(query)
        .then((results,fields) =>{
            const lekarze =[];
            for (let i =0 ; i< results[0].length; i++){
                const firstRow = results[0][i];
                const uzytkownik = {
                    idUzytkownik: firstRow._idUzytkownik,
                    imie: firstRow.imie,
                    nazwisko:firstRow.nazwisko,
                    email:firstRow.email,
                    telefon:firstRow.telefon,
                    _idRola:firstRow._idRola,
                }
                lekarze.push(uzytkownik);
            }
            return lekarze;
        }).catch(err =>{
            console.log(err);
        });
};

exports.createOpinion = (data) => {
    // const vRes = ReceptaSchema.validate(data, {abortEarly:false} );
    // if(vRes.error){
    //     return Promise.reject(vRes.error);
    // }
    console.log("DATAAA")
    console.log(data)
    const _idUzytkownik= data._idUzytkownik;
    const _idUzytkownik2= data._idUzytkownik2;
    const opinia=data.Opinia;
    console.log(opinia, _idUzytkownik, _idUzytkownik2);
    const sql = 'INSERT INTO Opinie ( _idUzytkownik, _idUzytkownik2, Opinia ) VALUES (?,?,?)';
    return db.promise().execute(sql, [  _idUzytkownik,_idUzytkownik2,opinia]);
};
exports.updateOpinionId= (_idOpinia, data) =>{

    // if(vRes.error){
    //     return Promise.reject(vRes.error);
    // }
    console.log(_idOpinia);
    console.log(data);
    const sql = `UPDATE Opinie SET _idUzytkownik=?, _idUzytkownik2=?, Opinia=? where _idOpinia=?`;
    return db.promise().execute(sql, [ data._idUzytkownik,data._idUzytkownik2,data.Opinia,_idOpinia]);
}

exports.deleteOpinion = (idOpinia) => {
    const sql1 = 'DELETE FROM Opinie where _idOpinia=?'
    return db.promise().execute(sql1, [idOpinia]);
};

