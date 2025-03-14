const express=require('express');
const router=express.Router();


const ShoeController=require('../controller/ShoeController')

router.get('/',ShoeController.home);
router.get('/shoes/:id',ShoeController.shoeDetails);
router.post('/shoes/:id/update',ShoeController.updateShoe);

module.exports=router;
