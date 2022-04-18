import React from "react";
import {Redirect} from "react-router-dom";
import formMode from "../../../helpers/formHelper"
import {
    addPatientApiCall,
    updatePatientApiCall,
    getPatientByIdApiCall
} from "../../../apiCalls/patient/patientApiCalls";
import {checkRequired, checkEmail, checkDate, checkDateIfAfter, checkTextLengthRange} from "../../../helpers/validate/validateMethods";
import FormInput from "../../form/FormInput";
import FormButtons from "../../form/FormButtons"
import {getFormattedDate} from "../../../helpers/dateHelper";
import {formValidationKeys} from "../../../helpers/formHelper";
import {withTranslation} from "react-i18next";



class PacjenciForm extends React.Component{

    constructor(props) {
        super(props);
        const paramsIdUser = props.match.params.userId;
        console.log("id user: " + paramsIdUser)
        const currentFormMode = paramsIdUser ? formMode.EDIT : formMode.NEW;

        this.state = {
            idUser: paramsIdUser,
            user: {
                imie : '',
                nazwisko : '',
                dataUrodzenia : '',
                email : '',
                miejsceZamieszkania : '',
                telefon : '',
                pesel : '',
                haslo: '',
                _idRola : ''
            },
            errors: {
                imie : '',
                nazwisko : '',
                dataUrodzenia : '',
                email : '',
                miejsceZamieszkania : '',
                telefon : '',
                pesel : '',
                haslo: '',
                _idRola : ''
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
            const
                user = this.state.user,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                this.state.user.telefon =this.state.user.telefon===null ? '' : this.state.user.telefon
                this.state.user.pesel =this.state.user.pesel===null ? '' :this.state.user.pesel
                const userNew = {
                    imie : this.state.user.imie,
                    nazwisko : this.state.user.nazwisko,
                    dataUrodzenia :this.state.user.dataUrodzenia,
                    email : this.state.user.email,
                    miejsceZamieszkania : this.state.user.miejsceZamieszkania,
                    telefon : this.state.user.telefon,
                    pesel : this.state.user.pesel,
                    haslo: '1234',
                    _idRola : 2
                }
                promise = addPatientApiCall(userNew)

            } else if (currentFormMode === formMode.EDIT) {
                this.state.user.telefon =this.state.user.telefon===null ? '' : this.state.user.telefon
                this.state.user.pesel =this.state.user.pesel===null ? '' :this.state.user.pesel
                const userNew = {
                    imie : this.state.user.imie,
                    nazwisko : this.state.user.nazwisko,
                    dataUrodzenia :this.state.user.dataUrodzenia,
                    email : this.state.user.email,
                    miejsceZamieszkania : this.state.user.miejsceZamieszkania,
                    telefon : this.state.user.telefon,
                    pesel : this.state.user.pesel,
                    haslo: '1234',
                    _idRola : this.state.user._idRola
                }
                const idUser = this.state.idUser;
                promise = updatePatientApiCall(idUser, userNew)
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

    fetchUserDetails = () => {
        getPatientByIdApiCall(this.state.idUser)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            user: null,
                            message: data.message
                        })
                    } else {
                        data.pesel = (data.pesel===null? '' : data.pesel);
                        data.telefon = (data.telefon===null? '' : data.telefon);
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


        if(fieldName === 'imie') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 20)) {
                errorMessage = formValidationKeys.len_2_20
            }
        }

        if(fieldName === 'email') {
                if (!checkRequired(fieldValue)) {
                    errorMessage = formValidationKeys.notEmpty
                } else if (!checkTextLengthRange(fieldValue, 2, 40)) {
                    errorMessage = formValidationKeys.len_2_40;
                }else if(!checkEmail(fieldValue)){
                    errorMessage =formValidationKeys.isEmail
                }
        }
        if(fieldName === 'nazwisko') {
            if (!checkRequired(fieldValue)) {
                errorMessage =  formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 20)) {
                errorMessage = formValidationKeys.len_2_20
            }
        }

        if(fieldName === 'miejsceZamieszkania') {
            if (!checkRequired(fieldValue)) {
                errorMessage =  formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 40)) {
                errorMessage = formValidationKeys.len_2_40
            }
        }

        if(fieldName === 'telefon') {
            if(fieldValue!="" && fieldValue!=null && fieldValue!='') {
                if (!checkTextLengthRange(fieldValue, 2, 20)) {
                    errorMessage = formValidationKeys.len_2_20
                }
            }
        }
        if(fieldName === 'pesel') {

            if(fieldValue!="" && fieldValue!=null && fieldValue!='') {
                if (!checkTextLengthRange(fieldValue, 2, 20)) {
                    errorMessage = formValidationKeys.len_2_20
                }
            }
        }


        if( fieldName === 'dataUrodzenia') {
            if(!checkRequired(fieldValue)){
                errorMessage=formValidationKeys.notEmpty
            }else if(!checkDateIfAfter(fieldValue, nowString)){
                errorMessage=formValidationKeys.future;
            }else if(!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.date;
            }

    }

        return errorMessage
    }


    render() {
        const {t} = this.props;
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('user.form.add.confirm.text') : t('user.form.edit.confirm.text')

            return (

                <Redirect to={{
                    pathname: "/Patients/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? t('validationMessage.form') : ''
        const fetchError = this.state.error ? t('validationMessage.error')+`: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('user.form.add.btnLabel') : t('user.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        const dataUrodzenia = this.state.user.dataUrodzenia ? getFormattedDate(this.state.user.dataUrodzenia) : '';
        const currentFormMode = this.state.formMode

        return (
            <main>
              <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                    <FormInput
                        type="text"
                        label={t('user.fields.firstName')}
                        required
                        error={this.state.errors.imie}
                        name="imie"
                        onChange={this.handleChange}
                        value={this.state.user.imie}
                    />
                    <FormInput
                        type="text"
                        label={t('user.fields.lastName')}
                        required
                        error={this.state.errors.nazwisko}
                        name="nazwisko"
                        onChange={this.handleChange}
                        value={this.state.user.nazwisko}
                    />
                    <FormInput
                        type="text"
                        label={t('user.fields.email')}
                        required
                        error={this.state.errors.email}
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.user.email}
                    />
                    <FormInput
                        type="text"
                        label={t('user.fields.address')}
                        required
                        error={this.state.errors.miejsceZamieszkania}
                        name="miejsceZamieszkania"
                        onChange={this.handleChange}
                        value={this.state.user.miejsceZamieszkania}
                    />
                    <FormInput
                        type="text"
                        label={t('user.fields.telephone')}
                        error={this.state.errors.telefon}
                        name="telefon"
                        onChange={this.handleChange}
                        value={this.state.user.telefon}
                    />
                    <FormInput
                        type="text"
                        label={t('user.fields.pesel')}
                        error={this.state.errors.pesel}
                        name="pesel"
                        onChange={this.handleChange}
                        value={this.state.user.pesel}
                    />
                    <FormInput
                        type="date"
                        label={t('user.fields.birthdate')}
                        error={this.state.errors.dataUrodzenia}
                        required
                        name="dataUrodzenia"
                        onChange={this.handleChange}
                        value={dataUrodzenia}
                    />
                    {currentFormMode === formMode.NEW ?
                        <FormInput
                        type="text"
                        label={t('user.fields.password')}
                        error={this.state.errors.haslo}
                        required
                        name="haslo"
                        onChange={this.handleChange}
                        value={this.state.user.haslo}
                        />
                        : <></>
                    }
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/Pacjenci"
                    />


            </form>
          </main>
        )
    }
}
export default withTranslation() (PacjenciForm)