const Announcement = require('../Models/announcement');

//Display all announcements
const announcementDisplay = (req,res)=>{
    let usertype = req.user.userType;
    Announcement.find().sort({date:-1}).then((result)=>{
        res.render('announcement',{title:'Announcements' ,announcement: result,usertype:usertype, page:'announcements'});
    }).catch((err)=>{
        console.log(err);
    })
}

//Display new announcement form
const announcementAddForm = (req,res)=>{
    let usertype = req.user.userType;
    res.render('announcement-add',{title:'New Announcement', page:'add', announcement:'',usertype:usertype});
}


//Create new announcement in Db
const announcementAddProcess = (req,res)=>{
    
    const newAnnouncement = {
        title: req.body.title,
        body: req.body.body,
        user: 'Management',
        priority: req.body.priority,
        type: req.body.type
    }

    Announcement.create(newAnnouncement,(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        res.redirect('/announcement');
    })
};


//Display edit form for selected announcement
const announcementEditForm = (req,res)=>{
    let usertype = req.user.userType;
    const id = req.params.id
    Announcement.findById({_id:id}).then((result)=>{
        res.render('announcement-add',{title:'Edit', page:'edit', announcement:result,usertype:usertype});
    }).catch((err)=>{
        console.log(err);
    }) 
};

//Update editted announcement
const announcementEditProcess = (req,res)=>{
    const id = req.params.id
    let updatedAnnouncement = req.body


    Announcement.findOneAndUpdate({_id:id},updatedAnnouncement,(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        
        res.redirect('/announcement')
    })
};


//Delete selected announcement
const announcementDeleteProcess = (req,res)=>{
    const id = req.params.id
    Announcement.remove({_id:id},(err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/announcement');
    })
};


module.exports = {
    announcementDisplay,
    announcementAddForm,
    announcementAddProcess,
    announcementEditForm,
    announcementEditProcess,
    announcementDeleteProcess
}