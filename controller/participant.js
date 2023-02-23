const mongoose = require('mongoose');
const User = require("../models/participant");
var jwt=require('jsonwebtoken');
const { ObjectId } = require("mongodb");

exports.loginParticipant = async (
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
                    result ,
                    token
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


  exports.signup= async (
    req,
    res
  ) => {
    try{
        var user=new User();
    
        user.username=req.body.username;
        user.password=req.body.password;
        user.score=0;
      
        user.save((err,docc)=>{
            if(!err){
                return res.status(200).json({success:true });
            }else{
                console.log("Error while adding  :=======> ", err);
                return res.status(500).json({ message: err.message });
            }
        })
    }
    catch(e){
        console.log("Error while adding  :=======> ", e);
        return res.status(500).json({ message: e.message });

    }

 

 
};

exports.getUser = async (
    req,
    res
  ) => {
  
    try {
        const { id } = req.params;
      const user = await User.findById({
        _id: id,
      })
  
  
  console.log(user);
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
  
      res.status(200).json({
        success: false,
      });
    }
  };

  exports.getUserSorted = async (
    req,
    res
  ) => {
  
    try {
      var mysort = { score: -1 };
       const users = await User.find().sort(mysort);
     
       return res.status(200).json({
        success:true,
        users
      });
  
  

      
    } catch (err) {
  
      res.status(500).json({
        message: `Error finding current user :=======> ${err.message} `,
      });
    }
  };

  exports.editUser = async (req, res) => {
    try {
      const user =await User.updateOne(
        { _id: req.body.id },
        {
         username:req.body.username,
         password:req.body.password,
         score:req.body.score
        }
      );
  
      
      return res.status(200).json({ success:true ,user});
    } catch (err) {
  
      res.status(200).json({ success:false  });
    }
  };

  exports.addQst = async (
    req,
    res
  ) => {
  
    try {
        const  id  = req.body.id;
        const  idQ  = req.body.idQ;
        const statut = false;
        

       



      const user =  await User.updateOne(
          { _id: id },
          { $push: { questions: {
            _id:idQ,
            statut:statut,
            etat:'en_cours'
          },
           
        }  }
        
       )

       console.log(user)
  
  
  
      return res.status(200).json({
        
        success: true,
        user,
      });
    } catch (err) {
  
      res.status(500).json({
        message: `Error finding current user :=======> ${err.message} `,
      });
    }
  };

  exports.submitQst = async (
    req,
    res
  ) => {
  
    try {
        const  id  = req.body.id;
        const  idQ  = req.body.idQ;
        const statut = req.body.statut;
        const points = req.body.points;

       
//


      const user =  await User.updateOne(
          { _id: id },
          {
            $set: {
              "questions.$[elem].statut": statut,
              "questions.$[elem].etat": 'terminer',
              
            },$inc: { score : points }
          },
          { arrayFilters: [{ "elem._id": ObjectId(idQ) }] }
        
       )

     
  
  
  
      return res.status(200).json({

        success: true,
        user,
      });
    } catch (err) {
  
      res.status(500).json({
        success:false,
        message: `Error finding current user :=======> ${err.message} `,
      });
    }
  };


  exports.checkQst = async (
    req,
    res
  ) => {
  
    try {
        const  id  = req.body.id;
        const  idQ  = req.body.idQ;
       

       
//


      const user =  await User.find(
        {
          $and: [
              {'_id': id},
              {'questions._id': idQ}
          ],
      }
     )

    
     

       
  
  
      if(user.length>0){

        var qsts=user[0].questions;
    

        var index = qsts.findIndex(obj => obj._id==idQ);
        return res.status(200).json({

          success: true,
          user,
          check: user[0].questions[index].statut,
        });
  
      }else{

        return res.status(200).json({

          success: false,
          
        });
      }
     

    } catch (err) {
  
      res.status(500).json({
        message: `Error finding current user :=======> ${err.message} `,
      });
    }
  };

  exports.checkEtat = async (
    req,
    res
  ) => {
  
    try {
        const  id  = req.body.id;
        const  idQ  = req.body.idQ;
       

       
//


      const user =  await User.find(
        {
          $and: [
              {'_id': id},
              {'questions._id': idQ}
          ],
      }
     )

    
     

       
  
  
      if(user.length>0){

        var qsts=user[0].questions;
    

        var index = qsts.findIndex(obj => obj._id==idQ);
        return res.status(200).json({

          success: true,
          user,
          check: user[0].questions[index].etat,
        });
  
      }else{

        return res.status(200).json({

          success: false,
          
        });
      }
     

    } catch (err) {
  
      res.status(500).json({
        message: `Error finding current user :=======> ${err.message} `,
      });
    }
  };


  exports.getUserByUsername = async (
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



