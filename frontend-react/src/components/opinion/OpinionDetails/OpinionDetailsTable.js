import React from "react";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";
import OpinionListTableRow from "../OpinionList/OpinionListTableRow";
import OpinionDetailsTableRow from "./OpinionDetailsTableRow";

function OpinionDetailsTable(props){
    const opinion = props.opinion;
    const idDoctor=props.idDoctor;
    const deleteEvent = props.deleteEvent;
    const current = getCurrentUser();
    const rola = current._idRola;
    const {t} = useTranslation();

    let id=1;
    return(

        <table className="table-vertical">
            <thead>
            <tr><th><strong>{t('user.fields.data')} </strong></th>
                <th><strong>{t('user.fields.email')}</strong></th>
                <th><strong>{t('opinion.list.opinion')}</strong></th>
                <th><strong>{t('list.actions.title')}</strong></th>
            </tr>
            </thead>
            <tbody>
            {opinion.map(ch =>
                <OpinionDetailsTableRow opinion={ch} id={id++} idDoctor={idDoctor} deleteEvent={deleteEvent} key={ch._idOpinia}/>
            )}
            </tbody>
        </table>
    )
}
export default OpinionDetailsTable