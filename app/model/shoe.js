const mongoose=require('mongoose');
 

const shoeSchema=new mongoose.Schema({
   
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        // minlength: [20, "Description should be more than 20 characters"],
        required:true
    },
    price:{
        type:Number,      
        // minlength: [3, "Price should contain a number more than 100"],
    },
    brand: { 
        type: String, 
        required: true
     },
    sizes: { 
        type: [Number], 
        default: [] 
    },
    colors: { 
        type: [String], 
        default: [] 
    }, 
    images: { 
        type: [String], 
        //  default: "'https://example.com/cute-pusheen.jpg'" 
    },
   
    
     rating:{
        type:Number,
        // min:1,
        // max:5,
        default:0,
     },
     
     isDeleted:{
        type:Boolean,
        default:false
     }
    
    
      
},{
    timestamps:true
})


const shoeModel= mongoose.model('Shoe',shoeSchema);

module.exports=shoeModel;