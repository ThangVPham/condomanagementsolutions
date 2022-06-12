const Booking = require('../Models/amenityBooking');
const amenityDisplay = (req,res)=>{    
    let usertype = req.user.userType;
    res.render('amenity',{title:'Amenity', page:'amenities', usertype:usertype})
}



const amenityBookingProcess = (req,res)=>{
    let newBooking = req.body;
    let usertype = req.user.userType;
    newBooking.user = req.user.username
    let price = 105;
    if(newBooking.amenityType == 'Guest Suite'){
        if(newBooking.timeslot =='1'){
            newBooking.fee = price;
        }else if(newBooking.timeslot =='2'){
            newBooking.fee = 2 * price;
        }else if(newBooking.timeslot=='3'){
            newBooking.fee = 3 * price;
        }
    } else{
        newBooking.fee = 0;
    }
    
    Booking.create(newBooking,(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        res.render('amenityconfirmation',{title:'Amenity Booking', page:'confirmation', booking:newBooking, usertype:usertype})
    })

}

const movingPageDisplay = (req,res)=>{
    let usertype = req.user.userType;
    res.render('moving',{title:'Moving', page:'moving',usertype:usertype})
}

const elevatorBookingFormDisplay = (req,res)=>{
    let usertype = req.user.userType;
    res.render('elevatorbooking',{title:'Elevator Booking', page:'elevatorbooking',usertype:usertype})
}

const elevatorBookingProcess = (req,res) =>{
    let elevatorBooking = req.body;
    let usertype = req.user.userType;
    elevatorBooking.fee = 0;
    elevatorBooking.user = req.user.username;
    Booking.create(elevatorBooking,(err)=>{
        if(err){
            console.log(err);
        }
        
        res.render('amenityconfirmation',{title:'Booking Elevator', page:'confirmation', booking:elevatorBooking,usertype:usertype})
    })
}

const myreservationDisplay = (req,res)=>{
    let usertype = req.user.userType;
    let username = req.user.username;
    Booking.find({user:username}).sort({date:-1}).then((result)=>{
        res.render('reservation',{title:'My Reservations' ,reservation: result, usertype:usertype});

    }).catch((err)=>{
        console.log(err);
    })
}

const myreservationDelete = (req,res)=>{
    Booking.deleteOne({_id:req.params.id},(err)=>{
        if(err){
            console.log(err)
        }
        res.redirect('back');
    })
    
}
module.exports = {
    amenityDisplay,
    amenityBookingProcess,
    movingPageDisplay,
    elevatorBookingFormDisplay,
    elevatorBookingProcess,
    myreservationDisplay,
    myreservationDelete
}