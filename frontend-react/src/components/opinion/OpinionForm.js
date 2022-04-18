import React from "react";
import {Link, Redirect} from "react-router-dom";
import formMode from "../../helpers/formHelper"
import {checkRequired,  checkTextLengthRange} from "../../helpers/validate/validateMethods";
import FormButtons from "../form/FormButtons"
import {withTranslation} from "react-i18next";
import {formValidationKeys} from "../../helpers/formHelper";
import {getCurrentUser} from "../../helpers/authHelper";
import {addOpinionApiCall, getOpinionIdApiCall, updateOpinionApiCall} from "../../apiCalls/opinion/OpinionApiCalls";
import FormTextArea from "../form/FormTextArea";

class OpinionForm extends React.Component{

    constructor(props) {
        super(props);
        const paramsOpinionId = props.match.params.opinionId;
        const opinionId= props.match.params.opId;
        const current= getCurrentUser();
        const userId = parseInt(current.userId);
        const currentFormMode = opinionId ? formMode.EDIT : formMode.NEW;

        this.state = {
            paramsOpinionId: opinionId,
            opinion: {
                _idUzytkownik : parseInt(paramsOpinionId),
                _idUzytkownik2: parseInt(userId),
                Opinia:''
            },
            errors: {
                __idUzytkownik : '',
                _idUzytkownik2: '',
                Opinia:''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT) {
            this.fetchOpinionDetails()
        }

    }

    handleChange = (event) => {
        const {name, value } = event.target;
        const user = { ...this.state.opinion};
        user[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            opinion: user,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {

            const currentFormMode = this.state.formMode
            let promise,
                response;
            if (currentFormMode === formMode.NEW) {

                promise = addOpinionApiCall(this.state.opinion)
            } else if (currentFormMode === formMode.EDIT) {
                promise = updateOpinionApiCall(this.state.paramsOpinionId, this.state.opinion)
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
        const opinion = this.state.opinion;
        const errors = this.state.errors;
        for(const fieldName in opinion){
            const fieldValue = opinion[fieldName];
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

    fetchOpinionDetails= () => {
        getOpinionIdApiCall(this.state.paramsOpinionId).then(res => res.json()).then((data) => {
                this.setState({
                    opinion: data
                });
                console.log(data);
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
        console.log(this.state.opinion);
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';

        if(fieldName === "Opinia") {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 2, 100)) {
                errorMessage = formValidationKeys.len_2_100;
            }
        }


        return errorMessage
    }


    render() {
        const {t}= this.props;
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('opinion.form.add.confirm.text') : t('opinion.form.edit.confirm.text')
            return (
                <Redirect to={{
                    pathname: "/Opinion/details/"+this.state.opinion._idUzytkownik ,
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? t('validationMessage.form') : ''
        const fetchError = this.state.error ? t('validationMessage.error') + `: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('opinion.list.form') : t('opinion.list.formEdit')
        const globalErrorMessage = errorsSummary || fetchError || this.state.message


        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                    <FormTextArea
                        type="text"
                        label={t('opinion.list.opinion')}
                        error={this.state.errors.Opinia}
                        name="Opinia"
                        required
                        onChange={this.handleChange}
                        rows={3}
                        cols={22}
                        value={this.state.opinion.Opinia}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath={`/Opinion/details/${this.state.opinion._idUzytkownik}`}
                    />
                </form>
            </main>
        )
    }
}
export default withTranslation() (OpinionForm)