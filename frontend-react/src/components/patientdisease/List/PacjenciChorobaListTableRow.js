import {getFormattedDate} from "../../../helpers/dateHelper";
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";

function PacjenciChorobaListTableRow(props){
    const {t} = useTranslation();
    const leczenie = props.leczenie;
    const deleteEvent = props.deleteEvent;
    const current = getCurrentUser();
    const rola = current._idRola;
    const id= props.id;
    return (
        <tr key={leczenie._idUzytkownikChoroba}>
            <td>{id}</td>
            <td>{leczenie.uzytkownik.imie}</td>
            <td>{leczenie.uzytkownik.nazwisko}</td>
            <td>{leczenie.choroba.nazwa}</td>
            <td>
                <Link to={`/PacjentChoroba/details/${leczenie._idUzytkownikChoroba}`}
                      className="list-actions-button-details">{t('list.actions.details')}</Link>
                {rola === 3 &&
                    <span>
                <Link to={`/PacjentChoroba/edit/${leczenie._idUzytkownikChoroba}`}
                      className="list-actions-button-edit">{t('list.actions.edit')}</Link>
                <Link to={`/PacjentChoroba/`} onClick={() => deleteEvent(leczenie._idUzytkownikChoroba)}
                      className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                 </span>
                }
            </td>

        </tr>
)
}
export default PacjenciChorobaListTableRow