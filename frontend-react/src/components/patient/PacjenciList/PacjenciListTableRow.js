import {getFormattedDate} from "../../../helpers/dateHelper";
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";

function PacjenciListTableRow(props){
    const {t} = useTranslation();
    const user = props.userData
    const deleteUser= props.deleteEvent;
    const current = getCurrentUser();
    const userId= current.userId;
    const id = props.id;
    return (
        <tr>
            <td>{id}</td>
            <td>{user.imie}</td>
            <td>{user.nazwisko}</td>
            <td>{user.dataUrodzenia ? getFormattedDate(user.dataUrodzenia) : ""}</td>
            <td>{user.pesel ? user.pesel : ""}</td>

            <td>
                <Link to={`/Pacjenci/details/${user._idUzytkownik}`}
                      className="list-actions-button-details">{t('list.actions.details')}</Link>
                <Link to={`/Pacjenci/edit/${user._idUzytkownik}`}
                      className="list-actions-button-edit">{t('list.actions.edit')}</Link>
                {userId != user._idUzytkownik &&
                <Link to={`/Pacjenci`} onClick={() => deleteUser(user._idUzytkownik)}
                      className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                }

            </td>

        </tr>
)
}
export default PacjenciListTableRow