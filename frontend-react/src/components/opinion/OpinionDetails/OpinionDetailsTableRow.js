import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";

function OpinionDetailsTableRow(props){
    const {t} = useTranslation();
    const opinion= props.opinion;
    const idDoctor= props.idDoctor;
    const deleteUser= props.deleteEvent;
    const current = getCurrentUser();
    const user = parseInt(current.userId);
    const id= props.id;
    const userId=opinion._idUzytkownik1;
    return (
        <tr>
            <td>{id}</td>
            <td>{opinion.email1}</td>
            <td>{opinion.Opinia}</td>
            <td>
                {user == userId ?
                <span>
                <Link to={`/Opinion/edit/${idDoctor}/${opinion._idOpinia}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link>
                <Link to={`/Opinion/details/${idDoctor}`} onClick={() => deleteUser(opinion._idOpinia)} className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                </span>
               :
                <span>
                </span>
                }
            </td>
        </tr>
    )
}
export default OpinionDetailsTableRow


















