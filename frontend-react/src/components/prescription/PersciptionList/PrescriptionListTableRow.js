import {getFormattedDate} from "../../../helpers/dateHelper";
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";

function PrescriptionListTableRow(props){
    const {t} = useTranslation();
    const leczenie = props.leczenie;
    const deleteEvent = props.deleteEvent;
    const current = getCurrentUser();
    const rola = current._idRola;
    return (
        <tr key={leczenie._idRecepta}>
            <td>{leczenie.lekarstwa.nazwa}</td>
            <td>{leczenie.opisRecepty}</td>
            <td>{leczenie.dataWaznosci ? getFormattedDate(leczenie.dataWaznosci ): ''}</td>

             <td>
                <Link to={`/PacjentChoroba/Prescription/${leczenie._idUzytkownikChoroba}/${leczenie._idRecepta}`}
                      className="list-actions-button-details">{t('list.actions.details')}</Link>
                 {rola === 3 &&
                     <span>
                 <Link to={`/Prescription/edit/${leczenie._idUzytkownikChoroba}/${leczenie._idRecepta}`}
                       className="list-actions-button-edit">{t('list.actions.edit')}</Link>
                     <Link to={`/PacjentChoroba/Prescription/${leczenie._idUzytkownikChoroba}`} onClick={() => deleteEvent(leczenie._idRecepta)}
                           className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                     </span>
                 }
             </td>
        </tr>

    )
}
export default PrescriptionListTableRow