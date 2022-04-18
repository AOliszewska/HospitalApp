CREATE SCHEMA IF NOT EXISTS `tin`;

CREATE TABLE IF NOT EXISTS `tin`.`Choroba`
 ( `_idChoroba` int unsigned NOT NULL AUTO_INCREMENT ,
    `nazwa` varchar(25) NOT NULL ,
    `opis` varchar(100) NOT NULL ,
    `zakazna` boolean NOT NULL ,
    PRIMARY KEY (`_idChoroba`) ,
    UNIQUE INDEX `choroba_id_UNIQUE` (`_idChoroba` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE  IF NOT EXISTS `tin`.`Rola` (
    `_idRola` int unsigned NOT NULL AUTO_INCREMENT,
    `nazwaRoli` varchar(20) NOT NULL,
    PRIMARY KEY (`_idRola`),
    UNIQUE INDEX `rola_id_UNIQUE` (`_idRola` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin`.`Uzytkownik` (
    `_idUzytkownik` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `imie` varchar(20) NOT NULL,
    `nazwisko` varchar(20) NOT NULL,
    `dataUrodzenia` datetime NOT NULL,
    `email` varchar(40) NOT NULL,
    `miejsceZamieszkania` varchar(40) NOT NULL,
    `telefon` varchar(20) NULL,
    `pesel` varchar(20) NULL,
    `haslo` varchar(30) NULL,
    `_idRola` int UNSIGNED NOT NULL,
    PRIMARY KEY (`_idUzytkownik`),
    UNIQUE INDEX `uzytkownik_id_UNIQUE` (`_idUzytkownik` ASC),
    CONSTRAINT `rola_fk` FOREIGN KEY (`_idRola`) REFERENCES `tin`.`Rola` (`_idRola`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE  IF NOT EXISTS `tin`.`UzytkownikChoroba`
( `_idUzytkownikChoroba` int unsigned NOT NULL AUTO_INCREMENT,
    `_idChoroba` int unsigned NOT NULL,
    `_idUzytkownik` int unsigned NOT NULL,
    `dataWystawienia` date NOT NULL,
    `opisObjawow` varchar(100) NOT NULL,
    `zwolnienieDo` date NULL,
    `cenaWizyty` decimal(6,2) unsigned NOT NULL,
    PRIMARY KEY (`_idUzytkownikChoroba`),
    UNIQUE INDEX `uzytkownikchoroba_id_UNIQUE` (`_idUzytkownikChoroba` ASC),
    CONSTRAINT `choroba_fk` FOREIGN KEY (`_idChoroba`) REFERENCES `tin`.`Choroba` (`_idChoroba`),
    CONSTRAINT `uzytkownik_fk` FOREIGN KEY (`_idUzytkownik`) REFERENCES `tin`.`Uzytkownik` (`_idUzytkownik`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE  IF NOT EXISTS `tin`.`Lekarstwo`
( `_idLekarstwa` int unsigned NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(30) NOT NULL,
  `opisLekarstwo` varchar(100) NOT NULL,
  `cena` decimal(6,2) unsigned NOT NULL,
  PRIMARY KEY (`_idLekarstwa`),
  UNIQUE INDEX `lekarstwo_id_UNIQUE` (`_idLekarstwa` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;



CREATE TABLE  IF NOT EXISTS `tin`.`ReceptaLekarstwo`
( `_idReceptaLekarstwo` int unsigned NOT NULL AUTO_INCREMENT,
  `_idRecepta` int unsigned NOT NULL ,
  `_idLekarstwo` int unsigned NOT NULL,
  PRIMARY KEY (`_idReceptaLekarstwo`),
  UNIQUE INDEX `lekarstwo_id_UNIQUE` (`_idReceptaLekarstwo` ASC)
  CONSTRAINT `lekarstwa_fk` FOREIGN KEY (`_idLekarstwa`) REFERENCES `tin`.`Lekarstwo` (`_idLekarstwa`),
   CONSTRAINT `recepta1_fk` FOREIGN KEY (`_idRecepta`) REFERENCES `tin`.`Recepta` (`_idRecepta`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE  IF NOT EXISTS `tin`.`Recepta`
( `_idRecepta` int unsigned NOT NULL AUTO_INCREMENT,
  `_idUzytkownikChoroba` int unsigned NOT NULL,
  `dataWaznosci` date NOT NULL,
  `opisRecepty` varchar(100) NOT NULL,
  PRIMARY KEY (`_idRecepta`),
  UNIQUE INDEX `uzytkownik_id_UNIQUE` (`_idRecepta` ASC),
  CONSTRAINT `recepta1_fk` FOREIGN KEY (`_idUzytkownikChoroba`) REFERENCES `tin`.`UzytkownikChoroba` (`_idUzytkownikChoroba`),
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin`.`Choroba` (`_idChoroba`,`nazwa`,`opis`,`zakazna`) VALUES
(1, 'Gorączka', ' Pacjent ma podwyższoną temperaturę i czuje się osłabiony.  ', 0),
(2, 'choroba Raynauda', 'Napadowy skurcz tętnic w obrębie rąk, rzadziej stóp ', 0),
(3, 'Choroby reumatyczna', 'Grupa chorób charakteryzujących się przewlekłymi zmianami zapalnymi w obrębie tkanki łącznej', 0),
(4, 'Covid', 'Ostra choroba zakaźna układu oddechowego wywołana zakażeniem wirusem SARS-CoV-19  ', 1),
(5, 'Gruźlica', 'W najczęstszej gruźlicy płucnej do jej objawów należą wtedy: ból w klatce piersiowej, krwioplucie.', 1);

INSERT IGNORE INTO `tin`.`Rola` (`_idRola`,`nazwaRoli`)
VALUES (1, 'Admin'), (2,'Pacjent'), (3,'Lekarz');

INSERT IGNORE INTO `tin`.`Uzytkownik` (`_idUzytkownik`,`imie`,`nazwisko`,`dataurodzenia`,`email`,`miejsceZamieszkania`, `telefon`,`pesel`, `haslo`, `_idRola`) VALUES
(1, 'Wiola', 'Orzech', '1992-09-23 00:00:00', 'wiolaorzech@gmail.com', 'Orzechowa 13', '668752390', '00282103989', NULL, 2),
(2, 'Agnieszka', 'Rzodkiewka', '1996-08-31 00:00:00', 'agnieszka@gmail.com', 'Rzodkiewkowa 15', '515165161', '002155161616', NULL, 2),
(3, 'Karol', 'Pietruszka', '1965-12-06 00:00:00', 'pietruszka1@gmail.com', 'Pietruszkowa 12', '415151511', '00244151616', NULL, 2),
(4, 'Weronika', 'Cebula', '1996-07-11 00:00:00', 'weronikacebula@gmail.com', 'Cebulowa 15', '777777777', NULL, 123, 3),
(5, 'Agnieszka', 'Fasola', '1993-07-11 00:00:00', 'agnieszkafasola@gmail.com', 'Fasolowa 11', '222222222', NULL, 123, 3);

INSERT IGNORE INTO `tin`.`UzytkownikChoroba` (`_idUzytkownikChoroba`,`_idChoroba`,`_idUzytkownik`,`dataWystawienia`,`opisObjawow`,`zwolnienieDo`, `cenaWizyty`) VALUES
(1, 1, 1, '2021-11-02 00:00:00', 'odkrztuszanie plwociny, ból głowy, dreszcze, krwioplucie, bóle w klatce piersiowej i kaszel.', NULL, '121.00'),
(2, 2, 2, '2021-09-20 00:00:00', 'Gorączka między 37.2 a 37.3', '2021-09-20 00:00:00', '120.00'),
(3, 3, 3, '2021-11-17 00:00:00', 'Ból mięśni i stawów', '2021-11-25 00:00:00', '122.00'),
(4, 1, 4, '2021-11-24 00:00:00', 'ból w klatce piersiowej, krwioplucie oraz produktywny kaszel przewlekający się ponad trzy tygodnie', '2021-11-29 00:00:00', '125.00'),
(5, 2, 1, '2021-12-02 00:00:00', ' Wyniki testu pozytywny.', '2021-12-05 00:00:00', '100.00'),
(6, 4, 1, '2021-12-01 00:00:00', 'Ból i obrzęk stawów, sztywność, ograniczenie ich ruchomości.', '2021-12-05 00:00:00', '100.00');

INSERT IGNORE INTO `tin`.`Recepta` (`_idRecepta`,`_idLekarstwa`,`_idUzytkownikChoroba`,`dataWaznosci`,`opisRecepty`) VALUES (1,1,3,'1996-08-31 00:00:00', 'blab lblal');
