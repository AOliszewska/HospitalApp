import {getFormattedDate} from "../../../helpers/dateHelper";
import {Link} from "react-router-dom";
import React from "react";
import PrescriptionListTableRow from "./PrescriptionListTableRow";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";

function PrescriptionListTable(props){
    const pacjenciLeczenie = props.recepta;
    const deleteEvent = props.deleteEvent;
    const {t} = useTranslation();
    const current = getCurrentUser();
    const rola = current._idRola;
    return(

            <table className="table-vertical">
                <thead>
                <tr id="listapacjentowwszystkich">
                    <th>{t('prescription.fields.medicine')}</th>
                    <th>{t('prescription.fields.dosage')}</th>
                    <th>{t('prescription.fields.expirationDate')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
                </thead>
                <tbody>
                {pacjenciLeczenie.map(leczenie =>
                    <PrescriptionListTableRow leczenie={leczenie} deleteEvent={deleteEvent} key={leczenie._idRecepta}/>
                )}
                </tbody>
            </table>
    )
}
export default PrescriptionListTable