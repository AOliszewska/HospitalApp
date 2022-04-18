import React from 'react'
import {getMedicineApiCall, getMedicineByIdApiCall} from "../../../apiCalls/medicine/MedicineApiCalls";
import MedicineDetailsData from "./MedicineDetailsData";
import {withTranslation} from "react-i18next";
class MedicineDetails extends React.Component {

    componentDidMount() {
        this.fetchMedicineDetails()
    }

    constructor(props) {
        super(props);
        let {medicineId: medicineId} = this.props.match.params;
        medicineId = parseInt(medicineId);


        this.state = {
            medicineId: medicineId,
            medicine: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchMedicineDetails = () => {
        getMedicineByIdApiCall(this.state.medicineId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            medicine: null,
                            message: data.message
                        })
                    } else {
                        console.log(data);
                        this.setState({
                            medicine: data,
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
        const {medicine, error, isLoaded, message} = this.state;
        let content;

        if (error) {
            content = <p>{t('validationMessage.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('list.actions.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <MedicineDetailsData medicineData={medicine} key={medicine._idLekarstwa} />
        }

        return (
            content
        )
    }
}

export default withTranslation() (MedicineDetails)