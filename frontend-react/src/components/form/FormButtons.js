import React from  'react'
import {Link} from "react-router-dom";
import formMode from '../../helpers/formHelper'
import {useTranslation, withTranslation} from "react-i18next";

function FormButtons(props){
    const {t} = useTranslation()
    const submitButtonLabel=(props.formMode === formMode.NEW ? t('form.actions.add'): t('form.actions.edit'))
    return(

        <div className="button-wrapper">
            <p id="errorSummary" className="error-text">{props.error}</p>
            <input className="form-button-submit" type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className="form-button-cancel">{t('form.actions.cancel')}</Link>
        </div>

    )
}

export default withTranslation() (FormButtons)