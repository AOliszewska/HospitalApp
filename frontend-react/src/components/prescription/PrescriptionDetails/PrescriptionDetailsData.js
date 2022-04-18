import React from "react";
import { getFormattedDate } from "../../../helpers/dateHelper";

import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function PrescriptionDetailsData(props) {
    const presData = props.presData;
    const {t} = useTranslation();

    return (
        <React.Fragment>
            <main>
                <h2> {t('prescription.list.title')}</h2>
                <div className="recepta">
                <p>{t('medicine.fields.name')} : {presData.lekarstwa.nazwa} </p>
                <p>{t('prescription.fields.dosage')} : {presData.opisRecepty}</p>
                <p>{t('prescription.fields.expirationDate')} : {presData.dataWaznosci ? getFormattedDate(presData.dataWaznosci): ''}</p>
                <p>{t('medicine.fields.description')} {presData.lekarstwa.opisLekarstwa}</p>
                <p>{t('medicine.fields.price')} {presData.lekarstwa.cena}</p>
                </div>
                <br></br>
                <div className="button-wrapper">
                    <Link to={`/PacjentChoroba/Prescription/${presData._idUzytkownikChoroba}`} className="button-back">Powrót</Link>
                </div>
            </main>
        </React.Fragment>
    )
}

export default (PrescriptionDetailsData)