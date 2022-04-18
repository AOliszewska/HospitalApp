import React from 'react'
import {getValidationErrorKey} from "../../helpers/formHelper";
import {useTranslation} from "react-i18next";

function FormTextArea(props){
    const className=props.error === '' ? '': 'error-input'
    const name = props.name
    const errorSpanId= 'error' + name[0].toUpperCase() + name.slice(1)
    const error = props.error
    const errorKey = getValidationErrorKey(error)
    const { t } = useTranslation();
    const translatedErrorMessage= t(errorKey)
    console.log(translatedErrorMessage);
    return (
        <>
            <label htmlFor={props.name}> {props.label}: {props.required && <abbr title="required" aria-label="required">*</abbr> }</label>
            <textarea
                className={className}
                name={props.name}
                id={props.name}
                onChange={props.onChange}
                rows={props.rows}
                cols={props.cols}
                value={props.value}
            >

            </textarea>
            <span id={errorSpanId} className="error-text">{translatedErrorMessage}</span>
        </>
    )
}

export default FormTextArea