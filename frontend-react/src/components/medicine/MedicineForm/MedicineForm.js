import React from "react";
import {Link, Redirect} from "react-router-dom";
import formMode from "../../../helpers/formHelper"
import {

} from "../../../apiCalls/patient/patientApiCalls";
import {
    checkRequired,

    checkTextLengthRange,
    checkNumber, checkNumberRange
} from "../../../helpers/validate/validateMethods";
import FormInput from "../../form/FormInput";
import FormButtons from "../../form/FormButtons"
import {getFormattedDate} from "../../../helpers/dateHelper";
import {formValidationKeys} from "../../../helpers/formHelper";
import { withTranslation} from "react-i18next";
import {
    addMedicineApiCall,
    getMedicineByIdApiCall,
    updateMedicineApiCall
} from "../../../apiCalls/medicine/MedicineApiCalls";
import FormTextArea from "../../form/FormTextArea";


class MedicineForm extends React.Component{

    constructor(props) {
        super(props);
        const paramsIdUser = props.match.params.medicineId
        console.log("id user: " + paramsIdUser)
        const currentFormMode = paramsIdUser ? formMode.EDIT : formMode.NEW;

        this.state = {
            idMedicine: paramsIdUser,
            medicine: {
                nazwa : '',
                opisLekarstwa : '',
                cena : ''
            },
            errors: {
                nazwa : '',
                opisLekarstwa : '',
                cena : ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT) {
            this.fetchUserDetails()
        }
    }

    handleChange = (event) => {
        const {name, value } = event.target;
        const user = { ...this.state.medicine};
        user[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            medicine: user,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                medicine = this.state.medicine,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                console.log(medicine);
                promise = addMedicineApiCall(medicine)

            } else if (currentFormMode === formMode.EDIT) {
                const idMedicine = this.state.idMedicine;
                promise = updateMedicineApiCall(idMedicine, medicine)
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
        const medicine = this.state.medicine;
        const errors = this.state.errors;
        for(const fieldName in medicine){
            const fieldValue = medicine[fieldName];
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

    fetchUserDetails = () => {
        getMedicineByIdApiCall(this.state.idMedicine)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            medicine: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            medicine: data,
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
        let errorMessage = '';

        if(fieldName === 'nazwa') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 30)) {
                errorMessage = formValidationKeys.len_2_30
            }
        }

        if(fieldName === 'opisLekarstwa') {
                if (!checkRequired(fieldValue)) {
                    errorMessage = formValidationKeys.notEmpty
                } else if (!checkTextLengthRange(fieldValue, 2, 100)) {
                    errorMessage = formValidationKeys.len_2_100;
                }
        }
        if(fieldName === 'cena') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            }else if(!checkNumber(fieldValue)){
                errorMessage = formValidationKeys.number;
            }
            else if(!checkNumberRange(fieldValue, 0, 9999)){
                errorMessage =formValidationKeys.num_0_9999;
            }
        }

        return errorMessage
    }


    render() {
        const {t} = this.props;
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('medicine.form.add.confirm.text') : t('medicine.form.edit.confirm.text')

            return (

                <Redirect to={{
                    pathname: "/Lekarstwa/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? t('validationMessage.form') : ''
        const fetchError = this.state.error ? t('validationMessage.error')+`: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('medicine.form.add.btnLabel') : t('medicine.form.edit.pageTitle')
        const globalErrorMessage = errorsSummary || fetchError || this.state.message


        return (
            <main>
              <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                    <FormInput
                        type="text"
                        label={t('medicine.fields.name')}
                        required
                        error={this.state.errors.nazwa}
                        name="nazwa"
                        onChange={this.handleChange}
                        value={this.state.medicine.nazwa}
                    />
                    <FormInput
                        type="text"
                        label={t('medicine.fields.price')}
                        required
                        error={this.state.errors.cena}
                        name="cena"
                        onChange={this.handleChange}
                        value={this.state.medicine.cena}
                    />
                    <FormTextArea
                        type="text"
                        label={t('medicine.fields.description')}
                        required
                        error={this.state.errors.opisLekarstwa}
                        name="opisLekarstwa"
                        onChange={this.handleChange}
                        value={this.state.medicine.opisLekarstwa}
                        rows={5}
                        cols={22}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/Lekarstwa"
                    />

                {/*<label htmlFor="Imie"> Imię: <abbr title="required" aria-label="required">*</abbr> </label>*/}
                {/*<input type="text" name="Imie" id="Imie"/>*/}
                {/*<span id="errorImie" className="error-text"/>*/}

                {/*<label htmlFor="Nazwisko"> Nazwisko: <abbr title="required" aria-label="required" >*</abbr> </label>*/}
                {/*<input type="text" name="Nazwisko" id="Nazwisko" required/>*/}
                {/*<span id="errorNazwisko" className="error-text"/>*/}

                {/*<label htmlFor="Email"> Email: <abbr title="required" aria-label="required" >*</abbr></label>*/}
                {/*<input type="text" name="Email" id="Email" required/>*/}
                {/*<span id="errorEmail" className="error-text"/>*/}

                {/*<label htmlFor="AdresZamieszkania"> Adres Zamieszkania: <abbr title="required" aria-label="required" >*</abbr> </label>*/}
                {/*<input type="text" name="AdresZamieszkania" id="AdresZamieszkania" required/>*/}
                {/*<span id="errorAdresZamieszkania" className="error-text"> </span>*/}

                {/*<label htmlFor="Telefon"> Telefon: </label>*/}
                {/*<input type="text" name="Telefon" id="Telefon"/>*/}
                {/*<span id="errorTelefon" className="error-text"/>*/}

                {/*<label htmlFor="Pesel"> Pesel: </label>*/}
                {/*<input type="text" name="Pesel" id="Pesel" required/>*/}
                {/*<span id="errorPesel" className="error-text"/>*/}

                {/*<label htmlFor="dataUrodzenia"> Data Urodzenia: <abbr title="required" aria-label="required" >*</abbr> </label>*/}
                {/*<input type="date" name="dataUrodzenia" id="dataUrodzenia" required/>*/}
                {/*<span id="errordataUrodzenia" className="error-text"/>*/}

                {/*<div className="button-wrapper">
                 <p id="errorsSumarry" className="error-text"/>
                <input className="form-button-submit" type="submit" value="Dodaj"/>
                <Link to="/Patients" className="form-button-cancel">Anuluj</Link>
                </div>*/}
            </form>
          </main>
        )
    }
}
export default withTranslation() (MedicineForm)