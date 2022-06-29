require('dotenv').config();

//Routes
const apartmentRoutes = require('./Server/Routes/apartmentRoutes');
const announcementRoutes = require('./Server/Routes/announcementRoutes');
const amenityBookingRoutes = require('./Server/Routes/amenitybookingRoutes');
const maintenanceRequestRoutes = require('./Server/Routes/maintenanceRequestRoutes');
const workOrderRoutes = require('./Server/Routes/workOrderRoutes');
const parkingRoutes = require('./Server/Routes/parkingRoutes')
const loginRoutes = require('./Server/Routes/loginRoutes');



const Announcement = require('./Server/Models/announcement');
const Booking = require('./Server/Models/amenityBooking');
//Require Authentication
const isAuth = require('./authentication').isAuth
//----Middlewares------
const express = require('express');
const app = express();
const PORT = 3001;
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('passport-local');
const cors = require('cors')


//connect to MongoDb
const dbURI =`mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PASS}@cluster0.wnii8.mongodb.net/CondoManagementApp?retryWrites=true&w=majority`;
mongoose.connect(dbURI).then((result)=>{
    //Successfully connected to remote DB
    console.log('Connected to remote DB');
    //Listen on PORT after connect to DB
    app.listen(process.env.PORT || PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
})
//use static contents in Client folder
app.use(express.static(__dirname + '/Client'));
app.use(express.static(__dirname + '/Client/Assets'));

//request's details
app.use(morgan('dev'));
//use urlencoded to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin:"http://localhost:3001",
    credentials: true
}));

app.use(session({
    secret:"secretcode",
    resave:true,
    saveUninitialized:true
}));

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);





//direct to the folder to use ejs
app.set('views',__dirname+'/Server/Views/contents');
app.set('view engine', 'ejs');


//home page data
const getAnnouncement = 
app.get('/',isAuth,(req,res)=>{  
    let usertype = req.user.userType;
    let name = req.user.firstname;
    let username = req.user.username
        Announcement.find().sort({date:-1}).then((announcement)=>{           
            Booking.find({user:username}).sort({_id:-1}).then((booking)=>{ 
               
                
                res.render('index',{title:'Home' ,announcement: announcement, amenity:booking , page:'home',usertype:usertype,name:name});
            })
            
        }).catch((err)=>{
            console.log(err.msg);
        }) 
});

app.get('/contact-us',isAuth,(req,res)=>{
    let usertype = req.user.userType;
    res.render('contactus', {title:'Contact Us', page:'contact us',usertype:usertype})
})
app.post('/contact-us',isAuth,(req,res)=>{
    let usertype = req.user.userType;
    res.render('contact-message',{title: 'Thank You', page:'contact-message',usertype:usertype})
})



//Using Routers folder
app.use(apartmentRoutes);
app.use(announcementRoutes);
app.use(amenityBookingRoutes)
app.use(maintenanceRequestRoutes);
app.use(workOrderRoutes);
app.use(parkingRoutes);
app.use(loginRoutes);;

app.use((req,res)=>{
    res.status(404).send('<h1>404 - Page not found</h1>')
})



