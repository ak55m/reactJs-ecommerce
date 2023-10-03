import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../Models/ProductModel.js";
import { admin, protect, seller, protectseller } from "./../Middleware/AuthMiddleware.js";

const productRoute = express.Router();

// GET ALL PRODUCT
// productRoute.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const pageSize = 12;
//     const page = Number(req.query.pageNumber) || 1;
//     const keyword = req.query.keyword
//       ? {
//           name: {
//             $regex: req.query.keyword,
//             $options: "i",
//           },
//         }
//       : {};
//     const count = await Product.countDocuments({ ...keyword });
//     const products = await Product.find({ ...keyword })
//       .limit(pageSize)
//       .skip(pageSize * (page - 1))
//       .sort({ _id: -1 });
//     res.json({ products, page, pages: Math.ceil(count / pageSize) });
//   })
// );

// GET ALL PRODUCT
// productRoute.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const pageSize = 12;
//     const page = Number(req.query.pageNumber) || 1;
//     const long = -101.8687392;
//     const lat = req.query.latitude;
//     if (lat == " ") {
//       const keyword = req.query.keyword
//         ? {
//             name: {
//               $regex: req.query.keyword,
//               $options: "i",
//             },
//           }
//         : {};
//       const count = await Product.countDocuments({ ...keyword });
//       const products = await Product.find({ ...keyword })
//         .limit(pageSize)
//         .skip(pageSize * (page - 1))
//         .sort({ _id: -1 });
//       res.json({ products, page, pages: Math.ceil(count / pageSize) });
//       console.log("the key", keyword);
//       console.log("the latitude = ", lat);
//     } 
//     else {
//       const count = 1;
//       const products = await Product.aggregate([
//         {
//           $geoNear:{
//             near:{type:"Point", coordinates:[parseFloat(long), parseFloat(lat)]},
//             key:"location",
//             // INPUT IN METERS
//             // maxDistance:parseFloat(3500),
//             // INPUT IN MILES
//             maxDistance:parseFloat(3.5)*1069.34,
//             distanceField:"dist.calculated",
//             spherical: true,
//           }
//         }
//       ])
//         .limit(pageSize)
//         .skip(pageSize * (page - 1))
//         .sort({ _id: -1 });
//       // const count = Product.countDocuments({products});
//       console.log("the count 2", count);
//       console.log("latt", lat);
//       console.log("long", long);
//       res.json({ products, page, pages: Math.ceil(count / pageSize) });
//     }

//   })
// );

// productRoute.get(
//   '/searchers/:keyword', 
//   asyncHandler(async (req, res) =>  {
//     const sys = req.query.keyword;
//     console.log("route",sys);
//     res.send("ok");

  // console.log("will",sys);
//   })
// );


// GET PRODUCTS USING GEOLOCATION OR NOT GEOLOCATION
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {

    // this is to get query of latitude and longitude. 
    const keyword = req.query.keyword;
    console.log("the keyword",keyword);
    const lat = 33.5905166;
    const lats = req.query.latitude;
    console.log("this is lat -", lats);
    const long = -101.8687392;
    const longs = req.query.longitude;
    console.log("this is long ", longs);
    // const long = req.query.longitude;

    // if (lat == "undefined" || long == "undefined" ){
    //   lat = null;
    //   long = null;
    // } 

    const count = await Product.countDocuments({});
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    console.log("page", page);
    // const keyword = req.query.keyword
    // console.log(keyword);

    if ( lats == " " || longs == " ") {
      console.log("im here");
      const products = await Product.find()
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ _id: -1 });
      // const count = Product.countDocuments({products});
      console.log("the first count", count);
      res.json({ products, page, pages: Math.ceil(count / pageSize) });

    }
    else {
    // const products = await Product.aggregate([
    //   {
    //     $geoNear:{
    //       near:{type:"Point", coordinates:[parseFloat(long), parseFloat(lats)]},
    //       key:"location",
    //       // INPUT IN METERS
    //       // maxDistance:parseFloat(3500),
    //       // INPUT IN MILES
    //       maxDistance:parseFloat(8)*1069.34,
    //       distanceField:"dist.calculated",
    //       spherical: true,
    //     }
    //   } ]
      
    // const products = await Product.find(
    //   {
    //     location: {
    //       $near: {
    //         $geometry: {
    //            type: "Point" ,
    //            coordinates: [ parseFloat(long) , parseFloat(lats) ]
    //         },
    //         $minDistance: parseFloat(0)*1069.34,
    //         $maxDistance: parseFloat(7)*1069.34,
    //       }
    //     }
    //  }

    const products = await Product.find ({
      location: {
      $near: {
      $geometry: {
      type: "Point" ,
      coordinates: [ parseFloat(long), parseFloat(lats) ]
      },
      $maxDistance: 4*1069.34,
      $minDistance: 0
      }
      }
      }

    )
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    // const count = Product.countDocuments({products});
    console.log("the count", count);
    res.json({ products, page, pages: Math.ceil(count / pageSize) });

    console.log("the num", products.count());

    }
  })
);


// GET PRODUCTS USING GEOLOCATION OR NOT GEOLOCATION
// productRoute.get(
//   "/",
//   asyncHandler(async (req, res) => {

//     // this is to get query of latitude and longitude. 
//     const keyword = req.query.keyword;
//     console.log("the keyword",keyword);
//     const lat = 33.5905166;
//     const lats = req.zipcodeInfo;
//     console.log("this is lat -", lats);
//     const long = -101.8687392;
//     // const long = req.keyword.latitude;

//     if (lat == "undefined" || long == "undefined" ){
//       lat = null;
//       long = null;
//     } 

//     const count = await Product.countDocuments({});
//     const pageSize = 12;
//     const page = Number(req.query.pageNumber) || 1;
//     console.log("page", page);
//     // const keyword = req.query.keyword
//     // console.log(keyword);

//     if ( !long || !lat ) {
//       console.log("im here");
//       const products = await Product.find()
//         .limit(pageSize)
//         .skip(pageSize * (page - 1))
//         .sort({ _id: -1 });
//       // const count = Product.countDocuments({products});
//       console.log("the first count", count);
//       res.json({ products, page, pages: Math.ceil(count / pageSize) });

//     }
//     else {
//     const products = await Product.aggregate([
//       {
//         $geoNear:{
//           near:{type:"Point", coordinates:[parseFloat(long), parseFloat(lat)]},
//           key:"location",
//           // INPUT IN METERS
//           // maxDistance:parseFloat(3500),
//           // INPUT IN MILES
//           maxDistance:parseFloat(3.5)*1069.34,
//           distanceField:"dist.calculated",
//           spherical: true,
//         }
//       }
//     ])
//       .limit(pageSize)
//       .skip(pageSize * (page - 1))
//       .sort({ _id: -1 });
//     // const count = Product.countDocuments({products});
//     console.log("the count", count);
//     res.json({ products, page, pages: Math.ceil(count / pageSize) });

//   }

//   })
// );


// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PAGINATION
productRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

// SELLER GET ALL PRODUCTS
productRoute.get(
  "/sellerall",
  protectseller,
  seller,
  asyncHandler(async (req, res) => {
    const products = await Product.find({ seller: req.user._id }).sort({ _id: -1});
    res.json(products);
  })
);

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);


// PRODUCT REVIEW
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);


// DELETE PRODUCT
productRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);


// CREATE PRODUCT
productRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const productExist = await Product.findOne({ name });
    if (productExist) {
      res.status(400);
      throw new Error("Product name already exist");
    } else {
      const product = new Product({
        name,
        price,
        description,
        image,
        countInStock,
        user: req.user._id,
      });
      if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
      } else {
        res.status(400);
        throw new Error("Invalid product data");
      }
    }
  })
);


// SELLER CREATE PRODUCT
productRoute.post(
  "/sellercreate",
  protectseller,
  seller,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const productExist = await Product.findOne({ name });
    if (productExist) {
      res.status(400);
      throw new Error("Product name already exist");
    } else {
      const product = new Product({
        seller: req.user._id,
        name,
        storename: req.user.storename,
        price,
        description,
        image,
        countInStock,
      });
      if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
      } else {
        res.status(400);
        throw new Error("Invalid product data");
      }
    }
  })
);

// UPDATE PRODUCT
productRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
export default productRoute;
