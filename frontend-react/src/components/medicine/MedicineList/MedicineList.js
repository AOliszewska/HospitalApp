import React from 'react'
import {Link} from "react-router-dom";
import {deleteMedicineApiCall, getMedicineApiCall} from "../../../apiCalls/medicine/MedicineApiCalls";
import MedicineListTable from "./MedicineListTable";
import {withTranslation} from "react-i18next";
import {getCurrentUser} from "../../../helpers/authHelper";



class MedicineList extends React.Component {
    componentDidMount() {
        this.fetchPatientList()
    }

    handleDelete = (userId) => {
        const {t}= this.props;
        let promise = deleteMedicineApiCall(userId);
        if (promise) {
            promise
                .then( (data) => {
                    let response = data;
                    let notice;
                    if (response.status === 201 || response.status === 500) {
                        notice = t('medicine.list.deleteError');
                    } else {
                        notice = t('medicine.list.deleteSuccess')
                        const index = this.state.lekarstwa.findIndex(e=>e._idLekarstwa===userId);
                        const newAray = this.state.lekarstwa.slice();
                        newAray.splice(index, 1);
                        this.setState({
                            lekarstwa: newAray,
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
            lekarstwa: [],
            notice: notice
        }
    }

    fetchPatientList = () => {
        getMedicineApiCall().then(res => res.json()).then((data) => {
                this.setState({
                    isLoaded: true,
                    lekarstwa: data
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

        const {error, isLoaded, lekarstwa} = this.state
        let content;
        if(error){
            content=<p> {t('validationMessage.error')} : {error.message}</p>

        }else if(!isLoaded){
            content = <p>{t('list.actions.loading')}</p>
        }else if(lekarstwa.length===0){
            content = <p>{t('medicine.list.noData')}</p>
        }else{
            content = <MedicineListTable lekarstwa={lekarstwa} deleteEvent={this.handleDelete}/>
        }

        const user= getCurrentUser();
        const rola = user && user._idRola? user._idRola : 2 ;

        return (
            <main>
                <h2> {t('user.list.title')} </h2>
                {content}
                {rola === 3 &&
                <div className="button-wrapper">
                    <Link to="/Lekarstwa/add">{t('medicine.list.addNew')}</Link>
                    <p className="success">{this.state.notice}</p>
                </div>
                }
            </main>
        )
    }

}
export default withTranslation() (MedicineList)