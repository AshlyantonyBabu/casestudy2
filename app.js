var exp=require('express')
const app=exp();
//var bdy=require('body-parser')
var rrtt=require("./router/userrout")
var rout=require("./router/bookrouter")
var rrout=require("./router/authorrt")
const path=require('path')
app.set("view engine","ejs")
app.set("views","./src/view")
app.use(exp.static(path.join(__dirname,"/public")))
//var app=new exp();
// var mon=require('mongoose')
// var url="mongodb://localhost/library"
var lib=require("./model/lib")
// app.use(bdy.urlencoded({extened:true}))
// mon.connect(url,function(err){
// if(err)throw err
// else{
//     console.log("database connected")
// }
// })

app.use("/book",rout)
app.use("/user",rrtt)
app.use("/author",rrout)
app.get("/index",function(req,res){
 res.render('index',{nav:[{link:"/",Title:"Home"},{link:"/book",Title:"Book"},{link:"/user/add",Title:"NEW Book"}],Pagetitle:"Library"})
//res.sendFile(__dirname+"/src/view/index.html")
})
app.get("/",function(req,res){
    res.render('Login',{nav:[{link:"/",Title:"Home"}],Pagetitle:"Library"})
  
   })
   app.get("/user",function(req,res){
    lib.find({},function(err,result){
        if(err)throw err
        else{
            res.render('user',{nav:[{link:"/",Title:"Home"},{link:"/",Title:"Log Out"}],Pagetitle:"Library",array_book:result}) 
        }
    })
   // res.render('user',{nav:[{link:"/",Title:"Home"}],Pagetitle:"Library"})
   //res.sendFile(__dirname+"/src/view/index.html")
   })
   
  


app.listen(process.env.PORT||9000,function(req,res){
    console.log("server is ready")
})
