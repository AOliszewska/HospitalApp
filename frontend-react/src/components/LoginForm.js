import React from 'react'
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import FormInput from "./form/FormInput";
import FormButtons from "./form/FormButtons";
import {loginApiCall} from "../apiCalls/authApiCalls";
import {checkRequired, checkTextLengthRange} from "../helpers/validate/validateMethods";
import {formValidationKeys} from "../helpers/formHelper";
import FormButtonsLogin from "./form/FormButtonsLogin";
class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
               email: '',
                haslo: '',
            },
            errors: {
                email: '',
                haslo: '',
            },
            error: '',
            message:'',
            prevPath: ''
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
            const user = this.state.user
            let response
            loginApiCall(user)
                .then(res => {
                response=res
                return res.json()
            })
                .then(
                (data) => {
                if(response.status===200){
                    if(data.token) {
                        const userString = JSON.stringify(data)
                        this.props.handleLogin(userString)
                        this.props.history.goBack()
                    }
                    }else if (response.status === 401){
                        console.log(401)
                        this.setState({message : data.message})
                    }
                },
                (error) =>{
                    this.setState({
                        isLoaded: true,
                        error
                    })
            })
        }
    }
    validateForm = () => {
        const user= this.state.user;
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

    validateField = (fieldName, fieldValue) => {
        let errorMessage = ''
        if(fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 40)) {
                errorMessage = formValidationKeys.len_2_40;
            }
        }

        if(fieldName === 'haslo') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 100)) {
                errorMessage = formValidationKeys.len_2_100;
            }
        }

        return errorMessage
    }



    render() {
        const {t} = this.props
        const errorsSummary = this.hasErrors() ? t('validationMessage.form') : ''
        let serverError = ''
        if(this.state.message !== ''){
            serverError = t('validationMessage.' + this.state.message)
        } else {
            serverError = ''
        }
        const fetchError = this.state.error ? t('validationMessage.error') + `: ${this.state.error.message}` : ''
        const globalErrorMessage = errorsSummary || fetchError || serverError
        return (
            <main>
                <div className="login">
                <h2>{t('login.login')} </h2>
                <form className="form" method="post" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('login.email')}
                        error={this.state.errors.email}
                        name="email"
                        required
                        onChange={this.handleChange}
                        value={this.state.user.email}
                    />
                    <FormInput
                        type="password"
                        label={t('login.password')}
                        error={this.state.errors.haslo}
                        name="haslo"
                        required
                        onChange={this.handleChange}
                        value={this.state.user.haslo}
                    />

                    <FormButtonsLogin
                       cancelPath={this.state.prevPath}
                       error = {globalErrorMessage}
                       submitButtonLabel={t('login.login')}
                    />
                </form>
                </div>
            </main>
        )
    }
}

export default  withRouter(withTranslation()  (LoginForm))

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
