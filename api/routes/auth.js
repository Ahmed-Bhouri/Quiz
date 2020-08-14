const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto")

const jwt = require("jsonwebtoken");

const Contestent = require("../models/contestant");
const Question = require("../models/question");

const Admin = require("../models/admin");

router.post("/login", (req, res, next) => {
  Contestent.findOne({ code: req.body.code })
    .then((result) => {
      if (result) {
        if (result._state == "nosub") {
          Contestent.findByIdAndUpdate(
            result._id,
            { $set: { _state: "done" } },
            { new: true }
          )
            .then((contestant) => {
              const token = jwt.sign(
                {
                  userId: contestant._id,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "30s",
                }
              );
              res.status(200).json({
                message: 'User Logged In sucessfully',
                token: token,
                contestant:contestant
              });
            })
            .catch((error) => {
              
              res.status(500).json(error);
            });
        } else {
          res.status(401).json({
            message: "you have alredy passed the test",
          });
        }
      } else {
        res.status(401).json({
          message: "Please verify your code",
        });
      }
    })
    .catch((error) => {
      
      res.status(500).json(error);
    });
});

router.post("/logadmin", (req, res, next) => {
    Admin.findOne({ username: req.body.username })
      .then((data) => {
        if (data) {
            let userPass = crypto.createDecipheriv("aes-256-gcm",process.env.CRYPTO_KEY,process.env.CRYPTO_IV).update(data.pass,"hex","utf-8")
            if (userPass == req.body.pass){
                const token = jwt.sign(
                    {
                      userId: req.body.username,
                    },
                    process.env.JWT_ADMIN_KEY,
                    {
                      expiresIn: "3h",
                    }
                  );
                  res.status(200).json({
                    token: token,
                  });
            } else {
                res.status(401).json({
                    message: "Verify your Data",
                  });
            }
        } else {
          res.status(401).json({
            message: "Verify your Data",
          });
        }
      })
      .catch((error) => {
        
        res.status(500).json(error);
      });
  });


let iv = Buffer('A6p9wWeXqCtIktzHl0cBG3igcbWhwSE7');
let key = 'A6p9wWeXqCtIktzHl0cBG3igcbWhwSE7'
 // require("crypto").createCipheriv("aes-256-gcm",key,iv).update('name',"utf-8","hex")
 // require("crypto").createDecipheriv("aes-256-gcm",key,iv).update(user.password,"hex","utf-8")
module.exports = router;
