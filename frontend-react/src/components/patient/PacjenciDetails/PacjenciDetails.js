import React from 'react'
import { Link } from 'react-router-dom'
import PacjenciDetailsData from "./PacjenciDetailsData";
import {withTranslation} from "react-i18next";
import {getPatientByIdApiCall} from "../../../apiCalls/patient/patientApiCalls";

class PacjenciDetails extends React.Component {

    componentDidMount() {
        this.fetchUserDetails()
    }

    constructor(props) {
        super(props);
        let {userId} = this.props.match.params;

        userId = parseInt(userId);
        this.state = {
            userId: userId,
            user: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchUserDetails = () => {
        getPatientByIdApiCall(this.state.userId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            user: null,
                            message: data.message
                        })
                    } else {
                        console.log(data);
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

    render() {
        const {t}= this.props;
        const {user, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>{t('validationMessage.error')} : {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('list.actions.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <PacjenciDetailsData patientData={user} key={user._idUzytkownik} />
        }
        return (
            <main>
                <h2> {t('user.details.patientdetails')} </h2>
            {content}
            <div className="button-wrapper">
            <Link to="/Pacjenci" className="button-back">{t('form.actions.return')} </Link>
            </div>
            </main>
        )
    }
}

export default withTranslation() (PacjenciDetails)