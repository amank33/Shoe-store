const express=require('express');
const router=express.Router();
const StudentController=require('../controller/StudentController');

router.get('/student/list',StudentController.getAllStudents)
router.get('/student/list/discarded',StudentController.getAllDiscardedStudents)
router.get('/student/edit/:id',StudentController.fetchtoeditStudents)
router.post('/student/update/:id',StudentController.updateStudent)
router.get('/student/delete/:id',StudentController.deletestudent)
router.get('/student/softdelete/:id',StudentController.softdeletestudent)
router.get('/student/softdeleteRevert/:id',StudentController.softdeleteRevert)
router.post('/student/add',StudentController.addStudent)
router.get('/student/add',StudentController.addStudentView)


module.exports=router;