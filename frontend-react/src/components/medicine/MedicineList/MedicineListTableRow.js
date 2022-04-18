import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";


function MedicineListTableRow(props){
    const {t} = useTranslation();
    const lek = props.lekData
    const deleteUser= props.deleteEvent;
    const id = props.id;
    const user= getCurrentUser();
    const rola = user && user._idRola? user._idRola : 2 ;

    return (
        <tr>
            <td>{id}</td>
            <td>{lek.nazwa}</td>
            <td>{lek.cena}</td>

            <td>

                <Link to={`/Lekarstwa/details/${lek._idLekarstwa}`}
                      className="list-actions-button-details">{t('list.actions.details')}</Link>
                {rola===3 &&
                    <span>
                    <Link to={`/Lekarstwa/edit/${lek._idLekarstwa}`}
                    className="list-actions-button-edit">{t('list.actions.edit')}</Link>
                    <Link to={`/Lekarstwa`} onClick={() => deleteUser(lek._idLekarstwa)} className="list-actions-button-delete">{t('list.actions.delete')}</Link></span>
                }

            </td>

        </tr>
)
}
export default MedicineListTableRow