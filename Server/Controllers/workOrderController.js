const WorkOrder = require('../Models/workOrder');
const maintenanceRequest = require('../Models/maintenanceRequest');
//GET request - Serve up all existing work tickets
const workOrderDisplay = (req,res)=>{
    let usertype = req.user.userType;
    
    WorkOrder.find().sort({dateCreated:-1}).then((result)=>{ 
        res.render('workOrder',{title:'Work Orders', page:'workOrder',workorder:result,usertype:usertype});
    }).catch((err)=>{
            console.log(err);
        })
};
//GET request - Serve up work ticket form from Create W.O button
const workOrderCreateTicketFormDisplay = (req,res)=>{
    let usertype = req.user.userType;
    res.render('workOrderAssign', {title:'Work Order Details', page: 'create-new-workorder', request:{},usertype:usertype});
}

//GET request - Serve up work ticket form with information of existing request
const workOrderDetailsFormDisplay =  (req,res)=>{   
    let usertype = req.user.userType; 
     maintenanceRequest.findById({_id: req.params.request_id},(err,result)=>{
        if(err){
            console.log(err);
        }
       res.render('workOrderassign',{title:'Work Order Details', page:'create-order-assign', request:result,ticket:{},usertype:usertype});
    })
}

//GET request - Serve up ticket edit form
const workOrderEditTicketFormDisplay =  (req,res)=>{
    let usertype = req.user.userType;
    WorkOrder.findOne({_id:req.params.ticket_id},(err,ticket)=>{
        console.log(ticket.dateCreated.toLocaleDateString({timeZone:'GMT'}).slice(0,10))
        res.render('workOrderAssign',{title:'Edit Order Details', page:'edit-order-assign', ticket:ticket, request:{},usertype:usertype});
    })

}

//POST request - Create new work ticket from button
const workOrderCreateNewProcess = (req,res)=>{
    let newWorkOrder = req.body;
    newWorkOrder.status = 'In-Progress';
    console.log(newWorkOrder.dateCreated);
    // res.end();
    WorkOrder.create(newWorkOrder,(err)=>{
        if(err){
            console.log(err);
            res.end();
        }
        res.redirect('/workorder')
    })
}

//POST request - Create work ticket from existing tenant request
const workOrderAssignWorkerProcess = async (req,res)=>{
    let newWorkOrder = req.body;
    newWorkOrder.status = 'In-Progress';
    newWorkOrder.request_id = req.params.request_id;
    newWorkOrder.dateCreated = new Date();
    
    await maintenanceRequest.updateOne({_id: req.params.request_id},{status:'In-Progress'});

    WorkOrder.create(newWorkOrder,(err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/workorder');
    })
}

//POST request - Process edit existing work ticket
const workOrderEditTicketProcess = async (req,res)=>{
    let updatedItem = req.body;
    
    await WorkOrder.updateOne({_id:req.params.ticket_id},updatedItem)
    res.redirect('/workorder')
}

//GET request - delete selected work ticket
const workOrderTicketDeleteProcess = (req,res)=>{
    WorkOrder.findOne({_id:req.params.ticket_id},(err,workorder)=>{
        if(err){
            console.log(err);
        }
        maintenanceRequest.updateOne({_id:workorder.request_id},{status:'Pending'},(err)=>{
            if(err){
                console.log(err)
            }
        });
        
    });
    
    WorkOrder.deleteOne({_id:req.params.ticket_id},(err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/workorder');
    });
}

module.exports ={
    workOrderDisplay,
    workOrderCreateTicketFormDisplay,
    workOrderDetailsFormDisplay,
    workOrderAssignWorkerProcess,
    workOrderTicketDeleteProcess,
    workOrderCreateNewProcess,
    workOrderEditTicketFormDisplay,
    workOrderEditTicketProcess
};