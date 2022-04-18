import {getFormattedDate} from "../../../helpers/dateHelper";
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";

function OpinionListTableRow(props){
    const {t} = useTranslation();
    const yes= t('medicine.details.yes');
    const opinion= props.opinion;
    console.log(opinion);
    const deleteChoroba= props.diseaseDelete;
    const current = getCurrentUser();
    const rola = current._idRola;
    const id= props.id;
    console.log(id);
    return (

        <tr>
            <td> {id}</td>
            <td>{opinion.imie}</td>
            <td>{opinion.nazwisko}</td>
            <td>{opinion.email}</td>

            <td>
                <Link to={`/Opinion/details/${opinion.idUzytkownik}`}
                      className="list-actions-button-details">{t('list.actions.details')}</Link>
            </td>
        </tr>
    )
}
export default OpinionListTableRow


















