const Shoe = require("../model/shoe");
const path = require("path");
const fs = require("fs");
class ShoeController {
  async getAllShoes(req, res) {
    try {
      const shoes = await Shoe.find({ isDeleted: false });
      res.render("panel/list", { title: "List Shoes", shoes: shoes });

      //console.log(shoes);
    } catch (e) {
      res
        .status(404)
        .render("panel/list", {
          title: "List Shoes",
          message: err.message,
          success: false,
        });
    }
  }

  async getAllDiscardedShoes(req, res) {
    try {
      // res.send('Get All Shoes');

      const shoes = await Shoe.find({ isDeleted: true });
      res.render("panel/discarded", {
        title: "List Shoes",
        shoes: shoes,
        discarded: true,
      });

      // console.log(shoes);
    } catch (e) {
      res
        .status(404)
        .render("panel/discarded", {
          title: "List Shoes",
          message: err.message,
          success: false,
        });
    }
  }

  async fetchtoeditShoes(req, res) {
    try {
      const id = req.params.id;
      const shoe = await Shoe.findById(id);
      console.log(shoe,"fetached this");
      res.render("panel/edit", {
        title: "Edit Shoe",
        shoe: shoe,
        success: true,
      });
    } catch (err) {
      res
        .status(404)
        .render("panel/edit", {
          title: "Edit Shoe",
          message: err.message,
          success: false,
        });
    }
  }

  async updateShoe(req, res) {
    try {
      const id = req.params.id;
      console.log(req.params,"params")
      let { title, description, price, brand, sizes, colors, image, images, rating } =
        req.body;
        console.log(req.body,"body");
      sizes = sizes.split(",").map((i) => i.trim());
      colors = colors.split(",").map((i) => i.trim());
      rating = parseInt(rating);
      images = [];
      const shoeData = await Shoe.findById(id);
      if (!shoeData) {
        res.redirect("/shoe/edit/" + id);
      } else {
        // images =
        //   req.files && req.files.length > 0
        //     ? req.files.map((file) => file?.path)
        //     : shoeData.images;
            if (req.files) {        
                req.files.forEach((file,index) => {
                  images.push(file.originalname);
                });
              }else{
                images = image.split(",").map((i) => i.trim());
              }
      }
      console.log(images,"images");
      if(images.length==0){
        images = image.split(",").map((i) => i.trim());
      }
      console.log(image,"image");
      console.log({ title, description, price, brand, sizes, colors, images, rating },"updating this")
      
      const updatedShoe = await Shoe.findByIdAndUpdate(
        id,
        { title, description, price, brand, sizes, colors, images, rating },
        { new: true }
      );
      if (updatedShoe) {
        if (req.files && req.files.length > 0 && shoeData.images.length > 0) {
          shoeData.images.forEach((imagePath) => {
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          });
        }
        res.redirect("/shoe/list"); //,{title:'updated Shoe',success:true})
      } else {
        res.redirect("/shoe/edit/" + id); //,{title:'updated Shoe',message:'Shoe could not be updated',success:false})
      }
    } catch (err) {
      res.redirect("/shoe/list"); //,{title:'updated Shoe',message:err.message,success:false})
    }
  }
  async softdeleteshoe(req, res) {
    try {
      const id = req.params.id;
      const updatedShoe = await Shoe.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
      if (updatedShoe) {
        res.redirect("/shoe/list"); //,{title:'updated Shoe',success:true})
      } else {
        res.redirect("/shoe/list/"); //,{title:'updated Shoe',message:'Shoe could not be updated',success:false})
      }
    } catch (err) {
      res.redirect("/shoe/list"); //,{title:'updated Shoe',message:err.message,success:false})
    }
  }
  async softdeleteRevert(req, res) {
    try {
      const id = req.params.id;
      const updatedShoe = await Shoe.findByIdAndUpdate(
        id,
        { isDeleted: false },
        { new: true }
      );
      if (updatedShoe) {
        res.redirect("/shoe/list"); //,{title:'updated Shoe',success:true})
      } else {
        res.redirect("/shoe/list/"); //,{title:'updated Shoe',message:'Shoe could not be updated',success:false})
      }
    } catch (err) {
      res.redirect("/shoe/list"); //,{title:'updated Shoe',message:err.message,success:false})
    }
  }

  async deleteshoe(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      const shoe = await Shoe.findByIdAndDelete(id);
      console.log(shoe);
      if (shoe) {
        console.log("1");
        res.redirect("/shoe/list");
      } else {
        console.log("1");
        res.redirect("/shoe/list"); ///',{title:'Delete Shoe',message:'Shoe could not be deleted',success:false})
      }
    } catch (err) {
      console.log(err);
    }
  }

  async addShoe(req, res) {
    try {
      //console.log(req.body)
      let { title, description, price, brand, sizes, colors, images, rating } =
        req.body;
      sizes = sizes.split(",").map((i) => i.trim());
      colors = colors.split(",").map((i) => i.trim());
      //images=images.split(',').map(i => i.trim());
      rating = parseInt(rating);
      images = [];
      //console.log(req.files);
      // console.log({title,description,price,brand,sizes,colors,images,rating});
      if (req.files) {
        images = [];

        req.files.forEach((file,index) => {
        //   const uploadDir = "uploads/";
        //   //const fileName = req.files[0].originalname;
        //   console.log(index);
        //   console.log(file, "file");
        //   console.log(file.fileName, "filename");
        //   console.log(file.originalname,"original");
        //   const filePath = path.join(uploadDir, file.originalname); // construct the full file path
        //   console.log(filePath, "path");
        //   if (fs.existsSync(filePath)) {
        //     fs.unlink(filePath);
        //   }
          images.push(file.originalname);
        });
      }
      
      //console.log(req.file)
      console.log(images,"images");
      // console.log(req);
      console.log({
        title,
        description,
        price,
        brand,
        sizes,
        colors,
        images,
        rating,
      },"adding this");
      const shoedata = new Shoe({
        title,
        description,
        price,
        brand,
        sizes,
        colors,
        images,
        rating,
      });

      const data = await shoedata.save();
      if (data) {
        res.redirect("/shoe/list"); //,{title:'Add Shoe',shoe:data,success:true})
      } else {
        res.redirect("/shoe/add/"); //,{title:'Add Shoe',message:'Shoe could not be added, please try again',success:false})
      }
    } catch (err) {
      console.log(err);
    }
  }
  async addShoeView(req, res) {
    try {
      res.render("panel/add"); //,{title:'Add Shoe',success:true})
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = new ShoeController();
