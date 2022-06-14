const Apartment = require('../Models/apartmentUnit');

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

const apartmentAddForm = (req,res)=>{
    let usertype = req.user.userType;
    res.render('apartment-new',{title:'Apartment Information', page:'add', apartment:'',usertype:usertype});
};

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

const apartmentDeleteProcess = (req,res)=>{
    let id = req.params.id;
    
    Apartment.remove({_id:id},(err)=>{
        if(err){
            console.log(err);
            res.end('Not found')
        }
    })
    res.redirect('/apartment')
};

const apartmentEditForm = (req,res)=>{
    let usertype = req.user.userType;
    let id = req.params.id;
    Apartment.findById({_id:id},(err,apartment)=>{
        res.render('apartment-new',{title:'Apartment Information',page:'edit',apartment,usertype:usertype})
    })
};

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