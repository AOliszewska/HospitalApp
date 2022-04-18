import React from "react";
import { getFormattedDate } from "../../../helpers/dateHelper";

import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";

function ChorobaDetailsData(props) {
    const disease= props.diseaseData;
    const {t} = useTranslation();
    const user = getCurrentUser();
    const rola = user && user._idRola? user._idRola : 2 ;
    return (
        <React.Fragment>
            <main>
                <h2>  {t('disease.list.pageTitle')}</h2>

                <table className="table-horizontal">
                    <tbody>
                    <tr>
                        <td> {t('disease.fields.name')}</td>
                        <td> {disease.nazwa}</td>
                    </tr>
                    <tr>
                        <td> {t('disease.fields.descriptionDisease')}</td>
                        <td>{disease.opis}</td>
                    </tr>
                    <tr>
                        <td>{t('disease.fields.infectiousDisease')}</td>
                        <td>{disease.zakazna===1?"tak":"nie"} </td>
                    </tr>
                    </tbody>
                </table>
                {rola===3 &&
                <span>
                <h2> {t('disease.details.patientdisease')} </h2>
                <table className="table-vertical">
                    <thead>
                    <tr>
                        <th><strong> {t('user.fields.data')} </strong></th>
                        <th><strong> {t('user.fields.firstName')} </strong></th>
                        <th><strong> {t('user.fields.lastName')}</strong></th>
                        <th><strong> {t('user.details.date')}</strong></th>
                        <th><strong> {t('user.details.exemption')}</strong></th>
                        <th><strong> {t('user.details.description')}</strong></th>
                        <th><strong> {t('user.details.price')}</strong></th>
                    </tr>
                    </thead>
                    <tbody>
                    {disease.uzytkownikchoroby.map(
                        userdisease =>
                            <tr key={userdisease._idUzytkownikChoroba}>
                                <td>{userdisease._idUzytkownikChoroba}</td>
                                <td>{userdisease.uzytkownik.imie}</td>
                                <td>{userdisease.uzytkownik.nazwisko}</td>
                                <td>{userdisease.dataWystawienia ? getFormattedDate(userdisease.dataWystawienia) : ""}</td>
                                <td>{userdisease.zwolnienieDo ? getFormattedDate(userdisease.zwolnienieDo) : ""}</td>
                                <td>{userdisease.opisObjawow}</td>
                                <td>{userdisease.cenaWizyty}</td>
                            </tr>
                    )}
                    </tbody>
                </table>
                 </span>
                }
                <div className="button-wrapper">
                    <Link to="/Choroby" className="button-back">{t('form.actions.return')}</Link>
                </div>
            </main>
        </React.Fragment>
    )
}

export default ChorobaDetailsData