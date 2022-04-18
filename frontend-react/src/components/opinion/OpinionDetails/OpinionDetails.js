import React from 'react'
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";
import {
    deleteOpinionApiCall,
    getOpinionDoctorDetailsApiCall
} from "../../../apiCalls/opinion/OpinionApiCalls";
import {getPatientByIdApiCall} from "../../../apiCalls/patient/patientApiCalls";
import {getFormattedDate} from "../../../helpers/dateHelper";
import OpinionDetailsTable from "./OpinionDetailsTable";



class OpinionList extends React.Component {

    componentDidMount() {
        this.fetchOpinionList()
        this.fetchDetailsDoctor();
    }
    handleDelete = (opiniaId) => {
        console.log("WCHODZI")
        const {t}= this.props;
        let promise = deleteOpinionApiCall(opiniaId);
        if (promise) {
            promise
                .then( (data) => {
                    let response = data;
                    let notice;
                    if (response.status === 201 || response.status === 500) {
                        notice = t('opinion.list.deleteError');
                    } else {
                        notice =  t('opinion.list.deleteSuccess');
                        const index = this.state.opinion.findIndex(e=>e._idOpinia===opiniaId);
                        const newAray = this.state.opinion.slice();
                        newAray.splice(index, 1);
                        this.setState({
                            opinion: newAray,
                            notice: notice
                        });
                    }
                })
        }
    }

    constructor(props) {
        super(props);
        let {idDoctor} = this.props.match.params;
        idDoctor = parseInt(idDoctor);
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : '';
        this.state = {
            idDoctor:idDoctor,
            error: null,
            isLoaded: false,
            opinion: [],
            doctor: [],
            notice: notice
        }
    }

    fetchOpinionList = () => {
        getOpinionDoctorDetailsApiCall(this.state.idDoctor).then(res => res.json()).then((data) => {
                    this.setState({
                        isLoaded: true,
                        opinion: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })

    }
    fetchDetailsDoctor = () => {
        getPatientByIdApiCall(this.state.idDoctor).then(res => res.json()).then((data) => {
                this.setState({
                    isLoaded: true,
                    doctor: {
                        _idDoctor: data._idUzytkownik,
                        imie:data.imie,
                        nazwisko:data.nazwisko,
                        email:data.email,
                        telefon:data.telefon
                    }
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
        const {t} = this.props;
        const {error, isLoaded, opinion,doctor} = this.state
        let content;
        if(error){
            content=<p> {t('validationMessage.error')}: {error.message}</p>
        }else if(!isLoaded){
            content = <p>{t('list.actions.loading')}</p>
        }else if(opinion.length===0){
            content = <p> {t('disease.list.noData')}</p>
        }else{
            content = <OpinionDetailsTable idDoctor={doctor._idDoctor} opinion={opinion} deleteEvent={this.handleDelete}/>
        }
        return (
            <main>
                <h1> {t('opinion.list.h2')} </h1>
                <div className="recepta">
                <p>{t('user.fields.firstName')} : {doctor.imie} </p>
                <p>{t('user.fields.lastName')} : {doctor.nazwisko}</p>
                <p>{t('user.fields.email')}  : {doctor.email}</p>
                <p>{t('user.fields.telephone')}  : {doctor.telefon}</p>
                </div>
                <h2>{t('opinion.list.opinions')}</h2>
                {content}
                <div className="button-wrapper">
                    <Link to={`/Opinion/add/${doctor._idDoctor}`}>{t('opinion.list.addNew')}</Link>
                    <p className="success">{this.state.notice}</p>
                </div>
            </main>
        )
    }

}
export default  withTranslation() (OpinionList)