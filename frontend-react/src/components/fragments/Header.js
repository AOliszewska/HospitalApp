import React from "react"
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";
class Header extends React.Component {
    render() {
        const {t} = this.props;

        const loginLogoutLink = isAuthenticated() ?
            <button onClick={this.props.handleLogout} ><Link to="/">{t('main-page.logout')}</Link></button> : <button>
            <Link to="/login">{t('main-page.login')}</Link></button>
        return (
            <header>
                <img src="/images/hospita.png" id="imghospital" alt="logo"/>
                <h1> {t('main-page.title')}</h1>
                <div className="header-button">
                    <p> ul.Juliusza Słowackiego 18 <br/> 05-840 {t('main-page.city')} <br/> tel. 57272571</p>
                    <button type="button" className="button"><Link to="/">{t('main-page.content')}</Link></button>
                    <br/>
                    {<li className='button'>{loginLogoutLink}</li>}
                </div>
            </header>
        );
    }
}

export default withTranslation() (Header)
