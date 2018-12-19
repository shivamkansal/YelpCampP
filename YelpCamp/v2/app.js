var express=require("express"),
    app = express(),
    mongoose=require("mongoose"),
    bodyParser=require("body-parser");
    
//mongoose.Promise=global.Promise;

mongoose.connect("mongodb://localhost:27017/yelp_campp", {useNewUrlParser: true});


app.use(bodyParser.urlencoded({extended : true}));
 
app.set("view engine", "ejs");

//Schema setup
var campgroundSchema=new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

/*Campground.create(
    {
        name: "shivam kansal", 
        image: "https://cdn.muenchen-p.de/.imaging/stk/responsive/image980/dms/lhm/tourismus/camping-l/document/camping-l.jpg",
        description: "He is a smart boy"
    },function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            console.log(campground);
        }
    });*/
    
app.get("/",function(req,res){
   res.render("landing");
});
app.get("/campgrounds",function(req,res){
    Campground.find({},function(err, allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
             res.render("index",{campgrounds:allcampgrounds});
        }
    });
  
});

app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;   
    var newCampground={name: name, image:image,description: desc};
  Campground.create(newCampground,function(err, allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
              res.redirect("/campgrounds");
        }
});
});
app.get("/campgrounds/new",function(req,res){
   res.render("new.ejs"); 
});

app.get("/campgrounds/:id", function(req,res){
      Campground.findById(req.params.id , function(err,foundCampgrounds){
         if(err){
             console.log(err);
         } else{
             res.render("show",{campground: foundCampgrounds});
         } 
         
      });
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("the YElpCamp server has started!"); 
});
