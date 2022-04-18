import {getFormattedDate} from "../../../helpers/dateHelper";
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";

function ChorobaListTableRow(props){
    const {t} = useTranslation();
    const yes= t('medicine.details.yes');
    const choroba= props.chorobaData;
    const deleteChoroba= props.diseaseDelete;
    const current = getCurrentUser();
    const user = current;
    const id= props.id;
    const rola = user && user._idRola? user._idRola : 2 ;
    return (

        <tr>
            <td>{id}</td>
            <td>{choroba.nazwa}</td>
            <td>{choroba.zakazna===1 ? "tak" : "nie"}</td>

            <td>
                <Link to={`/Choroby/details/${choroba._idChoroba}`}
                      className="list-actions-button-details">{t('list.actions.details')}</Link>
                {rola == 3 &&
                <span>
                <Link to={`/Choroby/edit/${choroba._idChoroba}`}
                      className="list-actions-button-edit">{t('list.actions.edit')}</Link>
                <Link to={`/Choroby/`} onClick={() => deleteChoroba(choroba._idChoroba)}
                      className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                </span>
                }
            </td>
        </tr>
    )
}
export default ChorobaListTableRow


















