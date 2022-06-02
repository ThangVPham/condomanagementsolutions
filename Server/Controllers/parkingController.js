const Parking = require('../Models/parking');

const parkingFormDisplay = (req,res)=>{
    let usertype = req.user.userType;
    res.render('parking',{title:'Parking Permit', page:'parking',usertype:usertype})
}
const parkingFormProcess = (req,res)=>{
    let usertype = req.user.userType;
    let permit = req.body;
    let expireDate = new Date(permit.dateFrom);
    expireDate.setDate(expireDate.getDate()+1);

    permit.dateExpire = expireDate;

    Parking.create(permit,(err)=>{
        if(err){
            console.log(err);
        }
        res.render('parkingconfirmation',{title:'Parking Confirmation', page:'parking confirmation', permit:permit,usertype:usertype})
    })
}

module.exports={
    parkingFormDisplay,
    parkingFormProcess
}