
import React from "react";
import PacjenciListTableRow from "./PacjenciListTableRow";
import {useTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";

function PacjenciListTable(props){
    const {t} = useTranslation();
    const pacjenci = props.uzytkownicy;
    const deleteEvent = props.deleteEvent;
    const current = getCurrentUser();
    let id=1;
    return(
            <table className="table-vertical">
                <thead>
                <tr>
                    <th><strong> {t('user.fields.data')} </strong></th>
                    <th><strong> {t('user.fields.firstName')}  </strong></th>
                    <th><strong> {t('user.fields.lastName')}  </strong></th>
                    <th><strong>  {t('user.fields.birthdate')} </strong></th>
                    <th><strong> {t('user.fields.pesel')}</strong></th>
                    <th><strong>  {t('list.actions.title')}</strong></th>

                </tr>
                </thead>
                <tbody>
                {pacjenci.map(user =>
                    <PacjenciListTableRow userData={user} id={id++} deleteEvent={deleteEvent} key={user._idUzytkownik}/>
                )}
                </tbody>
            </table>
    )
}
export default PacjenciListTable