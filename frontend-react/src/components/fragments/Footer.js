import React from "react";
import {withTranslation} from "react-i18next";

class Footer extends React.Component {
    handleLanguageChange = (language) => {
        const {i18n} = this.props;
        console.log("wchodzi "+ language)
        i18n.changeLanguage(language, (err, t) => {
            if (err)
                return console.log('something went wrong loading', err);
        });
    }

    render() {
        return (
            <footer>
                <p>Aleksandra Oliszewska s20509</p>
                <button onClick={() => {this.handleLanguageChange('pl')}}> PL </button>
                <button onClick={() => {this.handleLanguageChange('en')}}> EN </button>
           </footer>
        )
    }
}
export default withTranslation() (Footer)