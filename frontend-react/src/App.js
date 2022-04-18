import React from "react"
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation'
import Footer from './components/fragments/Footer';

import PacjenciList from './components/patient/PacjenciList/PacjenciList';
import PacjenciDetails from './components/patient/PacjenciDetails/PacjenciDetails';
import PacjenciForm from './components/patient/PacjenciForm/PacjenciForm';

import ChorobaList from "./components/disease/ChorobaList/ChorobaList";
import ChorobaDetails from "./components/disease/ChorobaDetails/ChorobaDetails";
import ChorobaForm from "./components/disease/ChorobaForm";

import {BrowserRouter as Router, Redirect, Route, Switch,} from 'react-router-dom';

import PacjenciChorobaList from "./components/patientdisease/List/PacjenciChorobaList";
import PacjenciChorobaDetails from "./components/patientdisease/Details/PacjenciChorobaDetails";
import PacjenciChorobaForm from "./components/patientdisease/Form/PacjenciChorobaForm";

import MainContent from "./components/fragments/other/MainContent";
import LoginForm from "./components/LoginForm";
import {getCurrentUser} from "./helpers/authHelper";
import ProtectedRoute from "./ProtectedRoute";

import MyProfileDetails from './components/profile/MyProfileDetails';

import MedicineList from "./components/medicine/MedicineList/MedicineList";
import MedicineDetails from "./components/medicine/MedicineDetails/MedicineDetails";
import MedicineForm from "./components/medicine/MedicineForm/MedicineForm";

import PrescriptionList from "./components/prescription/PersciptionList/PrescriptionList";
import PrescriptionForm from "./components/prescription/PrescriptionForm";
import PrescriptionDetails from "./components/prescription/PrescriptionDetails/PrescriptionDetails";
import OpinionList from "./components/opinion/OpinionList/OpinionList";
import OpinionDetails from "./components/opinion/OpinionDetails/OpinionDetails";
import OpinionForm from "./components/opinion/OpinionForm";
import ProfileForm from "./components/profile/ProfileForm";
import ProtectedDoctorRoute from "./ProtectedDoctorRoute";

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: undefined,
            prevPath: ''
        }
    }
    handleLogin= (user) => {
        localStorage.setItem("user", user)
        this.setState({user:user})
    }
    handleLogout = () => {
        localStorage.removeItem("user");
        this.setState({user:undefined})

    }
    componentDidMount() {
        const currentUser = getCurrentUser()
        this.setState({user: currentUser})
    }
    render(){
    return (
      <Router>
      <div>
      <Header handleLogout={this.handleLogout}/>
          <Navigation/>
          <Switch>
           <Route exact path="/login" render={(props) =>(<LoginForm handleLogin={this.handleLogin}/>)}/>
           <Route exact path="/" component={MainContent}/>
           <ProtectedRoute exact={true} path="/Pacjenci" component={PacjenciList}/>
           <ProtectedRoute exact={true} path="/Pacjenci/details/:userId" component={PacjenciDetails} />
           <ProtectedDoctorRoute exact={true} path="/Pacjenci/add" component={PacjenciForm} />
           <ProtectedDoctorRoute exact={true} path="/Pacjenci/edit/:userId" component={PacjenciForm} />
            <ProtectedDoctorRoute exact={true} path="/Pacjenci/delete/:userId" component={PacjenciList} />

           <ProtectedRoute exact={true} path="/PacjentChoroba" component={PacjenciChorobaList} />
            <ProtectedRoute exact={true}  path="/PacjentChoroba/details/:userDiseaseId" component={PacjenciChorobaDetails} />
            <ProtectedDoctorRoute exact={true} path="/PacjentChoroba/add" component={PacjenciChorobaForm} />
            <ProtectedDoctorRoute exact={true} path="/PacjentChoroba/edit/:userDiseaseId" component={PacjenciChorobaForm} />
             <ProtectedDoctorRoute exact={true} path="/PacjentChoroba/delete/:userDiseaseId" component={PacjenciChorobaList} />

            <Route exact path="/Choroby" component={ChorobaList}/>
            <Route exact  path="/Choroby/details/:diseaseId" component={ChorobaDetails}/>
            <ProtectedDoctorRoute exact={true} path="/Choroby/add" component={ChorobaForm} />
             <ProtectedDoctorRoute exact={true} path="/Choroby/edit/:diseaseId" component={ChorobaForm} />
             <ProtectedDoctorRoute exact={true} path="/Choroby/delete/:diseaseId" component={ChorobaList} />

              <ProtectedRoute exact={true} path="/MyProfile" component = {MyProfileDetails}/>
              <ProtectedRoute exact={true} path="/MyProfile/edit/:userId" component={ProfileForm} />

              <Route exact path="/Lekarstwa" component={MedicineList}/>
              <Route exact path="/Lekarstwa/details/:medicineId" component={MedicineDetails}/>
              <ProtectedDoctorRoute exact={true} path="/Lekarstwa/add" component={MedicineForm} />
              <ProtectedDoctorRoute exact={true} path="/Lekarstwa/edit/:medicineId" component={MedicineForm} />
              <ProtectedDoctorRoute exact={true}  path="/Lekarstwa/delete/:medicineId" component={MedicineList} />

              <ProtectedRoute exact={true} path="/PacjentChoroba/Prescription/:userDiseaseId" component={PrescriptionList}/>
              <ProtectedRoute exact={true} path="/PacjentChoroba/Prescription/:userDiseaseId/:idpres" component={PrescriptionDetails}/>
              <ProtectedDoctorRoute exact={true} path="/Prescription/add/:userDiseaseId" component={PrescriptionForm}/>
              <ProtectedDoctorRoute exact={true} path="/Prescription/edit/:userDiseaseId/:idpres" component={PrescriptionForm} />
              <ProtectedDoctorRoute exact={true} path="/Prescription/delete/:medicineId" component={PrescriptionList} />

              <ProtectedRoute exact={true} path="/Opinion" component={OpinionList}/>
              <ProtectedRoute exact={true} path="/Opinion/details/:idDoctor" component={OpinionDetails}/>
              <ProtectedRoute exact={true} path="/Opinion/add/:opinionId" component={OpinionForm}/>
              <ProtectedRoute exact={true} path="/Opinion/edit/:opinionId/:opId" component={OpinionForm}/>
              <ProtectedRoute exact={true} path="/Opinion/delete/:opinionId" component={OpinionList} />
     </Switch>
      <Footer/>
      </div>
      </Router>
  );
    }
}

export default App;

