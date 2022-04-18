import React from "react";
import {Link, Redirect} from "react-router-dom";
import formMode from "../../helpers/formHelper"
import {checkRequired, checkEmail, checkDate, checkDateIfAfter, checkTextLengthRange, checkNumberRange, checkNumber, checkDateIfBefore} from "../../helpers/validate/validateMethods";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons"
import {getFormattedDate} from "../../helpers/dateHelper";
import FormSelect from "../form/FormSelect";
import FormTextArea from "../form/FormTextArea";
import {withTranslation} from "react-i18next";
import {formValidationKeys} from "../../helpers/formHelper";
import {
    addPresApiCall,
    getPrescriptionByIdApiCall, getPrescriptionSingleByIdApiCall,
    updatePresApiCall
} from "../../apiCalls/prescription/prescriptionApiCalls";
import {getMedicineApiCall} from "../../apiCalls/medicine/MedicineApiCalls";

class PrescriptionForm extends React.Component{

    constructor(props) {
        super(props);

        const paramsUserDiseaseId = props.match.params.userDiseaseId;
        const idpres= props.match.params.idpres;
        const currentFormMode = idpres ? formMode.EDIT : formMode.NEW;

        this.state = {

            userDiseaseId: idpres,
            medicine: [],
            user: {
                _idUzytkownikChoroba : paramsUserDiseaseId,
                _idLekarstwa:'',
                dataWaznosci:'',
                opisRecepty: ''
            },
            errors: {
                _idUzytkownikChoroba : '',
                _idLekarstwa:'',
                dataWaznosci:'',
                opisRecepty: ''
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
                _idUzytkownikChoroba : userState._idUzytkownikChoroba,
                _idLekarstwa:userState._idLekarstwa,
                dataWaznosci:userState.dataWaznosci ? getFormattedDate(userState.dataWaznosci ) : '',
                opisRecepty:userState.opisRecepty
            }
            const currentFormMode = this.state.formMode
            let promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addPresApiCall(user)

            } else if (currentFormMode === formMode.EDIT) {
                const userDiseaseId = this.state.userDiseaseId;
                promise = updatePresApiCall(userDiseaseId, user)
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
        getMedicineApiCall().then(res => res.json()).then((data) => {
                this.setState({
                    medicine: data
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
        getPrescriptionSingleByIdApiCall(this.state._idUzytkownikChoroba,this.state.userDiseaseId)
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
        console.log(this.state.user)
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


        if( fieldName === '_idLekarstwa') {
            if(!checkRequired(fieldValue)){
                errorMessage=formValidationKeys.notEmpty;
            }
        }

        if(fieldName === 'opisRecepty') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 2, 100)) {
                errorMessage = formValidationKeys.len_2_100;
            }
        }
        if(fieldName === 'dataWaznosci') {
            if(!checkRequired(fieldValue)){
                errorMessage=formValidationKeys.notEmpty;
            }else if(!checkDateIfAfter(nowString, fieldValue)){
                errorMessage=formValidationKeys.past
            }else if(!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.date
            }
        }

        return errorMessage
    }


    render() {
        console.log(this.state.user);
        const paramsUserDiseaseId = this.props.match.params.userDiseaseId;
        const {t}= this.props;
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('prescription.form.add.confirm.text') : t('prescription.form.edit.confirm.text')

            return (
                <Redirect to={{
                    pathname: "/PacjentChoroba/Prescription/"+paramsUserDiseaseId,
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? t('validationMessage.form') : ''
        const fetchError = this.state.error ? t('validationMessage.error') + `: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('prescription.form.add.btnLabel') : t('prescription.form.edit.btnLabel')
        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        const pat = this.state.medicine;
        let listPat = [];
        pat.map(user =>{
            let label = user.nazwa;
            listPat.push({
                value: user._idLekarstwa,
                label: label
            })
        })
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                    <FormSelect
                        label={t('medicine.fields.medicine')}
                        required
                        error={this.state.errors._idLekarstwa}
                        name="_idLekarstwa"
                        onChange={this.handleChange}
                        value={this.state.user._idLekarstwa}
                        options={listPat}
                    />

                    <FormTextArea
                        type="text"
                        label={t('prescription.fields.dosage')}
                        error={this.state.errors.opisRecepty}
                        name="opisRecepty"
                        required
                        onChange={this.handleChange}
                        rows={3}
                        cols={22}
                        value={this.state.user.opisRecepty}
                    />

                    <FormInput
                        type="date"
                        label={t('prescription.fields.expirationDate')}
                        error={this.state.errors.dataWaznosci}
                        name="dataWaznosci"
                        onChange={this.handleChange}
                        value={this.state.user.dataWaznosci ? getFormattedDate(this.state.user.dataWaznosci) : ''}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath={`/PacjentChoroba/Prescription/${paramsUserDiseaseId}`}
                    />
                </form>
            </main>
        )
    }
}
export default withTranslation() (PrescriptionForm)