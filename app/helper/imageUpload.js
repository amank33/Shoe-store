const multer=require('multer')
const path = require('path');
const fs = require('fs');


const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};
// const storage1 = multer.memoryStorage(); // Store files in memory (Buffer)
// const upload = multer({ storage1 }).array("files", 50);

const storage=multer.diskStorage({
    destination:function(req,file,cb){
       const isValid=FILE_TYPE_MAP[file.mimetype];
       let uploadError=new Error('invalid image type');
       if(isValid){
           uploadError=null;
       }
       cb(uploadError,'uploads')
    },
    filename:function(req,file,cb){
        const fileName=file.originalname.split(' ').join('-');
        const extension=FILE_TYPE_MAP[file.mimetype];
        cb(null,`${file.originalname}`)
    }
})
// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         const isValid=FILE_TYPE_MAP[file.mimetype];
//         let uploadError=new Error('invalid image type');
//         if(isValid){
//             uploadError=null;
//         }
//         cb(uploadError,'uploads')
//      },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

const studentImageUpload = multer({ storage: storage });

module.exports = studentImageUpload;