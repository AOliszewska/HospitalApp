import React from 'react'
import {Link} from "react-router-dom";
import ChorobaListTable from "./ChorobaListTable";
import {deleteDiseaseApiCall, getDiseaseApiCall} from "../../../apiCalls/disease/diseaseApiCalls";
import {withTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";



class ChorobaList extends React.Component {
    componentDidMount() {
        this.fetchDiseaseList()
    }

    handleDelete = (diseaseId) => {
        const {t}= this.props;
        let promise = deleteDiseaseApiCall(diseaseId);
        if (promise) {
            promise
                .then( (data) => {
                    let response = data;
                    let notice;
                    if (response.status === 201 || response.status === 500) {
                        notice = t('disease.list.deleteError');
                    } else {
                        notice =  t('disease.list.deleteSuccess');
                        console.log(this.state.choroby);
                        const index = this.state.choroby.findIndex(e=>e._idChoroba===diseaseId);
                        const newAray = this.state.choroby.slice();
                        newAray.splice(index, 1);
                        this.setState({
                            choroby: newAray,
                            notice: notice
                        });
                    }
                })
        }
    }

    constructor(props) {
        super(props);

        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : '';
        this.state = {
            error: null,
            isLoaded: false,
            choroby: [],
            notice: notice
        }
    }

    fetchDiseaseList = () => {
        getDiseaseApiCall().then(res => res.json()).then((data) => {
                this.setState({
                    isLoaded: true,
                    choroby: data
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
        const user = getCurrentUser();
        const {error, isLoaded, choroby} = this.state
        let content;
        if(error){
            content=<p> {t('validationMessage.error')}: {error.message}</p>
        }else if(!isLoaded){
            content = <p>{t('list.actions.loading')}</p>
        }else if(choroby.length===0){
            content = <p> {t('disease.list.noData')}</p>
        }else{
            content = <ChorobaListTable choroby={choroby} deleteEvent={this.handleDelete}/>
        }
        const rola = user && user._idRola? user._idRola : 2 ;
        return (
            <main>
                <h2>{t('disease.list.title')}</h2>
                {content}
                { rola===3 ?
                <div className="button-wrapper">
                    <Link to="/Choroby/add">{t('disease.list.addNew')}</Link>
                    <p className="success">{this.state.notice}</p>
                </div>
                : <></>}
            </main>
        )
    }

}
export default  withTranslation() (ChorobaList)