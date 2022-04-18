import React from "react";
import { getFormattedDate } from "../../../helpers/dateHelper";

import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function MedicineDetailsData(props) {
    const medicine = props.medicineData;
    const {t} = useTranslation();
    return (
        <React.Fragment>
            <main>
                <h2>  {t('medicine.list.title')}</h2>

                <table className="table-horizontal">
                    <tbody>
                    <tr>
                        <td>{t('medicine.fields.name')}</td>
                        <td> {medicine.nazwa}</td>
                    </tr>
                    <tr>
                        <td>{t('medicine.fields.description')}</td>
                        <td>{medicine.opisLekarstwa}</td>
                    </tr>
                    <tr>
                        <td>{t('medicine.fields.price')}</td>
                        <td>{medicine.cena} </td>
                    </tr>
                    </tbody>
                </table>

                <div className="button-wrapper">
                    <Link to="/Lekarstwa" className="button-back">{t('form.actions.return')}</Link>
                </div>
            </main>
        </React.Fragment>
    )
}

export default MedicineDetailsData