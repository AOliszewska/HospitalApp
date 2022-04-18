import {getFormattedDate} from "../../../helpers/dateHelper";
import {Link} from "react-router-dom";
import React from "react";
import MedicineListTableRow from "./MedicineListTableRow";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";

function MedicineListTable(props){
    const {t} = useTranslation();
    const lek = props.lekarstwa;
    const deleteEvent = props.deleteEvent;
    //const current = getCurrentUser();
    let id=1;
    return(
            <table className="table-vertical">
                <thead>
                <tr>
                    <th><strong>{t('user.fields.data')}</strong></th>
                    <th><strong>{t('medicine.fields.name')}</strong></th>
                    <th><strong>{t('medicine.fields.price')}</strong></th>
                    <th><strong>{t('list.actions.title')}</strong></th>
                </tr>
                </thead>
                <tbody>
                {lek.map(lekarstwo =>
                    <MedicineListTableRow lekData={lekarstwo} id={id++} deleteEvent={deleteEvent} key={lekarstwo._idLekarstwa}/>
                )}
                </tbody>
            </table>
    )
}
export default MedicineListTable