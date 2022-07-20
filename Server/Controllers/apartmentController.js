const Apartment = require('../Models/apartmentUnit');

//Display all apartment units in the building
const apartmentDisplay =(req,res)=>{
    let usertype = req.user.userType;
    Apartment.find().sort({unitNumber:1})
    .then((result)=>{
       
        res.render('apartment',{title:'Apartments',apartment:result, usertype:usertype, page:'apartment'});
    })
    .catch((err)=>{
        console.log(err);
    })
}

//Display form for creating new unit
const apartmentAddForm = (req,res)=>{
    let usertype = req.user.userType;
    res.render('apartment-new',{title:'Apartment Information', page:'add', apartment:'',usertype:usertype});
};

//Create new apartment unit in Db
const apartmentAddProcess = (req,res)=>{
    let newApartment = req.body
    Apartment.create(newApartment,(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        res.redirect('/apartment');
    })
};

//Display selected apartment unit
const apartmentUnitDisplay = (req,res)=>{
    let usertype = req.user.userType;
    const id = req.params.id;
    Apartment.findById(id)
    .then((result)=>{
        res.render('apartmentDetails',{apartment:result, title:'Apartment Details',usertype:usertype, page:'single apartment'});
    })
    .catch((err)=>{
        console.log(err);
    })
};

//Delete selected apartment unit
const apartmentDeleteProcess = (req,res)=>{
    let id = req.params.id;
    
    Apartment.remove({_id:id},(err)=>{
        if(err){
            console.log(err.message);
            res.end('Not found')
        }
    })
    res.redirect('/apartment')
};

//Display edit form for selected apartment unit
const apartmentEditForm = (req,res)=>{
    let usertype = req.user.userType;
    let id = req.params.id;
   
    Apartment.findById(id).then((apartment)=>{
        res.render('apartment-new',{title:'Apartment Information',page:'edit',apartment,usertype:usertype})
    }).catch((e)=>console.log(e.message))
};


//Update editted apartment unit
const apartmentEditProcess = (req,res)=>{
    let id = req.params.id;
    let updatedApartment=req.body;
    Apartment.findOneAndUpdate({_id:id},updatedApartment,(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        res.redirect('/apartment');
    })
};

module.exports = {
    apartmentDisplay,
    apartmentAddForm,
    apartmentAddProcess,
    apartmentUnitDisplay,
    apartmentDeleteProcess,
    apartmentEditForm,
    apartmentEditProcess
}