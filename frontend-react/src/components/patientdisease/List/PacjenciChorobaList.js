import React from 'react'
import {Link} from "react-router-dom";
import PacjenciChorobaListTable from "./PacjenciChorobaListTable";
import {
    deletePatientDiseaseApiCall,
    getPatientDiseaseApiCall, getPatientDiseaseByIdApiCall, getPatientDiseaseSingleApiCall
} from "../../../apiCalls/patientdisease/patientdiseaseApiCalls";
import {withTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";


class PacjenciChorobaList extends React.Component {
    componentDidMount() {
        this.fetchPatientList()
    }
    handleDelete = (userDiseaseId) => {
        const {t} = this.props;
        let promise = deletePatientDiseaseApiCall(userDiseaseId);
        if (promise) {
            promise
                .then( (data) => {
                    let response = data;
                    let notice;
                    if (response.status === 201 || response.status === 500) {
                        notice = t('patientdisease.list.deleteError') ;
                    } else {
                        notice = t('patientdisease.list.deleteSuccess');
                        const index = this.state.uzytkownicy.findIndex(e=>e._idUzytkownikChoroba===userDiseaseId);
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

        this.state = {
            error: null,
            isLoaded: false,
            uzytkownicy: [],
            notice: notice
        }
    }
    fetchPatientList = () => {
        const current = getCurrentUser();
        const rola = current._idRola;
        const id = current.userId;
        console.log(rola);
        console.log(id);
        if (rola ===3) {

            getPatientDiseaseApiCall().then(res => res.json()).then((data) => {
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
        }else{
            console.log("wchodzi")
            getPatientDiseaseSingleApiCall(id).then(res => res.json()).then((data) => {
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
    }
    render() {
        const {t} = this.props;
        const user= getCurrentUser();
        const rola = user._idRola;
        const {error, isLoaded, uzytkownicy} = this.state
        let content;
        if(error){
            content=<p> {t('validationMessage.error')} : {error.message}</p>

        }else if(!isLoaded){
            content = <p>{t('list.actions.loading')}</p>
        }else if(uzytkownicy.length===0){
            content = <p> {t('patientdisease.list.noData')}</p>
        }else{
            content = <PacjenciChorobaListTable uzytkownicyChoroba={uzytkownicy} deleteEvent={this.handleDelete}/>
        }
        return (
            <main>
                <h2> {t('patientdisease.list.title')} </h2>
                {content}
                {rola===3 ?
                <div className="button-wrapper">
                    <Link to="/PacjentChoroba/add">{t('patientdisease.list.addNew')}</Link>
                    <p className="success">{this.state.notice}</p>
                </div>
                : <></>}
            </main>
        )
    }

}
export default withTranslation() (PacjenciChorobaList)