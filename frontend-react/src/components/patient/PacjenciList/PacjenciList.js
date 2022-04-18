import React from 'react'
import {Link} from "react-router-dom";
import {
    deletePatientApiCall,
    getPatientApiCall,
} from "../../../apiCalls/patient/patientApiCalls";
import PacjenciListTable from "./PacjenciListTable";
import {withTranslation} from "react-i18next";




class PacjenciList extends React.Component {
    componentDidMount() {
        this.fetchPatientList()
    }
    handleDelete = (userId) => {
        const {t} = this.props;
        let promise = deletePatientApiCall(userId);
        if (promise) {
            promise
                .then( (data) => {
                    let response = data;
                    let notice;
                    if (response.status === 201 || response.status === 500) {
                        notice = t('user.list.deleteError');
                    } else {
                        notice = t('user.list.deleteSuccess');
                        const index = this.state.uzytkownicy.findIndex(e=>e._idUzytkownik===userId);
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
        getPatientApiCall().then(res => res.json()).then((data) => {
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
        const {error, isLoaded, uzytkownicy} = this.state
        let content;
        if(error){
            content=<p> {t('validationMessage.error')} : {error.message}</p>

        }else if(!isLoaded){
            content = <p>{t('list.actions.loading')}.</p>
        }else if(uzytkownicy.length===0){
            content = <p> {t('user.list.noData')}</p>
        }else{
            content = <PacjenciListTable uzytkownicy={uzytkownicy} deleteEvent={this.handleDelete}/>
        }
        return (
            <main>
                <h2> {t('user.list.title')} </h2>
                {content}
                <div className="button-wrapper">
                    <Link to="/Pacjenci/add">{t('user.list.addNew')}</Link>
                    <p className="success">{this.state.notice}</p>
                </div>
            </main>
        )
    }

}
export default withTranslation() (PacjenciList)