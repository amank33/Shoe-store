const express=require('express');
const app=express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');


app.use(express.json());
app.use(express.urlencoded({extended:true}))

const dotenv=require('dotenv').config()
const dbCon=require('./app/config/db')
const ejs=require('ejs');
const path=require('path');

//const addDataHelper=require('./app/helper/addData')
dbCon()

app.use('/',express.static('./public/'))
//app.use('/',express.static('./views/'))
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

//addDataHelper()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const shoeRoutes = require('./app/routes/shoeRouter');
app.use(shoeRoutes);
const shoeAdminPanelRoutes = require('./app/routes/shoeAdminPanelRouter');
app.use(shoeAdminPanelRoutes);

// app.set('view engine', 'ejs');

// app.set('views', "views");
app.set('views', path.join(__dirname, 'views')); // ✅ Correct absolute path
app.set('view engine', 'ejs');


// app.listen(process.env.PORT||3009,()=>{
//     console.log('Server is running on port 3009');
// })

module.exports = app;