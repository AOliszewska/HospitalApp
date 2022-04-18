import React from 'react'
import { Link } from 'react-router-dom'
import {withTranslation} from "react-i18next";
import {
    getPrescriptionSingleByIdApiCall
} from "../../../apiCalls/prescription/prescriptionApiCalls";
import PrescriptionDetailsData from "../PrescriptionDetails/PrescriptionDetailsData"

class PrescriptionDetails extends React.Component {


    constructor(props) {
        super(props);
        let {idpres} = this.props.match.params;
        idpres= parseInt(idpres);
        console.log(idpres)
        let {userDiseaseId} = this.props.match.params;
        userDiseaseId = parseInt(userDiseaseId);
        console.log(userDiseaseId)
        this.state = {
            userDiseaseId:userDiseaseId,
            presId: idpres,
            prescription: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }
    componentDidMount() {
        this.fetchPrescriptionDetails()
    }
    fetchPrescriptionDetails = () => {
        getPrescriptionSingleByIdApiCall(this.state.userDiseaseId,this.state.presId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            prescription: null,
                            message: data.message
                        })
                    } else {
                        console.log(data);
                        this.setState({
                            prescription: data,
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
        const {prescription, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>{t('validationMessage.error')} : {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('list.actions.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            console.log("FAFAFA")
            console.log(prescription)
            content = <PrescriptionDetailsData presData={prescription} key={prescription._idRecepta} />
        }
        return (
                content
        )
    }
}

export default withTranslation() (PrescriptionDetails)