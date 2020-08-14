const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Contestent = require("../models/contestant");
const Question = require("../models/question");

const checkauth = require("../middlewares/checkauth")

router.patch("/answer", checkauth, (req, res, next) => {
  
  Contestent.findByIdAndUpdate(req.userData.userId, {
    $pull: { _QuestsQ: req.body.questionId },
    $push: { _QuestsR: req.body.questionId },
  })
    .populate("_QuestsQ")
    .exec()
    .then((contestant) => {
      let question = contestant._QuestsQ.find((lquestion) => {
        return (lquestion._id == req.body.questionId); 
      });
      let answer = question.Answers.find((lquestion) => {
        return (lquestion._id == req.body.answerId); 
      });
      
      Contestent.findByIdAndUpdate(req.userData.userId, {
        $push: { _score: answer.valid },
      })
        .exec()
        .then((contestant) => {
          res.status(201).json({
            answer : question.Answers.find((lquestion) => {
              return lquestion.valid  
            }),
            message: "Answer Saved",
          });
        })
        .catch((error) => {
          
          res.status(500).json(error);
        });
    })
    .catch((error) => {
      
      res.status(500).json(error);
    });
});

router.patch("/skip", checkauth,(req, res, next) => {
  Contestent.findById(req.userData.userId)
    .exec()
    .then((contestant) => {

      if (contestant._skips > 0) {
        Contestent.findByIdAndUpdate(
          req.userData.userId,
          {
            $pull: { _QuestsQ: req.body.questionId  },
            $push: { _QuestsR: req.body.questionId, _score: false  },
            $inc: { _skips: -1 },
          },
          {
            new:true
          }
        )
        .populate("_QuestsR")
          .exec()
          
          .then((contestant) => {
            
            let question = contestant._QuestsR.find((lquestion) => {
              return (lquestion._id == req.body.questionId); 
            });
            res.status(201).json({
              message: "You have " + contestant._skips + " left",
              skips: contestant._skips,
              answer : question.Answers.find((lquestion) => {
                return lquestion.valid  
              }),
            });
          })
          .catch((error) => {
            
            res.status(500).json(error);
          });
      } else {
        res.status(500).json({
          message: "You only have 3 Skips",
        });
      }
    })
    .catch((error) => {
      
      res.status(500).json(error);
    });
});

router.patch("/cheat", checkauth,(req, res, next) => {
  Contestent.findById(req.userData.userId)
    .exec()
    .then((contestant) => {

      if (contestant._cheats > 0) {
        Contestent.findByIdAndUpdate(
          req.userData.userId,
          { $inc: { _cheats: -1 } })
          .exec()
          .then((contestant) => {
            res.status(200).json({
              message: "This is a cheating warning",
              cheats: contestant._cheats
            })
          })
          .catch((error) => {
            
            res.status(500).json(error);
          });

      } else {
        Contestent.findByIdAndUpdate(
          req.userData.userId,
          { $set: { _state: "BAN" } })
          .exec()
          .then((contestant) => {
            res.status(201).json({
              message: "You have been banned for cheating"
            })
          })
          .catch((error) => {
            
            res.status(500).json(error);
          });
      }
    })
    .catch((error) => {
      
      res.status(500).json(error);
    });
});

router.get("/question",checkauth , (req, res, next) => {
  console.log("contestant")
  Contestent.findById(req.userData.userId)
    .populate("_QuestsQ")
    .exec()
    .then((contestant) => {
        if (contestant._score.length == 10) {
            res.status(200).json({
                message: "No more questions"
            });
        } else {
            let rand = Math.floor(Math.random() * contestant._QuestsQ.length);
            res.status(200).json({
              message: "this Is Your Question",
              index: contestant._QuestsR.length + 1,
              question: {
                _id: contestant._QuestsQ[rand]._id,
                statment: contestant._QuestsQ[rand].statment,
                Answers: contestant._QuestsQ[rand].Answers.map((answer) => {
                  return {
                    _id: answer._id,
                    statment: answer.statment,
                  };
                }),
                timing: contestant._QuestsQ[rand].timing
              },
            });
        }
    })
    .catch((error) => {
        
      res.status(500).json(error);
    });
});



module.exports = router;
