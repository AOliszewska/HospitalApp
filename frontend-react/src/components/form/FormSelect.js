import React from 'react'
import {getValidationErrorKey} from "../../helpers/formHelper";
import {useTranslation} from "react-i18next";

function FormSelect(props){
    const className=props.error === '' ? '': 'error-input'
    const name = props.name
    const errorSpanId= 'error' + name[0].toUpperCase() + name.slice(1)
    const options = props.options;
    const value = props.value;
    const error = props.error
    const errorKey = getValidationErrorKey(error)
    const { t } = useTranslation();
    const translatedErrorMessage= t(errorKey)


    return (
        <>
            <label htmlFor={props.name}> {props.label}: {props.required && <abbr title="required" aria-label="required">*</abbr> }</label>
            <select
                className={className}
                name={props.name}
                id={props.name}
                onChange={props.onChange}
                value={value}
                >
                <option value="" label="">{t('patientdisease.form.details.option')}</option>
                {options.map(e => (
                    <option
                        key={e.value}
                        value={e.value}
                        label={e.label}
                        >
                    </option>

                ))}

            </select>
            <span id={errorSpanId} className="error-text">{translatedErrorMessage}</span>
        </>
    )
}

export default FormSelect