import React from 'react'
import {Link, Redirect} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {addDiseaseApiCall, getDiseaseByIdApiCall, updateDiseaseApiCall} from "../../apiCalls/disease/diseaseApiCalls";
import {
    checkRequired,
    checkTextLengthRange
} from "../../helpers/validate/validateMethods";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import FormButtons from "../form/FormButtons";
import FormTextArea from "../form/FormTextArea";
import {formValidationKeys} from "../../helpers/formHelper";
import {withTranslation} from "react-i18next";


class ChorobaForm extends React.Component {

    constructor(props) {
        super(props);
        const paramsIdDisease = props.match.params.diseaseId;
        console.log("id user: " + paramsIdDisease)
        const currentFormMode = paramsIdDisease ? formMode.EDIT : formMode.NEW;

        this.state = {
            idDisease: paramsIdDisease,
            disease: {
                nazwa: '',
                opis: '',
                zakazna: ''
            },
            errors: {
                nazwa: '',
                opis: '',
                zakazna: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }
        componentDidMount = () => {
            const currentFormMode = this.state.formMode;
            if (currentFormMode === formMode.EDIT) {
                this.fetchDiseaseDetails()
            }
        }

      handleChange = (event) => {
         const {name, value } = event.target;
         const disease = { ...this.state.disease};
         disease[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            disease: disease,
            errors: errors
        })
        }
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                disease = this.state.disease,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                console.log(disease);
                promise = addDiseaseApiCall(disease)

            } else if (currentFormMode === formMode.EDIT) {
                console.log("edit"+disease)
                console.log("ZAKAZNA");
                console.log(this.state.disease.zakazna);
                const idDisease = this.state.idDisease;
                promise = updateDiseaseApiCall(idDisease, disease)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = { ...this.state.errors }
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({ redirect: true })
                            }
                        },
                        (error) => {
                            this.setState({ error })
                            console.log(error)
                        }
                    )
            }
        }
    }
    validateForm = () => {
        const disease= this.state.disease;
        const errors = this.state.errors;
        for(const fieldName in disease){
            const fieldValue = disease[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors();
    }
    hasErrors = () => {
        const errors = this.state.errors;
        for(const errorField in this.state.errors) {
            if (errors[errorField].length > 0 ) {
                return true;
            }
        }
        return false;
    }
    fetchDiseaseDetails = () => {
        getDiseaseByIdApiCall(this.state.idDisease)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            disease: null,
                            message: data.message
                        })
                    } else {
                        let dataEdit ={
                            _idChoroba: data._idChoroba,
                            nazwa: data.nazwa,
                            opis : data.opis,
                            zakazna: data.zakazna
                        }
                        console.log("dataEdit");
                        console.log(dataEdit);
                        this.setState({
                            disease: dataEdit,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }
    validateField = (fieldName, fieldValue) => {
        let nowDate= new Date(),
            month = '' + (nowDate.getMonth()+1),
            day=''+nowDate.getDate(),
            year=nowDate.getFullYear();

        if(month.length<2)
            month='0'+month;
        if(day.length<2)
            day='0'+day;
        const nowString = [year,month,day].join('-');
        let errorMessage = '';


        if(fieldName === 'nazwa') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 25)) {
                errorMessage = formValidationKeys.len_2_25;
            }
        }
        if(fieldName === 'opis') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 100)) {
                errorMessage = formValidationKeys.len_2_100;
            }
        }
        if( fieldName === 'zakazna') {
            if(fieldValue===undefined||fieldValue==='') {
                if (!checkRequired(fieldValue)) {
                    errorMessage = formValidationKeys.notEmpty
                }
            }
        }

        return errorMessage
    }



    render() {
        const {t} = this.props;
        console.log(this.state.disease)
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('disease.form.add.confirm.text') : t('disease.form.edit.confirm.text')

            return (
                <Redirect to={{
                    pathname: "/Disease/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('validationMessage.form') : ''
        const fetchError = this.state.error ? t('validationMessage.error') + `: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('disease.form.add.btnLabel') : t('disease.form.edit.btnLabel')
        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        let listDis=[];
            listDis.push({
                value: 0,
                label: "nie"
            })
            listDis.push({
                value: 1,
                label: "tak"
            })



        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                    <FormInput
                        type="text"
                        label={t('disease.fields.name')}
                        error={this.state.errors.nazwa}
                        name="nazwa"
                        required
                        onChange={this.handleChange}
                        value={this.state.disease.nazwa}
                    />
                    <FormTextArea
                        type="text"
                        label={t('disease.fields.descriptionDisease')}
                        required
                        error={this.state.errors.opis}
                        name="opis"
                        onChange={this.handleChange}
                        value={this.state.disease.opis}
                        rows={5}
                        cols={22}
                    />
                    <FormSelect
                        label={t('disease.fields.infectiousDisease')}
                        required
                        error={this.state.errors.zakazna}
                        name="zakazna"
                        onChange={this.handleChange}
                        value={this.state.disease.zakazna}
                        options={listDis}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/Choroby"
                    />
                </form>
            </main>
        )
    }
}

export default  withTranslation()  (ChorobaForm)

// <h2> Dodawanie nowej Disease </h2>
// <form>
//     <label htmlFor="nazwa"> Nazwa Disease <abbr title="required" aria-label="required">*</abbr></label>
//     <input type="text" name="nazwa" id="nazwa" />
//     <span id="errorNazwa" className="error-text"/>
//
//
//     <label htmlFor="opis"> Opis Disease: <abbr title="required" aria-label="required">*</abbr> </label>
//     <textarea id="opis" name="opis" rows="4" cols="22" />
//     <span id="errorOpis" className="error-text"/>
//
//     <label htmlFor="zakazna"> Zakaźna <abbr title="required" aria-label="required">*</abbr></label>
//     <select name="zakazna" id="zakazna">
//         <option> --wybierz opcje--</option>
//         <option value="1"> tak</option>
//         <option value="2"> nie</option>
//     </select>
//     <span id="errorZakazna" className="error-text"/>
//     <div className="button-wrapper">
//         <p id="errorsSumarry" className="error-text"/>
//         <input className="form-button-submit" type="submit" value="Dodaj"/>
//         <Link to="/Disease" className="form-button-cancel">Anuluj</Link>
//     </div>
// </form>
