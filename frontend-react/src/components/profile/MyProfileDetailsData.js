import React from "react";
import { getFormattedDate } from "../../../src/helpers/dateHelper";
import {useTranslation} from "react-i18next";

function MyProfileDetailsData(props) {
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
        </React.Fragment>
    )
}

export default MyProfileDetailsData