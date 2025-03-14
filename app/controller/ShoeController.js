const Shoe = require('../model/shoe');
class HomeController{

    async home(req, res){
        try{
            //console.log(req.query);
            const {page=1,brand,size,minPrice,maxPrice,rating,search}=req.query;
            const limit=6;
            const skip=(page-1)*limit;

            let filter={};
            if(brand) filter.brand=brand;
            if(size) filter.sizes=size;
            if(minPrice||maxPrice) filter.price={$gte:minPrice||0,$lte:maxPrice||10000};
            if(rating) filter.rating={$gte:rating};
            if(search) filter.title=new RegExp(search,'i');

            const shoes=await Shoe.find(filter).skip(skip).limit(limit);
            // console.log(shoes);
            const total=await Shoe.countDocuments(filter);
            
            const dataObj={
                shoes,
                currentPage: Number(page),
                totalPages: Math.ceil(total/limit),
                search: search||"",
                brand: brand || "", 
                 minPrice: minPrice || "", 
                maxPrice: maxPrice || "", 
                rating: rating || ""
            }

            if(total>0){
                res.render('shoesHome',dataObj);
            }else{
                res.render('shoesHome',{message:'No shoes found'});
            }



        }catch(error){
            console.log(error);
        }
    }

    async shoeDetails(req, res){
        try{
            //console.log(req.params.id);
            const shoe = await Shoe.findById(req.params.id);
            //console.log(shoe);
            shoe?res.render('shoeDetails', { shoe }):res.redirect('/');

        }catch(error){
            console.log(error);
            res.redirect('/');
        }
    }

    async updateShoe(req, res){
        try{
            const { title, description, price, brand, sizes, colors, rating, ratingDropdown } = req.body;
            //console.log(req.params.id);
            const id=req.params.id;
            //console.log(rating);
            const updatefields={};
            
            // if(title) updatefields["name"]=title;
            // if(description) updatefields["description"]=description;
            // if(price) updatefields["price"]=price;
            // if(brand) updatefields["img"]=brand;
            // if(sizes) updatefields["size"]=sizes;
            // if(colors) updatefields["color"]=colors;
            console.log(rating,"rating");
            console.log(ratingDropdown,"ratingDropdown");
            console.log(typeof rating, "rating");
            console.log(typeof ratingDropdown, "ratingDropdown");
            //if(rating) updatefields["rating"] = ratingDropdown??rating;
            if(rating||ratingDropdown) updatefields["rating"] = rating !== undefined ? rating : ratingDropdown;
            //if(rating) updatefields["rating"] = 4;
            console.log(updatefields);
            
            await Shoe.findByIdAndUpdate(req.params.id, {$set:updatefields}, {new:true});
            // res.redirect(`/shoes/${id}`);
            res.redirect('/');
            }catch(error){
                console.log(error);
                res.redirect('/');
            }
    }
    
        
        
}

module.exports=new HomeController();