
const db = require('../../config/mysql2/db');
const uzytkownikSchema = require('../../model/joi/User');


exports.findByEmail = (email) => {
    const query = `SELECT  u._idUzytkownik, u.email , u.haslo, u.imie, u.nazwisko, u._idRola, u.dataUrodzenia, u.miejsceZamieszkania, u.telefon, u.pesel
    FROM Uzytkownik u 
    WHERE u.email=?`
    return db.promise().query(query, [email]).then((results,fields) =>{
        const firstRow = results[0][0];
        if(!firstRow){
            return undefined;
        }
        console.log(firstRow._idRola);
        const uzytkownik ={
            _idUzytkownik: firstRow._idUzytkownik,
            email: firstRow.email,
            haslo: firstRow.haslo,
            imie: firstRow.imie,
            nazwisko:firstRow.nazwisko,
            dataUrodzenia: firstRow.dataUrodzenia,
            pesel: firstRow.pesel,
            telefon : firstRow.telefon,
            miejsceZamieszkania: firstRow.miejsceZamieszkania,
            rola :firstRow._idRola
        }
        console.log(uzytkownik);
        return uzytkownik;
    }).catch(err =>{
        console.log(err);
        throw err;
    });

}

exports.getUser = () => {
    console.log("****")
    return db.promise().query('SELECT * FROM Uzytkownik')
        .then((results,fields) =>{
        console.log(results[0]);
        for( let user of results[0]){
            user.dataUrodzenia =(new Date(user.dataUrodzenia .getTime() - (user.dataUrodzenia .getTimezoneOffset() * 60000 )).toISOString().split("T")[0])}
        return  results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getUserId = (idUzytkownik) => {
    const query = `SELECT  u._idUzytkownik , u.imie, u.nazwisko, u.dataUrodzenia, u.email, u.miejsceZamieszkania, u.telefon, u.pesel,u.haslo, u._idRola,
    uc._idUzytkownikChoroba , uc.dataWystawienia, uc.opisObjawow, uc.zwolnienieDo, uc.cenaWizyty, 
    c._idChoroba, c.nazwa, c.opis, c.zakazna
    FROM Uzytkownik u 
    LEFT JOIN UzytkownikChoroba  uc on  uc._idUzytkownik= u._idUzytkownik
    LEFT JOIN Choroba c on  uc._idChoroba= c._idChoroba
    WHERE u._idUzytkownik=?`
    return db.promise().query(query, [idUzytkownik]).then((results,fields) =>{
        const firstRow = results[0][0];
        if(!firstRow){
            return {};
        }
            const uzytkownik ={
                _idUzytkownik: parseInt(idUzytkownik),
                imie: firstRow.imie,
                nazwisko:firstRow.nazwisko,
                dataUrodzenia:(new Date(firstRow.dataUrodzenia.getTime() - (firstRow.dataUrodzenia .getTimezoneOffset() * 60000 )).toISOString().split("T")[0]),
                email:firstRow.email,
                miejsceZamieszkania : firstRow.miejsceZamieszkania,
                telefon:firstRow.telefon,
                haslo: firstRow.haslo,
                pesel: firstRow.pesel,
                _idRola:firstRow._idRola,
                uzytkownikchoroby:[]
            }
            for (let i =0 ; i< results[0].length; i++){
                const row = results[0][i];
                if(row._idUzytkownikChoroba){
                    const uzytkownikchoroba = {
                        _idUzytkownikChoroba: row._idUzytkownikChoroba,
                        dataWystawienia: row.dataWystawienia,
                        opisObjawow: row.opisObjawow,
                        zwolnienieDo:  row.zwolnienieDo,
                        cenaWizyty : row.cenaWizyty,
                        choroba: {
                            _idChoroba: row._idChoroba,
                            nazwa: row.nazwa,
                            opis: row.opis,
                            zakazna: row.zakazna
                        }
                    };
                    uzytkownik.uzytkownikchoroby.push(uzytkownikchoroba);
                }
            }
            console.log("repository"+uzytkownik);
            return uzytkownik;
        }).catch(err =>{
            console.log(err);
            throw err;
        });
}

exports.createUser = (newUserData) => {
    const authUtil = require('../../util/authUtils');
    const passHash = authUtil.hashPassowrd(newUserData.haslo);
    const vRes = uzytkownikSchema.validate(newUserData, {abortEarly:false} );
    console.log(vRes.error);
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    return checkEmailUnique1(newUserData.email).then(emailErr => {
        if(emailErr!=0){
            return Promise.reject(emailErr);
        }else{
            const imie= newUserData.imie;
            console.log(imie);
            const nazwisko =newUserData.nazwisko;
            console.log(newUserData.dataUrodzenia);
            const dataUrodzenia = newUserData.dataUrodzenia;
            const email= newUserData.email;
            const miejsceZamieszkania =newUserData.miejsceZamieszkania;
            console.log(passHash);
            const haslo= passHash;
            const telefon= newUserData.telefon;
            const pesel =newUserData.pesel;
            //const role =newUserData._idRola;
            const sql = 'INSERT INTO Uzytkownik(imie,nazwisko,dataUrodzenia,email,miejsceZamieszkania,telefon,pesel,haslo,_idRola) VALUES (?,?,?,?,?,?,?,?,?)'
            return db.promise().execute(sql, [imie,nazwisko,dataUrodzenia,email,miejsceZamieszkania,telefon,pesel,haslo,2]);
        }
    }).catch(err=>{
        console.log(err);
       return Promise.reject(err);
    });
};
exports.updateUser = (idUzytkownik,userData) => {
    const vRes = uzytkownikSchema.validate(userData, {abortEarly:false} );
    if(vRes.error){
        console.log(vRes.error);
        return Promise.reject(vRes.error);
    }
    return checkEmailUnique(userData.email,idUzytkownik).then(emailErr => {
        if(emailErr!=0){
            return Promise.reject(emailErr);
        }else {
            console.log(idUzytkownik + "update User");
            const imie = userData.imie;
            const nazwisko = userData.nazwisko;
            const dataUrodzenia = userData.dataUrodzenia;
            console.log(dataUrodzenia);
            const email = userData.email;
            const miejsceZamieszkania = userData.miejsceZamieszkania;
            const rola = userData._idRola;
            console.log(rola);
            userData.telefon = userData.telefon ? userData.telefon : null;
            userData.pesel = userData.pesel ? userData.pesel : null;

            const telefon = userData.telefon;
            const pesel = userData.pesel;

            const sql = `Update Uzytkownik set imie =?,nazwisko=?,dataUrodzenia=?,email=?,miejsceZamieszkania=?,telefon=?,pesel=?,  _idRola=?  where _idUzytkownik=?`;
            return db.promise().execute(sql, [imie, nazwisko, dataUrodzenia, email, miejsceZamieszkania, telefon, pesel, rola , idUzytkownik]);
        }
        }).catch(err=>{
            console.log(err);
            return Promise.reject(err);
        });

};
exports.deleteUser = (idUzytkownik) => {
    console.log([idUzytkownik]);
    const sql1 = 'DELETE FROM UzytkownikChoroba where _idUzytkownik=?'
    const sql2 = 'DELETE FROM Uzytkownik where _idUzytkownik=?'
    return db.promise().execute(sql1, [idUzytkownik]).then(() => {
        return db.promise().execute(sql2,[idUzytkownik])
    });
};

checkEmailUnique = (email, userId) => {
    console.log("check")
    let sql, promise;
    if(userId){
        sql=`Select COUNT(1) as c FROM Uzytkownik where _idUzytkownik !=? and email=?`;
        promise =db.promise().query(sql, [userId, email]);
    }else{
        sql =`Select COUNT(1) as c FROM Uzytkownik where email=?`;
        promise =db.promise().query(sql,[email]);
    }
    return promise.then( (results, fields) => {
        const count =results[0][0].c;
        console.log(count);
        let err={};
        if(count > 0){
            err={
                details: [ {
                    path: ['email'],
                    message: 'emailExists'
                }]
            };
            return err;
        }
        return 0;
    });
}
checkEmailUnique1 = (email) => {
    let sql, promise;
    sql =`Select COUNT(1) as c FROM Uzytkownik where email=?`;
    promise =db.promise().query(sql,[email]);
    console.log("wchodzi email");
    return promise.then( (results, fields) => {
        const count =results[0][0].c;
        let err={};
        console.log(count);
        if(count > 0){
            err={
                details: [ {
                    path: ['email'],
                    message: 'emailExists'
                }]
            };
            return err;
        }
        return 0;
    });
}