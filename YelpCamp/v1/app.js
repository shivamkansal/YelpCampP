
var express=require("express");
var app = express();

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended : true}))
 
app.set("view engine", "ejs");

 var campgrounds=[
   {name: "shivam kansal", image: "https://media.istockphoto.com/photos/golden-sunrise-illuminating-tent-camping-dramatic-mountain-landscape-picture-id526564828?k=6&m=526564828&s=612x612&w=0&h=dGJ7atG6qx7zMs0JNLCLcxQ5SAnWbQDlw5wFljirYLM="},
   {name: "manav garg", image: "https://www.michigan.org/sites/default/files/styles/15_6_desktop/public/camping-hero_0_0.jpg?itok=mgGs0-vw&timestamp=1520373602"},
   {name: "ujjwal shah", image: "https://cdn.muenchen-p.de/.imaging/stk/responsive/image980/dms/lhm/tourismus/camping-l/document/camping-l.jpg"},
   {name: "mayank tandon", image: "https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
   {name: "karan malhotra", image: "https://www.treebo.com/blog/wp-content/uploads/2018/04/Night-Camping-in-Bangalore-.jpg"},
   {name: "vibhu sehra", image: "https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg "}
   ] ;
   
app.get("/",function(req,res){
   res.render("landing")
});
app.get("/campgrounds",function(req,res){
   res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;   
    var newCampground={name: name, image:image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
   res.render("new.ejs"); 
});
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("the YElpCamp server has started!"); 
});