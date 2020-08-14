const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto")
const nodemailer = require("nodemailer")

const Contestent = require("../models/contestant");
const Question = require("../models/question");
const Admin = require("../models/admin");

console.log(process.env.EMAIL_PASS)
let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASS
    },
  });

router.post('/contestants', (req, res, next)=>{
    
    if (req.body.contestants && req.body.contestants[0]){
        Question.find()
        .exec()
        .then(result=>{
            let QIds = result.map(question=>{ return question._id})
            req.body.contestants.forEach((element, index) => {
                let contestant = new Contestent({
                    _id: mongoose.Types.ObjectId(),
                    username: element.username,
                    email: element.email,
                    age: element.age,
                    region: element.region,
                    code: crypto.randomBytes(1).toString('hex') + crypto.randomBytes(1).toString('hex') + crypto.randomBytes(1).toString('hex') + crypto.randomBytes(1).toString('hex') ,
                    _score:[],
                    _QuestsQ: QIds,
                    _QuestsR:[]
                    
                })
                contestant
                .save()
                .then(data =>{
                    transporter.sendMail({
                        from: process.env.EMAIL, 
                        to: data.email, 
                        subject: "Iot4Tunisia bootcamp preselection", 
                        html: `
<html>
                        
<pre>
<p style="font-weight: bold;line-height: 40px;font-size: 22px;">Dear applicant,</p>
Congratulations on succeeding in the phone 
interviews step after being preselected from
more than 2700 applicants. 
                      
And now you have to finish the quiz as
the final step in our selection process.
                      
You can access The quiz session on 
our website quiz.iot4tunisia.com using 
this code : {{code}}.
Or using <a target="blank" style="font-weight: bolder;" href='http://192.168.1.198:5000/#/home?code={{code}}'>this link</a>.
                      
<p style="color: red; font-weight: bolder;">**Important: you have to check <a target="blank" href='https://www.youtube.com/watch?v=LabPo4kvweY&feature=emb_title'>this video</a> In order to Understand the quiz rules</p>
<p style="font-weight: bold;line-height: 40px;font-size: 22px;">Good luck.</p>
<p style="font-weight: bold;line-height: 20px;font-size: 18px; margin-bottom: 0;">MentorNations</p>
+216 55 423 702
contact@mentornations.org
</pre>
</html>`.replace('{{code}}',data.code).replace('{{code}}',data.code)
                      },function(error, info){
                        if(error){
                            console.log(error);
                        }
                        console.log(info);
                    });
                    if (index == req.body.contestants.length - 1){
                        
                        res.status(200).json({
                            message:"data saved"
                        })
                    }
                })
                .catch((error) => {
                    res.status(500).json(error);
                  });
            });
            
        })
        .catch((error) => {
            res.status(500).json(error);
        });
    } else {
        res.status(500).json({
            message:"you mast pass at least 1 element to body"
        })
    }

})


router.post('/questions', (req, res, next)=>{
    
    if (req.body.questions && req.body.questions[0]){
        req.body.questions.forEach((element, index) => {
            let question = new Question({
                _id: mongoose.Types.ObjectId(),
                statment: element.question,
                timing: element.duration,
                Answers: element.answers.map(answer=>{
                    return {
                        _id:  mongoose.Types.ObjectId(),
                        statment: answer ,
                        valid: answer == element.rightAnswer
                    }
                })
            
            })
            
            question
            .save()
            .then(data =>{
                if (index == req.body.questions.length - 1){
                    
                    res.status(200).json({
                        message:"data saved"
                    })
                }
            })
            .catch((error) => {
                
                res.status(500).json(error);
              });
        });
    } else {
        res.status(500).json({
            message:"you mast pass at least 1 element to body"
        })
    }

})


router.post('/admin', (req, res, next)=>{
    
    if (req.body.admins && req.body.admins[0]){
        req.body.admins.forEach((element, index) => {
            let admin = new Admin({
                _id: mongoose.Types.ObjectId(),
                username: element.username,
                pass : crypto.createCipheriv("aes-256-gcm",process.env.CRYPTO_KEY,process.env.CRYPTO_IV).update(element.pass,"utf-8","hex")
            })
            admin
            .save()
            .then(data =>{
                if (index == req.body.questions.length - 1){
                    
                    res.status(200).json({
                        message:"data saved"
                    })
                }
            })
            .catch((error) => {
                
                res.status(500).json(error);
              });
        });
    } else {
        res.status(500).json({
            message:"you mast pass at least 1 element to body"
        })
    }

})

router.get('/contestants', (req,res,next)=>{
    Contestent
    .find()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch((error) => {
        
        res.status(500).json(error);
      });
})


module.exports = router;