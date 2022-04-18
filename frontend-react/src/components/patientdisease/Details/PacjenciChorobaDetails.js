import React from 'react'
import { getPatientDiseaseByIdApiCall} from "../../../apiCalls/patientdisease/patientdiseaseApiCalls";
import { getFormattedDate } from '../../../helpers/dateHelper'
import PacjenciChorobaDetailsData from "./PacjenciChorobaDetailsData";
import {withTranslation} from "react-i18next";

class PacjenciChorobaDetails extends React.Component {

    componentDidMount() {
        this.fetchUserDetails()
    }

    constructor(props) {
        super(props);

        let {userDiseaseId} = this.props.match.params;
        userDiseaseId = parseInt(userDiseaseId);


        this.state = {
            userId: userDiseaseId,
            user: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchUserDetails = () => {
        getPatientDiseaseByIdApiCall(this.state.userId)
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
            content = <p>{t('validationMessage.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('list.actions.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <PacjenciChorobaDetailsData patientDiseaseData={user} />
        }

        return (
            content
        )
    }
}

export default withTranslation() (PacjenciChorobaDetails)