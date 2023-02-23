const mongoose = require('mongoose');
const question = require('../models/question');




exports.Questions = async (
    req,
    res
  ) => {
      try{
        const questions=question.find((err,q)=>{
            if(q.length>0){
                return res.status(200).json({
                    success:true,
                    
                    q
                  });
            }
            else{
                return res.status(200).json({
                    success:false
                  });

            }

        }); 

        }
        
      
      catch(e){
        return res.status(500).json({
            e
          });
      }
  };


  exports.addQuestion = async (
    req,
    res
  )  => {
    try {
        const {label,r1,r2,r3,r4,correct_answer,time,image,points}=req.body;
        if(!label,!r1,!r2,!correct_answer,!time,!points){
          return res.status(200).json({ success:false  });
        }
        var q=new question();
        q.label=req.body.label;
        q.r1=req.body.r1;
        q.r2=req.body.r2;
        q.r3=req.body.r3;
        q.r4=req.body.r4;
        q.correct_answer=req.body.correct_answer;
        q.time=req.body.time;
        q.points=req.body.points;
        q.image=req.body.image;
try{
  if(q.label.length==0 || q.r1.length==0 || q.r2.length==0 ||q.correct_answer.length==0 || q.time==0 || q.points==0){
    return res.status(200).json({ success:false  });
  }
  else{
    q.save((err,docc)=>{ 
      if(!err){
        return res.status(200).json({ success:true  });
      }
      else{
        return res.status(200).json({ success:false  });
      }
      
    });
  }
 
}
 
          catch(e){
            console.log("Error while adding  :=======> ", err);
            return res.status(200).json({success:false , message: err.message });
          }
           

       
    
    
      } catch (err) {
        console.log( err);
        return res.status(500).json({
          message:  err,
        });
      }
    };

    exports.Question = async (
      req,
      res
    ) => {
        try{
          const id=req.params.id;
          const questions=question.find(
           {_id:id}  ,(err,q)=>{
              if(!err){
                  return res.status(200).json({
                      success:true,
                      
                      q
                    });
              }
              else{
                  return res.status(200).json({
                      success:false
                    });
  
              }
  
          }); 
  
          }
          
        
        catch(e){
          return res.status(500).json({
              e
            });
        }
    };


exports.editQuestion = async (req, res) => {
  try {
    await question.updateOne(
      { _id: req.body.id },
      {
        label:req.body.label,
        r1:req.body.r1,
        r2:req.body.r2,
        r3:req.body.r3,
        r4:req.body.r4,
        correct_answer:req.body.correct_answer,
        time:req.body.time,
        points:req.body.points,
      }
    );

    
    return res.status(200).json({ success:true });
  } catch (err) {

    res.status(200).json({ success:false  });
  }
};

exports.deleteQuestion = async (req, res) => {
  const id = req.params.id;

  

  try {
    const response = await question.deleteOne({ _id: id });
    

    return res.status(200).json({
      success:true
    });
  } catch (err) {
  
    return res.status(200).json({
     success:false    });
  }
};

exports.getQst = async (
  req,
  res
) => {

  try {
      const { id } = req.body;
      
    const questionD = await question.findOne({
      _id: req.params.id,
    })
    
    

    return res.status(200).json({
      success : true,
      
      questionD,
    });
  } catch (err) {

    res.status(500).json({
      message: `Error finding current user :=======> ${err.message} `,
    });
  }
};
  


