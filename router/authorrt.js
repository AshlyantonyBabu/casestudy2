var ex=require('express');
var bdy=require('body-parser')
var auroot=ex.Router();
var mon=require('mongoose')
auroot.use(bdy.urlencoded({extended:true}))
var url="mongodb+srv://ashly:ashly@cluster0-nybb2.mongodb.net/library?retryWrites=true&w=majority"
//var url="mongodb://localhost/library"
var libi=require("../model/auth")
mon.connect(url,function(err){
if(err)throw err
else{
    console.log("database connected")
}
})
var path=require('path')
var mult=require('multer')
var storage=mult.diskStorage({destination:function(req,file,ks){
ks(null,path.join(__dirname,"/./upload"))

},
filename:function(req,file,ks){
ks(null,"img_"+req.body.auid+".jpg")
}})
var up=mult({storage:storage})
module.exports=auroot;

auroot.get("/",function(req,res){
    lib.find({},function(err,result){
        //console.log(arr_authors.length)
        res.render("author",{nav:[{link:"/",Title:"Home"},{link:"/book",Title:"Book"},{link:'/author',Title:"Author"},{link:"/author/add",Title:"NEW Author"},{link:"/",Title:"Log Out"}],Pagetitle:"Authors",authrlist:result.sort()})
    })
   
})
auroot.get("/add",function(req,res){
    res.render("addauthr",{nav:[{link:"/",Title:"Home"},{link:"/book",Title:"Book"},{link:'/author',Title:"Author"},{link:"/author/add",Title:"NEW Author"}],Pagetitle:"Library"})
})
auroot.get("/:id",function(req,res){
    var idi=req.params.id

    console.log(idi)
   
    var qry={id:idi+" "}
    lib.findOne(qry,function(err,result){
        if(err)throw err
        else{
        console.log(result)
        res.render("readmrau",{nav:[{link:"/",Title:"Home"},{link:"/book",Title:"Book"},{link:'/author',Title:"Author"},{link:"/",Title:"Log Out"}],Pagetitle:"Authors",authrlist:result})
  
      } 
     })
  
})
auroot.post("/dbadd",up.single('file1'),function(req,res){
    var au=new libi()
    console.log(req.body.auname)
    console.log(req.body.auid)
   
    console.log(req.body.audis)
    
    console.log("img_"+req.body.Bkid+".jpg")
    
    au.name=req.body.auname
    au.id=req.body.auid
    
    au.discri=req.body.audis
    
    au.pic="img_"+req.body.auid+".jpg"
    au.save(function(err){
        if(err)throw err
        else{
            res.redirect("/author")
        }
    })
})
auroot.get("/viewpic/:pic",function(req,res){
    res.sendFile(__dirname+"/upload/"+req.params.pic)
})
