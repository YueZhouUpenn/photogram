/* eslint-disable no-console */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');


app.use(cors());

// /* Implement secured random token */
const cookieParser = require('cookie-parser');
const key = require('./config/key');
// const csrf = require('csurf');

// /* Setup route middlewares */
// const csrfProtection = csrf({ cookie: true, ignoreMethods: ['GET'] });
// const parseForm = bodyParser.urlencoded({ extended: false });

// /* Parse cookies - we need this because cookie is true in csrfProtection */
app.use(cookieParser());

app.use(session({
  secret: 'cute!!!',
  resave: false,
  saveUninitialized: false,
}));

// app.get('/csrftoken', csrfProtection, function(req, res) {
//   console.log('Secured random token');
//   /* Pass the csrf token to the view */
//   res.status(200);
//   res.json({
//     csrfToken: req.csrfToken(),
//   });
// })

/* connect to mongoDB */
mongoose.connect(key.mongoURI);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.locals.moment = moment; // create local variable available for the application
app.use(methodOverride('_method'));
// link to the css file in 'public' folder
app.use(express.static(`${__dirname}/public`));

// // passport
// app.use(passport.initialize())
// app.use(passport.session())
// passport.use(new localStrategy(User.authenticate()))
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

/* require ROUTES */
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const followRoute = require('./routes/follow');
const testRoute = require('./routes/testAPI');
const likeRoute = require('./routes/like');
const commentRoute = require('./routes/comment');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const recommendationRoute = require('./routes/recommendation');

/* use ROUTES */
app.use('/', postsRoute);
app.use('/', userRoute);
app.use('/', followRoute);
app.use('/', testRoute);
app.use('/', likeRoute);
app.use('/', commentRoute);
app.use('/', authRoute);
app.use('/', profileRoute);
app.use('/', recommendationRoute);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Photogram server has started on ${PORT}`);
});
