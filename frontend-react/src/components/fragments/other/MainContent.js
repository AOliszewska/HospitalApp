import React from "react"
import {useTranslation} from "react-i18next";


function MainContent() {
     const {t} = useTranslation();
return(
<main>
<h1> {t('main-page.statement')}</h1>
    <div className="menu-info">
        <img src="images/Strzykawka.jpg" className="komunikat" alt="strzykawka"/>
        <a href="https://www.gov.pl/web/zdrowie/test-covid-19-dla-uczestnikow-turnusow-rehabilitacyjnych-i-ich-opiekunow"> Test COVID-19 dla uczestników turnusów rehabilitacyjnych i ich opiekunów </a>
        <p>Przypominamy, że warunkiem rozpoczęcia rehabilitacji w ramach turnusu rehabilitacyjnego, o którym mowa w art. 10c ustawy z dnia 27 sierpnia 1997 r. o rehabilitacji zawodowej i społecznej oraz zatrudnianiu osób niepełnosprawnych (Dz. U. z 2021 r. poz. 573), jest negatywny wynik testu diagnostycznego w kierunku SARS-CoV-2 uczestnika tego turnusu z materiału pobranego w terminie nie wcześniejszym niż 4 dni przed terminem rozpoczęcia turnusu rehabilitacyjnego albo zaszczepienie się przeciwko COVID-19.</p>
    </div>
    <div className="menu-info">
        <img src="images/DoctorMale.png" className="komunikat" alt="doctor"/>
        <a href="https://www.gov.pl/web/edukacja-i-nauka/wsparcie-uczniow-w-powrocie-do-szkol--materialy-edukacyjne"> Wsparcie uczniów w powrocie do szkół – materiały edukacyjne </a>
        <p>Zachęcamy do skorzystania z wykazu materiałów edukacyjnych przygotowanego przez Ministerstwo Edukacji i Nauki. Zawiera on publikacje i poradniki dla nauczycieli, dyrektorów szkół oraz rodziców. Materiały te będą  pomocne w pracy z dziećmi i młodzieżą po długotrwałym okresie nauki zdalnej.</p>
    </div>
</main>
    )
}
export default MainContent