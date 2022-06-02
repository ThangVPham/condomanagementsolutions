const MaintenanceRequest = require('../Models/maintenanceRequest');
const WorkOrder = require('../Models/workOrder');
const moment = require('moment');
const maintenanceRequestDisplay = (req,res)=>{
    let usertype = req.user.userType;
    res.render('maintenanceRequest',{title:'Maintenance Request', page:'maintenanceReq',usertype:usertype})
};

const maintenanceRequestAdd = (req,res)=>{
    const newRequest = req.body;
    
    const dateNow = new Date();

    newRequest.dateCreated = dateNow;
    
    newRequest.status = 'Pending'
    newRequest.user = req.user.username;
    MaintenanceRequest.create(newRequest,(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }        
        res.redirect('/myrequest');
    })
}

const myrequestDisplay = (req,res)=>{
    let usertype = req.user.userType;
    let username = req.user.username;
    MaintenanceRequest.find({user:username}).sort({dateCreated:-1}).then((result)=>{
        res.render('myrequest',{title:'My Requests', page:'myrequest', request:result,usertype:usertype})
    }).catch((err)=>{
        console.log(err);
    })
}

const requestsHandlingProcess = (req,res)=>{
    let id = req.params.id;
    let status = req.body.status;

    MaintenanceRequest.updateOne({_id:id}, {$set:{status:status}},(err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/myrequests')
    });
    //Create a new work ticket when request is approved
    if(status=='Approved'){
        let newWorkOrder = new WorkOrder();
        let time = moment().format();
        console.log(time);
        MaintenanceRequest.findById({_id:id},(err,request)=>{
            if(err){
                console.log(err);
            }

            
            
            newWorkOrder._id = id;
            newWorkOrder.requestType = request.requestType;
            newWorkOrder.priority = request.priority;
            newWorkOrder.user = request.user;
            newWorkOrder.unit = request.unit;
            newWorkOrder.status = 'Pending'
            newWorkOrder.dateCreated = time;
            console.log(newWorkOrder);

            WorkOrder.findOne({_id:id},(err,result)=>{
                if(err){
                    console.log(err);
                }
                if(result == null){                  
                    WorkOrder.create(newWorkOrder,(err)=>{
                        if(err){
                            console.log(err);
                            res.end(err);
                        }
                    })                  
                }      
            })          
        });               
    }
    //Remove work ticket if request is decline
    if(status=='Declined'){ 
        WorkOrder.findOne({_id:id},(err,result)=>{
            if(err){
                console.log(err);
            }
            if(result != null){             
                WorkOrder.remove({_id:id},(err)=>{
                    if(err){
                        console.log(err);
                        res.end(err);
                    }
                })                  
            }      
        })       
    }   
}

module.exports = {
    maintenanceRequestDisplay,
    maintenanceRequestAdd,
    myrequestDisplay,
    requestsHandlingProcess
}