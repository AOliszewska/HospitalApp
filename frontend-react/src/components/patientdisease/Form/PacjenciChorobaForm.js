import React from "react";
import {Link, Redirect} from "react-router-dom";
import formMode from "../../../helpers/formHelper"
import {checkRequired, checkEmail, checkDate, checkDateIfAfter, checkTextLengthRange, checkNumberRange, checkNumber, checkDateIfBefore} from "../../../helpers/validate/validateMethods";
import FormInput from "../../form/FormInput";
import FormButtons from "../../form/FormButtons"
import {getFormattedDate} from "../../../helpers/dateHelper";
import {
    addPatientDiseaseApiCall,
    getPatientDiseaseApiCall, getPatientDiseaseByIdApiCall,
    updatePatientDiseaseApiCall
} from "../../../apiCalls/patientdisease/patientdiseaseApiCalls";
import {getPatientApiCall} from "../../../apiCalls/patient/patientApiCalls";
import FormSelect from "../../form/FormSelect";
import PacjenciListTableRow from "../../patient/PacjenciList/PacjenciListTableRow";
import {getDiseaseApiCall} from "../../../apiCalls/disease/diseaseApiCalls";
import FormTextArea from "../../form/FormTextArea";
import {withTranslation} from "react-i18next";
import {formValidationKeys} from "../../../helpers/formHelper";

class PacjenciChorobaForm extends React.Component{

    constructor(props) {
        super(props);


        const paramsUserDiseaseId = props.match.params.userDiseaseId;
        const currentFormMode = paramsUserDiseaseId ? formMode.EDIT : formMode.NEW;

        this.state = {
            userDiseaseId: paramsUserDiseaseId,
            choroby: [],
            pacjenci: [],
            user: {

                _idUzytkownik: '',
                _idChoroba: '',
                opisObjawow: '',
                dataWystawienia: '',
                zwolnienieDo: '',
                cenaWizyty: ''
            },
            errors: {
                _idUzytkownik: '',
                _idChoroba: '',
                opisObjawow: '',
                dataWystawienia: '',
                zwolnienieDo: '',
                cenaWizyty: ''
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
        this.fetchPatientList()
        this.fetchDiseasetList()
    }

    handleChange = (event) => {
        const {name, value } = event.target;
        const user = { ...this.state.user};
        user[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            user: user,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const userState = this.state.user;
            const user = {
                _idUzytkownik: userState._idUzytkownik,
                _idChoroba: userState._idChoroba,
                dataWystawienia: userState.dataWystawienia ? getFormattedDate(userState.dataWystawienia ) : '',
                opisObjawow: userState.opisObjawow,
                zwolnienieDo: userState.zwolnienieDo ? getFormattedDate(userState.zwolnienieDo ) : '',
                cenaWizyty: userState.cenaWizyty
            }
            console.log(user._idChoroba + "handle submit");
            const currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addPatientDiseaseApiCall(user)

            } else if (currentFormMode === formMode.EDIT) {
                const userDiseaseId = this.state.userDiseaseId;
                promise = updatePatientDiseaseApiCall(userDiseaseId, user)
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
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const user = this.state.user;
        const errors = this.state.errors;
        for(const fieldName in user){
            const fieldValue = user[fieldName];
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

    fetchPatientList = () => {
        getPatientApiCall().then(res => res.json()).then((data) => {
                this.setState({
                    pacjenci: data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }

    fetchDiseasetList = () => {
        getDiseaseApiCall().then(res => res.json()).then((data) => {
                this.setState({
                    choroby: data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }

    fetchUserDetails = () => {
        getPatientDiseaseByIdApiCall(this.state.userDiseaseId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            user: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            user: data,
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

        if( fieldName === '_idUzytkownik') {
            if(!checkRequired(fieldValue)){
                errorMessage=formValidationKeys.notEmpty;
            }
        }
        if(fieldName === '_idChoroba') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            }
        }
        if(fieldName === 'opisObjawow') {
                if (!checkRequired(fieldValue)) {
                    errorMessage = formValidationKeys.notEmpty;
                } else if (!checkTextLengthRange(fieldValue, 2, 100)) {
                    errorMessage = formValidationKeys.len_2_100;
                }
        }
        if(fieldName === 'cenaWizyty') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            }else if(!checkNumber(fieldValue)){
                errorMessage = formValidationKeys.number;
            }
            else if(!checkNumberRange(fieldValue, 0, 9999)){
                errorMessage =formValidationKeys.num_0_9999;
            }
        }
        if(fieldName === 'dataWystawienia') {
            if(!checkRequired(fieldValue)){
                errorMessage=formValidationKeys.notEmpty;
            }else if(!checkDateIfAfter(fieldValue, nowString)){
                errorMessage=formValidationKeys.future
            }else if(!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.date
            }else if (checkRequired(fieldValue) && checkDate(this.state.user.zwolnienieDo) && this.state.user.zwolnienieDo!=="" && ! checkDateIfAfter(fieldValue, this.state.user.zwolnienieDo)){
                errorMessage=formValidationKeys.later
            }
        }
        if(fieldName === 'zwolnienieDo') {
            console.log(fieldValue);

            if(fieldValue!==null) {
                if (fieldValue !== "") {
                    console.log(fieldValue);
                    if (!checkDate(fieldValue)) {
                        errorMessage = formValidationKeys.date;
                    }
                }
            }
        }
        if(fieldName === 'haslo') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 2, 20)) {
                errorMessage = formValidationKeys.len_2_20;
            }
        }
        return errorMessage
    }


    render() {
        const {t}= this.props;
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('patientdisease.form.add.confirm.text') : t('patientdisease.form.edit.confirm.text')

            return (

                <Redirect to={{
                    pathname: "/PacjentChoroba/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('validationMessage.form') : ''
        const fetchError = this.state.error ? t('validationMessage.error') + `: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('patientdisease.form.add.btnLabel') : t('patientdisease.form.edit.btnLabel')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

       const dataWystawienia = this.state.user.dataWystawienia ? getFormattedDate(this.state.user.dataWystawienia) : '';
       const zwolnienieDo = this.state.user.zwolnienieDo ? getFormattedDate(this.state.user.zwolnienieDo) : '';


        const pat = this.state.pacjenci;
        let listPat = [];
        pat.map(user =>{
            let label = user.imie + ' ' + user.nazwisko;
            listPat.push({
                value: user._idUzytkownik,
                label: label
            })
        })

        const dis = this.state.choroby;
        let listDis = [];
        dis.map(dis =>{
            let label =dis.nazwa;
            listDis.push({
                value: dis._idChoroba,
                label: label
            })
        })

        return (
            <main>
              <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                    <FormSelect
                        label={t('user.fields.user')}
                        required
                        error={this.state.errors._idUzytkownik}
                        name="_idUzytkownik"
                        onChange={this.handleChange}
                        value={this.state.user._idUzytkownik}
                        options={listPat}
                    />

                    <FormSelect
                        label={t('disease.fields.disease')}
                        required
                        error={this.state.errors._idChoroba}
                        name="_idChoroba"
                        onChange={this.handleChange}
                        value={this.state.user._idChoroba}
                        options={listDis}
                    />
                    <FormTextArea
                        type="text"
                        label={t('disease.details.description')}
                        error={this.state.errors.opisObjawow}
                        name="opisObjawow"
                        required
                        onChange={this.handleChange}
                        rows={3}
                        cols={22}
                        value={this.state.user.opisObjawow}
                    />
                    <FormInput
                        type="date"
                        label={t('disease.details.date')}
                        required
                        error={this.state.errors.dataWystawienia}
                        name="dataWystawienia"
                        onChange={this.handleChange}
                        value={this.state.user.dataWystawienia ? getFormattedDate(this.state.user.dataWystawienia ) : ''}
                    />
                    <FormInput
                        type="date"
                        label={t('disease.details.exemption')}
                        error={this.state.errors.zwolnienieDo}
                        name="zwolnienieDo"
                        onChange={this.handleChange}
                        value={this.state.user.zwolnienieDo ? getFormattedDate(this.state.user.zwolnienieDo) : ''}
                    />
                    <FormInput
                        type="text"
                        label={t('disease.details.price')}
                        required
                        error={this.state.errors.cenaWizyty}
                        name="cenaWizyty"
                        onChange={this.handleChange}
                        value={this.state.user.cenaWizyty}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/PacjentChoroba"
                    />

                    {/*<label htmlFor="Pacjent"> Wybierz Pacjenta: <abbr title="required" aria-label="required">*</abbr> </label>
                    <select  name="Pacjent" id="Pacjent" >
                        <option value=""> --Wybierz pacjenta-- </option>
                        {allPatient.map(user =>
                            (<option key={user.idUzytkownik} value={user.idUzytkownik} label={user.imie + " " + user.nazwisko}/>)
                        )}
                    </select>
                    <span id="errorPacjent" className="error-text"/>

                    <label htmlFor="disease"> Wybór Disease: <span className="symbol-required">*</span> </label>
                    <select  name="disease" id="disease" >
                        <option value=""> --Wybierz chorobę-- </option>
                        {allDisease.map(user =>
                            (<option key={user.idChoroba} value={user.idChoroba} label={user.nazwa}/>)
                        )}
                    </select>
                    <span id="errorChoroba" className="error-text"/>

                    <label htmlFor="objawy"> Opis Objawów: <span className="symbol-required">*</span> </label>
                    <textarea id="objawy" name="objawy" rows="4" cols="22" />
                    <span id="errorobjawy" className="error-text"/>

                    <label htmlFor="datawystawienia"> Data Wystawienia: <span className="symbol-required">*</span> </label>
                    <input type="date" name="datawystawienia" id="datawystawienia" />
                    <span id="errordatawystawienia" className="error-text"/>

                    <label htmlFor="zwolnieniedo"> Zwolnienie do: </label>
                    <input type="date" name="zwolnieniedo" id="zwolnieniedo"/>
                    <span id="errorzwolnieniedo" className="error-text"/>

                    <label htmlFor="cenawizyty"> Cena Wizyty: <span className="symbol-required">*</span></label>
                    <input type="text" name="cenawizyty" id="cenawizyty" />
                    <span id="errorcenawizyty" className="error-text"/>*/}
            </form>
          </main>
        )
    }
}
export default withTranslation() (PacjenciChorobaForm)