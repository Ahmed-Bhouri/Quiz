const express = require("express");
const router = express.Router();

const AuthRoutes = require('./routes/auth'); 
router.use('/auth', AuthRoutes);

const AdminRoutes = require('./routes/admin'); 
router.use('/admin', AdminRoutes);

const QuizRoutes = require('./routes/quiz'); 
router.use('/quiz', QuizRoutes);

module.exports = router;