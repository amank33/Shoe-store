
class ProductAPIController {

    async createProduct(req,res){
        try{
            const {name, description, price, img, size, color,brand} = req.body;
            if (description.length < 20) {
                return res
                  .status(403)
                  .json({ message: "Description must be at least 20 characters long" });
              }
              if (price < 100) {
                return res
                  .status(403)
                  .json({ error: "Price must be equal to or greater than 100" });
              }
            
              if (!name.length) {
                //run on false
                return res.status(403).json({ error: "Please enter name" });
              }
            
            
            const productdata= new Product({
                name, description, price, img, size, color,brand
            })

           const data= await productdata.save();
        //    if(DOMMatrixReadOnly)

          return res.status(201).json({
            message:"product created successfully",
            priceLength:price.length,
            data:data
           })

        }catch(error){
            return res.status(400).json({
                message:error.message
            });
        }

    }
    async getProduct(req,res){
        try{
           const finaldata= await Product.find({ isDeleted: false });
          return res.status(201).json({
            message:"products fetch successfully",
            total:finaldata.length,
            data:finaldata
           })
        }catch(error){
            return res.status(400).json({
                message:error.message
            });
        }

    }

    async updateProduct(req,res){
        try{
            const {name, description, price, img, size, color,brand,isDeleted} = req.body;
            
            // const id=req.query.id;
            if (description.length < 20) {
                return res
                  .status(403)
                  .json({ message: "Description must be at least 20 characters long" });
              }
              if (price < 100) {
                return res
                  .status(403)
                  .json({ error: "Price must be equal to or greater than 100" });
              }
            
              if (!name.length) {
                //run on false
                return res.status(403).json({ error: "Please enter name" });
              }
            const updatefields={};
            if(name) updatefields["name"]=name;
            if(description) updatefields["description"]=description;
            if(price) updatefields["price"]=price;
            if(img) updatefields["img"]=img;
            if(size) updatefields["size"]=size;
            if(color) updatefields["color"]=color;
            if(brand) updatefields["brand"]=brand;
            if(isDeleted==true||isDeleted==false) updatefields["isDeleted"]=isDeleted;

            const updatedProduct=await Product.findByIdAndUpdate(
                req.params.id,
                {$set:updatefields},
                {new:true}

            )
            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(201).json({
                message:"product updated successfully",
                isDeleted:isDeleted,
                updatefields:updatefields,
                data:updatedProduct
            })
            
        }catch(error){
            return res.status(400).json({
                message:error.message,
            });
        }

    }

    async deleteProduct(req,res){
    
        try{
            const deletedProduct =await Product.findByIdAndDelete(req.params.id)
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(201).json({
                message:"Product deleted successfully",
                data:deletedProduct
            })
        }
        catch(error){
            return res.status(400).json({
                message:error.message,
                id:req.params.id
            });
        }
    }
    async softdeleteProduct(req,res){
    
        try{
            const isDeleted={ isDeleted:true};
            const deletedProduct =await Product.findByIdAndUpdate(req.params.id,isDeleted,{new:true});
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found to delete" });
            }
            return res.status(201).json({
                message:"Product deleted successfully",
                data:deletedProduct
            })
        }
        catch(error){
            return res.status(400).json({
                message:error.message,
                id:req.params.id
            });
        }
    }

    async getFilteredProductANDfilter(req, res){
        try{
            const {brand,size,color}=req.query;
           

            // let filter={
            //   brand: req.query.brand?.includes(",") ? { $in: brand.split(",") } : brand,
            //  // size:{ $in: size.split(",") }
            //   size: req.query.size? { $in: size.split(",") }:[],
            //   // size: req.query.size ? req.query.size.split(',') : [],
            // //   color: req.query.color? req.query.color.split(',') : [],
            // isDeleted: false,
            // };

            let filter = { isDeleted: false }; 
            
            if (brand) {
              filter.brand = brand.includes(",") ? { $in: brand.split(",") } : brand;
            }
        
            if (size) {
              filter.size = { $in: size.split(",") };
            }
            
            if (color) {
              filter.color = { $in: color.split(",") };
            }
            const finaldata= await Product.find(filter);
          return res.status(201).json({
            // filter:filter,
            message:"products filtered AND successfully",
             total:finaldata.length,
             data:finaldata
           })
        }catch(error){
            return res.status(400).json({
                // filter:filter,
                message:error.message
            });
        }
    }

    async getFilteredProductORfilter(req, res){
        try{
            const {brand,size,color}=req.query;

            let filter={isDeleted:false};
            let orArray=[];

            if(brand){
                let b=brand.includes(',')?{$in: brand.split(',')}:brand;
                orArray.push({brand:b})
            }
            if(size){
                let s={$in:size.split(',')}
                orArray.push({size:s})
            }
            if(color){
                let c={$in:color.split(',')}
                orArray.push({color:c})
            }

            if(orArray.length>0){
                filter["$or"]=orArray;
            }
            const finaldata= await Product.find(filter);
            return res.status(201).json({
                // filter:filter,
                message:"products filtered OR successfully",
                 total:finaldata.length,
                 data:finaldata
               })

        }catch(error){
            return res.status(400).json({
                message:error.message
            });
    
    }
}
}


module.exports=new ProductAPIController();