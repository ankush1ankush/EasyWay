const express = require('express');
require('dotenv').config();
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session=require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const findOrCreate = require('mongoose-findorcreate');
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json


app.use(session({
    secret: 'I have many secret',
    resave: false,
    saveUninitialized: false,
    
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
	cors({
		origin: `${process.env.BASE_URL}`,
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
    );
 

main().catch(err=>console.log(err));


async function main()
{

   //const uri = "mongodb://127.0.0.1:27017/TestDb";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const uri="mongodb+srv://apoorvpaul1:zN4zfEhDSU3S0I5C@cluster0.8nxeymd.mongodb.net/?retryWrites=true&w=majority"
    await mongoose.connect(uri,{useNewUrlParser:true});
    const userNote= new mongoose.Schema({
        title: String,
        content: String,
    })
    const userDocument = new mongoose.Schema({
          file_name:{
              type:String,
              require:true,

          },

          file_type:{
                type:String,
                required:true,
          },
          download_link:{
            
            type:String,
            require:true
          }
    })
    const userSchema =new mongoose.Schema(
        {
            username:String,
            email:String,
            password:String,
            notes:[userNote],
            Document:[userDocument]
            
        }

    )

    userSchema.plugin(passportLocalMongoose); 
    userSchema.plugin(findOrCreate );

    const User =new mongoose.model('TestData',userSchema)
    
    passport.use(User.createStrategy());

    passport.serializeUser(function(user, cb) {  // responsible to make the cookies
        process.nextTick(function() {
          return cb(null, {id:user._id} ); 
        });
      });
    

    passport.deserializeUser(function(user, cb) {  // cookies which are send with the res.redirect or with direct req is deserielize
        process.nextTick(function() {
          return cb(null, user);
        });
    });
      
    passport.use( new GoogleStrategy({     // step 2) client id clientSecret and callbackURL is send with the authencation request
        clientID: process.env.CLIENT_ID,                                  
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback"    
      },
      function(accessToken, refreshToken, profile, cb) {  // is triggered after authentication is done from the google and renponse is send to  "/auth/google/secrets" by google
        
        
        User.findOrCreate({ username: profile.displayName,email: profile.emails[0].value}, function (err, user) {
            return cb(err, user);
          });
        }
    ));
      


    
    app.get("/auth/login/success", async (req, res) => {
       
         
        if (req.isAuthenticated()) {
            
            const client= await User.find({_id:req.user.id});
            
            res.status(200).json({
                error: false,
                message: "Successfully Loged In",
                user:client[0]
            })
        } else {
            res.status(200).json({ error: true, message: "Not Authorized" });
        }
    });
   
    
    app.get('/auth/google/signup',passport.authenticate('google', { scope: ['profile','email']}/* what ever information of user we want is send in scope */)); // step 1 )  starting the authentication (req.isAuthenticated() is false) so req for authentication is send to the google
  
  
    app.get("/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login",
	})
    )
   
   
   


    app.post("/submit/addNote", async (req,res)=>{
        const id=req.body.clientId;
       // console.log(req.body)
        //console.log(id);
        const clientTitle=req.body.title;
        const clientnote=req.body.content;
        //console.log(clientTitle)
       // console.log(clientnote)
      
        const clientdata=  {
            title:clientTitle,
            content:clientnote
        }

      //  var client=await User.find({_id:id});

        if(req.isAuthenticated())
        {
              await User.findOneAndUpdate({_id:id},{$push:
                {
                notes:clientdata
                 }
              }
              )
              const client=await User.find({_id:id});
              res.json({notes:client[0].notes});
        }
        else{
            res.json({client:"not found"});
        }
    })

   app.post("/submit/deleteNote", async (req,res)=>{
       
    if(req.isAuthenticated())
    {
          await User.findOneAndUpdate({_id:req.body.client_id},{$pull:
            {
            notes:{_id:req.body.Note_id}
             }
          }
          )
          const client=await User.find({_id:req.body.client_id});
          res.json({notes:client[0].notes});
    }
    else{
        res.json({client:"not found"});
    } 
   })

   app.post("/submit/addFile", async (req,res)=>{
       
    const {client_id, download_link, file_name, file_type } = req.body;
    // console.log(clientnote)
    
    
    //  var client=await User.find({_id:id});
    
    if(req.isAuthenticated())
    {
         console.log(download_link, file_name, file_type )
           await User.findOneAndUpdate({_id:client_id},{$push:
             {
                Document:{file_name, file_type, download_link}
              }
           }
           )
           const client=await User.find({_id:client_id});
           res.json({documents:client[0]?.Document});
     }
     else{
         res.json({client:"not found"});
     }
   })

   app.post("/submit/getAllFiles", async (req,res)=>{
       
    const {client_id } = req.body;
    // console.log(clientnote)
    
    
    //  var client=await User.find({_id:id});
    
    if(req.isAuthenticated())
    {
        const client=await User.find({_id:client_id});
        res.json({documents:client[0]?.Document});
     }
     else{
         res.json({client:"not found"});
     }
   })

app.post("/submit/register",async (req,res)=>{
    //console.log(req.body);
    const user= await User.find({email:req.body.email});
    //console.log(user);
    if(user[0])
    { 
        console.log("hello1")
        res.status(404).json({message:"Email already used"})
    }
    else{
       await  User.register({email:req.body.email,username:req.body.username},req.body.password,  async function(err,user){
            if(err)
            {
               
                res.status(404).json({message:err.message})
            }
            

                
                    
                   /* res.status(200).json({message:"user register success"});*/
            
                   const client= await User.find({email:req.body.email});
                   await passport.authenticate("local")(req,res,function(){if(req.isAuthenticated()){res.status(200).json({myclient:client[0]});}});
           });
           
    }
    

})

app.get("/auth/logout",function(req,res)
{
 req.logout(function(err)
 {
    if(err)
    {
        return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
 });

})

app.post("/auth/submit/login", async(req,res)=>{

      try{

         const client= await User.find({username:req.body.username});
                    //console.log(client);
         if(client){
                    
                await passport.authenticate("local")(req,res,function(){
                    if(req.isAuthenticated()){
                    res.status(200).json({myclient:client[0]});
                    }
                    else{
                        res.status(200).json({message:"invalid credentials"})
                    }
                    }
                    
                    )

            }
            else{
                res.status(404).json({message:"invalid credentials"})
            }
        }
        catch(err)
        {
          res.status(404).json({message:err.message})
        }
                
    
})
    app.listen(port,()=>{
        console.log(`example app Listening on port ${port}`);
    })
}


