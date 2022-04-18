import React from "react";
import { getFormattedDate } from "../../../helpers/dateHelper";

import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function UserDetailsData(props) {
    const patientDiseaseData = props.patientDiseaseData;
    console.log(patientDiseaseData);
    const {t} = useTranslation();

    return (
        <React.Fragment>
            <main>
                <h2> {t('patientdisease.details.title')}</h2>
                <table className="table-horizontal">
                <tbody>
                    <tr>
                        <td> {t('user.fields.firstName')}</td>
                        <td>{patientDiseaseData.uzytkownik.imie}</td>
                    </tr>
                    <tr>
                        <td>{t('user.fields.lastName')}</td>
                        <td>{patientDiseaseData.uzytkownik.nazwisko}</td>
                    </tr>
                    <tr>
                        <td>{t('user.fields.birthdate')}</td>
                        <td>{patientDiseaseData.uzytkownik.dataUrodzenia ? getFormattedDate(patientDiseaseData.uzytkownik.dataUrodzenia) : ""}</td>
                    </tr>
                    <tr>
                        <td>{t('user.fields.email')}</td>
                        <td>{patientDiseaseData.uzytkownik.email}</td>
                    </tr>

                    <tr>
                        <td>{t('user.fields.address')}</td>
                        <td>{patientDiseaseData.uzytkownik.miejsceZamieszkania}</td>
                    </tr>
                    <tr>
                        <td>{t('user.fields.telephone')}</td>
                        <td>{patientDiseaseData.uzytkownik.telefon}</td>
                    </tr>
                    <tr>
                        <td>{t('user.fields.pesel')}</td>
                        <td>{patientDiseaseData.uzytkownik.pesel}</td>
                    </tr>
                </tbody>
                </table>
                <hr/>

                <h2> {t('patientdisease.details.medicalResults')} </h2>
                <table className="table-horizontal">
                    <tbody>
                    <tr>
                        <td>{t('disease.fields.name')}</td>
                        <td>{patientDiseaseData.choroba.nazwa}</td>
                    </tr>
                    <tr>
                        <td>{t('disease.fields.descriptionDisease')}</td>
                        <td>{patientDiseaseData.choroba.opis}</td>
                    </tr>
                    <tr>
                        <td>{t('disease.fields.infectiousDisease')}</td>
                        <td>{patientDiseaseData.choroba.zakazna===1 ? "tak":"nie" }</td>
                    </tr>
                    <tr>
                        <td> {t('user.details.description')}</td>
                        <td>{patientDiseaseData.opisObjawow}</td>
                    </tr>
                    <tr>
                        <td>{t('user.details.date')}</td>
                        <td>{patientDiseaseData.dataWystawienia ? getFormattedDate(patientDiseaseData.dataWystawienia) : ''}</td>
                    </tr>
                    <tr>
                        <td>{t('user.details.exemption')}</td>
                        <td>{patientDiseaseData.zwolnienieDo ? getFormattedDate(patientDiseaseData.zwolnienieDo) : ''}</td>
                    </tr>
                    <tr>
                        <td>{t('user.details.price')}</td>
                        <td>{patientDiseaseData.cenaWizyty}</td>
                    </tr>
                    </tbody>
                </table>

                <div className="button-wrapper">
                    <Link to={`/PacjentChoroba/Prescription/${patientDiseaseData._idUzytkownikChoroba}`} className="button-back">{t('prescription.list.viewTheRecipe')}</Link>
                </div>
                <div className="button-wrapper">
                    <Link to="/PacjentChoroba" className="button-back">{t('form.actions.return')}</Link>
                </div>
            </main>
        </React.Fragment>
    )
}

export default (UserDetailsData)