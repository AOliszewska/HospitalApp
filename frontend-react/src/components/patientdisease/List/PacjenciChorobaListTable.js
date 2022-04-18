import {getFormattedDate} from "../../../helpers/dateHelper";
import {Link} from "react-router-dom";
import React from "react";
import PacjenciChorobaListTableRow from "./PacjenciChorobaListTableRow";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";

function PacjenciChorobaListTable(props){
    const pacjenciLeczenie = props.uzytkownicyChoroba;
    const deleteEvent = props.deleteEvent;
    const {t} = useTranslation();
    let id= 1;
    return(
            <table className="table-vertical">
                <thead>
                <tr id="listapacjentowwszystkich">
                    <th> {t('user.fields.data')}</th>
                    <th>{t('user.fields.firstName')}</th>
                    <th> {t('user.fields.lastName')}</th>
                    <th> {t('disease.fields.name')}</th>
                    <th> {t('list.actions.title')}</th>
                </tr>
                </thead>
                <tbody>
                {pacjenciLeczenie.map(leczenie =>
                    <PacjenciChorobaListTableRow leczenie={leczenie} id={id++} deleteEvent={deleteEvent} key={leczenie._idUzytkownikChoroba}/>
                )}
                </tbody>
            </table>
    )
}
export default PacjenciChorobaListTable