var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var cors = require('cors');
const authApiRouter = require('./routes/api/AuthApiRoute');

var indexRouter = require('./routes/index');
const patientRouter = require('./routes/PatientsRoute');
const diseaseRouter = require('./routes/DiseaseRoute');
const diseasePatientRouter = require('./routes/UserDiseaseRoute');

const diseaseApiRouter = require('./routes/api/DiseaseApiRoute');
const userRouter = require('./routes/ProfileRouter');
const userApiRouter = require('./routes/api/UserApiRoute');
const userDiseaseApiRouter = require('./routes/api/UserDiseaseApiRoute');
const medicineDiseaseApiRouter = require('./routes/api/MedicineApiRoute');
const prescriptionApiRouter = require('./routes/api/PersciptionApiRoute');
const opinionApiRouter = require('./routes/api/OpiniaApiRoute');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'my_secret_password',
  resave: false,
  saveUninitialized: true
}));

app.use((req,res,next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser= loggedUser;

  if(!res.locals.loginError){
    res.locals.loginError=undefined;
  }
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const i18n = require('i18n');

i18n.configure({
  locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
  directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
  objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
  cookie: 'acme-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o języku aktualnie wybranym przez użytkownika
});
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  if(!res.locals.lang) {
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next();
});
app.use(i18n.init);
app.use(cors());
const authUtil= require('../mp2/util/authUtils')
app.use('/', indexRouter);
app.use('/myProfil', authUtil.permitAuthenticatedUser2, userRouter);
app.use('/Patients',authUtil.permitAuthenticatedUser3, patientRouter);
app.use('/Disease', authUtil.permitAuthenticatedUser2, diseaseRouter);
app.use('/PacjentChoroba',authUtil.permitAuthenticatedUser3,diseasePatientRouter);
app.use('/api/auth', authApiRouter);
app.use('/api/disease', diseaseApiRouter);
app.use('/api/user', userApiRouter);
app.use('/api/userdisease', userDiseaseApiRouter);
app.use('/api/medicine', medicineDiseaseApiRouter);
app.use('/api/prescription', prescriptionApiRouter);
app.use('/api/opinion', opinionApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
