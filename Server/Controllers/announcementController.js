const Announcement = require('../Models/announcement');

const announcementDisplay = (req,res)=>{
    let usertype = req.user.userType;
    Announcement.find().sort({date:-1}).then((result)=>{
        res.render('announcement',{title:'Announcements' ,announcement: result,usertype:usertype});
    }).catch((err)=>{
        console.log(err);
    })
}

const announcementAddForm = (req,res)=>{
    let usertype = req.user.userType;
    res.render('announcement-add',{title:'New Announcement', page:'add', announcement:'',usertype:usertype});
}

const announcementAddProcess = (req,res)=>{
    
    const newAnnouncement = {
        title: req.body.title,
        body: req.body.memobody,
        date: Date.now(),
        user: 'a',
        important: req.body.important
    }
    Announcement.create(newAnnouncement,(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        res.redirect('/announcement');
    })
};

const announcementEditForm = (req,res)=>{
    let usertype = req.user.userType;
    const id = req.params.id
    Announcement.findById({_id:id}).then((result)=>{
        res.render('announcement-add',{title:'Edit', page:'edit', announcement:result,usertype:usertype});
    }).catch((err)=>{
        console.log(err);
    }) 
};

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