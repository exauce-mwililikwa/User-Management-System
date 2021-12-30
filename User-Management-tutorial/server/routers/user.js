const express = require('express');
const router=express.Router();
const userCOntroller=require('../controllers/userController')
router.get('/',userCOntroller.view);

// router.get('',(req,res) => {
//     res.render('home');
// });

module.exports=router;