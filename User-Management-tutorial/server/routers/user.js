const express = require('express');
const router=express.Router();
const userCOntroller=require('../controllers/userController')
router.get('/',userCOntroller.view);
router.post('/',userCOntroller.find);
router.post('/adduser',userCOntroller.create);
router.get('/adduser',userCOntroller.form);


router.get('/:id',userCOntroller.delete);
router.get('/edituser/:id',userCOntroller.edit)
router.post('/edituser/:id',userCOntroller.update)
// router.get('',(req,res) => {
//     res.render('home');
// });

module.exports=router;