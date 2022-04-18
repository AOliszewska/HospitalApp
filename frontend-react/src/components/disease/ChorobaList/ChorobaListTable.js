import {getFormattedDate} from "../../../helpers/dateHelper";
import {Link} from "react-router-dom";
import React from "react";
import ChorobaListTableRow from "./ChorobaListTableRow";
import {useTranslation} from "react-i18next";
import {getCurrentUser, isAuthenticated} from "../../../helpers/authHelper";

function ChorobaListTable(props){
    const choroba = props.choroby;
    const deleteEvent = props.deleteEvent;
    const current = getCurrentUser();
    const {t} = useTranslation();
    let id=1;
    return(

        <table className="table-vertical">
            <thead>
            <tr>
                <th><strong>{t('disease.fields.data')} </strong></th>
                <th><strong> {t('disease.fields.name')}  </strong></th>
                <th><strong> {t('disease.fields.infectiousDisease')}  </strong></th>
                <th><strong>  {t('list.actions.title')} </strong></th>

            </tr>
            </thead>
            <tbody>
            {choroba.map(ch =>
                <ChorobaListTableRow chorobaData={ch} id={id++} diseaseDelete={deleteEvent} key={ch._idChoroba}/>
            )}
            </tbody>
        </table>
    )
}
export default ChorobaListTable