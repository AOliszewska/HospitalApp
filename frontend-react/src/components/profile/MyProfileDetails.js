import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPatientByIdApiCall } from '../../apiCalls/patient/patientApiCalls'

import {withTranslation} from "react-i18next";
import {getCurrentUser} from "../../helpers/authHelper";
import PacjenciDetailsData from "../patient/PacjenciDetails/PacjenciDetailsData";
import MyProfileDetailsData from "./MyProfileDetailsData";

class myProfileDetails extends React.Component {

    componentDidMount() {
        this.fetchUserDetails()
    }

    constructor(props) {
        super(props);
        const current= getCurrentUser();

        const userId = parseInt(current.userId);
        console.log(userId);

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
        const current= getCurrentUser();
        const userId = parseInt(current.userId);
        const {user, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <MyProfileDetailsData patientData={user} key={user._idUzytkownik} />
        }
        const {t} =this.props;
        return (
            <main>
                <h2> {t('user.profile.profile')} </h2>
                {content}
                <div className="button-wrapper">
                    <Link to={`/MyProfile/edit/${userId}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link>
                    <Link to="/" className="button-back">{t('form.actions.return')} </Link>
                </div>
            </main>
        )
    }
}

export default withTranslation() (myProfileDetails)