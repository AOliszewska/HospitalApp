import React from 'react'
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";
import {getOpinionApiCall, getOpinionDoctorApiCall} from "../../../apiCalls/opinion/OpinionApiCalls";
import OpinionListTable from "./OpinionListTable";



class OpinionList extends React.Component {

    componentDidMount() {
        this.fetchOpinionList()
    }


    constructor(props) {
        super(props);
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : '';
        this.state = {
            error: null,
            isLoaded: false,
            opinion: [],
            notice: notice
        }
    }

    fetchOpinionList = () => {
        const user =getCurrentUser();
        const rola=user._idRola;
        const userId = parseInt(user.userId);
        {rola === 2 ?
            getOpinionApiCall().then(res => res.json()).then((data) => {
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
       :
            getOpinionDoctorApiCall(userId).then(res => res.json()).then((data) => {
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
    }
    render() {
        const {t} = this.props;
        const user = getCurrentUser();
        const rola = user._idRola;
        const {error, isLoaded, opinion} = this.state
        let content;
        if(error){
            content=<p> {t('validationMessage.error')}: {error.message}</p>
        }else if(!isLoaded){
            content = <p>{t('list.actions.loading')}</p>
        }else if(opinion.length===0){
            content = <p> {t('opinion.list.noData')}</p>
        }else{
            content = <OpinionListTable opinion={opinion} deleteEvent={this.handleDelete}/>
        }
        return (
            <main>
                <h2>{t('opinion.list.title')}</h2>
                {content}
            </main>
        )
    }

}
export default  withTranslation() (OpinionList)