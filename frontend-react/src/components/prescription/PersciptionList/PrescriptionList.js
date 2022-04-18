import React from 'react'
import {Link} from "react-router-dom";
import PrescriptionListTable from "./PrescriptionListTable";
import {
    deletePrescriptionApiCall,
    getPrescriptionApiCall, getPrescriptionByIdApiCall,
} from "../../../apiCalls/prescription/prescriptionApiCalls";
import {getCurrentUser} from "../../../helpers/authHelper";
import {withTranslation} from "react-i18next";

class PrescriptionList extends React.Component {
    componentDidMount() {
        this.fetchPatientList()
    }

    handleDelete = (userDiseaseId) => {
        const {t}= this.props;
        let promise = deletePrescriptionApiCall(userDiseaseId);
        if (promise) {
            promise
                .then( (data) => {
                    let response = data;
                    let notice;
                    if (response.status === 201 || response.status === 500) {
                        notice = t('prescription.list.deleteError');
                    } else {
                        notice = t('prescription.list.deleteSuccess');
                        const index = this.state.uzytkownicy.findIndex(e=>e._idRecepta===userDiseaseId);
                        const newAray = this.state.uzytkownicy.slice();
                        newAray.splice(index, 1);
                        this.setState({
                            uzytkownicy: newAray,
                            notice: notice
                        });
                    }
                })
        }
    }

    constructor(props) {
        super(props);

        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''

        let {userDiseaseId} = this.props.match.params;
        userDiseaseId = parseInt(userDiseaseId);

        console.log(userDiseaseId);

        this.state = {
            error: null,
            isLoaded: false,
            uzytkownicy: [],
            notice: notice,
            id: userDiseaseId
        }
    }

    fetchPatientList = () => {
        getPrescriptionByIdApiCall(this.state.id).then(res => res.json()).then((data) => {
                this.setState({
                    isLoaded: true,
                    uzytkownicy: data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }
    render() {
        const {t}= this.props;
        const user= getCurrentUser();
        const rola = user._idRola;
        let {userDiseaseId} = this.props.match.params;
        const {error, isLoaded, uzytkownicy} = this.state
        let content;
        if(error){ content=<p> {t('ValidationMessage.error')} : {error.message}</p>
        }else if(!isLoaded){
            content = <p>   {t('list.actions.loading')}</p>
        }else if(uzytkownicy.length===0){
            content = <p> {t('prescription.list.noData')}</p>
        }else{
            content = <PrescriptionListTable recepta={uzytkownicy} deleteEvent={this.handleDelete}/>
        }

        return (
            <main>
                <h2> {t('prescription.list.title')} </h2>
                {content}
                <div className="button-wrapper">
                    {rola === 3 &&
                        <span>
                         <Link to={`/Prescription/add/${userDiseaseId}`}>{t('prescription.list.addNew')}</Link>
                        <p className="success">{this.state.notice}</p>
                        </span>
                    }
                    <Link to={`/PacjentChoroba/details/${userDiseaseId}`}>{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }

}
export default withTranslation() (PrescriptionList)