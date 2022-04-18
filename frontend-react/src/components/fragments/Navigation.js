import React from "react"
import {Link} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import {getCurrentUser, isAuthenticated} from "../../helpers/authHelper";
function  Navigation(){
        const {t} = useTranslation();
        const user1 = isAuthenticated()
        const current= getCurrentUser();
        const rola = current ? current._idRola : null;
        return (
           <span>{ user1 ?
                          ( rola===3 ?
                                (<nav>
                                        <button type="button" className="button"><Link to="/MyProfile"> {t('nav.profile')}</Link></button>
                                        <button type="button" className="button"><Link to="/Pacjenci"> {t('nav.patients')}</Link></button>
                                        <button type="button" className="button"><Link to="/PacjentChoroba"> {t('nav.patientdisease')}</Link></button>
                                        <button type="button" className="button"><Link to="/Choroby"> {t('nav.disease')}</Link></button>
                                        <button type="button" className="button"><Link to="/Lekarstwa"> {t('nav.medicine')}</Link></button>
                                        <button type="button" className="button" ><Link to="/Opinion">{t('opinion.list.opinion')}</Link></button>
                                </nav>
                              ) : <nav>
                                      <button type="button" className="button"><Link to="/MyProfile"> {t('nav.profile')}</Link></button>
                                      <button type="button" className="button"><Link to="/PacjentChoroba"> {t('nav.patientdisease')}</Link></button>
                                      <button type="button" className="button"><Link to="/Choroby"> {t('nav.disease')}</Link></button>
                                      <button type="button" className="button"><Link to="/Lekarstwa"> {t('nav.medicine')}</Link></button>
                                      <button type="button" className="button" ><Link to="/Opinion"> {t('opinion.list.opinion')}</Link></button>
                                  </nav>
                            ) : <nav>
                               {/*<button type="button" className="button-dis" disabled><Link to="/MyProfile"> {t('nav.profile')}</Link></button>*/}
                               {/*<button type="button" className="button-dis" disabled><Link to="/Patients"> {t('nav.patients')}</Link></button>*/}
                               {/*<button type="button" className="button-dis" disabled><Link to="/PacjentChoroba"> {t('nav.patientdisease')}</Link></button>*/}
                               <button type="button" className="button-dis" disabled><Link to="/Choroby"> {t('nav.disease')}</Link></button>
                               <button type="button" className="button-dis"><Link to="/Lekarstwa"> {t('nav.medicine')}</Link></button>
                                {/*<button type="button" className="button-dis"><Link to="/Opinion">{t('opinion.list.opinion')}</Link></button>*/}
                               </nav>
                        }
                        </span>


       );

}
export default Navigation