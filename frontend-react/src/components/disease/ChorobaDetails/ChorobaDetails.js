import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {getDiseaseByIdApiCall} from "../../../apiCalls/disease/diseaseApiCalls";
import ChorobaDetailsData from "./ChorobaDetailsData";
import {withTranslation} from "react-i18next";

class ChorobaDetails extends React.Component {

    componentDidMount() {
        this.fetchUserDetails()
    }

    constructor(props) {
        super(props);
        let {diseaseId} = this.props.match.params;
        diseaseId = parseInt(diseaseId);


        this.state = {
            diseaseId: diseaseId,
            disease: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchUserDetails = () => {
        getDiseaseByIdApiCall(this.state.diseaseId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            disease: null,
                            message: data.message
                        })
                    } else {
                        console.log(data);
                        this.setState({
                            disease: data,
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
        const {t} = this.props;
        const {disease, error, isLoaded, message} = this.state;
        let content;
        if (error) {
            content = <p>{t('validationMessage.error')} : {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('list.actions.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <ChorobaDetailsData diseaseData={disease} key={disease._idChoroba} />
        }

        return (
            content
        )
    }
}

export default withTranslation() (ChorobaDetails)