const express=require('express');
const router=express.Router();
const ShoeAdminPanelController=require('../controller/ShoeAdminPanelController');
const imageUpload=require('../helper/imageUpload');

router.get('/shoe/list', ShoeAdminPanelController.getAllShoes)
router.get('/shoe/list/discarded', ShoeAdminPanelController.getAllDiscardedShoes)
router.get('/shoe/edit/:id', ShoeAdminPanelController.fetchtoeditShoes)
router.post('/shoe/update/:id',imageUpload.array('images',10), ShoeAdminPanelController.updateShoe)
router.get('/shoe/delete/:id', ShoeAdminPanelController.deleteshoe)
router.get('/shoe/softdelete/:id', ShoeAdminPanelController.softdeleteshoe)
router.get('/shoe/softdeleteRevert/:id',ShoeAdminPanelController.softdeleteRevert)
router.post('/shoe/add',imageUpload.array('images',10), ShoeAdminPanelController.addShoe)
router.get('/shoe/add', ShoeAdminPanelController.addShoeView)


module.exports=router;