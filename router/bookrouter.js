var exp=require('express')
var rt=exp.Router()
module.exports=rt;
var bdy=require('body-parser')
var mon=require('mongoose')
var url="mongodb+srv://ashly:ashly@cluster0-nybb2.mongodb.net/library?retryWrites=true&w=majority"
//var url="mongodb://localhost/library"
var lib=require("../model/lib")
rt.use(bdy.urlencoded({extened:true}))
mon.connect(url,function(err){
if(err)throw err
else{
    console.log("database connected")
}
})


rt.get("/",function(req,res){
    lib.find({},function(err,result){
        if(err)throw err
        else{
            res.render('books',{nav:[{link:"/",Title:"Home"},{link:"/book",Title:"Book"},{link:"/",Title:"Log Out"}],Pagetitle:"Library",array_book:result}) 
        }
    })
  //  res.render('books',{nav:[{link:"/book",Title:"Book"},{link:'/author',Title:"Author"}],Pagetitle:"Library",array_book:book_array})
})
rt.get("/:id",function(req,res){
    var idi=req.params.id
    //console.log(titl)
    // console.log(book_array[id].title)
var qry={id:idi}
lib.findOne(qry,function(err,result){
    if(err)throw err
    else{

    console.log(result)
    res.render('readmr',
    {nav:[{link:"/",Title:"Home"},{link:"/book",Title:"Book"},{link:"/",Title:"Log Out"}],
    Pagetitle:"BOOKS",
    array_book:result}
    );
    }
})
  
})
rt.get("/delete/:id",function(req,res){
    var idi=req.params.id
    var qry={id:idi}
    lib.deleteOne(qry,function(err,obj){
        if(err)throw err
        else{
            res.redirect('/book')
        }
    })
})
rt.get("/edit/:id",function(req,res){
    var idi=req.params.id
    console.log(idi)
    var qry={id:idi}
    lib.findOne(qry,function(err,result){
        if(err)throw err
        else{
            res.render('updatebk',{nav:[{link:"/",Title:"Home"},{link:"/book",Title:"Book"},{link:"/",Title:"Log Out"}],
            Pagetitle:"BOOKS",array_book:result})
            
            console.log(result)
        }
    })
})
rt.post("/update/:id",function(req,res){
    var idi=req.params.id
    //var e2=new emp();
    console.log(idi)
    title=req.body.bk1
    
    author=req.body.bk2
    
    discription=req.body.bk3
    price=req.body.bk4
console.log(req.body.bk1)
console.log(req.body.bk2)
console.log(req.body.bk3)
console.log(req.body.bk4)
    var myquery = { id: idi };
  var newvalues = { $set: {title:title,author:author,discription:discription,price:price} };
  lib.updateOne(myquery, newvalues, function(err,result) {
    if (err) throw err;
   
   // db.close();
   else{
    console.log("1 document updated");
   // res.rendir('viewemp')
res.redirect('/book')
}
  
  });
})