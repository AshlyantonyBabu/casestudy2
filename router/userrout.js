var exp=require('express')
var rt=exp.Router()
var bdy=require('body-parser')
var mon=require('mongoose')
var url="mongodb+srv://ashly:ashly@cluster0-nybb2.mongodb.net/library?retryWrites=true&w=majority"
//var url="mongodb://localhost/library"
var user=require("../model/reg")
rt.use(bdy.urlencoded({extened:true}))
var modelbk=require("../model/lib")
var path=require('path')
var mult=require('multer')
var storage=mult.diskStorage({destination:function(req,file,ks){
ks(null,path.join(__dirname,"/./uploads"))

},
filename:function(req,file,ks){
ks(null,"img_"+req.body.Bkid+".jpg")
}})
var up=mult({storage:storage})




mon.connect(url,function(err){
if(err)throw err
else{
    console.log("database connected")
}
})
rt.post("/login",function(req,res){
    //var u2= new user()
    console.log(req.body.pass)
    console.log(req.body.unam)
   username1=req.body.unam
   passwrd1=req.body.pass
   var qry={$and:[{username:{$eq:username1}},{passwrd:{$eq:passwrd1}}]}
      user.findOne(qry,function(err,result){
            if(err)throw err
            if(result.role=="Admin"){
                res.redirect('/index')
            }
            else{
                res.redirect('/user') 
            }
            
        })
  
  
   })
   rt.get("/signup",function(req,res){
        
        res.render('Signup',{nav:[{link:"/",Title:"Home"}],Pagetitle:"Library"})
   //res.sendFile(__dirname+"/src/view/index.html")
   })
// app.use("/author",function(req,res){
//     res.render("author",{nav:[{link:"/book",Title:"Book"},{link:'/author',Title:"Author"}],Pagetitle:"Library"})
// })




rt.post("/reg",function(req,res){
    var u1= new user()

    console.log(req.body.fnam)
   u1.fname=req.body.fnam
    u1.username=req.body.unam1
    console.log(req.body.pass1)
    console.log(req.body.role)
   u1.passwrd=req.body.pass1
    u1.role=req.body.role
    u1.save(function(err){
        if(err)
            throw err
        
        else{
           res.redirect("/")
        }
    })
   // res.render('Signup',{nav:[{link:"/book",Title:"Book"},{link:'/author',Title:"Author"}],Pagetitle:"Library"})
//res.sendFile(__dirname+"/src/view/index.html")
})
rt.get("/add",function(req,res){
    res.render("addbook",{nav:[{link:"/",Title:"Home"},{link:"/book",Title:"Book"},{link:"/user/add",Title:"NEW Book"}],Pagetitle:"Library"})
})
rt.post("/dbadd",up.single('file1'),function(req,res){
    var bk=new modelbk()
    console.log(req.body.bkname)
    console.log(req.body.Bkid)
    console.log(req.body.Bkauth)
    console.log(req.body.Bkdis)
    console.log(req.body.Bkprice)
    console.log("img_"+req.body.Bkid+".jpg")
    console.log(req.body.bkcat)
    bk.title=req.body.bkname
    bk.id=req.body.Bkid
    bk.author=req.body.Bkauth
    bk.category=req.body.bkcat
    bk.discription=req.body.Bkdis
    bk.price=req.body.Bkprice
    bk.pic="img_"+req.body.Bkid+".jpg"
    bk.save(function(err){
        if(err)throw err
        else{
            res.redirect("/book")
        }
    })
})
rt.get("/viewpic/:pic",function(req,res){
    res.sendFile(__dirname+"/uploads/"+req.params.pic)
})
module.exports=rt;