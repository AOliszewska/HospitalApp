import React from "react";
import { getFormattedDate } from "../../../helpers/dateHelper";
import {useTranslation} from "react-i18next";

function UserDetailsData(props) {
    const {t} = useTranslation();
    const patient = props.patientData;
    return (
        <React.Fragment>
            <table className="table-horizontal">
                <tbody>
                <tr>
                    <td>{t('user.fields.lastName')}</td>
                    <td> {patient.imie}</td>
                </tr>

                <tr>
                    <td>{t('user.fields.lastName')}</td>
                    <td>{patient.nazwisko}</td>
                </tr>
                <tr>
                    <td>{t('user.fields.birthdate')}</td>
                    <td>{patient.dataUrodzenia ? getFormattedDate(patient.dataUrodzenia) : ""}</td>
                </tr>
                <tr>
                    <td>{t('user.fields.email')}</td>
                    <td>{patient.email}</td>
                </tr>
                <tr>
                    <td>{t('user.fields.address')}</td>
                    <td>{patient.miejsceZamieszkania}</td>
                </tr>
                <tr>
                    <td>{t('user.fields.telephone')}</td>
                    <td>{patient.telefon}</td>
                </tr>
                <tr>
                    <td>{t('user.fields.pesel')}</td>
                    <td>{patient.pesel}</td>
                </tr>
                </tbody>
            </table>
                <h2> {t('user.details.patientdisease')}</h2>
                <table className="table-vertical">
                    <thead>
                    <tr>
                        <th><strong> {t('user.details.nameDisease')} </strong></th>
                        <th><strong> {t('user.details.description')} </strong></th>
                        <th><strong> {t('user.details.date')} </strong></th>
                        <th><strong> {t('user.details.exemption')} </strong></th>
                        <th><strong> {t('user.details.price')} </strong></th>
                    </tr>
                    </thead>
                    <tbody>
                    {patient.uzytkownikchoroby.map(
                        userdisease =>
                        <tr key={userdisease._idUzytkownikChoroba}>
                            <td> {userdisease.choroba.nazwa}</td>
                            <td>{userdisease.opisObjawow}</td>
                            <td>{userdisease.dataWystawienia ? getFormattedDate(userdisease.dataWystawienia) : ""}</td>
                            <td>{userdisease.zwolnienieDo ? getFormattedDate(userdisease.zwolnienieDo) : ""}</td>
                            <td>{userdisease.cenaWizyty}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
        </React.Fragment>
    )
}

export default UserDetailsData