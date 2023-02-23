const mongoose = require('mongoose');
const User = require("../models/admin");
var jwt=require('jsonwebtoken');


exports.loginAdmin = async (
    req,
    res
  ) => {
      try{
        
        const username =req.body.username;
        const password=req.body.password;

        if (!(username || password)) {
          
            return res.status(400).send("All input is required");
          }
        
          User.findOne({ username:username , password:password }, (err,result)=>{
            if(result!=null){
              
                const token = jwt.sign(
                    { user_id: result._id},
                    'auth',
                   
                  );
                res.json({
                    success:true,
                    user:{result,token}
                })
            }else{
                res.json({
                    success:false
                })
            }
        })
       
       
      
      }  
      catch (err) {
       return  res.json({
        success:false ,
        msg:err

    })
      }
   
  };


 

exports.getUser = async (
    req,
    res
  ) => {
  
    try {
      console.log("hereuser");
        const { id } = req.body;
      const user = await User.findOne({
        _id: id,
      })
  
  
  
      return res.status(200).json({
        message: `Got current user successfully!`,
        user,
      });
    } catch (err) {
  
      res.status(500).json({
        message: `Error finding current user :=======> ${err.message} `,
      });
    }
  };

  exports.addAdmin = async (req, res) => {
    try {
      const {  password, username } = req.body;
  
   

   
  
      try {
        const admin = await User.create({
         
      
          username,
       password
        });
  
        
        return res.status(200).json({ success: true , admin });
      } catch (err) {
        console.log("Error while adding student :=======> ", err);
        return res.status(500).json({ message: err.message });
      }
    } catch (err) {
      console.log("Error while creating student :=======> ", err);
      return res.status(500).send({ message: `${err.code} - ${err.message}` });
    }
  };

  exports.userbyemail = async (
    req,
    res
  ) => {
 
    try {
 
      const username  = req.body.username;
      const user = await User.findOne({
        username: username,
      })
  
  
  
      return res.status(200).json({
        success:true,
        user,
      });
    } catch (err) {
  
      res.status(500).json({
        message: `Error finding current user :=======> ${err.message} `,
      });
    }
  };

  exports.editAdmin = async (req, res) => {
    try {
      const user =await User.updateOne(
        { _id: req.body.id },
        {
         username:req.body.username,
         password:req.body.password
        }
      );
  
      
      return res.status(200).json({ success:true ,user});
    } catch (err) {
  
      res.status(200).json({ success:false  });
    }
  };


