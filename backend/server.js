const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config();
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const contactRoutes = require('./routes/contactRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
connectDB()
const app = express();
const userDb = require('./models/User')

const session = require('express-session')
const passport = require('passport');
const generateToken = require('./utils/generateToken');
const User = require('./models/User');
const Oauth2Strategy = require('passport-google-oauth2').Strategy;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', // Only allow your React app to make requests
    credentials: true // Allow cookies and credentials to be sent with requests
}));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
//     next();
// })

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
    })

} else {
    app.get('*', (req, res) => {
        res.send('Api is running ....')
    })
}
//setup session
// app.use(session({
//     secret: 'Me8395002130Binnibro',
//     resave: false,
//     saveUninitialized: true
// }))

//setup Passport 
// app.use(passport.initialize())
// app.use(passport.session())

// passport.use(
//     new Oauth2Strategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: '/auth/google/callback',
//         scope: ["profile", "email"]
//     },
//         async (accessToken, refreshToken, profile, done) => {
//             try {


//                 let user = await userDb.findOne({ googleId: profile.id })
//                 if (!user) {
//                     user = new userDb({
//                         provider: "GOOGLE",
//                         googleId: profile.id, name: profile.displayName, email: profile.emails[0].value,
//                         profilePic: profile.photos[0].value
//                     });
//                     await user.save()

//                 }
//                 return done(null, user)
//             } catch (error) {
//                 return done(error, null)
//             }
//         }
//     )
// )

// passport.serializeUser((user, done) => {
//     done(null, user);
// })
// passport.deserializeUser((user, done) => {
//     done(null, user);
// })

//initialize google auth 
// app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))
// app.get("/auth/google/callback", passport.authenticate("google", {
//     successRedirect: 'http://localhost:3000/',
//     failureRedirect: 'http://localhost:3000/login',
// }))

// app.get("/login/success", async (req, res) => {

//     if (req.user) {
//         const dbUser = await User.findById(req.user._id).select('name email about profilePic userType phoneNumber');
//         generateToken(res, dbUser._id);
//         req.user = dbUser;
//         res.status(200).json({ message: 'User Logged In', user: dbUser })
//     } else {
//         res.status(400).json({ message: 'Not Authorized' })
//     }

// })

var __dirname = path.resolve()




app.use('/api/users', userRoutes);

app.use('/api/contacts', contactRoutes);
app.use('/api/upload', uploadRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})

