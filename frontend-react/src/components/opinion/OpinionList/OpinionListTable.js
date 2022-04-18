import React from "react";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";
import OpinionListTableRow from "./OpinionListTableRow";

function OpinionListTable(props){
    const opinion = props.opinion;
    const deleteEvent = props.deleteEvent;
    const current = getCurrentUser();
    const rola = current._idRola;
    const {t} = useTranslation();
    console.log(opinion);
    let id=1;
    return(

        <table className="table-vertical">
            <thead>
            <tr><th><strong>{t('user.fields.data')} </strong></th>
                <th><strong>{t('user.fields.firstName')}</strong></th>
                <th><strong> {t('user.fields.lastName')} </strong></th>
                <th><strong> {t('user.fields.email')} </strong></th>
                <th><strong>{t('list.actions.title')} </strong></th>
            </tr>
            </thead>
            <tbody>
            {opinion.map(ch =>
                <OpinionListTableRow opinion={ch} id={id++} diseaseDelete={deleteEvent} key={ch.idUzytkownik}/>
            )}
            </tbody>
        </table>
    )
}
export default OpinionListTable